//Declaring 2 variables and affecting them value
let totalQuantity = 0;
let totalPrice = 0;

//Declaring the 'product' variable that will be used in several funtions
let product;
let productInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));

//Function that gets elements from the local storage
function getElements() {

    //If nothing in cart, shows message
    if (productInLocalStorage == null) {
        document.querySelector("#cart__items").innerHTML = `<h2> Votre panier est vide </h2>`;

    //Else, has to display products of the local storage
    } else {
        //Loop to get each product of the cart
        for (let index = 0; index < productInLocalStorage.length; index++) {
            product = productInLocalStorage[index];
            displayElements(product);
        }
    }
}

getElements();


async function fetchItems (product) {
    const response = await fetch("http://localhost:3000/api/products/"+ product.id, { method: 'GET' });
    const data = await response.json();
    return data;
}

//Function that displays the products that the promise returned
function displayElements (product) {
    fetchItems(product).then(data => {

        //CREATING ELEMENTS OF THE DOM
        //Get an HTML element by ID - items section 
        let cartItems = document.getElementById("cart__items");

            //Creates HTML article element and affects each product"s link
            let sectionArticle = document.createElement("article");
            cartItems.appendChild(sectionArticle);
            sectionArticle.className = "cart__item";
            sectionArticle.id = product.id;
            sectionArticle.color = product.color;
            
                //Creates a div in "article"vthat will contain img
                let imgDiv = document.createElement("div");
                sectionArticle.appendChild(imgDiv);
                imgDiv.className = "cart__item__img";

                    //Creates img element"s in the imgDiv
                    let productImg = document.createElement("img");
                    imgDiv.appendChild(productImg);
                    productImg.src = data.imageUrl;
                    productImg.alt = data.altTxt;


                //Creates a div in "article"that will contain description/quantity/delete
                let productDiv = document.createElement("div");
                sectionArticle.appendChild(productDiv);
                productDiv.className = "cart__item__content";
            
                    //Creates a descriptionDiv in the productDiv
                    let descriptionDiv = document.createElement("div");
                    productDiv.appendChild(descriptionDiv);
                    descriptionDiv.className = "cart__item__content__description";

                        //Creates 3 HTML elements in the descriptionDiv
                        let productName = document.createElement("h2");
                        descriptionDiv.appendChild(productName);
                        productName.innerText = data.name;

                        let productColor = document.createElement("p");
                        descriptionDiv.appendChild(productColor);
                        productColor.innerText = product.color;

                        let productPrice = document.createElement("p");
                        descriptionDiv.appendChild(productPrice);
                        productPrice.innerText = data.price;


                    //Creates a settingsDiv in the productDiv
                    let settingsDiv = document.createElement("div");
                    productDiv.appendChild(settingsDiv);
                    settingsDiv.className = "cart__item__content__settings";

                        //Creates a new div in the settingsDiv
                        let inSettingsDiv = document.createElement("div");
                        settingsDiv.appendChild(inSettingsDiv);
                        inSettingsDiv.className = "cart__item__content__settings__quantity";

                            //Creates a "p" in the div contained in settingsDiv
                            let productQuantity = document.createElement("p");
                            inSettingsDiv.appendChild(productQuantity);
                            productQuantity.innerText = "Qté";

                            //Creates an input in the div contained in settingsDiv
                            let quantityInput = document.createElement("input");
                            inSettingsDiv.appendChild(quantityInput);
                            quantityInput.className = "itemQuantity";
                            quantityInput.name = "itemQuantity";
                            quantityInput.type = "number";
                            quantityInput.value = product.quantity;
                            quantityInput.min = "1";
                            quantityInput.max = "100";


                    //Creates a deleteDiv in the productDiv
                    let deleteDiv = document.createElement("div");
                    productDiv.appendChild(deleteDiv);
                    deleteDiv.className = "cart__item__content__settings__delete";

                    //Creates a "p" in the deleteDiv
                    let deleteButton = document.createElement("p");
                    deleteDiv.appendChild(deleteButton);
                    deleteButton.innerText = "Supprimer";
                    deleteButton.className = "deleteItem";

                        
        //TOTAL

        //Affecting each product"s quantity and price to total
        totalQuantity = totalQuantity + parseInt(product.quantity);
        totalPrice = totalPrice + parseInt(data.price * product.quantity);

        //Selecting DOM element where to display these totals
        document.querySelector("#totalQuantity").innerHTML = totalQuantity;
        document.querySelector("#totalPrice").innerHTML = totalPrice;

    })

    //Error in case the request failes
    .catch(error => {
        console.error(error) 
    });

}


//QUANTITY CHANGE
//Function to change quantity and update the change in the local storage
function quantityUpdate () {
    
    let quantityInput = document.querySelectorAll(".itemQuantity");
    //Loop to listen all quantity inputs
    for (let index = 0; index < quantityInput.length; index++) {
        quantityInput[index].addEventListener("change", (event) => {
            let product = productInLocalStorage[index];

            //La quantité choisit est stockée dans la quantité du produit du local storage
            product.quantity = event.target.value;

            //Si la quantitée n'est pas entre 0 et 100, une alerte apparait, sinon le quantité du produit est mise à jour dans le local storage
            if (event.target.value > 100 || event.target.value < 1) {
                alert ("La quantité du produit ne doit pas dépasser 100 et ne peut pas être inférieure à 0, si vous souhaitez supprimer le produit, appuyer sur 'Supprimer'");
                location.reload(); 
            //sinon la quantité est mise à jour dans le local storage
            } else {
                localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));
                location.reload();
            }
            
        })
    }
}

//Timeout to lunch the quantity update function after the promise response
setTimeout(quantityUpdate, 2000);



//DELETE ITEM
//Function to delete items from the cart
function deleteItemFromCart () {

    let deleteButtons = document.querySelectorAll(".deleteItem");
    //loop to get all the "delete" buttons and add an event listener on each
    for (let index = 0; index < deleteButtons.length; index++) {
        deleteButtons[index].addEventListener("click", (event) => {
        let targetArticle = productInLocalStorage[index];
        //puts products'id and color in variable to then use to find them in the local storage and delete if wanted
        let kanapId = targetArticle.id;
        let kanapColor = targetArticle.color;
        //filter that keeps only the products without the same id and color as the deleted product
        productInLocalStorage = productInLocalStorage.filter(element => element.id !== kanapId && element.couleur !== kanapColor);
        //update the change within the local storage
        localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));
        window.location.href = "cart.html";
    })
    }
}

//Timeout to lunch the function after the promise response
setTimeout(deleteItemFromCart, 2000);




//FORM VALIDITY

// Variables values for the form :
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");

//REGEXS
const regexName = /^^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;

//Function to see if the first name fulfills the regex conditions
//if not, displays an error message, else doesn't
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom.value) == false) {
    firstNameErrorMsg.innerHTML = "Entrez un prénom valide et sans chiffre avant de passer commande.";
} else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}
//Event listener to verify regex condition on change
prenom.addEventListener ("change", (e) => {
    validateFirstName(prenom);
})

//Function to see if the last name fulfills the regex conditions
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom.value) == false) {
    lastNameErrorMsg.innerHTML = "Entrez un nom valide et sans chiffre avant de passer commande.";
} else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}
//Event listener to verify regex condition on change
nom.addEventListener ("change", (e) => {
    validateLastName(nom);
})


//Function to see if the city name fulfills the regex conditions 
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville.value) == false) {
    cityErrorMsg.innerHTML = "Entrez un nom de ville valide et sans chiffre avant de passer commande.";
} else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}
//Event listener to verify regex condition on change
ville.addEventListener ("change", (e) => {
    validateCity(ville);
})

//Function to see if email fulfills the regex conditions
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
    const regexMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (regexMail.test(mail.value) == false) {
        emailErrorMsg.innerHTML = "Entrez un email valide avant de passer commande.";
    } else {
        emailErrorMsg.innerHTML = null;
        return true;
    }
}
//Event listener to verify regex condition on change

mail.addEventListener ("change", (e) => {
    validateEmail(mail);
})


//PURCHASE
// 'Post' request

//Function that gets contact and product data and changes them into strings
//Contact objet with form values + array of products'ids in the cart
function contactAndProductData() {
    let contact = {
      firstName: prenom.value,
      lastName: nom.value,
      address: adresse.value,
      city: ville.value,
      email: mail.value,
    };

    let items = productInLocalStorage;
    let products = [];
  
    for (i = 0; i < items.length; i++) {
          products.push(items[i].id);
        
      }
    let jsonData = JSON.stringify({ contact, products });
    return jsonData;
}

contactAndProductData();

//Function to send the data to the back end if it passes the regexs validations
function sendToBackEnd() {
let orderButton = document.getElementById("order");
//EventListener on order button
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  //to prevent fetch to post without REGEXs permission :
  if (
    !mail.value ||
    !prenom.value ||
    !nom.value ||
    !ville.value
  ) {
    alert("Remplissez correctement le formulaire");
  }
  else {

    //fetch to get the order number
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
        "Content-Type": 'application/json;charset=utf-8',
        },
        body: contactAndProductData()
    })

    .then((response) => response.json())

    .then((data) => {
        //clearing localStorage after info has been posted
        localStorage.clear();
        //sends user to confirmation page with it's order number
        window.location.href = "./confirmation.html?id=" + data.orderId;
    })

    //alert if error
    .catch((error) => {
        alert("Une erreur est survenue, merci de réessayer ultérieurement. Contactez nous si le probleme persiste");
    });
}
});
}

sendToBackEnd();