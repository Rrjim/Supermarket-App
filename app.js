// Define UI Vars

const form = document.querySelector('#product-form');
const productList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-products');
const filter = document.querySelector('#filter');
const productInput = document.querySelector('#product');

// Load all event listeners

loadEventListeners();

// Load all event listeners
function loadEventListeners() {

    // DOM load event
    document.addEventListener('DOMContentLoaded', getProducts);

    // Add product event
    form.addEventListener('submit', addProduct);

    // Remove product event
    productList.addEventListener('click', removeProduct);

    // Clear product event
    clearBtn.addEventListener('click', clearProducts);

    // Filter products event
    filter.addEventListener('keyup', filterProducts);


}

// Emfanise sti selida kathe proion pou uparxei hdh sto sustima
function getProducts() {
    let products;
    if (localStorage.getItem('products') === null) {
        products === [];
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.forEach(function(product) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(product));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        productList.appendChild(li);
    });
}

function addProduct(e) {
    if (productInput.value === '') {
        alert('Enter a product')
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(productInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    productList.appendChild(li);

    storeProductInLocalStorage(productInput.value);


    productInput.value = '';
    e.preventDefault();

}

function storeProductInLocalStorage(product) {
    let products;
    if (localStorage.getItem('products') === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.push(product);

    localStorage.setItem('products', JSON.stringify(products));
}

function removeProduct(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeProductsFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

}

function removeProductsFromLocalStorage(productItem) {
    let products;
    if (localStorage.getItem('products') === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.forEach(function(product, index) {
        if (productItem.textContent === product) {
            products.splice(index, 1);
        }
    });

    localStorage.setItem('products', JSON.stringify(products));
}

function clearProducts() {
    //  productList.innerHTML = '';
    // If you want to do it faster then do the following

    while (productList.firstChild) {
        productList.removeChild(productList.firstChild);
    }

    // Clear from LS
    clearProductsFromLocalStorage();
}

function clearProductsFromLocalStorage() {
    localStorage.clear();
}


function filterProducts(e) {
    // keimeno pou pairnei oti grafw sto input
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(product) {
        // me forEach psaxnoume ola ta uparxonta products
        // item einai to keimeno pou exei to kathe product pou uparxei mesa sti lista
        const item = product.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });

}