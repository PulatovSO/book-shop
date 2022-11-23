import Data from './books.js';

/*=============== CREATE HEADER ===============*/
let bodyFr = document.createDocumentFragment(); // Fragment
let body = document.getElementsByTagName('body')[0]

let header = document.createElement('header');
header.classList.add('header');

let title = document.createElement('h1');
title.innerHTML = 'Book<span>Shop</span>';
title.classList.add('title');

let cartWrap = document.createElement('div');
cartWrap.classList.add('cart-wrap');

let cartBadge = document.createElement('span');
cartBadge.textContent = '0';

let cartBtn = document.createElement('button');
cartBtn.classList.add('cart-btn');
cartBtn.innerHTML = "<i class='bx bxs-shopping-bag-alt'></i>"

cartWrap.appendChild(cartBtn);
cartWrap.appendChild(cartBadge);
header.appendChild(title);
header.appendChild(cartWrap);
bodyFr.appendChild(header);


/*=============== CREATE CART ===============*/
let cart = document.createElement('div');
cart.classList.add('cart');
bodyFr.appendChild(cart);

let cartClose = document.createElement('button');
cartClose.innerHTML = "<i class='bx bx-x'></i>";
cartClose.classList.add('cart-close');
cart.appendChild(cartClose)

let cartList = document.createElement('ul');
cartList.classList.add('cart-list');
cart.appendChild(cartList);

let cartBottom = document.createElement('div');
cartBottom.classList.add('cart-bottom');

let cartTotal = document.createElement('span');
cartTotal.classList.add('cart-total');
cartTotal.textContent = 'Total: 0';

let cartOrderBtn = document.createElement('a');
cartOrderBtn.setAttribute('href', './assets/pages/delivery.html')
cartOrderBtn.setAttribute('target', '_blank')
cartOrderBtn.classList.add('cart-order-btn');
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
container.classList.add('container');

let bookList = document.createElement('ul');
bookList.classList.add('book-list');

let bookItem = document.createElement('li');
bookItem.classList.add('book-item');

container.appendChild(bookList);
body.appendChild(container)

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
        book.setAttribute('draggable', 'true');
        book.setAttribute('id',  `${item.id}`)
    booksfragment.appendChild(book)
})

bookList.appendChild(booksfragment)


/*=============== CREATE MODAL ===============*/
let modal = document.createElement('div');
modal.classList.add('modal');

let modalInner = document.createElement('div');
modalInner.classList.add('modal-inner');

let modalTop = document.createElement('div');
modalTop.classList.add('modal-top');

let modalTitle = document.createElement('h3');
modalTitle.classList.add('modal-title');
modalTitle.textContent = 'Description';

let closeBtn = document.createElement('button');
closeBtn.innerHTML = "<i class='bx bx-x'></i>";
closeBtn.classList.add('close-btn');

modalTop.appendChild(modalTitle)
modalTop.appendChild(closeBtn)
modalInner.appendChild(modalTop)
modal.appendChild(modalInner);
body.appendChild(modal);

// SHOW MODAL
let buttons = document.querySelectorAll('.book-btn');
let description = document.createElement('p');
description.className = 'description';
modalInner.appendChild(description);

buttons.forEach(card => card.addEventListener('click', (e) => {
    modal.style.display = 'block';

    Data.forEach(a => {
        if (a.id === +e.target.id) description.textContent = a.description
    })

    cart.style.right = '-400px';
}))

// CLOSE MODAL
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})


/*=============== DRAG & DROP TO CART ===============*/
let draggables = document.querySelectorAll('.book-item');
let dragging;

draggables.forEach(book => {
    book.addEventListener('dragstart', () => {
        cartWrap.classList.add('cart-drag');
        book.classList.add('dragging');
        cartList.classList.add('cart-dragover');
        dragging = book;
    })

    book.addEventListener('dragend', () => {
        cartWrap.classList.remove('cart-drag');
        cartWrap.classList.remove('cart-drag-over')
        cartList.classList.remove('cart-dragover');
        cartList.classList.remove('cartlist-drag-over')
    })
})

cartWrap.addEventListener('dragover', (e) => {
    e.preventDefault();
    cartWrap.classList.add('cart-drag-over');
})

cartWrap.addEventListener('dragleave', () => {
    cartWrap.classList.remove('cart-drag-over');
})

cart.addEventListener('dragover', (e) => {
    e.preventDefault();
    cartList.classList.add('cartlist-drag-over');
})

cart.addEventListener('dragleave', (e) => {
    e.preventDefault();
    cartList.classList.remove('cartlist-drag-over')
})

cartWrap.addEventListener('drop', (e) => {
    e.preventDefault();
    drop();
})

cart.addEventListener('drop', (e) => {
    e.preventDefault();
    drop();
})

function drop () {
    Data.forEach(item => {
        if(item.id == dragging.id) {
            let draggedItem = document.createElement('li');
            draggedItem.classList.add('cart-item');

            draggedItem.innerHTML = `
                <img src="${item.imageLink}" alt="book" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-author">${item.author}</p>
                </div>
                <span class="cart-item-price">$${item.price}</span>
                <button class="cart-item-remove">
                    <i class='bx bx-x'></i>
                </button>
            `
            draggedItem.setAttribute('id', `${item.id}`);
            draggedItem.setAttribute('data-price', `${item.price}`);
            cartList.appendChild(draggedItem)
            removeFromCart()
            sumPrice()
        }

    })
}


/*=============== ADD & REMOVE ITEMS FROM CART ===============*/
let cartData = [];
let cartFragment = document.createDocumentFragment()
let addBtn = document.querySelectorAll('.book-btn-cart');
let cartItem = document.createElement('li');
cartItem.classList.add('cart-item');

addBtn.forEach(a => {
    a.addEventListener('click', () => {
        for (let item of Data) {
            if (a.name == item.id) {
                cartData.push(item)
            }
        }

        addToCart(a)
        removeFromCart()
        sumPrice()

    })
})

// ADD TO CART
function addToCart (a) {
    let cartDataSet = [...new Set(cartData)];

    for (let item of cartDataSet) {
        if (a.name == item.id) {
            let book = cartItem.cloneNode(true);
            book.innerHTML = `
                <img src="${item.imageLink}" alt="book" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-author">${item.author}</p>
                </div>
                <span class="cart-item-price">$${item.price}</span>
                <button class="cart-item-remove">
                    <i class='bx bx-x'></i>
                </button>
            `
            book.setAttribute('id', `${item.id}`);
            book.setAttribute('data-price', `${item.price}`);
            cartFragment.appendChild(book);
        }
    }
    cartList.appendChild(cartFragment)
}

// REMOVE FROM CART
function removeFromCart () {
    let removeItems = document.querySelectorAll('.cart-item-remove');
    for(let item of removeItems) {
        item.addEventListener('click', () => {
            cartData = cartData.filter(a => a.id != item.parentElement.id)
            item.parentElement.remove()
            sumPrice()
        })
    }
}

// SUM TOTAL AMOUNT
function sumPrice() {
    let sum = 0;
    let selectedItems = document.querySelectorAll('.cart-item');

    for(let item of selectedItems) {
        sum += +item.dataset.price
    }

    cartTotal.textContent = `Total: $${sum}`

    cartBadge.textContent = `${
        Object.keys(selectedItems).length
    }`
}

/*=============== CREATE FOOTER ===============*/
let footer = document.createElement('footer');
footer.classList.add('footer');
footer.innerHTML = '<span class="footer-copy">&copy; Created by Pulatov</span>';
bodyFr.appendChild(footer);

body.appendChild(bodyFr);
