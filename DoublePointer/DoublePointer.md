# 双指针
* [1. 两数之和](#1-两数之和)
* [2. 平方数之和](#2-平方数之和)
* [3. 反转字符串中的元音字母](#3-反转字符串中的元音字母)
* [4. 验证回文字符串](#4-验证回文字符串)
* [5. 合并两个有序数组](#-5合并两个有序数组)

# 1. 两数之和

[#167 两数之和 II - 输入有序数组（简单）](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

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

[解答](src/two-sum-ii-input-array-is-sorted.js)

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

# 2. 平方数之和

[#633 平方数之和（简单）](https://leetcode-cn.com/problems/sum-of-square-numbers/)

给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a^2 + b^2 = c。  
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

[解答](src/sum-of-square-numbers.js)

```JavaScript
var judgeSquareSum = c => {
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

# 3. 反转字符串中的元音字母

[#345 反转字符串中的元音字母（简单）](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)

编写一个函数，以字符串作为输入，反转该字符串中的元音字母。  
示例 1:
```html
输入: "hello"
输出: "holle"
```
示例 2:
```html
输入: "leetcode"
输出: "leotcede"
```

[解答](src/reverse-vowels-of-a-string.js)

```JavaScript
var reverseVowels = s => {
    const vowels = 'aiueoAIUEO'
    var lo = 0
    var hi = s.length - 1
    s = s.split('')
    while (lo < hi) {
        if (vowels.indexOf(s[lo]) == -1) {
            lo += 1
        } else {
            if (vowels.indexOf(s[hi]) == -1) {
                hi -= 1
            } else {
                [s[lo], s[hi]] = [s[hi], s[lo]]
                lo += 1
                hi -= 1
            }
        }
    }
    s = s.join('')
    return s
}
```

首先从输入的字符串头部向后依次遍历字符串中的字母，直至当前字母为元音。当该字母为元音时，从字符串尾部向前依次遍历字符串中的字母，直至当前字母也为元音，并交换两字母。直至前后遍历的字母重合时，停止遍历。  
时间复杂度：O(n)，每个元素至多被访问一次；空间复杂度：O(1)。

# 4. 验证回文字符串

[#680 验证回文字符串 Ⅱ（简单）](https://leetcode-cn.com/problems/valid-palindrome-ii/)

给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。  
示例 1:
```html
输入: "aba"
输出: True
```
示例 2:
```html
输入: "abca"
输出: True
解释: 你可以删除c字符。
```

[解答](src/valid-palindrome-ii.js)

```JavaScript
var validPalindrome = s => {
    let isPalindrome = (s, lo = 0, hi = s.length - 1) => {
        for (; lo < hi; lo++, hi--) {
            if (s[lo] != s[hi]) {
                let bool = false
                return {lo: lo, hi: hi, bool: bool}
            }
        }
        let bool = true
        return {lo: lo, hi: hi, bool: bool}
    }    
    if (isPalindrome(s).bool) {
        return true
    } else {
        let [lo, hi] = [isPalindrome(s).lo, isPalindrome(s).hi]
        return isPalindrome(s, lo + 1, hi).bool || isPalindrome(s, lo, hi - 1).bool
    }
}
```

首先判断输入的字符串是否是回文字符串：使用两个指针，一个从左至右遍历，一个从右至左遍历，这两个指针每同时移动一个位置，判断当前字母是否相同。如果遍历结束后都相同，则这个字符串是回文字符串。当存在不同时，可以使左边的指针向右移动一个位置，或使右边的指针向左移动一个位置跳过当前字母，并判断两个指针中间剩余的字符串是否为回文字符串，相当于删除了当前字母。如果剩余字符串是回文字符串，则原字符串可删除一个字母成为回文字符串；如果剩余字符串还不是回文字符串，则说明原字符串即便删除一个字母后，仍然不是回文字符串。
时间复杂度：O(N)，每个字母至多被访问一次；空间复杂度：O(1)。

# 5. 合并两个有序数组

[#88 合并两个有序数组（简单）](https://leetcode-cn.com/problems/merge-sorted-array)

给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。  
说明:  
初始化 nums1 和 nums2 的元素数量分别为 m 和 n。  
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。  
示例:
```html
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3
输出: [1,2,2,3,5,6]
```

[解答](src/merge-sorted-array-3.js)

```JavaScript
var merge = (nums1, m, nums2, n) => {
    let p1 = m - 1
    let p2 = n - 1
    let p = m + n - 1
    while (p1 >= 0 && p2 >= 0) {
        if (nums2[p2] > nums1[p1]) {
            nums1[p] = nums2[p2]
            p2 -= 1
        } else {
            nums1[p] = nums1[p1]
            p1 -= 1
        }
        p -= 1
    }
    let nums2Res = nums2.splice(0, p2 + 1)
    nums1.splice(0, p2 + 1, ...nums2Res)
}
```

在每个数组需要保留的最后一个元素上分别设置一个指针，从后向前遍历两个数组，比较这两个数之间的大小，于第一个数组的最末尾开始依次放置将较大的那个数，并把较大的数所在的数组上的指针向前移动一位，直至这两个数组上的指针有一个已经到达数组开头，再将另一个数组上剩余的元素复制到第一个数组上。  
时间复杂度：O(m+n)，需要遍历两个数组保留的元素各一次；空间复杂度：O(1)。  

此外，还有一些复杂度较高的解法：[合并后排序](src/merge-sorted-array-1.js)，[双指针：向后遍历](src/merge-sorted-array-2.js)，[一前一后遍历](src/merge-sorted-array-origin.js)。
