function add(x, y) {
    return x + y
}

function subtract(x, y) {
    return x - y
}

function multiply(x, y) {
    return x * y
}

function divide(x, y) {
    return x / y
}

function pow(x, y) {
    let result = x;
    for (i=1;i<y;i++) {
        result *= x
    }
    return result;
}

function square(x) {
    return Math.sqrt(x)
}

function percent(x) {
    return x*0.01
}

function reciprocal(x) {
    return 1/x
}

function sign(x) {
    return x*-1
}

function factorial(num) {
    var x = num;
      while(x > 1) {
        num *= x-1;
        x--;
      }
      return num;
}

function operate(equation) {
    // array of only the numbers
    let digits = equation.join("").replace(/\s/g, "").split(/[*, /, —, +, ^, r, \-, x, !]/); 
    // array of operators
    console.log(digits)
    let operators = equation.join("").replace(/\s/g, "").replace(/\./g, '').split(/\d+/).slice(1, digits.length);
    // combine digits and operators back into one array
    console.log(operators)
    let newEquation = [];
    for (i=0;i<operators.length;i++) {
        newEquation.push(parseFloat(digits[i]))
        newEquation.push(operators[i])
    }
    newEquation.push(parseFloat(digits[i])) 
    console.log(newEquation)
    // operations
    let result;
    for (i=0;i<newEquation.length;i++) {
        let prevNum = (!result) ? newEquation[i-1] : result;
        if (newEquation[i] == '—') {
            result = subtract(prevNum, newEquation[i+1]);
        } else if (newEquation[i] == '+') {
            result = add(prevNum, newEquation[i+1]);
        } else if (newEquation[i] == '*') {
            result = multiply(prevNum, newEquation[i+1])
        } else if (newEquation[i] == '/') {
            result = divide(prevNum, newEquation[i+1])
        } else if (newEquation[i] == '^') {
            result = pow(prevNum, newEquation[i+1])
        } else if (newEquation[i] == '+-') {
            result = sign(prevNum)
        } else if (newEquation[i] == '-') {
            result = subtract(prevNum, newEquation[i+1]);
        } else if (newEquation[i] == 'x') {
            result = reciprocal(prevNum);
        } else if (newEquation[i] == '!') {
            result = factorial(prevNum);
        }
    }
    display('clear') // clear the equation
    display(result) // make the equation equal to the result
    console.log(equation)
}

let equation = []
let displayScreen = document.querySelector('.displayScreen');

function display(x) {
    if (x == 'clear') {
        while (equation.length > 0) {
            equation.pop()
        }
    } else if (x == 'back') {
        equation.pop()
    } else if (x == '+' || x == '—' || x == '*' || x == '/') {
        if (!equation[0]) {
            equation.push(0);
        } 
        // add a zero before operator
        equation.push(` ${x} `); 
        // add spaces around operators
    } else if (x == '+-' || x == 'x') {
        equation.push(x);
        operate(equation)
        // need to be operated immediately
    } else if (x == 'π') {
        equation.push(3.14159265359)
    } else {
        equation.push(x);  
    }
    displayScreen.value = `${equation.join("")}`;
}


window.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key == 'Enter') { // enter key
        operate(equation)
    } else if (e.key == 'Backspace') { // backspace key
        equation.pop()
    } else if (e.key.match(/[\d+, *, /, \-, +, ^, r, -, x, !]/)) {
        equation.push(e.key)
    }
    console.log(equation)
})

function celebrate() {
    document.querySelector('.calculator').classList.toggle('animation')
}