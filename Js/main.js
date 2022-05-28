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

    if(!email.match(regex)) {

        e.preventDefault();
        document.querySelector('.error').innerHTML = `<i class="far fa-times-circle"></i> Invalid email address`;
        // console.log(email);
        // test to see whether the email address actually shows up on failure

    }
});

form.addEventListener('submit', (e) => {

    let email = document.querySelector('#email input').value;

    if(email === '') {

        e.preventDefault();
        document.querySelector('.error').innerHTML = `<i class="far fa-times-circle"></i> We can't email you if you don't put in an email address!`;

    }
});