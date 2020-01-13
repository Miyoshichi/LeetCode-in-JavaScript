# 双指针
* [1. 两数之和](#1两数之和)
* [2. 平方数之和](#2平方数之和)

# 1.两数之和
[#167 两数之和 II - 输入有序数组（简单）](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/description/)

给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。  
函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。  
说明:  
* 返回的下标值（index1 和 index2）不是从零开始的。
* 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。  
示例:
```html
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

[解答](/src/two-sum-ii-input-array-is-sorted.js)

```JavaScript
var twoSum = (numbers, target) => {
    var lo = 0
    var hi = numbers.length - 1
    while (lo < hi) {
        if (numbers[lo] + numbers[hi] < target) {
            lo += 1
        } else if (numbers[lo] + numbers[hi] > target) {
            hi -= 1
        } else {
            return [lo + 1, hi + 1]
        }
    }
    return [-1, -1]
}
```

用两个指针，初始分别位于第一个元素和最后一个元素位置，比较这两个元素之和与目标值大小。若比目标值小，将较小元素增一再比较；若比目标值大，将较大元素减一再比较。直至与目标值相同，则有唯一解。  
时间复杂度：O(n)，每个元素至多被访问一次；空间复杂度：O(1)。

# 2.平方数之和
[#633 平方数之和（简单）](https://leetcode-cn.com/problems/sum-of-square-numbers/description/)

给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a\^2 + b\^2 = c。  
示例1:
```html
输入: 5
输出: True
解释: 1 * 1 + 2 * 2 = 5
```
示例2:
```html
输入: 3
输出: False
```

[解答](/src/sum-of-square-numbers.js)

```JavaScript
var judgeSquareSum = (c) => {
    for (a = 0; a * a <= c; a++) {
        b = Math.sqrt(c - a * a)
        if (b == Math.floor(b)) {
            return true
        }
    }
    return false
}
```

假设a为一个不大于sqrt(c)的整数，代入a^2+b^2=c解得b=sqrt(c-a^2)，判断b是否为整数。若b不为整数，则使a增一继续寻找对应的b；若b为整数，则找到符合要求的整数a、b。  
也可以使用上一题的写法。  
时间复杂度：O(sqrt(c))，因为a不大于sqrt(c)；空间复杂度：O(1)。
