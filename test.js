let categoriesContainer = document.querySelector(".categories");
let productsContainer = document.querySelector(".products");

let products = null;

let category = [];

function showAllProducts() {
  // 1. Create an XMLHttpRequest object

  let xhr = new XMLHttpRequest();
  // 3. Open the XMLHttpRequest object

  xhr.onload = function  () {
    console.log(`Ready state is at ${xhr.readyState}`);
    //  if(xhr.status === 200 && xhr.readyState === 4 ){
    const res = JSON.parse(xhr.responseText);
    products = res;

    //console.log(e);
    createCategory(products);

    for (let i = 0; i < products.length; i++) {
      displayProduct(products[i])
    }


    //}

    
  };

  xhr.open("GET", "https://fakestoreapi.com/products", true);
  xhr.send();

}
showAllProducts();


function createCategory(response) {
  const tempCat = [];
  //console.log(response);
  for (let i = 0; i < response.length; i++) {
    //console.log(category.includes(res[i].category))
    if (!tempCat.includes(response[i].category)) {
      tempCat.push(response[i].category);
    }
  }
  
  category = tempCat
  
  for (let i = 0; i < category.length; i++) {
    createCategory(category[i])
    
  }

}


function createCategory(categoryName)
{
  const catNavItem = document.createElement('li');

  const catItemBtn = document.createElement('button');
  catItemBtn.setAttribute('class', 'dropdown-item btn');
  catItemBtn.innerHTML = categoryName;

  catNavItem.appendChild(catItemBtn)

  categoriesContainer.appendChild(catNavItem);

}

function displayProduct(product)
{
    const productCotainer = document.createElement('div') // parent node
    productCotainer.setAttribute('id', `https://fakestoreapi.com/products/${product.id}`)

    productCotainer.setAttribute('class', 'card p-1')

    const productImg = document.createElement('img');
    
    productImg.setAttribute('src', product.image)
    productImg.setAttribute('class', 'card-img-top')

    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body d-flex flex-column gap-1')


    const productTitle = document.createElement('h5') // title 
    productTitle.setAttribute('class', 'product_view_title')
    productTitle.innerHTML = product.title;

    const productPrice = document.createElement('p')
    productPrice.innerHTML = "<strong>Price: </strong>" + product.price;


    const productShorInfo = document.createElement('p')
    productShorInfo.innerHTML = `<strong>Price: </strong> ${product.price} <br>
                                 <strong>Ratings: </strong> ${product.rating.rate} <br> 
                                 <strong>Rating Count: </strong>  ${product.rating.count}`;

    productShorInfo.setAttribute('class', 'mb-auto mt-auto')

    const productViewDetails = document.createElement('button');
    productViewDetails.setAttribute('class', 'btn btn-outline-secondary btn-sm');
    productViewDetails.innerHTML = 'View'
    
    productViewDetails.onclick = viewProductInfo

    productCotainer.appendChild(productImg)
    cardBody.appendChild(productTitle)
    cardBody.appendChild(productShorInfo)
    cardBody.appendChild(productViewDetails)
    productCotainer.appendChild(cardBody)
    productsContainer.appendChild(productCotainer)
}

function viewCategory(categoryKey)
{
  console.log(categoryKey)
}

function viewProductInfo(event)
{
  const cardBody = event.target.parentNode;
  const parentID = cardBody.parentNode.getAttribute('id');

  // open modal 
}