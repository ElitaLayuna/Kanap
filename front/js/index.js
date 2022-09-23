
//Get the articles from the API
function getArticles() {
    fetch('http://localhost:3000/api/products')
    .then((response) => {
    return response.json()
  })
  .then(data => {
    for (let article in articles) {
        let items = document.getElementById("items");

        let productLink = document.createElement("a");
        items.appendChild(productLink);
        productLink.href = `product.html?id=${article._id}`;
        
        let sectionArticle = document.createElement("article");
        items.appendChild(sectionArticle);
        
        let productImg = document.createElement("img");
        sectionArticle.appendChild(productImg);
        productImg.src = article.imageUrl;
        productImg.alt = article.altTxt;

        let productName = document.createElement("h3");
        sectionArticle.appendChild(productName);
        productName.innerText = article.name;
        productName.className = "productName";

        let productDescription = document.createElement("p");
        sectionArticle.appendChild(productDescription);
        productDescription.innerText = article.description;
        productName.className = "productDescription";
}})

  .catch((error) => {
    console.error(error)
  })
}

getArticles();
