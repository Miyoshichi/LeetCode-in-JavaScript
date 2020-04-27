/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */

let canPlaceFlowers = (flowerbed, n) => {
    let canPlace = 0
    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] === 0) {
            if (flowerbed.length === 1) {
                canPlace += 1
                flowerbed[i] = 1
            } else if (i === 0 && flowerbed[i+1] === 0) {
                canPlace += 1
                flowerbed[i] = 1
            } else if (i === flowerbed.length - 1 && flowerbed[i-1] === 0) {
                canPlace += 1
                flowerbed[i] = 1
            } else if (flowerbed[i-1] === 0 && flowerbed[i+1] === 0) {
                canPlace += 1
                flowerbed[i] = 1
            }
        }
        if (canPlace <= n) {
            return true
        }
    }
    return false
}

// test
let flowerbed = [1, 0, 0, 0, 1]
let n = 1
console.log(canPlaceFlowers(flowerbed, n))