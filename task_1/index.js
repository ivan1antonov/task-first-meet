import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decode(encoded, translations) {
  const excludeFields = ['groupId', 'service', 'formatSize', 'ca'];
  const uniqueIds = new Set();

  return encoded.map(item => {
      let newItem = {};
      for (let key in item) {
          if (excludeFields.includes(key)) {
              newItem[key] = item[key];
          } else if (key.endsWith('Id') && item[key] in translations) {
              uniqueIds.add(item[key]);
              newItem[key] = translations[item[key]];
          } else {
              newItem[key] = item[key];
          }
      }
      return newItem;
  }), Array.from(uniqueIds);
}

// console.log(decoded)
