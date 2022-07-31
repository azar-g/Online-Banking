'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-06-17T17:01:17.194Z',
    '2022-06-19T23:36:17.929Z',
    '2022-06-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2022-06-19T18:49:59.371Z',
    '2022-06-20T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const times = new Date('2019-11-01T13:15:33.035Z');
// console.log(times.getMonth());
// console.log(times.getDate());
// console.log(times.getFullYear());

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
// const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const labelDate = document.querySelector('.date');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const logo = document.querySelector('.logo');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayTime = function (acc, i) {
  let time;
  const today = new Date();
  const movDate = new Date(acc.movementsDates[i]);
  const passedTime = Math.floor(
    Math.abs(today - movDate) / 1000 / 60 / 60 / 24
  );

  let [day, month, year] = [
    `${movDate.getDate()}`.padStart(2, 0),
    `${movDate.getMonth() + 1}`.padStart(2, 0),
    `${movDate.getFullYear()}`,
  ];
  const intlDate = new Intl.DateTimeFormat('en-GB').format(movDate);

  if (passedTime === 0) {
    time = `Today`;
  }
  if (passedTime === 1) {
    time = 'Yesterday';
  }
  if (passedTime > 1 && passedTime < 5) {
    time = `${passedTime} days ago`;
  }
  if (passedTime >= 5) {
    // time = `${day}/${month}/${year}`;
    time = intlDate;
  }

  return time;
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const time = displayTime(currentAccount, i);
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${time}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const NumberFormat = (acc, value) =>
  Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(value);

/* const calcTime = function (num) {
  const minutes = Math.floor(num / 60);
  const seconds = num % 60;
  return `${minutes}min ${seconds}sec`;
};
 */

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = `${NumberFormat(
    currentAccount,
    currentAccount.balance
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = NumberFormat(currentAccount, incomes);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = NumberFormat(currentAccount, Math.abs(out));

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = NumberFormat(currentAccount, interest);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
////////// TIMER Setting
const timerSet = () => {
  let num = 240;

  const calcTime = () => {
    let minutes = Math.floor(num / 60);
    let seconds = num % 60;

    labelTimer.textContent = `${String(minutes).padStart(2, 0)}min ${String(
      seconds
    ).padStart(2, 0)}sec`;
    if (num === 0) {
      clearInterval(timer);
      currentAccount = undefined;
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
    num--;
  };
  calcTime();
  const timer = setInterval(calcTime, 1000);
  return timer;
};
///////////////////////////////////////
// EVENT HANDLERS//////////////////
let currentAccount, setTimer;

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    /////////////////DATE CORRECTION//////////////////

    labelDate.innerHTML = '';

    const nowTime = new Intl.DateTimeFormat('en-GB').format(new Date());
    // const nowTime = new Date();
    // const [day, month, year] = [
    //   `${nowTime.getDate()}`.padStart(2, 0),
    //   `${nowTime.getMonth() + 1}`.padStart(2, 0),
    //   `${nowTime.getFullYear()}`,
    // ];

    // const htmlDate = `<span class="date">${month}/${day}/${year}</span>`;
    const htmlDate = `<span class="date">${nowTime}</span>`;

    labelDate.insertAdjacentHTML('afterbegin', htmlDate);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    /////Setting TIMER
    clearInterval(setTimer);
    setTimer = timerSet();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toDateString());
    clearInterval(setTimer);
    setTimer = timerSet();

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement

    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      clearInterval(setTimer);
      setTimer = timerSet();

      // Update UI
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// console.log(Number.parseInt('50eur'));
// console.log(Number.parseFloat('25.5 dollars'));
// console.log(parseInt('25.5 dollars'));
// console.log(isFinite(20));
// console.log(isNaN(''));

// const randomNumber = (min, max) => Math.trunc(Math.random() * max - min + 1);
// console.log(randomNumber(0, 10));

// const evenOrOdd = (x, y) => (x % y !== 0 ? 'odd' : 'even');
// console.log(evenOrOdd(589611, 11));

// console.log(2 ** 53 - 1);
// console.log(Math.sqrt(144));
// console.log(2569875955595959562154n * 665656262626262626n);
// // console.log(2569875955595959562154 * 665656262626262626);
// const now = new Date(2022, 10, 26, 20, 0);
// console.log(now, typeof now);
// console.log(new Date('30 March 2012'));
// console.log(new Date(0));
// console.log(new Date(2 * 24 * 60 * 60 * 1000));

// console.log(Date.now());
// console.log(new Date(1655045721478));
// console.log(`${now.getDate()}`.padStart(4, '0'));
// console.log(now.toISOString());
// const newDate = new Date('Nov 26 2022 20:00:00');
// console.log(newDate.getDate())
