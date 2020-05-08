/**
 * @param {number[]} prices
 * @return {number}
 */

const maxProfit = prices => {
    let maxProfit = 0
    let lowPrice = prices[0]
    for (let i = 1; i < prices.length; i ++) {
        if (prices[i] <= lowPrice) {
            lowPrice = prices[i]
        } else {
            let currProfit = prices[i] - lowPrice
            if (currProfit > maxProfit) {
                maxProfit = currProfit
            }
        }
    }
    return maxProfit
}

// test
let prices = [7, 1, 5, 3, 6, 4]
console.log(maxProfit(prices))