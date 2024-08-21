# Problem 1: Three ways to sum to n

## Implementation A


1. If n is negative, we set a flag to true and make n positive
2. We initialize a variable `total` to 0
3. We loop from n while is a truthy value (i.e. not 0)
    - We add the current value of n to the total
    - We decrement n by 1
4. If the flag is true, we return the negative value of total, otherwise we return

```js
var sum_to_n_a = function (n) {
	let isNegative = false;
	if (n < 0) {
		isNegative = true;
		n = Math.abs(n);
	}
	let total = 0;
	while (n) total += n--;
	return isNegative ? -total : total;
};
```

&nbsp;

## Implementation B


1. We define a wrapper function `walker`:
    - If n is 0, we return the total
    - Otherwise, we return `walker` recursively with n decremented by 1 and total incremented by n
2. If n is negative, we return the negative value of `walker` with the absolute value of n, otherwise we return `walker` with n
3. We call the wrapper function with n and 0 as arguments

```js
var sum_to_n_b = function (n) {
	const walker = (n, total) => {
		if (n === 0) return total;
		return walker(n - 1, total + n);
	};
	return n < 0 ? -walker(-n, 0) : walker(n, 0);
};
```

&nbsp;

## Implementation C


1.  We define a helper function `getSum` so that we can reuse it and follow the DRY principle. This anonymous function uses the **Gaussian sum** formula, to calculate the sum of all numbers from 1 to n
2.  If n is negative, we return the negative value of the sum of all numbers from 1 to the absolute value of n, otherwise we return the sum of all numbers from 1 to n

```js
var sum_to_n_c = function (n) {
	const getSum = (n) => (n * (n + 1)) / 2;
	return n < 0 ? -getSum(-n) : getSum(n);
};
```
