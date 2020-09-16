# 贪心算法

* [1. 分发饼干](#1-分发饼干)
* [2. 无重叠区间](#2-无重叠区间)
* [3. 用最少数量的箭引爆气球](#3-用最少数量的箭引爆气球)
* [4. 根据身高重建队列](#4-根据身高重建队列)
* [5. 买卖股票的最佳时机](#5-买卖股票的最佳时机)
* [6. 买卖股票的最佳时机 II](#6-买卖股票的最佳时机-II)
* [7. 种花问题](#7-种花问题)
* [8. 判断子序列](#8-判断子序列)
* [9. 非递减数列](#9-非递减数列)
* [10. 最大子序和](#10-最大子序和)
* [11. 划分字母区间](#11-划分字母区间)

# 1. 分发饼干

[#455 分发饼干（简单）](https://leetcode-cn.com/problems/assign-cookies/)

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 gi ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 sj 。如果 sj >= gi ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。 
示例 1:
```html
输入: [1, 2, 3], [1, 1]
输出: 1
```
示例 2:
```html
输入: [1, 2], [1, 2, 3]
输出: 2
```

[解答](src/assign-cookies.js)

```JavaScript
const findContentChildren = (g, s) => {
    let pg = g.length - 1, ps = s.length - 1, nums = 0
    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
    while (pg >= 0 && ps >= 0) {
        if (s[ps] >= g[pg]) {
            nums += 1
            ps -= 1
        }
        pg -= 1
    }
    return nums
}
```

为了尽可能多的满足孩子，且由于孩子的胃口和饼干的大小不一定相同，所以可以用最大的饼干去满足最大胃口的孩子，以此类推，使得比孩子胃口大的饼干都可以分发出去。这里先将两个数组由小到大排序，分别用指针从后向前遍历，当指向饼干大小的指针所指元素大于指向孩子胃口的指针所指元素时，饼干可以分发出去，同时这两个指针向前移动。如果当前饼干无法满足孩子胃口时，则向前移动指向孩子胃口的指针，寻找胃口更小的孩子。  
时间复杂度：O(logN)；空间复杂度：O(1)。

# 2. 无重叠区间

[#435 无重叠区间（中等）](https://leetcode-cn.com/problems/non-overlapping-intervals/)

给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。  
示例 1:
```html
输入: [ [1, 2], [2, 3], [3, 4], [1, 3] ]
输出: 1
```
示例 2:
```html
输入: [ [1, 2], [1, 2], [1, 2] ]
输出: 2
```
示例 3:
```html
输入: [ [1, 2], [2, 3] ]
输出: 0
```

[解答](src/non-overlapping-intervals.js)

```JavaScript
const eraseOverlapIntervals = intervals => {
    let left = 0, right = 1, nums = 0
    intervals.sort((a, b) => a[0] - b[0])
    while (right < intervals.length) {
        if (intervals[left][1] > intervals[right][1]) {
            nums += 1
        } else if (intervals[left][1] > intervals[right][0]) {
            [intervals[left], intervals[right]] = [intervals[right], intervals[left]]
            nums += 1
        }
        left += 1
        right += 1
    }
    return nums
}
```

将输入二维数组按照区间起点的大小顺序排序后，比较相邻区间是否相互重叠。用两个指针指向相邻两个区间，和一个变量记录需要删除的区间数。此时会出现三种情况：第一种情况是前一个区间与后一个区间没有重叠部分，则说明这两个区间均不需要被删除，同时后移两个指针；第二种情况是前一个区间完全覆盖了后一个区间，则应当保留后一个区间，因为可以留下更多的空间容纳其他区间，即删除数加一并后移指针；第三种情况是前一个区间与后一个区间部分重叠，此时可以利用贪心策略直接删除后一个区间，这样做总会得到更好的结果，即先交换指针后再后移指针，同时删除数增加。  
时间复杂度：O(NlogN)：因为需要排序；空间复杂度：O(1)。

# 3. 用最少数量的箭引爆气球

[#452 用最少数量的箭引爆气球(中等)](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)

在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以y坐标并不重要，因此只要知道开始和结束的x坐标就足够了。开始坐标总是小于结束坐标。平面内最多存在10^4个气球。  
一支弓箭可以沿着x轴从不同点完全垂直地射出。在坐标x处射出一支箭，若有一个气球的直径的开始和结束坐标为 x_start，x_end， 且满足  x_start ≤ x ≤ x_end，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。  
示例：
```html
输入:
[[10, 16], [2, 8], [1, 6], [7, 12]]
输出:
2
```

[解答](src/minimum-number-of-arrows-to-burst-balloons.js)

```JavaScript
const findMinArrowShots = points => {
    points.sort((a, b) => a[1] - b[1])
    points.length === 0 ? arrows = 0 : (arrows = 1, firstEnd = points[0][1])
    for (const point of points) {
        let pStart = point[0], pEnd = point[1]
        if (pStart > firstEnd) {
            arrows += 1
            firstEnd = pEnd
        }
    }
    return arrows
}
```

将所有气球按照结束坐标的大小排序，假设第一支箭从第一个气球的结束坐标位置射出，需要考虑后面的气球的开始坐标是否超过了当前箭的位置，如果超过，则需要增加箭的数量，并让箭从当前气球的结束坐标位置射出，直至所有气球均被遍历。  
时间复杂度：O(NlogN)：因为使用了排序；空间复杂度：O(1)。

# 4. 根据身高重建队列

[#406 根据身高重建队列（中等）](https://leetcode-cn.com/problems/queue-reconstruction-by-height/)

假设有打乱顺序的一群人站成一个队列。 每个人由一个整数对(h, k)表示，其中 h 是这个人的身高，k 是排在这个人前面且身高大于或等于 h 的人数。 编写一个算法来重建这个队列。  
示例：
```html
输入:
[[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]
输出:
[[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]
```

[解答](src/queue-reconstruction-by-height-2.js)

```JavaScript
const reconstructQueue = people => {
    people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0])
    const queue = []
    for (const p of people) {
        queue.splice(p[1], 0, p)
    }
    return queue
}
```

首先将这一群人按照从高到矮（即 h 从大到小）、相同高度时按照人数从少到多（即 h 从小到大）的顺序排序，接着按照此顺序以及将人放置在对应的位置上，由于 k 表示的是排在这个人前面且身高大于或等于他的人数，比他矮的人不包含在 k 中，因此当 k 相同时，矮的人可以插在高的人前面，而不会与 k 的数值冲突。  
时间复杂度：O(N^2)：因为需要将原来的人按顺序插入队列；空间复杂度：O(N)。

# 5. 买卖股票的最佳时机

[#121 买卖股票的最佳时机（简单）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。  
如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。  
注意你不能在买入股票前卖出股票。  
示例 1:
```html
输入: [7, 1, 5, 3, 6, 4]
输出: 5
```
示例 2:
```html
输入: [7, 6, 4, 3, 1]
输出: 0
```

[解答](src/best-time-to-buy-and-sell-stock.js)

```JavaScript
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
```

若要使买卖股票收益最大化，需要在相对低的价格时买入，在相对高的价格时卖出。首先假设第一天的价格为最低价格，此时的最大收益为0。向后遍历股票价格，当价格低于当前的最低价格时，将当前价格设定为最低价格；当价格高于当前的最低价格时，计算当前的收益，即当前价格减去最低价格，若收益高于最大收益，则更新最大收益。最后即为求得的最大收益。  
时间复杂度：O(N)：只遍历一次；空间复杂度：O(1)。

# 6. 买卖股票的最佳时机 II

[#122 买卖股票的最佳时机 II（简单）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。  
设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。  
注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。  
示例 1:
```html
输入: [7, 1, 5, 3, 6, 4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```
示例 2:
```html
输入: [1, 2, 3, 4, 5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```
示例 3:
```html
输入: [7, 6, 4, 3, 1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

[解答](src/best-time-to-buy-and-sell-stock-ii.js)

```JavaScript
const maxProfit = prices => {
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
```

因为可以对股票进行多次交易，因此当股票价格高于当前的买入价格时，即售出，否则遍历至下一个价格。当当前股票价格低于买入价格时，将当前价格作为买入价格买入，然后继续遍历。  
时间复杂度：O(N)：只遍历一次；空间复杂度：O(1)。

# 7. 种花问题

[#605 种花问题（简单）](https://leetcode-cn.com/problems/can-place-flowers/)

假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。  
给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。  
示例 1:
```html
输入: flowerbed = [1, 0, 0, 0, 1], n = 1
输出: True
```
示例 2:
```html
输入: flowerbed = [1, 0, 0, 0, 1], n = 2
输出: False
```

[解答](src/can-place-flowers.js)

```JavaScript
const canPlaceFlowers = (flowerbed, n) => {
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
```

从左至右扫描代表花坛的数组，如果数组中有一个0，即代表当前位置没有花时，查看这个位置的左右是否也是0，即没有花，如果是则可以在这个位置种花，并将0修改为1，并为可种花的数量加1。对于数组的第一个和最后一个位置，只需考虑一侧是否为0。当扫描花坛数组时，当可种花的数量已经达到需要种花的数量时，可以直接跳出循环并返回true。  
时间复杂度：O(N)：只遍历一次；空间复杂度O(1)。

# 8. 判断子序列

[#392 判断子序列](https://leetcode-cn.com/problems/is-subsequence/)

给定字符串 s 和 t ，判断 s 是否为 t 的子序列。  
你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），而 s 是个短字符串（长度 <=100）。  
字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
```html
示例 1:
s = "abc", t = "ahbgdc"
返回 true.
```
示例 2:
```html
s = "axc", t = "ahbgdc"
返回 false.
```

[解答](src/is-subsequence.js)

```JavaScript
const isSubsequence = (s, t) => {
    let previous = -1
    let falseNum = 0
    let sArr = s.split('')
    sArr.forEach((element) => {
        let current = t.indexOf(element, previous + 1)
        if (current <= previous) {
            falseNum += 1
        }
        previous = current
    })
    return falseNum <= 0
}
```

在字符串t中寻找组成字符串s的每个字母。按照字符串s中字母的顺序，查找字符串t中是否存在对应的字母。如果存在，则从下一个位置继续寻找字符串s中的字母；如果不存在，则说明字符串s不是字符串t的子序列。  
时间复杂度：O(N)：只遍历一次；空间复杂度O(1)。

# 9. 非递减数列

[#605 非递减数列](https://leetcode-cn.com/problems/non-decreasing-array/)

给你一个长度为 n 的整数数组，请你判断在 最多 改变 1 个元素的情况下，该数组能否变成一个非递减数列。
```html
示例 1:
输入: nums = [4, 2, 3]
输出: true
解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。
```
```html
示例 2:
输入: nums = [4, 2, 1]
输出: false
解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
```

[解答](src/non-decreasing-array.js)

```JavaScript
const checkPossibility = (nums) => {
    let changed = 0
    for (i = 1; i < nums.length && changed < 2; i++) {
        if (nums[i] < nums[i - 1]) {
            changed += 1
            if (nums[i] < nums[i - 2] && i > 1) {
                nums[i] = nums[i - 1]
            } else {
                nums[i - 1] = nums[i]
            }
        }
    }
    return changed <= 1
}
```

使目标数列成为非递减数列，即数列中的每个数都不比前一个数要小。因此在出现非递减（当前数比前一个数大），对数列中的数进行改变时，有两种方法：1. 让当前数等于前一个数；2. 让前一个数等于当前数。一般情况下，是因为前一个数过大了，因此应该让前一个数等于当前数，即将前一个数改小。还有一种情况是当前数过小，比之前的数还要小，此时应将当前数改大。当整个数组中改变的数超过一个时，返回false；否则返回true。  
时间复杂度：O(N)：只遍历一次；空间复杂度：O(1)。

# 10. 最大子序和

[#53 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
```html
示例:
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
```

## 暴力法

[解答](src/maximum-subarray-1.js)

```JavaScript
const maxSubArray = (nums) => {
    let max = []
    for (let i = 0; i < nums.length; i++) {
        let maxSum = Math.min(...nums)
        let currentSum = 0
        for (let j = i; j < nums.length; j++) {
            currentSum += nums[j]
            if (currentSum > maxSum) {
                maxSum = currentSum
            }
        }
        max.push(maxSum)
    }
    return Math.max(...max)
}
```

使用两个循环，计算数组中各子序列相加的所有情况，找出其中最大的子序和。  
时间复杂度：O(N^2)：使用了两次循环；空间复杂度：O(1)。

## 贪心

[解答](src/maximum-subarray-2.js)

```JavaScript
const maxSubArray = (nums) => {
    let currSum = nums[0]
    let maxSum = currSum
    let resNums = nums.slice(1)
    resNums.forEach((item) => {
        currSum = Math.max(item, currSum + item)
        maxSum = Math.max(currSum, maxSum)
    })
    return maxSum
}
```

使用单循环遍历数组中的每个元素，使其与其他元素相加并比较大小，根据贪心算法，如果相加后和比当前元素大，则保留当前得到的子序和。最后比较所有得到的子序和，选出其中最大的。  
时间复杂度：O(N)：只遍历一次；空间复杂度：O(1)。

# 11. 划分字母区间

[#763 划分字母区间（中等）](https://leetcode-cn.com/problems/partition-labels/)

字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一个字母只会出现在其中的一个片段。返回一个表示每个字符串片段的长度的列表。
```html
示例:
输入: S = "ababcbacadefegdehijhklij"
输出: [9,7,8]
```

[解答](src/partition-labels.js)

```JavaScript
const partitionLabels = (S) => {
    const charactersInS = []
    const posInS = []
    const partitionNum = []
    let arrS = S.split('')
    
    arrS.forEach((item) => {
        if (charactersInS.indexOf(item) === -1) {
            charactersInS.push(item)
        }
    })

    charactersInS.forEach((item) => {
        const pos = []
        let current = S.indexOf(item)
        while (current > -1) {
            current = S.indexOf(item, current)
            if (current > -1) {
                pos.push(current)
                current += 1
            } else {
                break
            }
        }
        pos.length > 1 ? pos.splice(1, pos.length - 2) : pos.push(pos[0])
        posInS.push(pos)
    })

    let leftPos = 0
    let partied = 0
    for (let i = 1; i < posInS.length; i++) {
        let res = posInS.slice(0, i)
        if (posInS[i][0] > Math.max(...res.flat())) {
            let partition = posInS.slice(leftPos, i)
            let num = Math.max(...partition.flat()) - Math.min(...partition.flat()) + 1
            partitionNum.push(num)
            leftPos = i
            partied += num
        }
    }
    partitionNum.push(S.length - partied)
    
    return partitionNum
}
```

方法分为三步。首先，获取字符串中所包含的所有字母；其次，获取各字母在字符串中所处的位置；最后，当某个字母的起始位置比之前所有字母的结束位置都要大时，在此处划分并计算所包含的字母数量。  
时间复杂度：O(N)：只遍历一次；空间复杂度：O(N)。