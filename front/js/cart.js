//Displaying products of the local storage in the cart
let productInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));

//Declaring 2 variables and affecting them value
let totalQuantity = 0;
let totalPrice = 0;


//If nothing in cart, shows message
if (productInLocalStorage == null) {
    document.querySelector("#cart__items").innerHTML = `<h2> Votre panier est vide </h2>`;

//Else, has to display products of the local storage
} else {

    for (let index = 0; index < productInLocalStorage.length; index++) {
        const product = productInLocalStorage[index];

        //Getting the product"s infos from the API
        fetch("http://localhost:3000/api/products/"+ product.id)
            .then((response) => {
            return response.json()
            })

            .then(data => {
                
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

                //Variables to change string into number
                totalQuantity = totalQuantity + parseInt(product.quantity);
                totalPrice = totalPrice + parseInt(data.price * product.quantity);

                //Additioning the products prices
                document.querySelector("#totalQuantity").innerHTML = totalQuantity;
                document.querySelector("#totalPrice").innerHTML = totalPrice;
  


                //DELETE
                deleteButton.addEventListener("click", (event)=>{
                    deleteButton.closest(".cart__item").remove();
                    localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));
                })



                //QUANTITY CHANGE
                quantityInput.addEventListener("change", (event) => {
                    product.quantity = event.target.value;
                    localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));
                    location.reload();
                })

        })
        
        //In case of error, leaves a message
        .catch((error) => {
            console.error(error)
        })
}}