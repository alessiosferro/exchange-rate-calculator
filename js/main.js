class App {
  apiUrl = 'https://api.exchangerate-api.com/v4/latest';

  constructor() {
    // HTMLSelectElement
    this.fromCurrencyElement = document.getElementById('currency-one');
    this.toCurrencyElement = document.getElementById('currency-two');

    // HTMLInputElement
    this.fromAmountElement = document.getElementById('amount-one');
    this.toAmountElement = document.getElementById('amount-two');

    // HTMLDivElement
    this.rateElement = document.getElementById('rate');

    // HTMLButtonElement
    this.swapElement = document.getElementById('swap');

    this.addEventListeners();
  }

  addEventListeners() {
    this.fromCurrencyElement.addEventListener('change', () => this.calcRate());
    this.toCurrencyElement.addEventListener('change', () => this.calcRate());
    this.fromAmountElement.addEventListener('input', () => this.calcRate());
    this.toAmountElement.addEventListener('input', () => this.calcRate());
    this.swapElement.addEventListener('click', () => this.swap());
  }

  calcRate() {
    let fromCurrency = this.fromCurrencyElement.value;
    let toCurrency = this.toCurrencyElement.value;

    fetch(`${this.apiUrl}/${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        let rate = data.rates[toCurrency];

        this.rateElement.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;

        this.toAmountElement.value = (
          this.fromAmountElement.value * rate
        ).toFixed(2);
      });
  }

  swap() {
    let temp = this.fromCurrencyElement.value;
    this.fromCurrencyElement.value = this.toCurrencyElement.value;
    this.toCurrencyElement.value = temp;

    this.calcRate();
  }
}

new App();
