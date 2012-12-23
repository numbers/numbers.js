var numbers = require('../index');
var statistic = numbers.statistic;

// Oh it's about to get interesting.

// Consider a data representing total follower count of a
// variety of users.
var followers = [100, 50, 1000, 39, 283, 634, 3, 6123];

// We can generate a report of summary statistics
// which includes the mean, 1st and 3rd quartiles,
// and standard deviation.
var report = statistic.report(followers);

// Maybe we decide to become a bit more curious about
// trends in follower count, so we start conjecturing about
// our ability to "predict" trends.
// Let's consider the number of tweets those users have.
var tweets = [100, 10, 400, 5, 123, 24, 302, 2000];

// Let's calculate the correlation.
var correlation = statistic.correlation(tweets, followers);

// Now let's create a linear regression.
var linReg = statistic.linearRegression(tweets, followers);

// linReg is actually a function we can use to map tweets
// onto followers. We'll see that around 1422 followers
// are expected if a user tweets 500 times.
var estFollowers = linReg(500);