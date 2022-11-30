//Function that displays order confirmation and order number
function orderConfirmation() {
    const id = (new URL(document.location)).searchParams.get("id");
document.getElementById("orderId").innerHTML = id;
}

orderConfirmation();


//Function that creats a div where a thanks message will be displays
function clientThanks() {
    const confirmationP = document.querySelector(".confirmation p");
    const newSpan = document.createElement("span");
    newSpan.innerHTML = "<br> Nous vous remercions pour votre commande!";
    newSpan.className = "customer's_thanks";
    confirmationP.appendChild(newSpan);
}

clientThanks();