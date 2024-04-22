import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)


function decode(data) {
  const decodedData = [];

  const uniqueIds = new Set();

  data.forEach(item => {
    const decodedItem = {};

    for (const key in item) {
      if (key.endsWith('Id')) {
        const id = item[key];
        const decodedValue = translations[id] || id;

        decodedItem[key.slice(0, -2)] = decodedValue; // Убираем суффикс 'Id' из ключа
        uniqueIds.add(id);
      } else if (key === 'groupId' || key === 'service' || key === 'formatSize' || key === 'ca') {
        decodedItem[key] = item[key];
      }
    }

    decodedData.push(decodedItem);
  });

  return { decodedData, uniqueIds: [...uniqueIds] };
}

const { decodedData, uniqueIds } = decode(encoded);
console.log('Расшифрованные данные:', decodedData);
console.log('Уникальные id:', uniqueIds);

