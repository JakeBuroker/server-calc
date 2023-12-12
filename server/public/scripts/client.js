// script.js
console.log('My name is: ', process.env.MY_NAME)




function onReady() { 
    console.log('client.js is sourced!');
    handleGETCalculations();
}


document.addEventListener('DOMContentLoaded', onReady());


let Operator = null;
function handleCalculations(operator) {
    Operator = operator;
}
function handlePostCalculations() {
    event.preventDefault();
    let numOne = document.getElementById("firstNumber").value;
    let numTwo = document.getElementById("secondNumber").value;

    let Input = true;

    if (!Operator) {;
        Input = false;
    }
    if (numOne === '') {;
        Input = false;
    }
    if (numTwo === '') {;
        Input = false;
    }
    if (Input) {
        axios({
            method: "POST",
            url: "/calculations",
            data: {
                numOne: numOne,
                numTwo: numTwo,
                operator: Operator,
            },
        })
        .then((response) => {
            console.log("Success");
            handleGETCalculations();
        })
        .catch((error) => {
            console.log(error);
        });
    } else {
    }
}

function handleGETCalculations() {
    axios({
        method: "GET",
        url: "/calculations",
    })
    .then((response) => {
        let calculations = response.data;
        console.log("Response Data:", calculations);

        let historyTableBody = document.getElementById("resultHistory");
        let historyContent = '';
        for (let calculation of calculations) {
            historyContent += `<tr><td>${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}</td></tr>`;
        }
        historyTableBody.innerHTML = historyContent;

        if (calculations.length > 0) {
            let recentResult = calculations[calculations.length - 1];
            let recentTableBody = document.getElementById("recentResult");
            recentTableBody.innerHTML = `${recentResult.numOne} ${recentResult.operator} ${recentResult.numTwo} = ${recentResult.result}`;
        
        }
    })
    .catch((error) => {
        console.log(error);
    });
}
function clearCalculation() {
    axios.delete('/calculations')
        .then(() => {
            console.log("Calculations cleared");
            document.getElementById("resultHistory").innerHTML = "";
            document.getElementById("recentResult").innerHTML = "";
        })
        .catch(error => {
            console.error( error);
        });
}
clearCalculation()



