console.log('hello world!');
let inputValue = 0;
let people = 0;
let tipPercent = 0;

const inputAmount = document.querySelector('#inputamount');
const tipAmount = document.querySelector('#tipAmount');
const total = document.querySelector('#total');
const peopleNumber = document.querySelector('#people');
const reset = document.querySelector('#reset');
const tipAmounts = document.querySelectorAll('.btn');
const custom = document.querySelector('#custom');

function customTip() {
    custom.addEventListener('click', function () {
        custom.value = '';
    })
    custom.addEventListener('input', function () {
        tipPercent = custom.value;
        render();
        console.log(tipPercent);
    })
};
tipAmounts.forEach((btn) => {
    btn.addEventListener('click', function (e) {
        tipAmounts.forEach((btn) => {
            btn.classList.remove('activeBtn');
            tipPercent = 0;
        });
        e.target.classList.add('activeBtn');
        if (e.target.id === 'custom') {
            // sort out a get custom function here
            customTip();
            render();
        } else {
            tipPercent = e.target.id;
            render();
        }
        console.log(tipPercent)
    })
});


peopleNumber.addEventListener('input', function () {
    render();
});

inputAmount.addEventListener('input', function () {
    render();
});

// Need to add tip as parameter here
function generateTip(total, tip, people) {
    if (tipPercent === 0) {
        return parseFloat(Number(total / people).toFixed(2));
    } else {
        return parseFloat(Number((total + (total * (tip / 100))) / people).toFixed(2));
    }
};

function render() {
    inputValue = inputAmount.value;
    people = peopleNumber.value;
    if (peopleNumber.value === '') {
        total.textContent = `$${inputValue}`;
    } else {
        total.textContent = `$${generateTip(inputValue, tipPercent, people)}`;
    }
};

reset.addEventListener('click', () => {
    custom.value = '';
    inputAmount.value = '';
    peopleNumber.value = '';
    total.textContent = '$0.00';
    tipAmounts.forEach((btn) => {
        btn.classList.remove('activeBtn');
        tipPercent = 0;
    });
});
