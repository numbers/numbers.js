/*
*	numeric.ly
*	author: steve kaliski
*	feb 2012
*/

/*-----------------------------------------------------------------------------*/
var numeric = function(){

	//basic addition of vals in an array
	function addition(arr){
		var total = 0;
		for(var i = 0 ; i < arr.length ; i++){
			total = total + arr[i];
		}
		return total;
	};

	//subtract items in an array (descending)
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

	//evaluate function at val (func passed a string)
	function evaluate(func, val){
		return parseFloat(eval("with(Math){var x = " + val + ";" + func+'};'));
	}

	//function, point at which differentiation occurs (func passed as string)
	function pointDiff(func, point){
		var a = evaluate(func, point - .00001);
		var b = evaluate(func, point + .00001);
		return (b-a)/(.00002);
	}

	//calculate riemann integral (left hand) (func passed as string)
	function riemann(func, start, finish, n){
		var inc = (finish - start)/n;
		var result = 0;
		for (var i = start; i < finish; i+= inc) {
			result += (evaluate(func, i) * inc);
		}
		return result;
	}

	//estimate integral with adaptive simpson quadrature
	function simpsonDef(func, a, b){
		var c = (a + b) / 2;
		var d = Math.abs(b - a) / 6;
		return d * (evaluate(func, a) + 4 * evaluate(func, c) + evaluate(func, b));
	}
	function simpsonRecursive(func, a, b, eps, whole){
		var c = a + b;
		var left = simpsonDef(func, a, c);
		var right = simpsonDef(func, c, b);
		if(Math.abs(left + right - whole) <= 15 * eps){
			return left + right + (left + right - whole) / 15;
		}else{
			return simpsonRecursive(func, a, c, eps/2, left) + simpsonRecursive(f, c, b, eps/2, right);
		}
	}
	function adaptiveSimpson(func, a, b, eps){
		return simpsonRecursive(func, a, b, eps, simpsonDef(func, a, b));
	}
/*-----------------------------------------------------------------------------*/
	/*a variety of matrix analysis tools

	let's consider the matrix A:

	[1 2 3]
	[4 5 6]

	As input, set arg = [[1,2,3],[4,5,6]];

	Note: The "structure" of matrices may be neglected in some calculations,
	however in and transformation, mapping, etc, we recognize the proper
	format.
	*/
	var matrix = function(){
		
		//add two arrays (arrA and arrB)
		function addition(arrA, arrB){
			if((arrA.length == arrB.length) && (arrA[0].length == arrB[0].length)){
				var result = new Array(arrA.length);
				for (var i = 0; i < arrA.length; i++) {
					result[i] = new Array(arrA[i].length);
					for (var j = 0; j < arrA[i].length; j++) {
						result[i][j] = arrA[i][j] + arrB[i][j];
					}
				}
				return result;
			}else{
				return 'Error: Array mismatch';
			}
		}

		//multiple array (arr) by a scalar (val)
		function scalar(arr,val){
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < arr[i].length; j++) {
					arr[i][j] = val * arr[i][j];
				}
			}
			return arr;
		}

		//transpose array
		function transpose(arr){
			//set 
			var result = new Array(arr[0].length);
			for (var i = 0; i < arr.length; i++) {
				arr[i] = new Array(arr.length);
			};
		}


		return{
			addition: addition,
			scalar: scalar
		}
	}()
/*-----------------------------------------------------------------------------*/
	//execute as numeric.isPrime.simple(val) or numeric.isPrime.complex(val)
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
			return null;
		}

		return{
			simple: simple,
			elliptic: elliptic
		}
	}()
/*-----------------------------------------------------------------------------*/
	//statistic oriented tools
	var statistic = function(){
		
		//get mean value of the numbers in an array
		function mean(arr){
			var count = arr.length;
			var sum = addition(arr);
			return sum/count
		}

		//get median value of the numbers in an array
		function median(arr){
			var count = arr.length;
			var middle;
			if(count % 2 == 0){
				return (arr[count/2] + arr[(count/2 - 1)])/2;
			}else{
				return arr[Math.floor(count / 2)];
			}
		}

		//get mode value (most common value) of the numbers in an array
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

		//generate a random sample of n-values within lower/upper bounds
		function randomSample(lower,upper,n){
			var sample = new Array();
			var temp;
			for(var i = 0 ; i < n ; i++){
				temp = Math.random()*upper;
				if(temp > lower)
					sample[i] = temp;
			}
			return sample;
		}

		//standard deviation
		function standardDev(arr){
			var count = arr.length;
			var mean = mean(arr);
			var squaredArr = new Array();
			for (var i = 0; i < arr.length; i++) {
				squaredArr[i] = Math.pow((arr[i] - mean),2);
			}
			return Math.sqrt((1/count) * addition(squaredArr));
		}

		//correlation of two arrays
		function correlation(arrX,arrY){
			if(arrX.length == arrY.length){
				var numerator = 0;
				var denominator = (arrX.length)*(standardDev(arrX))*(standardDev(arrY));
				var xMean = mean(arrX);
				var yMean = mean(arrY);
				for(int i = 0 ; i < arrX.length ; i++){
					numerator += (arrX[i] - xMean) * (arrY[i] - yMean);
				}
				return numerator / denominator;
			}else{
				return 'Error: Array mismatch';
			}
		}

		return{
			mean: mean,
			median: median,
			mode: mode,
			randomSample: randomSample,
			standardDev: standardDev,
			correlation: correlation
		}
	}()
/*-----------------------------------------------------------------------------*/
	// return functions
	return{
		addition: addition,
		subtraction: subtraction,
		product: product,
		gcd: gcd,
		lcm: lcm,
		evaluate: evaluate,
		pointDiff: pointDiff,
		riemann: riemann,
		adaptiveSimpson: adaptiveSimpson,
		matrix: matrix,
		isPrime: isPrime,
		statistic: statistic
	}

}()