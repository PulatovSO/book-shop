let form = document.getElementById('form');
let inputs = document.querySelectorAll('.input');
let info = document.querySelector('.info');
let nameInput = document.querySelectorAll('.name');
let addressInput = document.querySelectorAll('.address');
let completeBtn = document.querySelector('.complete');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let infoAddress = document.createElement('p');
    infoAddress.classList.add('info-inner');
    infoAddress.innerHTML = '<span class="info-title">The delivery address: </span>';

    let infoCustomer = document.createElement('p');
    infoCustomer.classList.add('info-inner');
    infoCustomer.innerHTML = '<span class="info-title">Customer: </span>'

    nameInput.forEach(input => {
        infoCustomer.innerHTML += `<span class="info-value">${input.value} </span>`;
    })

    addressInput.forEach(input => {
        infoAddress.innerHTML += `<span class="info-value">${input.value}. </span>`;
    })

    info.appendChild(infoCustomer);
    info.appendChild(infoAddress);

    inputs.forEach(input => {
        input.value = '';
    })

    info.style.top = '20px';

    setTimeout(() => {
        infoCustomer.innerHTML = '';
        infoAddress.innerHTML = '';
        info.style.top = '-200px';
    }, 5000);

    btnDisable();
})


inputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        e.target.style.border = '1px solid #577b7e';
    })

    input.addEventListener('blur', (e) => {
        let value = e.target.value;

        if (input.id == 'firstname' && value.length < 4) {
            invalid(input);
            btnDisable();
        } else if ((input.id == 'lastname' && value.length < 5) || (input.id == 'street' && value.length < 5)) {
            invalid(input);
            btnDisable();
        } else if ((input.id == 'house' && value <= 0) || (input.id == 'flat' && value <= 0)) {
            invalid(input);
            btnDisable();
        } else if (value.length <= 0) {
            invalid(input);
            btnDisable();
        } else {
            valid(input);
            btnEnable();
        }
    })
})

let dataInput = document.getElementById('date');
dataInput.addEventListener('blur', (e) => {
    let currentDate = new Date();
    let now = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}`
    let inputValue = e.target.value.split('-').join('');

    if (+inputValue >= +now) valid();
    else invalid(dataInput);
})

// check if name contains number
let userName = document.querySelectorAll('.name')
userName.forEach(name => {
    name.addEventListener('blur', () => {
        if (/\d/.test(name.value)) {
            invalid(name)
        }
    })
})

function invalid (input) {
    input.style.border = '1px solid red';
    input.previousElementSibling.style.display = 'block';
    completeBtn.setAttribute('disabled', 'true');
    completeBtn.style.opacity = '0.5';
    input.classList.add('invalid');
    input.classList.remove('valid');
}

function valid (input) {
    input.style.border = '1px solid #577b7e';
    input.previousElementSibling.style.display = 'none';
    input.classList.add('valid');
    input.classList.remove('invalid');
}

function btnDisable () {
    completeBtn.style.opacity = '0.5';
    completeBtn.setAttribute('disabled', 'true');
}

function btnEnable () {
    completeBtn.style.opacity = '1';
    completeBtn.removeAttribute('disabled');
}



inputs.forEach(a => {
    a.addEventListener('blur', () => {
        for(let item of inputs) {
            if(item.classList.contains('invalid') || item.value == '') {
                btnDisable()
                break;
            } else {
                btnEnable()
            }
        }
    })
})
