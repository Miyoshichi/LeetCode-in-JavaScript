/**
 * @param {number[][]} points
 * @return {number}
 */

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

// test
let points = [[10, 16], [2, 8], [1, 6], [7, 12]]
console.log(findMinArrowShots(points))