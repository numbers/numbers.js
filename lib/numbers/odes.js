/**
 * odes.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski, Dakota St. Laurent
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var numbers = require('../numbers');
var Matrix = numbers.matrix
var odes = exports;

/**
 * Euler's approximation to solving v'(t) = F(t,v(t)). Calculates the next spatial 
 * part of the state, v, given the current state (t0,v0). This is a single-step 
 * first-order method, and is first-order accurate.

 * @param {Number} step size
 * @param {Number} initial time
 * @param {Number/Array} other initial condition(s)
 * @param {Function/Array} derivative function(s)
 * @return {Array} new state
 */
odes.EulerStep = function(h,t0,v0,F) {
  return F.map(function(f) {
    //evaluates x'(t0,x0,...), y'(t0,x0,...)
    return f.apply(null, [t0].concat(v0));
  }).map(function(f, i) { //
    //evaluates v0 + h*v'(t0,x0,...)
    return v0[i] + h*f;
  });
}

/**
 * A variation of Euler's method - takes a halfstep using Euler's method, and then a 
 * fullstep with the original ICs but with the halfstep derivative evaluations. This 
 * is a single-step first-order method, and is second-order accurate.
 *
 * @param {Number} step size
 * @param {Number} initial time
 * @param {Number/Array} other initial condition(s)
 * @param {Function/Array} derivative function(s)
 * @return {Array} new state
 */
odes.midpointStep = function(h,t0,v0,F) {
  var halfstep = F.map(function(f) {
    return f.apply(null, [t0].concat(v0));
  }).map(function(f,i) {
    return v0[i] + (h/2)*f;
  });

  return F.map(function(f) {
    return f.apply(null, [t0+(h/2)].concat(halfstep));
  }).map(function(f,i) {
    return v0[i] + h*f;
  });
}

/**
 * Heun's approximation to solving v'(t) = F(t,v(t)). Calculates the next spatial 
 * part of the state, v, given the current state (t0,v0). This is a single-step 
 * first-order method, and is second-order accurate.
 *
 * @param {Number} step size
 * @param {Number} initial time
 * @param {Number/Array} other initial condition(s)
 * @param {Function/Array} derivative function(s)
 * @return {Array} new state
 */
 odes.HeunStep = function(h,t0,v0,F) {
  var v_temp = odes.EulerStep(h,t0,v0,F);

  var term1 = F.map(function(f) {
    return f.apply(null, [t0].concat(v0));
  });
  var term2 = F.map(function(f) {
    return f.apply(null, [t0+h].concat(v_temp));
  });

  return v0.map(function(v,i) {
    return v + (h/2)*(term1[i] + term2[i]);
  });
 }

/**
 * The classical fourth-order Runge-Kutta method for solving v'(t) = F(t,v(t)).
 * Calculates the next spatial part of the state, v, given the current state 
 * (t0,v0).This is a single-step first-order method, and is fourth-order accurate.
 *
 * @param {Number} step size
 * @param {Number} initial time
 * @param {Number/Array} other initial condition(s)
 * @param {Function/Array} derivative function(s)
 * @return {Array} new state
 */
odes.rk4Step = function(h,t0,v0,F) {
  var k1 = F.map(function(f) {
    return f.apply(null, [t0].concat(v0));
  });

  var k2_v0 = v0.map(function(v,i) {
    return v + (h/2)*k1[i];
  });

  var k2 = F.map(function(f) {
    return f.apply(null, [t0+h/2].concat(k2_v0));
  });

  var k3_v0 = v0.map(function(v, i) {
    return v + (h/2)*k2[i];
  });

  var k3 = F.map(function(f) {
    return f.apply(null, [t0+h/2].concat(k3_v0));
  });

  var k4_v0 = v0.map(function(v,i) {
    return v + h*k3[i];
  });

  var k4 = F.map(function(f) {
    return f.apply(null, [t0+h].concat(k4_v0));
  });

  return v0.map(function(v,i) {
    return v0[i] + (h/6)*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]);
  });
}

/**
 * Numerically solves v'(t) = F(t,v(t)) with a specified single-step method;
 * a first-order single-step (FOSS). Simply runs the method's corresponding 
 * step function N times. Returns (t,v(t)) for [t0,tf] with N+1  evenly 
 * spaced points. Current available methods: euler, midpoint, heun, rk4
 *
 * It should be noted that every derivative function (F or elements of F) must 
 * be a function of (t,x,...), i.e. both time AND all spatial coordinates, even 
 * if the mathematical functions are not dependent on it. Furthermore, the time 
 * coordinate must come before the spatial coordinates.
 * 
 * @param {Number} initial time
 * @param {Number} final time
 * @param {Int} number of steps
 * @param {Number/Array} other initial condition(s)
 * @param {Function/Array} derivative function(s)
 * @param {String} method
 * @return {Array} new state
 */
odes.solverFOSS = function(t0,tf,N,v0,F,stepper) {
  solvers = {euler: odes.EulerStep, rk4: odes.rk4Step, heun: odes.HeunStep, midpoint: odes.midpointStep};

  if ((typeof N !== 'number') || (N <= 0)) {
    throw new Error('The number of steps must be a positive integer.');
  }
  if (typeof v0 === 'number') {
    v0 = [v0];
  } else if (!(Array.isArray(v0))) {
    throw new Error('The initial condition(s) must be a number or an array of number(s).');
  }
  if (typeof F === 'function') {
    F = [F];
  } else if (!(Array.isArray(v0))) {
    throw new Error('The derivative(s) must be a function or an array of function(s).');
  }

  N = Math.ceil(N);
  var h = (tf - t0)/N;
  var V = new Array(N+1);
  var T = new Array(N+1);
  V[0] = v0; //of form [[x0,y0,...],[x1,y1,...],...]
  T[0] = t0;

  for (var i=1; i<N+1; i++) {
    T[i] = T[i-1] + h;
    V[i] = solvers[stepper](h, T[i-1], V[i-1], F);
  }
  return [T].concat(Matrix.transpose(V)); //of form [[t0,t1,...],[x0,x1,...],...]
}