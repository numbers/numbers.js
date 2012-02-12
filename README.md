numeric.ly.js - an advanced mathematics toolkit for JavaScript
developed by Steve Kaliski, [@sjkaliski](http://twitter.com/sjkaliski)

## DESCRIPTION
--------------------------
Numeric.ly provides a comprehensive set of mathematical tools that currently are not offered in JavaScript.  These tools include:

* Basic calculations
* Differentiation
* Integration
* Matrices
* Prime Numbers
* Statistics
* More...

## HOW TO USE
--------------------------
Numeric.ly is pretty straightforward to use.

For example, if we wanted to estimate the integral of sin(x) from -2 to 4, we could:

Use riemann integrals (with 200 subdivisions)

	numeric.calculus.riemann("sin(x)", -2, 4, 200);

Or adaptive simpson quadrature (with epsilon .0001)

	numeric.calculus.adaptiveSimpson("sin(x)", -2, 4, .0001);

Say we wanted to run some matrix calculations:

We can add two matrices

	numeric.matrix.addition(array1, array2);

We can transpose a matrix

	numeric.matrix.transpose(array);

Numeric.ly also includes some basic prime number analysis.  We can check if a number is prime:

	//basic check
	numeric.prime.simple(number);
	//elliptic analysis (good for huge numbers)
	numeric.prime.elliptic(number);


The statistics tools include mean, median, mode, standard deviation, random sample generator, correlation, confidence intervals, t-test, chi-square, and more.

	numeric.statistic.mean(array);
	numeric.statistic.median(array);
	numeric.statistic.mode(array);
	numeric.statistic.standardDev(array);
	numeric.statistic.randomSample(lower, upper, n);
	numeric.statistic.correlation(array1, array2);