console.log('hi');
const query = new URLSearchParams(window.location.search);

let token = query.get('code');

console.log(`Your token is ${token}`);

const store = window.localStorage;

store.setItem('azure-token', token);