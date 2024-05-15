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

<main>
  <h1>Sber Currency Converter</h1>
  {#if error}
    <p>Error: {error}</p>
  {/if}
  <input type="number" bind:value={amount} min="1" />
  <select bind:value={fromCurrency}>
    {#each Object.keys(rates) as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
  <select bind:value={toCurrency}>
    {#each Object.keys(rates) as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
  <button on:click={convert}>Convert</button>
  <p>{amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}</p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    color: #3e8936;
  }
  input, select {
    margin: 0.5em;
    padding: 10px 6px;
    border-radius: 10px;
    border: 0.2em solid #5d5f79;
  }
</style>
