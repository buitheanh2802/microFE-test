import _ from "lodash";

const person = {
    name: "Bui The Anh",
    age: 20,
    descriptions: "Hello i am Bui The Anh"
}

const configurations = () => {
    // console.log(process.env.NODE_ENV);
    console.log(person);
    console.log(_);
    // console.log(initSlides);
}

configurations();

export default configurations;