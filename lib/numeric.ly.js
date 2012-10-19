var numeric = module.exports = function() {
  this.name = 'numeric';
}

numeric.prototype.addition = function(arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = 0;
    for (var i = 0 ; i < arr.length ; i++) {
      total = total + arr[i];
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
}

numeric.prototype.subtraction = function(arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = arr[arr.length - 1];
    for (var i = arr.length - 2; i >= 0; i--) {
      total -= arr[i]; 
    }
    return total;
  } else { 
    throw new Error('Input must be of type Array');
  }
}

numeric.prototype.product = function(arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = arr[0];
    for (var i = 1; i < arr.length; i++) {
      total = total * arr[i];
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
}

numeric.prototype.factorial = function(num) {
  var arr = new Array();

  function _factorial(n) {
    if (n === 0 || n === 1) return 1;

    if (arr[n] > 0) return arr[n];

    else return arr[n] = _factorial(n - 1) * n;
  }

  return _factorial(num);
}

numeric.prototype.gcd = function(num1, num2) {
  var result;
  if (num1 > num2) {
    for (var i = 0 ; i <= num2 ; i++) {
      if (num2 % i === 0) {
        if (num1 % i === 0) {
          result = i;
        }
      }
    }
    return result;
  } else if (num2 > num1) {
    for (var i = 0 ; i <= num2 ; i++) {
      if (num1 % i === 0) {
        if (num2 % i === 0) {
          result = i;
        }
      }
    }
    return result;
  } else {
    result = num1 * num2 / num1;
    return result;
  }
}

numeric.prototype.lcm = function(num1, num2) {
  return Math.abs(num1 * num2) / this.gcd(num1,num2);
}

numeric.prototype.random = function(arr, quant) {
  if (arr.length <= quant){
    throw new Error('Quantity requested exceeds size of array');
  } else if (arr.length === 0){
    throw new Error('Empty array');
  } else {
    return this.shuffle(arr).slice(0, quant);
  }
}

numeric.prototype.shuffle = function(array) {
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i]
    array[i] = t;
  }

  return array;
}

function evaluate(func, val) {
  if (typeof func == 'string') {
    return Math[func.substring(0,func.indexOf('('))](val);
  }
  return func(val);
}

numeric.prototype.pointDiff = function(func, point) {
  var a = evaluate(func, point - .00001);
  var b = evaluate(func, point + .00001);

  return (b - a) / (.00002);
}

numeric.prototype.riemann = function(func, start, finish, n) {
  var inc = (finish - start) / n;
  var result = 0;
  for (var i = start; i < finish; i += inc) {
    result += (evaluate(func, i) * inc);
  }
  return result;
}

function simpsonDef(func, a, b) {
  var c = (a + b) / 2;
  var d = Math.abs(b - a) / 6;
  return d * (evaluate(func, a) + 4 * evaluate(func, c) + evaluate(func, b));
}

function simpsonRecursive(func, a, b, eps, whole) {
  var c = a + b;
  var left = simpsonDef(func, a, c);
  var right = simpsonDef(func, c, b);
  if (Math.abs(left + right - whole) <= 15 * eps) {
    return left + right + (left + right - whole) / 15;
  } else {
    return simpsonRecursive(func, a, c, eps/2, left) + simpsonRecursive(func, c, b, eps / 2, right);
  }
}

numeric.prototype.adaptiveSimpson = function(func, a, b, eps) {
  return simpsonRecursive(func, a, b, eps, simpsonDef(func, a, b));
}

numeric.prototype.limit = function(func, point, approach) {
  if (approach === 'left') {
    return evaluate(func, point - .001);
  } else if (approach === 'right') {
    return evaluate(func, point + .001);
  } else if (approach === 'middle') {
    return (limit(func, point, 'left') + limit(func, point, 'right')) / 2;
  } else {
    throw new Error('Approach not provided');
  }
}
numeric.prototype.matrix = function() {};
numeric.prototype.matrix.addition = function(arrA, arrB) {
  if ((arrA.length === arrB.length) && (arrA[0].length === arrB[0].length)) {
    var result = new Array(arrA.length);
    for (var i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);
      for (var j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] + arrB[i][j];
        console.log(result[i][j]);
      }
    }
    return result;
  } else {
    throw new Error('Array mismatch');
  }  
}

numeric.prototype.matrix.scalar = function(arr,val) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = val * arr[i][j];
    }
  }
  return arr;
}

numeric.prototype.matrix.transpose = function(arr) {
  var result = new Array(arr[0].length);
  for (var i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);
    for (var j = 0; j < arr.length; j++){
      result[i][j] = arr[j][i];
    }
  }
  return result;
}

numeric.prototype.matrix.identity = function(n) {
  var result = new Array(n);
  for (var i = 0 ; i < n ; i++) {
    result[i] = new Array(n);
    for (var j = 0 ; j < n ; j++) {
      result[i][j] = (i === j) ? 1 : 0;
    }
  }
  return result;
}

numeric.prototype.matrix.dotproduct = function(vectorA, vectorB) {
  if (vectorA.length === vectorB.length) {
    var result = 0;
    for (var i = 0 ; i < vectorA.length ; i++) {
      result += vectorA[i]*vectorB[i];
    }
    return result;
  } else {
    throw new Error("Vector mismatch");
  }
}

numeric.prototype.matrix.multiply = function(arrA, arrB) {
  if (arrA[0].length === arrB.length) {
    var result = new Array(arrA.length);
    
    for (var i = 0 ; i < arrA.length ; i++) {
      result[i] = new Array(arrB[0].length);
    }

    var arrB_T = transpose(arrB);
    
    for (var i = 0 ; i < result.length ; i++) {
      for (var j = 0 ; j < result[i].length ; j++) {
        result[i][j] = dotproduct(arrA[i],arrB_T[j]);
      }
    }
    return result;
  } else {
    throw new Error("Array mismatch");
  }
}

numeric.prototype.matrix.determinant = function(m) {
  if ((m.length === 2) && (m[0].length === 2)) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  } else if ((m.length === 3) && (m[0].length === 3)) {
    return m[0][0] * m[1][1] * m[2][2] 
      + m[0][1] * m[1][2] * m[2][0] 
      + m[0][2] * m[1][0] * m[2][1] 
      - m[0][2] * m[1][1] * m[2][0] 
      - m[0][1] * m[1][0] * m[2][2] 
      - m[0][0] * m[1][2] * m[2][1];
  }
}
numeric.prototype.prime = function() {};
numeric.prototype.prime.simple = function(val) {
  if (val == 1) return false;
  else if (val == 2) return true;
  else if (val != null) {
    var start = 2;
    var result = true;
    while (start < val) {
      if (val % start === 0) {
        result = false;
        break;
      } else {
        start++;
      }
    }
    return result;
  }
}

numeric.prototype.prime.factorization = function(num) {
  if (num === 1) return [1];

  var primes = result = new Array();
  loadPrimes(num, function(p) {
    trial(num);
  });

  function loadPrimes(n, callback) {
    for (var i = 0 ; i < n ; i++) {
      if (numeric.prime.simple(i)) primes.push(i);
    }

    callback(primes);
  }

  function trial(n) {
    var quant = Math.floor(Math.random() * primes.length)
      , temp = numeric.random(primes, quant);
    if (numeric.product(temp) === num) {
      console.log(temp);
      return temp;
    } else {
      trial(n);
    }
  }
}
numeric.prototype.statistic = function() {};
numeric.prototype.statistic.mean = function(arr) {
  var count = arr.length;
  var sum = addition(arr);
  return sum/count;
}

numeric.prototype.statistic.median = function(arr) {
  var count = arr.length;
  var middle;
  if (count % 2 === 0) {
    return (arr[count/2] + arr[(count/2 - 1)])/2;
  } else {
    return arr[Math.floor(count / 2)];
  }
}

numeric.prototype.statistic.mode = function(arr) {
  //sort array
  var maxIndex = 0, maxOccurence = 0, tempIndex = 0, tempOccurence = 0;
  arr = arr.sort();
  while (tempIndex < arr.length) {
    for (var j = tempIndex; j < arr.length; j++) {
      if (arr[j] == arr[tempIndex]) {
        tempOccurence++;
      } else {
        break;
      }
    }
    if (tempOccurence > maxOccurence) {
      maxOccurence = tempOccurence;
      maxIndex = tempIndex;
    }

    tempIndex = j;
    tempOccurence = 0;
  }
  return arr[maxIndex];
}

numeric.prototype.statistic.randomSample = function(lower,upper,n) {
  var sample = new Array();
  var temp;
  for (var i = 0 ; i < n ; i++) {
    temp = Math.random()*upper;
    if (temp > lower)
      sample[i] = temp;
  }
  return sample;
}

numeric.prototype.statistic.standardDev = function(arr) {
  var count = arr.length;
  var mean = mean(arr);
  var squaredArr = new Array();
  for (var i = 0; i < arr.length; i++) {
    squaredArr[i] = Math.pow((arr[i] - mean),2);
  }
  return Math.sqrt((1/count) * addition(squaredArr));
}

numeric.prototype.statistic.correlation = function(arrX,arrY) {
  if (arrX.length == arrY.length) {
    var numerator = 0;
    var denominator = (arrX.length) * (standardDev(arrX)) * (standardDev(arrY));
    var xMean = mean(arrX);
    var yMean = mean(arrY);
    for (var i = 0 ; i < arrX.length ; i++) {
      numerator += (arrX[i] - xMean) * (arrY[i] - yMean);
    }
    return numerator / denominator;
  } else {
    throw new Error('Array mismatch');
  }
}