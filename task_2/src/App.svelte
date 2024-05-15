<script>
  import { onMount } from 'svelte';

  let fromCurrency = 'USD';
  let toCurrency = 'EUR';
  let amount = 1;
  let result = 0;
  let rates = {};
  let error = null;

  onMount(async () => {
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!res.ok) {
        throw new Error('in network was problem');
      }
      const data = await res.json();
      rates = data.rates;
    } catch (err) {
      error = err.message;
      console.error('Fetch error:', err);
    }
  });

  function convert() {
    if (rates[toCurrency] && rates[fromCurrency]) {
      result = (amount * rates[toCurrency]) / rates[fromCurrency];
    } else {
      result = NaN;
    }
  }
</script>
