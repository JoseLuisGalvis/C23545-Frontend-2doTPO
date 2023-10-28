const nameUser = document.querySelector('#name');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const count = document.querySelector('#count');
const countSummary = document.querySelector('#count-summary');
const category = document.querySelector('#category');
const btnClear = document.querySelector('#btn-clear');
const btnSend = document.querySelector('#btn-send');

const valueTicket = 200;
const percentageDiscount = {
    student: 80,
    trainee: 50,
    junior: 15
};

const enableBtnSend = () => {
    const inputs = Array.from(document.querySelectorAll('input'));
    const allInputsHaveValue = inputs.every(input => input.value.length >= 1);

    allInputsHaveValue
        ? btnSend.removeAttribute('disabled')
        : btnSend.setAttribute('disabled', true);
}

const handleChange = () => {
    const isDisableBtnClear = btnClear.hasAttribute('disabled');
    if(isDisableBtnClear) btnClear.removeAttribute('disabled');

    enableBtnSend();
}

const clearForm = (event) => {
    event.preventDefault();

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => { input.value = '' });

    btnClear.setAttribute('disabled', true);
    btnSend.setAttribute('disabled', true);
    countSummary.innerHTML = ''
};

const getSummary = (event) => {
    event.preventDefault();

    const totalDiscount = (valueTicket * percentageDiscount[category.value]) / 100;
    const totalValue = count.value * valueTicket;
    const fianlValue = totalValue -totalDiscount;
    
    const alertSummary = `
        <p class="alert alert-primary w-100">Total a pagar: $ ${fianlValue}</p>
    `;

    countSummary.innerHTML = alertSummary;
}

nameUser.addEventListener('change', handleChange);
lastName.addEventListener('change', handleChange);
email.addEventListener('change', handleChange);
count.addEventListener('change', handleChange);
category.addEventListener('change', handleChange);

btnClear.addEventListener('click', clearForm);
btnSend.addEventListener('click', getSummary)
