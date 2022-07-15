let fibonacciArray: number[] = [0];
let sum: number = 0;

function findFibonacci(n: number) : number {
    if (n == 1 || n == 2) return 1;
    return findFibonacci(n-1) + findFibonacci(n-2);
}

for (let i = 1; i < 20; i++) {
    fibonacciArray.push(findFibonacci(i));
    sum += findFibonacci(i);
}

console.log("20 first fibonacci numbers are: " + fibonacciArray.toString());
console.log("Sum: " + sum);