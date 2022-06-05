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
                    console.log(data)
                    img.src = 'https://picsum.photos/id/' + data.id + '/300/300'
                    author.insertAdjacentHTML('beforeend', data.author)
                })
        })
    });
});


//email validation

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

        if(email.match(regex) && lastEmail.match(email)) {

            // console.log('fired')
            document.querySelector('.error').innerHTML = ``;
            e.preventDefault();
            document.querySelectorAll('.assign-to-email')[i].insertAdjacentHTML('beforeend', 
                `<img src="` + img.src + `" alt="thumbnail of emailed image" class="small-img">`
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
            `<img src="` + img.src + `" alt="thumbnail of emailed image" class="small-img">`
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
// the amount of clicks so it doesn't work properly. Also changing the display to none wouldn't work
// fully either since the page would struggle to load with all the added images still being there.
// If i accidentally leave this in then i'm just experimenting and practicing with this bit.

const wrapper = document.querySelector('#assigned-wrapper');

wrapper.addEventListener('click', () => {

    let imgs = document.querySelectorAll('img');

    for (let i= 0; i< imgs.length; i++) {
        imgs[i].addEventListener('click', () => {

            // imgs.splice(i, 1)
            console.log(i);
            imgs[i].style.display = 'none';
        })
    }

});
