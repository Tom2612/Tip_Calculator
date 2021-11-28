const inputAmount = document.querySelector('#inputamount');
const tipAmount = document.querySelector('#tipAmount');
const total = document.querySelector('#total');
const peopleNumber = document.querySelector('#people');
const reset = document.querySelector('#reset');
const tipBtns = document.querySelectorAll('.btn');
const customTipBtn = document.querySelector('#custom');

let tipPercent = 0;
let billTotal = 1;
let inputPeople = 1;

let tipValues = {
    '5': 0.05,
    '10': 0.1,
    '15': 0.15,
    '25': 0.25,
    '50': 0.5
};

reset.addEventListener('click', function () {
    inputAmount.value = '';
    peopleNumber.value = '';
    clearCustomDisplay();
    tipBtns.forEach(btn => btn.classList.remove('activeBtn'));
    total.textContent = '£0.00';
    tipAmount.textContent = '£0.00';
    tipPercent = 0;
    billTotal = 1;
    inputPeople = 1;
});

inputAmount.addEventListener('click', function () {
    inputAmount.value = '';
})
inputAmount.addEventListener('input', function () {
    billTotal = inputAmount.value;
    console.log(billTotal);
    renderDisplays();
    renderTotal();
});
peopleNumber.addEventListener('click', function () {
    peopleNumber.value = '';
});
peopleNumber.addEventListener('input', function () {
    inputPeople = peopleNumber.value;
    console.log(inputPeople);
    renderDisplays();
    renderTotal();
});

tipBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        clearCustomDisplay();
        tipPercent = btn.id;
        tipBtns.forEach(btn => btn.classList.remove('activeBtn'));
        btn.classList.add('activeBtn');
        renderDisplays();
        renderTotal();
    })
});

customTipBtn.addEventListener('click', function () {
    clearCustomDisplay();
    tipBtns.forEach(btn => btn.classList.remove('activeBtn'));
});
customTipBtn.addEventListener('input', function () {
    tipPercent = customTipBtn.value / 100;
    console.log(tipPercent);
    renderDisplays();
    renderTotal();
});

function clearCustomDisplay() {
    customTipBtn.value = '';
};

function generateTipPerPerson(input, tip, people) {
    console.log(input, tip, people)
    if (tipValues[tip] == undefined && tipPercent == 0) {
        return input / people;
    } else if (tipValues[tip] == undefined && tipPercent !== 0) {
        return (input * tipPercent) / people;
    } else {
        return (input * tipValues[tip]) / people;
    }
};

function generateTotalPerPerson(input, tip, people) {
    console.log(input, tip, people)
    if (tipValues[tip] === undefined && tipPercent === 0) {
        return (input / people);
    } else if (tipValues[tip] === undefined && tipPercent !== 0) {
        return (parseFloat(Number(input)) + (input * tipPercent)) / people;
    } else {
        return (parseFloat(Number(input)) + (input * tipValues[tip])) / people;
    }
};

function renderDisplays() {
    tipAmount.textContent = `£${generateTipPerPerson(billTotal, tipPercent, inputPeople).toFixed(2)}`;
};
function renderTotal() {
    total.textContent = `£${generateTotalPerPerson(billTotal, tipPercent, inputPeople).toFixed(2)}`;
};

