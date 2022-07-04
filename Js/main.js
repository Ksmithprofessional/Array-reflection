const url = 'https://picsum.photos/200/300';
const imgArea = document.querySelector('.random-img');
let img = new Image(300, 300);
imgArea.appendChild(img);
const author = document.querySelector('.author');
const imgChange = document.querySelector('.click-btn')


fetch(url)
.then(response => response.headers.get('picsum-id'))
.then(info => 'https://picsum.photos/id/' + info + '/info' )
.then(resolve => {
    fetch(resolve)
    .then(response => response.json())
    .then(data => author.insertAdjacentHTML('beforeend', data.author))
    .then(img.src = url)
})
.catch(error => console.error(error));


imgChange.addEventListener('click', async () => {

    img.src = ''; 
    author.innerHTML = 'Photographer: '

    let infoLink = new Promise((resolve, reject) => {
        fetch(url)
        .then(response => response.headers.get('picsum-id'))
        .then(info => 'https://picsum.photos/id/' + info + '/info' )
        .then(resolve => {
                 fetch(resolve)
                .then(response => response.json())
                .then( data => {
                    // console.log(data)
                    img.src = 'https://picsum.photos/id/' + data.id + '/300/300'
                    author.insertAdjacentHTML('beforeend', data.author)
                })
        })
    });
});


//email validation
// i tried changing the regex to fix the .co/.com issue but that didn't seem to do anything so i matched 
// the email lengths further down.

const formSubmit = document.querySelector('#submit');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {

    let email = document.querySelector('#email input').value;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let assignEmail = document.querySelectorAll('.assigned-email');
    let assignImg = document.querySelectorAll('.assign-to-email');
    e.preventDefault();

    if(!email.match(regex)) {

        e.preventDefault();
        document.querySelector('.error').innerHTML = `<i class="far fa-times-circle"></i> Invalid email address`;
        // console.log(email);
        // test to see whether the email address actually shows up on failure

    } if(email === '') {

        e.preventDefault();
        document.querySelector('.error').innerHTML = `<i class="far fa-times-circle"></i> We can't email you if you don't put in an email address!`;

    };
    
    for (let i= 0; i< assignEmail.length; i++) {
        let lastEmail = assignEmail[i].textContent;
        let emailLength = email.length;
        let lastEmailLength = lastEmail.length;
        // works i think? Probable clean up needed,break seemed to fix most of it, now stops after finding a match
        // not totally sure i need the function now? 
        // console.log(email);
        let match = function() {

            for (let i= 0; i< assignEmail.length; i++) {
                
                if (lastEmail.match(email)) {
                    return 't'
                } else {
                    return 'f'
                }
            }
        };
        const allFalse = (value) => value === 'f';
        let matchArray = Array.from(match());

        if(email.match(regex) && lastEmail.match(email) && emailLength === lastEmailLength) {

            // added a check to see whether the emails are the same length to fix .co and .com being the same
            // console.log(lastEmailLength)
            // console.log(emailLength)
            document.querySelector('.error').innerHTML = ``;
            e.preventDefault();
            assignImg[i].insertAdjacentHTML('beforeend', 
                `<div class="assigned-img">
                <i class="fas fa-times"></i>
                <img src="` + img.src + `" alt="thumbnail of emailed image" class="small-img">
                </div>`
            );
            break
        } if(email.match(regex) && matchArray.every(allFalse) && i === assignEmail.length - 1) {


            if(i % 2 == 0) {
                document.querySelector('#assigned-wrapper').insertAdjacentHTML('beforeend', 
                `<div class="assign-to-email right-text">
                    <div class="assigned-email"></div>
                </div>`
                );
            } else {
                document.querySelector('#assigned-wrapper').insertAdjacentHTML('beforeend', 
                `<div class="assign-to-email left-text">
                    <div class="assigned-email"></div>
                </div>`
                );

            }

            document.querySelector('.error').innerHTML = ``;
            e.preventDefault();

            assignEmail[assignEmail.length - 1].innerHTML = email;
            assignImg[assignImg.length - 1].insertAdjacentHTML('beforeend', 
                `<div class="assigned-img">
                <i class="fas fa-times"></i>
                <img src="` + img.src + `" alt="thumbnail of emailed image" class="small-img">
                </div>`
            );

                // console.log('no');
                // console.log(lastEmail);
            }    
            // console.log(matchArray.every(allFalse))
    } 
});

// clock (granted i just looked this one up and edited it a little)

function showTime(){
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    // this line maybe unecessary, check before midday one day.
    m = (m < 10) ? "0" + m : m;
    
    let time = h + ":" + m  + " " + session;
    document.querySelector(".time").innerText = time;
    document.querySelector(".time").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();


// image deletion
// this does actually sort of work? But because of the event listener inside the event listener it multiplies
// the amount of console.logs so it doesn't work properly. It seemed to have some weird issues previously
// but i think it works better now? The 'if there's no images then delete div' part of this has an unintended
// effect (it seems to slightly screw up the order of right and left sides) but it's not a major bother 
// in terms of styling so i think i'll just leave it.
// I'll leave this bit in but i'm mostly just experimenting and practicing with this bit.

const wrapper = document.querySelector('#assigned-wrapper');

wrapper.addEventListener('mouseenter', () => {

    let imgs = document.querySelectorAll('img');
    let cross = document.querySelectorAll('.fa-times');
    let imgDiv = document.querySelectorAll('.assigned-img');
    let assignImg = document.querySelectorAll('.assign-to-email');

    for (let i= 1; i< imgs.length; i++) {

        imgs[i].style.filter = 'grayscale(100%)';
        cross[i-1].style.display = 'block';

        imgDiv[i -1].addEventListener('click', () => {

            // console.log(i);
            imgDiv[i-1].remove();

            for (let i= 0; i< assignImg.length; i++) {

                if(assignImg[i].childElementCount === 1 && i !== assignImg.length - 1) {

                    assignImg[i].remove();
                }
            }

        })
    }

});

wrapper.addEventListener('mouseleave', () => {

    let imgs = document.querySelectorAll('img');
    let cross = document.querySelectorAll('.fa-times');

    for (let i= 1; i< imgs.length; i++) {

        imgs[i].style.filter = 'grayscale(0%)';
        cross[i-1].style.display = 'none';

    }
});
