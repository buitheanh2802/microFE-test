const parse = require('./modules/parse')
// import parse from './modules/parse';

const person = {
    name: 'Bui The Anh',
    age: 23,
    descriptions: 'hello i am bui the anh'
}

const configurations = () => {
    console.log('hello rollup');
    console.log(person);
    console.log(parse);
}

console.log(configurations);

export default configurations;