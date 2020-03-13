/**
 * @param {number[]} prices
 * @return {number}
 */

let maxProfit = prices => {
    let profit = 0
    let currPrice = prices[0]
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > currPrice) {
            profit += prices[i] - currPrice
        }
        currPrice = prices[i]
    }
    return profit
}

// test
let prices = [7, 1, 5, 3, 6, 4]
console.log(maxProfit(prices))