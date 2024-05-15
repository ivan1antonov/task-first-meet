<script>
  import { onMount } from 'svelte';
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from '/vite.svg';
  import Counter from './lib/Counter.svelte';
  let amount1 = 1;
  let amount2 = 1;
  let currency1 = 'USD';
  let currency2 = 'EUR';
  let rates = {};

  const getExchangeRates = async () => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`);
      const data = await response.json();
      rates = data.rates;
      convertFromFirst();
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
  };

  const convertFromFirst = () => {
    amount2 = (amount1 * rates[currency2]).toFixed(2);
  };

  const convertFromSecond = () => {
    amount1 = (amount2 / rates[currency2]).toFixed(2);
  };

  onMount(getExchangeRates);

  $: currency1, getExchangeRates();
</script>

<main>
  <h1>Currency Sber Converter</h1>
  <div>
    <input type="number" bind:value={amount1} on:input={convertFromFirst} />
    <select bind:value={currency1} on:change={getExchangeRates}>
      {#each Object.keys(rates) as rate}
        <option value={rate}>{rate}</option>
      {/each}
    </select>
  </div>
  <div>
    <input type="number" bind:value={amount2} on:input={convertFromSecond} />
    <select bind:value={currency2}>
      {#each Object.keys(rates) as rate}
        <option value={rate}>{rate}</option>
      {/each}
    </select>
  </div>
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
    color: #3e8936;
  }
  div {
    margin: 20px;
  }
  input, select {
    font-size: 1.2em;
    margin: 10px;
    padding: 10px 6px;
    border-radius: 10px;
    border: 0.1em solid #5d5f79;
  }
</style>
