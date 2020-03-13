# 贪心算法

* [1. 分发饼干](#1-分发饼干)
* [2. 无重叠区间](#2-无重叠区间)
* [3. 用最少数量的箭引爆气球](#3-用最少数量的箭引爆气球)
* [4. 根据身高重建队列](#4-根据身高重建队列)
* [5. 买卖股票的最佳时机](#5-买卖股票的最佳时机)
* [6. 买卖股票的最佳时机 II](#6-买卖股票的最佳时机-II)

# 1. 分发饼干

[#455 分发饼干（简单）](https://leetcode-cn.com/problems/assign-cookies/)

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 gi ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 sj 。如果 sj >= gi ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。 
示例 1:
```html
输入: [1,2,3], [1,1]
输出: 1
```
示例 2:
```html
输入: [1,2], [1,2,3]
输出: 2
```

[解答](src/assign-cookies.js)

```JavaScript
let findContentChildren = (g, s) => {
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
输入: [ [1,2], [2,3], [3,4], [1,3] ]
输出: 1
```
示例 2:
```html
输入: [ [1,2], [1,2], [1,2] ]
输出: 2
```
示例 3:
```html
输入: [ [1,2], [2,3] ]
输出: 0
```

[解答](src/non-overlapping-intervals.js)

```JavaScript
let eraseOverlapIntervals = intervals => {
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
[[10,16], [2,8], [1,6], [7,12]]
输出:
2
```

[解答](src/minimum-number-of-arrows-to-burst-balloons.js)

```JavaScript
let findMinArrowShots = points => {
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
let reconstructQueue = people => {
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
输入: [7,1,5,3,6,4]
输出: 5
```
示例 2:
```html
输入: [7,6,4,3,1]
输出: 0
```

[解答](src/best-time-to-buy-and-sell-stock.js)

```JavaScript
let maxProfit = prices => {
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
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```
示例 2:
```html
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```
示例 3:
```html
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

[解答](src/best-time-to-buy-and-sell-stock-ii.js)

```JavaScript
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
```

因为可以对股票进行多次交易，因此当股票价格高于当前的买入价格时，即售出，否则遍历至下一个价格。当当前股票价格低于买入价格时，将当前价格作为买入价格买入，然后继续遍历。  
时间复杂度：O(N)：只遍历一次；空间复杂度：O(1)。