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

body.appendChild(bodyFr);
