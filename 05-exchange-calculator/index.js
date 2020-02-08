const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');

const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (rate * amountEl_one.value).toFixed(2);
    })
}

// event listener
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);

swapBtn.addEventListener('click', () => {
  let el = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = el;

  calculate();
});

calculate();
