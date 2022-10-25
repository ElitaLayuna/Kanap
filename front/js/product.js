//Get each product's ID
const getProductId = (new URL(document.location)).searchParams;
let productId = getProductId.get('id');

//--------------------Product--------------------//

//Get the wanted article from the API
function getProduct() {
    fetch('http://localhost:3000/api/products/'+ productId)
    .then((response) => {
    return response.json()
  })
  .then(data => {
        //Creates an img inside an existing div
        let imgSection = document.querySelector('.item__img');
        let productImg = document.createElement('img');
        imgSection.appendChild(productImg);
        productImg.src = data.imageUrl;
        productImg.alt = data.altTxt;
        
        //Gets the product's name in the h1 element
        let productName = document.getElementById('title');
        productName.innerHTML = data.name;

        //Gets the product's price in the price span element in p
        let productPrice = document.getElementById('price');
        productPrice.innerHTML = data.price;

        //Gets the product's description in the description p
        let productDescription = document.getElementById('description');
        productDescription.innerHTML = data.description;
    
        //Gets all the product's colors an add them as options
        let productColor = document.getElementById('colors');
        for (let i = 0; i < data.colors.length; i++) {
            let option = document.createElement("option");
            option.innerText = data.colors[i];
            option.value = data.colors[i];
            productColor.appendChild(option);}

})

//In case of error, leaves a message
.catch((error) => {
    console.error(error)
})
}

//Calls the function
getProduct()

//--------------------Local Storage--------------------//

let message = document.querySelector('.item__content__addButton');

//Creats the function storing in local storage
function saveInLocalStorage(productOptions) {

    //Gets items from LS and converts strings to Js object
    let productInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));

    //If the product isn't in the cart, add the product with his options
    if (productInLocalStorage === null) {
        productInLocalStorage= [];
        productInLocalStorage.push(productOptions);

        //converts Js objects to strings
        localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));

        //leaves a message when you add a product to the cart
        message.innerHTML = "Produit ajouté au panier!";

    } else {
        //Constant 'found' searches for a product in the cart this same id and color
        const found = productInLocalStorage.find(product => product.id == productOptions.id && product.color == productOptions.color);
        
        //If product with same id and color not found, add it
        if (found == undefined) {
            productInLocalStorage.push(productOptions);
            localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));
            message.innerHTML = "Produit ajouté au panier!";

    //If product with same id and color, just add quantity
    } else {
        found.quantity += productOptions.quantity;
        localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));
        message.innerHTML = "Produit ajouté au panier. Attention ce produit figure déja dans votre panier"
    }
}
}

//----------------------Cart----------------------//

//Getting the data of the products selected by the user

//Selects the html color selector
const colorSelect = document.querySelector('#colors');
//Selects the number input
const quantityChoice = document.querySelector('#quantity');
//Selects the 'add to cart' button
const addToCartBtn = document.querySelector('#addToCart');

//Listen to button and send the cart
addToCartBtn.addEventListener("click", (event)=>{
    event.preventDefault();

    //Gets the form values
    let productOptions = {
        id: productId,
        name: document.getElementById('title').innerHTML,
        color: colorSelect.value,
        img: document.querySelector('.item__img'),
        quantity: Number(quantityChoice.value)
    }
console.log(productOptions);
    saveInLocalStorage(productOptions);
})




