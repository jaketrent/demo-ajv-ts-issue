import Ajv, { JTDDataType } from "ajv/dist/jtd";

const ajv = new Ajv();

// uncomment each case to try it out in turn
console.log("Uncomment a test case in src/main.ts");

//
// Case #1 - define my own TS interface
// tsc works, keeps me from 2 coding errors
// interface Person {
//   name: string;
// }

// const p1: Person = { name: "Alice", age: 32 };

// tsc err:
// src/main.ts:9:37 - error TS2353: Object literal may only specify known properties, and 'age' does not exist in type 'Person'.
// 9 const p1: Person = { name: "Alice", age: 32 };

// console.log("Does a person have an age?", p1.age);
// src/main.ts:27:46 - error TS2339: Property 'age' does not exist on type 'Person'.
// 27 console.log("Does a person have an age?", p1.age);

//
// Case #2 - assign unknown json to a TS interface, as in a network request
// tsc doesn't know any better at build time. No type error, no help.
// interface Person {
//   name: string;
// }

// const p1: Person = { name: "Alice", age: 32 } as any;

//
// Case #3 - runtime validation with ajv, still my own TS interface
// Hence the need for runtime data validation
// And why we'd want to use additionalProperties: true
// interface Person {
//   name: string;
// }

// const p1: Person = { name: "Alice", age: 32 } as any;

// const personSchema = {
//   additionalProperties: true,
//   properties: {
//     name: { type: "string" },
//   },
// } as const;

// const validate = ajv.compile<Person>(personSchema);
// if (validate(p1)) {
//   console.log("Person is valid", p1);
// } else {
//   console.log("Person is invalid", validate.errors);
// }

//
// Case #4 - runtime validation, use ajv-specified TS interface
// Where the build-time errors from Case #1 are not caught any more

// const personSchema = {
//   additionalProperties: true,
//   properties: {
//     name: { type: "string" },
//   },
// } as const;
// type Person = JTDDataType<typeof personSchema>;

// const p1: Person = { name: "Alice", age: 32 } as any;

// const validate = ajv.compile<Person>(personSchema);
// if (validate(p1)) {
//   console.log("Person is valid", p1);
// } else {
//   console.log("Person is invalid", validate.errors);
// }

// // no 'may only specify known properties' error
// const p2: Person = { name: "Alice", age: 32 }

// // no 'property does not exist on type' error
// console.log("Does a person have an age?", p2.age);

//
// Case #5 - same as #4, but additionalProperties: false
// Not valid any more, but good to have our tsc errors back

// const personSchema = {
//   additionalProperties: false,
//   properties: {
//     name: { type: "string" },
//   },
// } as const;
// type Person = JTDDataType<typeof personSchema>;

// const p1: Person = { name: "Alice", age: 32 } as any;

// const validate = ajv.compile<Person>(personSchema);
// if (validate(p1)) {
//   console.log("Person is valid", p1);
// } else {
//   console.log("Person is invalid", validate.errors);
// }

// // error is back
// // const p2: Person = { name: "Alice", age: 32 };

// // error is back
// // console.log("Does a person have an age?", p2.age);
