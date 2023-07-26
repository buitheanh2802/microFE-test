import chunk from "lodash";
// import { parserDate } from "./modules/parser";

const person = {
    name: "Bui The Anh",
    age: 20,
    descriptions: "Hello i am Bui The Anh"
}

const configurations = () => {
    // console.log(process.env.NODE_ENV);
    console.log(person);
    console.log(chunk);
    // console.log(parserDate);
}

configurations();

export default configurations;