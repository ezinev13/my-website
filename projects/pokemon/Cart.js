let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: '30 Pokeball',
        image: 'pokeball.png',
        price: 100
    },
    {
        id: 2,
        name: '20 Great Ball',
        image: 'greatball.png',
        price: 200
    },
    {
        id: 3,
        name: '15 Ultra Ball',
        image: 'ultraball.png',
        price: 400
    },
    {
        id: 4,
        name: '5 Master Ball',
        image: 'masterball.png',
        price: 500
    },
    {
        id: 5,
        name: '30 Potion',
        image: 'potion.png',
        price: 150
    },
    {
        id: 6,
        name: '15 Super Potion',
        image: 'superpotion.png',
        price: 150
    },
    {
        id: 7,
        name: '10 Hyper Potion',
        image: 'hyperpotion.png',
        price: 250
    },
    {
        id: 8,
        name: '5 Max Potion',
        image: 'maxpotion.png',
        price: 300
    },
    {
        id: 9,
        name: '5 Revive',
        image: 'revive.png',
        price: 150
    },
    {
        id: 10,
        name: '3 Max Revive',
        image: 'maxrevive.png',
        price: 200
    },
    {
        id: 11,
        name: '20 Gift',
        image: 'Gift.png',
        price: 150
    },
    {
        id: 12,
        name: '10 Sponsored Gift',
        image: 'sponsor.png',
        price: 250
    },
    
];

let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="imgs/${value.image}">
            <div class="title">${value.name}</div>
            
            <div class="price">₱${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="imgs/${value.image}"></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})"><</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">></button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}