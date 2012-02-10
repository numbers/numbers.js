







/* EVALUATE INPUTTED 'FUNCTION' */

//Evaluate function of one (1) variable
function evaluate(func, val){
	return parseFloat(eval("with(Math){var x = " + val + ";" + func+'};'));
}
function evaluateN(func, vals){				//function, vals as an array (strict x, y, z....) (up to 3)
	return parseFloat(eval("with(Math){var x = " + vals[0] + ";" + "var y = " + vals[1] + ";" + "var z = " + vals[2] + ";" + func+'};'));
}
//Point Differentiation
function pointDiff(func, point){			//function, point at which differentiation occurs
	var a = evaluate(func, point - .00001);
	var b = evaluate(func, point + .00001);
	return (b-a)/(.00002);
}

//Riemann Integral (left integral (more options to come))
function riemann(func, start, finish, n){	//function, start, finish, number of increments
	var inc = (finish - start)/n;
	var result = 0;
	for (var i = start; i < finish; i+= inc) {
		result += (evaluate(func, i) * inc);
	}
	return result;
}
//Simpson Quadrature
function simpson(func,start,finish){
	var c = (start + finish)/2;
	var h = Math.abs(finish - start)/6;
	return h * (evaluate(func,start) + 4 * evaluate(func,c)) + evaluate(func,finish);
}
function recursive(func, start, finish, error, whole){
	var c = (start + finish)/2;
	var left = simpson(func, start, c);
	var right = simpson(func, c, finish);
	if(Math.abs(left + right - whole) <= 15 * error){
		return left + right + (left + right - whole)/15;
	}else{
		return recursive(func, start, c, error/2, left) + recursive(func, c, finish, error/2, right);
	}
}
function adaptiveSimpson(func, start, finish, error){
	return recursive(func, start, finish, error, simpson(func, start, finish));
}

//MISC
// GCD AND LCM
function gcd(num1, num2){
	var result;
	if(num1 > num2){
		for(i = 0 ; i <= num2 ; i++){
			if(num2%i == 0){
				if(num1%i == 0){
					result = i;
				}
			}
		}
		return result;
	}else if(num2 > num1){
		for(i = 0 ; i <= num2 ; i++){
			if(num1%i == 0){
				if(num2%i == 0){
					var result = i;
				}
			}
		}
		return result;
	}else{
		var result = num1*num2/num1;
		return result;
	}
}

function lcm(num1, num2){
	var result = Math.abs(num1*num2) / gcd(num1,num2);
	return result;
}