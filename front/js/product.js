//Gets each product's ID within the URL
const getProductId = (new URL(document.location)).searchParams;
let productId = getProductId.get('id');

//--------------------Product--------------------//

//Gets the wanted article from the API
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

getProduct();

//--------------------Local Storage--------------------//



//Creats the function storing product in local storage when needed
function saveInLocalStorage(productOptions) {

    //Gets items from LS and converts strings to Js object
    let productInLocalStorage = JSON.parse(localStorage.getItem("Kanap"));
    //Selects DOM element to leave message when needed
    let message = document.querySelector('.item__content__addButton');
    const colorSelect = document.querySelector('#colors');
    

    //If the product isn't in the cart, add the product with his options
    if (productInLocalStorage === null) {
        productInLocalStorage= [];

        if (productOptions.quantity > 100 || productOptions.quantity < 1) {
            alert ("La quantit?? du produit ne doit pas d??passer 100 et ne peut pas ??tre inf??rieure ?? 0");
            location.reload();
        } else if (!colorSelect.value) {
            alert ("Veuillez choisir une couleur")
        } else {
            productInLocalStorage.push(productOptions);
            //converts Js objects to strings
            localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));
            //leaves a message when you add a product to the cart
            message.innerHTML = "Produit ajout?? au panier!";
        }
        

    } else {
        //Constant 'found' searches for a product in the cart this same id and color
        const found = productInLocalStorage.find(product => product.id == productOptions.id && product.color == productOptions.color);
        
        //If product with same id and color not found, add it
        if (found == undefined) {
    
            if (productOptions.quantity > 100 || productOptions.quantity < 1) {
            alert ("La quantit?? du produit ne doit pas d??passer 100 et ne peut pas ??tre inf??rieure ?? 0");
            location.reload();
            } else if (!colorSelect.value) {
                alert ("Veuillez choisir une couleur")  
            } else {
                productInLocalStorage.push(productOptions);
                //converts Js objects to strings
                localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));
                //leaves a message when you add a product to the cart
                message.innerHTML = "Produit ajout?? au panier!";
            }

    //If product with same id and color, just add quantity
    } else {
        if (productOptions.quantity > 100 || productOptions.quantity < 1 ) {
            alert ("La quantit?? du produit ne doit pas d??passer 100 et ne peut pas ??tre inf??rieure ?? 0");
            location.reload();
        } else if (!colorSelect.value) {
            alert ("Veuillez choisir une couleur")
        } else if (found.quantity + productOptions.quantity > 100) {
            alert ("Ce produit figure d??ja dans votre panier. Assurez vous que la quantit?? totale ne soit pas sup??rieure ?? 100");
        } else {
            //update quantity
            found.quantity += productOptions.quantity;
            //converts Js objects to strings
            localStorage.setItem("Kanap", JSON.stringify(productInLocalStorage));
            //leaves a message when you add a product to the cart
            message.innerHTML = "Produit ajout?? au panier. Attention ce produit figure d??ja dans votre panier";
        }
    }
}
}

//----------------------Cart----------------------//

//Getting the data of the products selected by the user
function getSelectedData () {
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
            color: colorSelect.value,
            quantity: Number(quantityChoice.value)
        }
        saveInLocalStorage(productOptions);
    })
}

getSelectedData ();


