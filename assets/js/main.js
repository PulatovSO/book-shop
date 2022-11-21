import Data from './books.js';

/*=============== CREATE HEADER ===============*/
let bodyFr = document.createDocumentFragment();
let body = document.getElementsByTagName('body')[0]

let header = document.createElement('header');
header.className = 'header';

let title = document.createElement('h1');
title.innerHTML = 'Book<span>Shop</span>';
title.className = 'title';

let cartWrap = document.createElement('div');
cartWrap.className = 'cart-wrap';

let cartBadge = document.createElement('span');
cartBadge.textContent = '0';

let cartBtn = document.createElement('button');
cartBtn.className = 'cart-btn';
cartBtn.innerHTML = "<i class='bx bxs-shopping-bag-alt'></i>"

cartWrap.appendChild(cartBtn);
cartWrap.appendChild(cartBadge);
header.appendChild(title);
header.appendChild(cartWrap);
bodyFr.appendChild(header);


/*=============== CREATE CART ===============*/
let cart = document.createElement('div');
cart.className = 'cart';
bodyFr.appendChild(cart);

let cartClose = document.createElement('button');
cartClose.innerHTML = "<i class='bx bx-x'></i>";
cartClose.className = 'cart-close';
cart.appendChild(cartClose)

let cartList = document.createElement('ul');
cartList.className = 'cart-list';
cart.appendChild(cartList);

let cartBottom = document.createElement('div');
cartBottom.className = 'cart-bottom';

let cartTotal = document.createElement('span');
cartTotal.className = 'cart-total';
cartTotal.textContent = 'Total: 0';

let cartOrderBtn = document.createElement('a');
cartOrderBtn.setAttribute('href', './assets/pages/delivery.html')
cartOrderBtn.setAttribute('target', '_blank')
cartOrderBtn.className = 'cart-order-btn';
cartOrderBtn.textContent = 'Confirm order';

cartBottom.appendChild(cartTotal);
cartBottom.appendChild(cartOrderBtn);
cart.appendChild(cartBottom);

// CART SHOW & HIDE
cartBtn.addEventListener('click', () => {
    cart.style.right = '0';
})

cartClose.addEventListener('click', () => {
    cart.style.right = '-430px';
})


/*=============== CREATE CONTAINER & BOOKLIST ===============*/
let container = document.createElement('div');
container.className = 'container';

let bookList = document.createElement('ul');
bookList.className = 'book-list';

let bookItem = document.createElement('li');
bookItem.className = 'book-item';

container.appendChild(bookList);
bodyFr.appendChild(container)

//  BOOKS FRAGMENT
let booksfragment = document.createDocumentFragment()


Data.forEach(item => {
    let book = bookItem.cloneNode(true)
        book.innerHTML = `
            <img src="${item.imageLink}" alt="book" class="book-image">
            <h3 class="book-title">${item.title}</h3>
            <p class="book-author">${item.author}</p>
            <span class="book-price">Price: $${item.price}</span>
            <button name="${item.id}" class="book-btn-cart">
                <i class='bx bxs-cart-alt'></i>
            </button>
            <button id="${item.id}" class="book-btn">Show more..</button>
        `
    booksfragment.appendChild(book)
})

bookList.appendChild(booksfragment)


/*=============== CREATE FOOTER ===============*/
let footer = document.createElement('footer');
footer.className = 'footer';
footer.innerHTML = '<span class="footer-copy">&copy; Created by Pulatoff</span>';
bodyFr.appendChild(footer);

body.appendChild(bodyFr);
