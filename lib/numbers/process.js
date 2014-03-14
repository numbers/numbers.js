/**
 * statistic.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
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

var statistic = require('./statistic');
var basic = require('./basic');
var process = exports;

/**
 * Estimates process capability for specifications that consist of a lower limit only. 
 * Assumes process output is approximately normally distributed.
 * Cpl is described here: https://en.wikipedia.org/wiki/Process_capability_index
 * 
 * @param  {Array} arr        The array of values
 * @param  {Number} limit     The lower limit (LSL)
 * @return {Number}           The Cpl value
 */
process.cpl = function (arr, limit) {
  var val = NaN;
  limit = parseFloat(limit);
  if (!isNaN(limit)) {
    var std = statistic.standardDev(arr);
    var mean = statistic.mean(arr);
    val = (mean - limit) / (3 * std);
  }
  return val;
};

/**
 * Estimates process capability for specifications that consist of a upper limit only. 
 * Assumes process output is approximately normally distributed.
 * Cpu is described here: https://en.wikipedia.org/wiki/Process_capability_index
 * 
 * @param  {Array} arr        The array of values
 * @param  {Number} limit     The upper limit (USL)
 * @return {Number}           The Cpu value
 */
process.cpu = function (arr, limit) {
  var val = NaN;
  limit = parseFloat(limit);
  if (!isNaN(limit)) {
    var std = statistic.standardDev(arr);
    var mean = statistic.mean(arr);
    val = (limit - mean) / (3 * std);
  }
  return val;
};


/**
 * Estimates what the process is capable of producing, considering that the 
 * process mean may not be centered between the specification limits. 
 * Assumes process output is approximately normally distributed.
 * Cpk is described here: https://en.wikipedia.org/wiki/Process_capability_index
 * 
 * @param  {Array} arr        The array of values
 * @param  {Number} llimit    The lower limit (LSL)
 * @param  {Number} ulimit    The upper limit (USL)
 * @return {Number}           The Cpk value
 */
process.cpk = function (arr, llimit, ulimit) {
  var cpl = process.cpl(arr, llimit);
  var cpu = process.cpu(arr, ulimit);
  if (isNaN(cpl)) {
    return cpu;
  } else if (isNaN(cpu)) {
    return cpl;
  } else {
    return basic.min([cpl, cpu]);
  }
};

/**
 * Estimates what the process is capable of producing if the process 
 * mean were to be centered between the specification limits. 
 * Assumes process output is approximately normally distributed.
 * Cp is described here: https://en.wikipedia.org/wiki/Process_capability_index
 * 
 * @param  {Array} arr        The array of values
 * @param  {Number} llimit    The lower limit (LSL)
 * @param  {Number} ulimit    The upper limit (USL)
 * @return {Number}           The Cpk value
 */
process.cp = function (arr, llimit, ulimit) { 
  var val = NaN;
  ulimit = parseFloat(ulimit);
  llimit = parseFloat(llimit);
  if (!isNaN(ulimit) && !isNaN(llimit)) {
    var std = statistic.standardDev(arr);
    val = (ulimit - llimit) / (6 * std);
  }
  return val;
};
