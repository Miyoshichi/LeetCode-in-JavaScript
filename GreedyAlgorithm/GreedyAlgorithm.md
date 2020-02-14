# 贪心算法

* [1. 分发饼干](#1-分发饼干)
* [2. 无重叠区间](#2-无重叠区间)

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