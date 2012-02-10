/*
*	numeric.ly
*	author: steve kaliski
*	feb 2012
*/


var numeric = function(){

	//basic addition of vals in an array
	function addition(arr){
		var total = 0;
		for(var i = 0 ; i < arr.length ; i++){
			total = total + arr[i];
		}
		return total;
	};

	/*
	* 	basic subtraction of vals in an array
	*	var arr = {1,2,3,4,5,6,1}
	*  	the subtraction will be evaluated as:
	* 	1 - 6 - 5 - 4 - 3 - 2 - 1 = - 20
	*/
	function subtraction(arr){
		var total = arr[arr.length - 1];
		for (var i = arr.length - 2; i >= 0; i--) {
			total -= arr[i]; 
		}
		return total;
	}

	//product of items in array
	function product(arr){
		var total = arr[0];
		for (var i = 1; i < arr.length; i++) {
			total = total * arr[i];
		};
		return total;
	}


	//greatest common denominator
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

	//least common multiple
	function lcm(num1, num2){
		var result = Math.abs(num1*num2) / gcd(num1,num2);
		return result;
	}

	//evaluate function at val
	function evaluate(func, val){
		return parseFloat(eval("with(Math){var x = " + val + ";" + func+'};'));
	}

	//function, point at which differentiation occurs
	function pointDiff(func, point){
		var a = evaluate(func, point - .00001);
		var b = evaluate(func, point + .00001);
		return (b-a)/(.00002);
	}

	//calculate riemann integral (left hand)
	function riemann(func, start, finish, n){
		var inc = (finish - start)/n;
		var result = 0;
		for (var i = start; i < finish; i+= inc) {
			result += (evaluate(func, i) * inc);
		}
		return result;
	}

	//execute as numeric.isPrime.simple(val) or numeric.isPrime.complex(val)
	//returns bool
	var isPrime = function(){

		//standard prime evaluation (no consideration towards efficiency)
		//acceptable for small numbers
		function simple(val){
			//check for 1
			if(val == 1)
				return false;
			//check for 2
			else if(val == 2)
				return true;
			//otherwise, let's double check it's not empty, and continue
			else if(val != null){
				start = 2;
				result = true;
				while(start < val){
					if(val % start == 0){
						result = false;
						break;
					}else{
						start++;
					}
				}
				return result;
			}
		}

		//determine primality using elliptic curve testing
		//better for large numbers....really large numbers
		function elliptic(){
			return 6;
		}

		return{
			simple: simple,
			elliptic: elliptic
		}
	}()

	//statistic oriented tools
	var statistic = function(){
		
		function mean(arr){
			var count = arr.length;
			var sum = addition(arr);
			return sum/count
		}

		function median(arr){
			var count = arr.length;
			var middle;
			if(count % 2 == 0){
				return (arr[count/2] + arr[(count/2 - 1)])/2;
			}else{
				return arr[Math.floor(count / 2)];
			}
		}

		function mode(arr){
			//sort array
			var maxIndex = 0, maxOccurence = 0, tempIndex = 0, tempOccurence = 0;
			arr = arr.sort();
			while(tempIndex < arr.length) {
				for (var j = tempIndex; j < arr.length; j++) {
					if(arr[j] == arr[tempIndex]){
						tempOccurence++;
					}else{
						break;
					}
				}
				if(tempOccurence > maxOccurence){
					maxOccurence = tempOccurence;
					maxIndex = tempIndex;
				}
				tempIndex = j;
				tempOccurence = 0;
			}
			return arr[maxIndex];
		}

		return{
			mean: mean,
			median: median,
			mode: mode
		}
	}()

	// return functions
	return{
		addition: addition,
		subtraction: subtraction,
		product: product,
		gcd: gcd,
		lcm: lcm,
		evaluate: evaluate,
		//evaluateN: evaluateN
		pointDiff: pointDiff,
		riemann: riemann,
		isPrime: isPrime,
		statistic: statistic
	}

}()