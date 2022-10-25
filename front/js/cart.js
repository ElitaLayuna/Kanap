//Displaying products of the local storage in the cart
let productInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));

//API's URL
const urlApi = 'http://localhost:3000/api/products';
 
//Getting API product's info (price)
function APIproducts(){
    fetch(urlApi, {  
        method:'GET',
    })
        .then((response) => {
            return response.json()
    })
        .then(data => {
            let productPrice = data.price
    })
}




//If nothing in cart, shows message
if (productInLocalStorage == null) {
    document.querySelector("#cart__items").innerHTML = `<h2> Votre panier est vide </h2>`;

//Else, has to display products of the local storage
} else {

    for (let index = 0; index < productInLocalStorage.length; index++) {
        const product = productInLocalStorage[index];
        document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                                                <div class="cart__item__img">
                                                                    <img src="${product.img}" alt="Photographie d'un canapé">
                                                                </div>
                                                                <div class="cart__item__content">
                                                                    <div class="cart__item__content__description">
                                                                        <h2>${product.name}</h2>
                                                                        <p>${product.color}</p>
                                                                        <p>Prix a récuperer</p>
                                                                    </div>
                                                                    <div class="cart__item__content__settings">
                                                                        <div class="cart__item__content__settings__quantity">
                                                                            <p>Qté : </p>
                                                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage.quantity}">
                                                                        </div>
                                                                        <div class="cart__item__content__settings__delete">
                                                                            <p class="deleteItem">Supprimer</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </article>`;
    }
    

//Creates arrays that will contain quantities and prices
let totalPrice = [];
let totalQuantity = [];
    
                                                    
//TOTAL

//Variables to change sting into number
    let quantityNumber = parseInt(productInLocalStorage.quantity);
    let priceNumber = parseInt(productPrice * product.quantity);

//Pushes the number into the array variables

    totalQuantity.push(quantityNumber);
    totalPrice.push(priceNumber);
}

//Additioning the products prices
document.querySelector("#totalQuantity").innerHTML += `${totalQuantityResult}`;
document.querySelector("#totalPrice").innerHTML += `${totalPrice}`;



//-----Function permettant la suppréssion d'un item du panier
function toEmptyCart() {

    // Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage
    const buttonToEmptyCart = document.querySelector(".deleteItem");
    buttonToEmptyCart.addEventListener("click", () => {
      localStorage.clear();
    });
  }