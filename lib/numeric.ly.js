/*
* numeric.ly
* author: steve kaliski
* last modified: sep 2012
*-----------------------------------------------------------------------------*/

var numeric = {

  //basic addition of vals in an array
  addition: function(arr) {
    if (Object.prototype.toString.call(arr) === '[object Array]') {
      var total = 0;
      for (var i = 0 ; i < arr.length ; i++) {
        total = total + arr[i];
      }
      return total;
    } else {
      throw new Error('ERROR: Input must be of type Array');
    }
  },

  //subtract items in an array (descending)
  subtraction: function(arr) {
    if (Object.prototype.toString.call(arr) === '[object Array]') {
      var total = arr[arr.length - 1];
      for (var i = arr.length - 2; i >= 0; i--) {
        total -= arr[i]; 
      }
      return total;
    } else { 
      throw new Error('ERROR: Input must be of type Array');
    }
  },

  //product of items in array
  product: function(arr) {
    if (Object.prototype.toString.call(arr) === '[object Array]') {
      var total = arr[0];
      for (var i = 1; i < arr.length; i++) {
        total = total * arr[i];
      }
      return total;
    } else {
      throw new Error('ERROR: Input must be of type Array');
    }
  },

  //greatest common denominator
  gcd: function(num1, num2) {
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
  },

  //least common multiple
  lcm: function(num1, num2) {
    var result = Math.abs(num1 * num2) / gcd(num1,num2);
    return result;
  },

  //evaluate function at val (func passed as a string)
  evaluate: function(func, val) {
    if(typeof func == 'string') {
      return Math[func.substring(0,func.indexOf('('))](val);
    }
    return func(val);
  },

/*-----------------------------------------------------------------------------*/
  
  //a variety of calculus tools
  calculus: {

    //function, point at which differentiation occurs (func passed as string)
    pointDiff: function(func, point) {
      var a = evaluate(func, point - .00001);
      var b = evaluate(func, point + .00001);

      return (b - a) / (.00002);
    },

    //calculate riemann integral (left hand) (func passed as string)
    riemann: function(func, start, finish, n) {
      var inc = (finish - start) / n;
      var result = 0;
      for (var i = start; i < finish; i += inc) {
        result += (evaluate(func, i) * inc);
      }
      return result;
    },

    //estimate integral with adaptive simpson quadrature
    simpsonDef: function(func, a, b) {
      var c = (a + b) / 2;
      var d = Math.abs(b - a) / 6;
      return d * (evaluate(func, a) + 4 * evaluate(func, c) + evaluate(func, b));
    },
    simpsonRecursive: function(func, a, b, eps, whole) {
      var c = a + b;
      var left = simpsonDef(func, a, c);
      var right = simpsonDef(func, c, b);
      if (Math.abs(left + right - whole) <= 15 * eps) {
        return left + right + (left + right - whole) / 15;
      } else {
        return simpsonRecursive(func, a, c, eps/2, left) + simpsonRecursive(func, c, b, eps / 2, right);
      }
    },
    //execute this
    adaptiveSimpson: function(func, a, b, eps) {
      return simpsonRecursive(func, a, b, eps, simpsonDef(func, a, b));
    },

    //take the limit of a function (left, middle, or right)
    limit: function(func, point, approach) {
      if (approach === 'left') {
        return evaluate(func, point - .001);
      } else if (approach === 'right') {
        return evaluate(func, point + .001);
      } else if (approach === 'middle') {
        return (limit(func, point, 'left') + limit(func, point, 'right')) / 2;
      } else {
        throw new Error('Approach not provided');
      }
    },

    //return taylor polynomial for function (func) at point (point) to degree (degree: 0, 1 and 2 for now)
    taylor: function(func, point, degree) {
      if (degree == 0) {
        
      } else if (degree == 1) {
        
      } else if (degree == 2) {
        
      }
    },

    //integrate taylor polynomial for some func
    polyIntegrate: function(func) {
      var taylor = taylor(func, 0, 8);
    }
  },

/*-----------------------------------------------------------------------------*/
  
  /*
  a variety of matrix analysis tools

  let's consider the matrix A:

  [1 2 3]
  [4 5 6]

  As input, set arg = [[1,2,3],[4,5,6]];

  Note: The "structure" of matrices may be neglected in some calculations,
  however in and transformation, mapping, etc, we recognize the proper
  format.
  */
  matrix: {
    
    //add two arrays (arrA and arrB)
    addition: function(arrA, arrB) {
      if ((arrA.length === arrB.length) && (arrA[0].length === arrB[0].length)) {
        var result = new Array(arrA.length);
        for (var i = 0; i < arrA.length; i++) {
          result[i] = new Array(arrA[i].length);
          for (var j = 0; j < arrA[i].length; j++) {
            result[i][j] = arrA[i][j] + arrB[i][j];
          }
        }
        return result;
      } else {
        throw new Error('Array mismatch');
      }
    },

    //multiple array (arr) by a scalar (val)
    scalar: function(arr,val) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
          arr[i][j] = val * arr[i][j];
        }
      }
      return arr;
    },

    //transpose array
    transpose: function(arr) {
      var result = new Array(arr[0].length);
      for (var i = 0; i < arr[0].length; i++) {
        result[i] = new Array(arr.length);
        for (var j = 0; j < arr.length; j++){
          result[i][j] = arr[j][i];
        }
      }
      return result;
    },

    //return identity matrix of dimension n x n
    identity: function(n) {
      var result = new Array(n);
      for (var i = 0 ; i < n ; i++) {
        result[i] = new Array(n);
        for (var j = 0 ; j < n ; j++) {
          result[i][j] = (i === j) ? 1 : 0;
        }
      }
      return result;
    },

    //dot product
    dotproduct: function(vectorA, vectorB) {
      if (vectorA.length === vectorB.length) {
        var result = 0;
        for (var i = 0 ; i < vectorA.length ; i++) {
          result += vectorA[i]*vectorB[i];
        }
        return result;
      } else {
        throw new Error("Vector mismatch");
      }
    },

    //multiply two matrices
    multiply: function(arrA, arrB) {
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
    },

    //determinant, only for n x n -> 2 and 3
    determinant: function(m) {
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
  },

/*-----------------------------------------------------------------------------*/
  
  //collection of prime associated tools
  prime: {

    //standard prime evaluation (no consideration towards efficiency)
    simple: function(val) {
      if (val == 1) {
        return false;
      } else if (val == 2) {
        return true;
      } else if (val != null) {
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
    },

    //determine primality using elliptic curve testing
    elliptic: function() {
      return null;
    }
  },

/*-----------------------------------------------------------------------------*/

  //statistic oriented tools
  statistic: {
    
    //get mean value of the numbers in an array
    mean: function(arr) {
      var count = arr.length;
      var sum = addition(arr);
      return sum/count;
    },

    //get median value of the numbers in an array
    median: function(arr) {
      var count = arr.length;
      var middle;
      if (count % 2 === 0) {
        return (arr[count/2] + arr[(count/2 - 1)])/2;
      } else {
        return arr[Math.floor(count / 2)];
      }
    },

    //get mode value (most common value) of the numbers in an array
    mode: function(arr) {
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
    },

    //generate a random sample of n-values within lower/upper bounds
    randomSample: function(lower,upper,n) {
      var sample = new Array();
      var temp;
      for (var i = 0 ; i < n ; i++) {
        temp = Math.random()*upper;
        if (temp > lower)
          sample[i] = temp;
      }
      return sample;
    },

    //standard deviation
    standardDev: function(arr) {
      var count = arr.length;
      var mean = mean(arr);
      var squaredArr = new Array();
      for (var i = 0; i < arr.length; i++) {
        squaredArr[i] = Math.pow((arr[i] - mean),2);
      }
      return Math.sqrt((1/count) * addition(squaredArr));
    },

    //correlation of two arrays
    correlation: function(arrX,arrY) {
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
  }
};