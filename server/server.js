const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let PORT = process.env.PORT || 5001;
app.use(bodyParser.json());
app.use(express.static('server/public'));
const someSecret = process.env.MY_SUPER_SECRET;

app.use(bodyParser.urlencoded({extended: true}));

// Global variable that will contain all of the
// calculation objects:
let calculations = []

function performCalculation(numOne, numTwo, operator) {
  numOne = parseFloat(numOne);
  numTwo = parseFloat(numTwo);

  if (operator === '+') {
      return numOne + numTwo;
  }
  if (operator === '-') {
      return numOne - numTwo;
  }
  if (operator === '*') {
      return numOne * numTwo;
  }
  if (operator === '/') {
      return  numOne / numTwo ;
  }
  return 'Invalid operator';
}

// Here's a wonderful place to make some routes:

// POST /calculations
app.post('/calculations', (req, res) => {
  let { numOne, numTwo, operator } = req.body;
  let result = performCalculation(numOne, numTwo, operator);
  let calculation = { numOne, numTwo, operator, result };
  calculations.push(calculation);
  console.log(calculations);
  res.status(201).send(calculation);
}); 

// GET /calculations

app.get('/calculations', (req, res) => {
  console.log("test");
  res.send(calculations);
});
[
  {
    numOne: 3,
    numTwo: 5,
    operator: '+',
    result: 8
  },
  {
    numOne: 11,
    numTwo: 7,
    operator: '-',
    result: 4
  },
  {
    numOne: 11,
    numTwo: 7,
    operator: '*',
    result: 4
  },
  {
    numOne: 11,
    numTwo: 7,
    operator: '/',
    result: 4
  }
]
app.delete('/calculations', (req, res) => {
  calculations = [];
  res.sendStatus(201); 
});


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
