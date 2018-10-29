// 关卡数据
const levelData = [[[0, 9, 7, 2, 5, 0, 3, 6, 0],
[6, 5, 8, 3, 4, 0, 1, 9, 2],
[4, 2, 3, 1, 9, 6, 0, 5, 8],
[7, 1, 6, 4, 8, 0, 2, 3, 5],
[9, 4, 0, 5, 1, 0, 8, 7, 0],
[3, 0, 0, 0, 0, 2, 4, 0, 9],
[2, 6, 1, 8, 3, 5, 9, 4, 0],
[8, 7, 4, 0, 6, 1, 0, 2, 3],
[0, 0, 9, 0, 2, 0, 6, 0, 1]],
[[1, 9, 7, 2, 5, 0, 3, 6, 4],
[6, 0, 8, 0, 4, 7, 0, 0, 0],
[4, 2, 0, 0, 9, 0, 0, 0, 8],
[0, 1, 6, 4, 8, 9, 0, 3, 5],
[0, 0, 2, 0, 1, 0, 0, 7, 6],
[3, 8, 0, 6, 7, 2, 4, 1, 0],
[2, 0, 1, 8, 3, 5, 9, 0, 7],
[8, 0, 4, 0, 6, 1, 5, 2, 3],
[0, 0, 9, 7, 0, 4, 0, 0, 0]],
[[0, 0, 7, 2, 5, 8, 0, 6, 0],
[0, 5, 8, 3, 4, 7, 0, 0, 0],
[4, 0, 3, 0, 9, 0, 7, 5, 8],
[0, 1, 0, 4, 8, 9, 2, 3, 5],
[0, 0, 0, 0, 0, 3, 8, 0, 6],
[0, 8, 5, 6, 7, 2, 4, 1, 9],
[0, 6, 1, 0, 0, 0, 9, 0, 0],
[8, 0, 0, 9, 0, 1, 5, 2, 0],
[5, 0, 9, 7, 0, 0, 0, 0, 0]],
[[0, 9, 0, 2, 0, 0, 3, 6, 4],
[6, 0, 0, 3, 0, 7, 0, 9, 0],
[4, 2, 3, 1, 9, 6, 0, 0, 8],
[7, 0, 0, 4, 8, 9, 2, 3, 5],
[0, 4, 0, 5, 1, 3, 0, 7, 6],
[0, 8, 5, 6, 0, 2, 0, 1, 0],
[0, 6, 0, 8, 3, 5, 9, 4, 7],
[8, 0, 4, 0, 0, 1, 5, 0, 0],
[5, 3, 9, 7, 0, 0, 0, 8, 0]],
[[0, 0, 7, 0, 5, 0, 3, 0, 0],
[0, 0, 8, 3, 4, 7, 0, 0, 2],
[4, 0, 3, 0, 0, 0, 0, 5, 0],
[0, 1, 0, 0, 8, 0, 2, 0, 0],
[9, 4, 2, 0, 1, 3, 0, 7, 6],
[3, 0, 0, 0, 7, 2, 4, 0, 0],
[2, 0, 1, 8, 0, 5, 9, 4, 7],
[8, 7, 0, 9, 6, 0, 0, 2, 0],
[5, 3, 9, 7, 0, 0, 6, 8, 1]],
[[0, 9, 0, 0, 5, 8, 0, 6, 4],
[0, 5, 0, 3, 4, 7, 1, 9, 0],
[0, 2, 0, 0, 0, 6, 0, 0, 0],
[0, 1, 6, 0, 8, 0, 2, 0, 5],
[0, 0, 0, 5, 1, 3, 8, 7, 6],
[3, 0, 0, 6, 0, 0, 0, 0, 9],
[2, 6, 1, 8, 0, 0, 0, 0, 0],
[0, 7, 0, 9, 0, 1, 0, 0, 3],
[5, 3, 9, 7, 0, 4, 0, 0, 1]],
[[1, 0, 7, 0, 5, 0, 0, 6, 0],
[0, 0, 8, 0, 4, 0, 1, 9, 0],
[0, 2, 3, 1, 9, 0, 7, 0, 8],
[0, 0, 6, 4, 8, 9, 0, 3, 0],
[0, 0, 2, 0, 1, 3, 8, 7, 0],
[3, 8, 0, 0, 7, 0, 0, 0, 9],
[0, 6, 0, 8, 0, 5, 0, 4, 7],
[8, 0, 4, 9, 6, 0, 5, 0, 3],
[5, 0, 9, 0, 0, 0, 0, 8, 1]],
[[1, 0, 7, 0, 0, 0, 0, 6, 4],
[0, 5, 8, 3, 4, 7, 0, 0, 2],
[4, 2, 3, 0, 9, 6, 7, 0, 0],
[0, 1, 0, 4, 0, 0, 2, 0, 5],
[9, 0, 0, 5, 1, 0, 8, 7, 0],
[0, 8, 5, 6, 7, 0, 0, 1, 9],
[2, 0, 1, 8, 3, 5, 0, 4, 0],
[0, 7, 0, 0, 0, 1, 0, 2, 0],
[5, 0, 0, 0, 2, 0, 6, 8, 1]],
[[0, 9, 7, 0, 0, 0, 3, 0, 0],
[6, 0, 0, 0, 0, 0, 1, 0, 2],
[4, 2, 0, 0, 0, 6, 7, 0, 0],
[0, 1, 6, 0, 0, 9, 2, 0, 5],
[0, 0, 2, 5, 1, 3, 8, 7, 0],
[0, 8, 0, 6, 7, 2, 0, 0, 0],
[2, 0, 0, 0, 3, 5, 9, 0, 7],
[0, 0, 4, 0, 6, 0, 0, 2, 3],
[5, 3, 0, 0, 2, 4, 0, 8, 1]],
[[0, 9, 7, 0, 0, 0, 0, 6, 4],
[0, 5, 8, 3, 4, 0, 0, 0, 2],
[0, 2, 3, 1, 9, 6, 0, 0, 0],
[7, 1, 0, 0, 0, 9, 2, 0, 0],
[9, 0, 2, 5, 0, 3, 8, 7, 0],
[0, 8, 5, 6, 0, 2, 0, 1, 9],
[2, 6, 0, 0, 3, 5, 0, 0, 7],
[8, 0, 0, 9, 0, 1, 0, 0, 0],
[0, 0, 9, 0, 2, 0, 6, 0, 1]],
[[0, 0, 7, 2, 5, 0, 3, 6, 0],
[6, 5, 0, 0, 4, 7, 0, 9, 0],
[0, 0, 3, 0, 0, 0, 7, 0, 0],
[0, 1, 6, 4, 0, 0, 0, 0, 5],
[0, 4, 2, 0, 1, 0, 0, 0, 0],
[3, 8, 5, 0, 0, 2, 0, 1, 9],
[2, 6, 0, 8, 0, 5, 0, 4, 0],
[8, 7, 4, 9, 6, 1, 0, 0, 3],
[0, 0, 0, 0, 0, 0, 0, 8, 0]],
[[0, 9, 0, 2, 0, 8, 3, 6, 0],
[0, 5, 8, 0, 4, 0, 1, 0, 2],
[0, 2, 0, 1, 9, 6, 7, 0, 8],
[0, 1, 0, 0, 8, 9, 0, 3, 5],
[9, 0, 0, 0, 0, 0, 8, 0, 0],
[3, 8, 0, 6, 0, 2, 4, 1, 9],
[0, 6, 0, 8, 3, 5, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 2, 0],
[0, 0, 9, 0, 2, 4, 0, 8, 1]],
[[1, 0, 0, 2, 5, 0, 0, 0, 0],
[0, 0, 0, 3, 4, 0, 0, 0, 0],
[4, 0, 0, 0, 9, 6, 0, 0, 8],
[7, 0, 6, 4, 8, 0, 2, 3, 0],
[0, 0, 2, 5, 0, 3, 0, 0, 6],
[3, 0, 0, 6, 0, 2, 0, 0, 9],
[0, 6, 0, 8, 3, 0, 0, 4, 7],
[8, 7, 0, 9, 6, 0, 0, 2, 0],
[0, 0, 0, 0, 0, 4, 0, 0, 0]],
[[0, 9, 7, 0, 5, 0, 3, 0, 0],
[0, 5, 8, 0, 4, 0, 1, 0, 0],
[4, 0, 0, 0, 0, 6, 7, 0, 8],
[0, 1, 0, 0, 0, 0, 0, 3, 5],
[9, 4, 0, 0, 0, 3, 0, 7, 6],
[3, 8, 0, 6, 0, 2, 0, 0, 0],
[0, 0, 0, 8, 3, 0, 0, 0, 7],
[0, 0, 0, 0, 6, 0, 0, 0, 0],
[0, 0, 9, 0, 0, 4, 0, 0, 0]],
[[0, 0, 0, 0, 0, 8, 3, 6, 4],
[0, 0, 0, 3, 4, 7, 0, 0, 0],
[0, 0, 3, 1, 9, 0, 7, 5, 0],
[7, 0, 0, 0, 0, 0, 2, 0, 0],
[0, 0, 2, 5, 1, 0, 8, 7, 6],
[0, 0, 5, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 5, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 0, 2, 3],
[0, 0, 9, 7, 0, 4, 0, 0, 1]],
[[0, 9, 7, 2, 5, 8, 3, 0, 0],
[0, 0, 0, 0, 4, 0, 1, 0, 0],
[0, 2, 0, 0, 9, 0, 7, 0, 8],
[0, 1, 0, 0, 0, 0, 0, 0, 0],
[9, 0, 2, 0, 0, 0, 0, 0, 0],
[3, 0, 0, 0, 0, 0, 4, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 4, 0],
[0, 0, 4, 0, 6, 1, 5, 0, 3],
[0, 0, 0, 0, 2, 0, 6, 0, 1]],
[[1, 0, 0, 0, 0, 0, 3, 0, 0],
[6, 0, 0, 0, 0, 7, 0, 9, 2],
[0, 0, 0, 0, 9, 6, 0, 0, 0],
[7, 0, 0, 4, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 3, 0, 0, 0],
[3, 0, 0, 0, 7, 0, 0, 0, 9],
[0, 0, 0, 0, 3, 0, 0, 0, 0],
[0, 0, 4, 0, 6, 0, 5, 0, 0],
[0, 3, 9, 7, 2, 4, 0, 8, 0]],
[[0, 0, 0, 0, 5, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 7, 0, 9, 0],
[0, 2, 0, 0, 0, 6, 0, 0, 0],
[0, 0, 6, 0, 0, 9, 0, 0, 5],
[0, 0, 0, 0, 0, 3, 0, 0, 0],
[0, 0, 0, 0, 0, 2, 0, 0, 0],
[2, 6, 0, 0, 3, 5, 0, 0, 0],
[0, 0, 0, 9, 0, 1, 0, 0, 3],
[0, 3, 0, 7, 0, 4, 6, 0, 0]],
[[0, 0, 7, 2, 0, 0, 3, 6, 0],
[0, 0, 0, 0, 0, 0, 1, 9, 2],
[0, 2, 0, 1, 9, 6, 0, 0, 8],
[0, 0, 0, 4, 8, 9, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 8, 0, 0],
[3, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 3, 0, 0, 0, 0],
[8, 7, 0, 0, 0, 0, 0, 0, 3],
[0, 0, 0, 0, 0, 4, 0, 8, 0]],
[[1, 0, 7, 0, 5, 0, 0, 6, 0],
[0, 0, 8, 0, 4, 0, 0, 0, 0],
[4, 0, 0, 0, 9, 0, 7, 0, 0],
[0, 0, 0, 4, 0, 0, 2, 0, 0],
[0, 0, 0, 0, 0, 0, 8, 0, 6],
[0, 8, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[8, 0, 0, 0, 6, 1, 0, 0, 0],
    [5, 0, 0, 0, 0, 4, 0, 0, 0]]];

module.exports = levelData;