const nameUser = document.querySelector('#name');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const count = document.querySelector('#count');
const countSummary = document.querySelector('#count-summary');
const category = document.querySelector('#category');
const btnClear = document.querySelector('#btn-clear');
const btnSend = document.querySelector('#btn-send');
const form = document.querySelector('#form_resumen');



const valueTicket = 200;
const percentageDiscount = {
    student: 80,
    trainee: 50,
    junior: 15
};

const enableBtnSend = () => {
    const inputs = Array.from(document.querySelectorAll('input'));
    const allInputsHaveValue = inputs.every(input => input.value.length >= 1);
    console.log(inputs);
    allInputsHaveValue
        ? btnSend.removeAttribute('disabled')
        : btnSend.setAttribute('disabled', true);
}

const handleChange = (parm) => {
    parm.preventDefault();
    const isDisableBtnClear = btnClear.hasAttribute('disabled');
    if(isDisableBtnClear) btnClear.removeAttribute('disabled');
    //agrego control formato email
    if (parm.target.id==='email'){   
        const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
	
	    if ( !validEmail.test(parm.target.value) ){
		   // alert('El Email ingresado es inválido');
           const alertSummary = `
                <p class="alert alert-danger w-100">El Email ingresado es inválido</p>`;
       
            countSummary.innerHTML = alertSummary;            
                
            email.value='';            
            email.focus();
            enableBtnSend();
		    return ;
	    }
    }
    //valido campo cantidad
    if (parm.target.id==='count'){    
        //evaluo q sea numero ()
        if (isNaN(parm.target.value)||parm.target.value.length==0||!Number.isInteger(parseFloat(parm.target.value))) {            
            //alert('La cantidad debe ser un numero entero entre 1 y 10');            
            const alertSummary = `
                <p class="alert alert-danger w-100">La cantidad debe ser un numero entero entre 1 y 10</p>`;
            countSummary.innerHTML = alertSummary;
            count.value='1';            
            count.focus();
            enableBtnSend();
		    return ;
        }
	    if ( parseInt(parm.target.value)<=0 || parseInt(parm.target.value)>10){
            if (parseInt(parm.target.value)<=0){
		       // alert('La cantidad debe ser mínimo 1');
                const alertSummary = `
                    <p class="alert alert-danger w-100">La cantidad debe ser mínimo 1</p>`;
                countSummary.innerHTML = alertSummary;
                count.value='1';            
            }
            if (parseInt(parm.target.value)>10){
		      //  alert('La cantidad debe ser como máximo 10');
                const alertSummary = `
                    <p class="alert alert-danger w-100">La cantidad debe ser como máximo 10</p>`;                
                countSummary.innerHTML = alertSummary;
                count.value='10';            
            }
            count.focus();            
            enableBtnSend();
		    return ;
	    }
    }
    enableBtnSend();
    countSummary.innerHTML = ''
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
    //alert(`Felicidades ${nameUser.value.toUpperCase() } ${lastName.value.toUpperCase()}, está por adquirir ${count.value} tickets categoria ${category.options[category.selectedIndex].text.toUpperCase()}`);
    const alertSummary = `
        <p class="alert alert-success w-100">Felicidades ${nameUser.value.toUpperCase() } ${lastName.value.toUpperCase()}, está por adquirir ${count.value} tickets categoria ${category.options[category.selectedIndex].text.toUpperCase()}
        <br>Total a pagar: $ ${fianlValue} 
        </p>
    `;

    countSummary.innerHTML = alertSummary;
}

nameUser.addEventListener('change', handleChange);
lastName.addEventListener('change', handleChange);
email.addEventListener('change', handleChange);
//count.addEventListener('change', handleChange,count.id);
count.addEventListener('change', handleChange);
category.addEventListener('change', handleChange);

btnClear.addEventListener('click', clearForm);
btnSend.addEventListener('click', getSummary)
form.addEventListener('submit', function() { return false; })
//form.addEventListener.submit(function() { return false; });
