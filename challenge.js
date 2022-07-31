'use strict';
// console.log(Number.isInteger(23.2));
// console.log(Number.isFinite(Number.parseFloat('23.5x')));
// console.log(Math.sqrt(24));
// console.log(125 ** (1 / 3));

// function calc(num, x) {
//   return num ** (1 / x);
// }

// console.log(calc(64, 2));
// console.log(Math.PI * Number.parseInt('10px') ** 2);

// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;
// console.log(+(3.278).toFixed(2));
// console.log((2.789).toFixed(2));
// console.log(20 == '20');
// const time = new Date();
// console.log(time.getTime());
// console.log(new Date(1655744697490));
// console.log(new Date(1980, 6, 19));
// console.log(randomInt(0, 6));

// console.log(new Date('2019-11-01T13:15:33.035Z'));
const t = new Date(2022, 7, 19, 22, 10);
// console.log(t);
// console.log(new Date(1660932600000));
const m = new Date(2022, 6, 21, 17, 10);
// console.log(Math.floor((t - m) / 1000 / 60 / 60 / 24));
// console.log(154 % 24);

// console.log(Math.abs(new Date() - m) / 1000 / 60 / 60 / 24);
const options = {
  style: 'percent',
  unit: 'mile-per-hour',
};
const num = new Intl.NumberFormat('en-GB', options).format(123654987);
// console.log(num);

/* setInterval(() => {
  const now = new Date();
  const [hour, minute, second] = [
    `${now.getHours()}`.padStart(2, 0),
    `${now.getMinutes()}`.padStart(2, 0),
    `${now.getSeconds()}`.padStart(2, 0),
  ];
  console.log(`${hour}:${minute}:${second}`);
}, 1000 * 60); */

const d = new Intl.DateTimeFormat('en-GB', options).format(125);
// console.log(d);

/* const calcTime = function (num) {
  const minutes = Math.floor(num / 60);
  const seconds = num % 60;
  console.log(`${minutes}min ${seconds}sec`);
};

calcTime(125); */

let numb = 10;
// numb--;
console.log(numb--);
