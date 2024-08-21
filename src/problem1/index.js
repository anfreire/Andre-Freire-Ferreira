/**
 * Implementation A of the task `Three ways to sum to n`
 * @param {number} n The number to sum to
 * @returns {number} The sum of all numbers from 1 to n
 */
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

/**
 * Implementation B of the task `Three ways to sum to n`
 * @param {number} n The number to sum to
 * @returns {number} The sum of all numbers from 1 to n
 */
var sum_to_n_b = function (n) {
	if (n < 0) return -sum_to_n_b(-n);
	var total = total ?? 0;
	if (n === 0) return total;
	return (total += n + sum_to_n_b(--n));
};

/**
 * Implementation C of the task `Three ways to sum to n`
 * @param {number} n The number to sum to
 * @return {number} The sum of all numbers from 1 to n
 */
var sum_to_n_c = function (n) {
	const getSum = (n) => (n * (n + 1)) / 2;
	return n < 0 ? -getSum(-n) : getSum(n);
};

// const START = -100;
// const END = 100;

// const TESTS = Array.from({ length: END - START + 1 }, (_, i) => START + i);

// const IMPLEMENTATIONS = {
// 	a: sum_to_n_a,
// 	b: sum_to_n_b,
// 	c: sum_to_n_c,
// };

// let results = [];

// Object.entries(IMPLEMENTATIONS).forEach(([key, implementation]) => {
// 	console.log("+" + "-".repeat(18) + "+");
// 	console.log(`| Implementation ${key.toUpperCase()} |`);
// 	console.log("+" + "-".repeat(18) + "+");

// 	TESTS.forEach((n, i) => {
// 		const result = implementation(n);
// 		console.log(`sum_to_n_${key}(${n}) = ${result}`);

// 		if (key === "a") {
// 			results.push(result);
// 		} else if (results[i] !== result) {
// 			throw new Error(`Implementation ${key} failed for n = ${n}`);
// 		}
// 	});
// });
