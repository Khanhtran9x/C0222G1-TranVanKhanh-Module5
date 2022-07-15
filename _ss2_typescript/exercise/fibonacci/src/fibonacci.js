var fibonacciArray = [0];
var sum = 0;
function findFibonacci(n) {
    if (n == 1 || n == 2)
        return 1;
    return findFibonacci(n - 1) + findFibonacci(n - 2);
}
for (var i = 1; i < 20; i++) {
    fibonacciArray.push(findFibonacci(i));
    sum += findFibonacci(i);
}
console.log("20 first fibonacci numbers are: " + fibonacciArray.toString());
console.log("Sum: " + sum);
