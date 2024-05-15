<script lang="ts">
  import { onMount, reactive } from 'svelte';
  import { currencyList } from './currencyList'; // Файл с массивом доступных валют

  let amountFrom = 0;
  let amountTo = 0;
  let currencyFrom = '';
  let currencyTo = '';
  let exchangeRate = null;

  async function fetchExchangeRate() {
    if (!currencyFrom || !currencyTo) return;

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`);
    const data = await response.json();
    
    exchangeRate = data.rates[currencyTo];
    amountTo = (amountFrom * exchangeRate).toFixed(2);
  }

  $: fetchExchangeRate();
</script>

<div>
  <div>
    <input type="number" bind:value={amountFrom} on:input={fetchExchangeRate}>
    <select bind:value={currencyFrom} on:change={fetchExchangeRate}>
      <option value="">Выберите валюту</option>
      {#each currencyList as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
  </div>
  <div>
    <input type="number" readonly bind:value={amountTo}>
    <select bind:value={currencyTo} on:change={fetchExchangeRate}>
      <option value="">Выберите валюту</option>
      {#each currencyList as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
  </div>
</div>
