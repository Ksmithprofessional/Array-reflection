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
    author.innerHTML = '<p>Photographer: </p>'

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
    // console.log(assignEmail.length);
    // console.log(email);
    // console.log(assignEmail[0].textContent);
    e.preventDefault();

    if(!email.match(regex)) {

        e.preventDefault();
        document.querySelector('.error').innerHTML = `<i class="far fa-times-circle"></i> Invalid email address`;
        // console.log(email);
        // test to see whether the email address actually shows up on failure

    } if(email === '') {

        e.preventDefault();
        document.querySelector('.error').innerHTML = `<i class="far fa-times-circle"></i> We can't email you if you don't put in an email address!`;

    } if(email.match(regex) && email === email && assignEmail.length === 1) {
        document.querySelector('.error').innerHTML = ``;
        e.preventDefault();
        document.querySelectorAll('.assigned-email')[0].innerHTML = email;
        document.querySelectorAll('.assign-to-email')[0].insertAdjacentHTML('beforeend', 
            `<img src="` + img.src + `" alt="thumbnail of emailed image" class="small-img">`
        );
        document.querySelector('#assigned-wrapper').insertAdjacentHTML('beforeend', 
        `<div class="assign-to-email">
            <div class="assigned-email"></div>
        </div>`
    );
    };
    
    for (let i= assignEmail.length - 1; i< assignEmail.length; i++) {
        let lastEmail = assignImg[i].previousSibling.textContent;
        // i=1 when the for loop fires so this needs to target -1
        // previoussibling seems to only fire on the third one?
        // almost works? when entering new email, it creates a new div, but doesn't add to it till the next click
        // also doesn't read older emails, just the previous one
        console.log(email);
        if(email.match(regex) && lastEmail.match(email) && assignEmail.length > 1) {

            console.log('fired')
            document.querySelector('.error').innerHTML = ``;
            e.preventDefault();
            document.querySelectorAll('.assigned-email')[i].innerHTML = email;
            document.querySelectorAll('.assign-to-email')[i].insertAdjacentHTML('beforeend', 
                `<img src="` + img.src + `" alt="thumbnail of emailed image" class="small-img">`
            );
        } if(email.match(regex) && !lastEmail.match(email) && assignEmail.length > 1) {

            let addImg = function () {

                document.querySelector('.assign-to-email').insertAdjacentHTML('beforeend', 
                `<img src="` + img.src + `" alt="thumbnail of emailed image" class="small-img">`
                );
            };
            // not using this anymore for some reason?

            document.querySelector('#assigned-wrapper').insertAdjacentHTML('beforeend', 
            `<div class="assign-to-email">
                <div class="assigned-email"></div>
            </div>`
            );

            document.querySelector('.error').innerHTML = ``;
            e.preventDefault();

            assignEmail[i].innerHTML = email;
            assignImg[i].insertAdjacentHTML('beforeend', 
            `<img src="` + img.src + `" alt="thumbnail of emailed image" class="small-img">`
            );

            console.log('no');
            console.log(lastEmail);
        }
    }
});

//for loop for the cloned assign to email divs?
