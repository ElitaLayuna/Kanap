
//Gets the articles from the API with fetch
function getArticles() {
     fetch('http://localhost:3000/api/products')
    .then((response) => {
    return response.json()
  })
  .then(data => {
    for (let article of data) {

        //Get an HTML element by ID - items section 
        let items = document.getElementById("items");

        //Creates HTML a element and affects each product's link
        let productLink = document.createElement("a");
        items.appendChild(productLink);
        productLink.href = `product.html?id=${article._id}`;
        
        //Creates HTML article element 
        let sectionArticle = document.createElement("article");
        productLink.appendChild(sectionArticle);
        
        //Creates HTML img element and affects each product's img 
        let productImg = document.createElement("img");
        sectionArticle.appendChild(productImg);
        productImg.src = article.imageUrl;
        productImg.alt = article.altTxt;

        //Creates HTML a element and affects each product's link
        let productName = document.createElement("h3");
        sectionArticle.appendChild(productName);
        productName.innerText = article.name;
        productName.className = "productName";

        //Creates HTML p element and affects each product's description
        let productDescription = document.createElement("p");
        sectionArticle.appendChild(productDescription);
        productDescription.innerText = article.description;
        productName.className = "productDescription";
}})

  //In case of error, leaves a message
  .catch((error) => {
    console.error(error)
    items.innerHTML =
      "Nous n'avons pas réussi à afficher nos produits. Assurez vous d'avoir lancé le serveur local (Port 3000) <br> Tentez d'actualiser la page. Si le problème persiste, n'hesitez pas à nous contactez.";
  })
}

getArticles();
