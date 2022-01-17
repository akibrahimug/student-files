// Gallery section
const $gallery = $('#gallery')
//get 12 users info from 'https://randomuser.me/api/'
const randomuser = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
// Overlay for modalWindow
const $modalWindow = $('<div id="overlay"></div>');
// body 
const $body = $('body')
// append overlay container to body
$body.prepend($modalWindow);
// Array of all data returned
let students = [];
// overlay on/off functions
const on = () => $modalWindow.show();
const off = () => $modalWindow.hide();
// fetchdata function
const fetchData = async(url) => {
    // if res.status is ok
    try{
        const res = await fetch(url);
        // if res.status is not ok
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        // parse the data to json
        const data = await res.json();
        // get the results from and store them in the response variable
        const response = await data.results;
        // call cardInfo pasing it response as the parameter
       return cardInfo(response)
    //if the response has any errors catch them here and console log them
    }catch(e){
        console.log(e)
    }
}
//Call the fetchData function passing it the parameter randomUser
fetchData(randomuser)

//Create a card for each user
const cardInfo = (res) => {

    students = res
    // Iterate through the response
    $(res).each((index, r) => {
        //Destructure the response array
        const {name:{first, last}, email, location:{city, state}, picture:{large}} = r;

        //Create a 'Card' variable to handel the creation of the DOM structure for data returned
        const card = `<div class="card" data-index="${index}">
        <div class="card-img-container">
            <img class="card-img" src="${large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${first} ${last}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${city}, ${state}</p>
        </div>
    </div>`

    // Append the each card created to the gallery container
   $gallery.append(card);

    })
}

//display a modal window contaning
const modalFunc = (index) => {

    // Destructuring the array 
    const {name:{first, last}, email, dob, location:{city, street:{name, number}, state, country, postcode}, picture:{large}, phone} = students[index];

    // Formating the date object
    let date = new Date(dob.date);

    // Create a popUp variable to handel the creation of the modalWindow 
    const popUp = `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${first} ${last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}, ${state}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${number} ${name}, ${country}, ${postcode}</p>
            <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    </div>`

    // If card is clicked on function is called to show modal window
    on();

    // Append the popUp to the modalwindow container
    $modalWindow.append(popUp)
    
}

// When the card is clicked
    $gallery.on('click', (e) => {

        // event target should be the card 
        const $card = $(e.target).closest('.card');

        // get the data-index set on every card 
        const $index = $card.attr('data-index');

        // call the modalFunc
        modalFunc($index)
    })

//Modal window should have a close button
$modalWindow.on('click', e => {
    if(e.target.textContent === 'X'){
        off()
    }
    
})


    