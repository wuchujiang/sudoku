// 撤销功能伪代码

// {cursor: 0,
//   source: [''],
//     test: '',
// }
// back() {
//   let { source, cursor } = this.state;
//   cursor -= 1;

//   if (cursor < 0) {
//     return;
//   }
//   this.setState({
//     test: source[cursor],
//     cursor,
//   });
// }

// run() {
//   let { source, cursor } = this.state;
//   cursor += 1;
//   if (cursor >= source.length) {
//     return;
//   }

//   this.setState({
//     test: source[cursor],
//     cursor,
//   });
// }

// change(value) {
//   // 撤销以后，
//   const { source, cursor } = this.state;
//   let sourceData;
//   // 判断游标的位置

//   // 游标不在最后的位置， 截取游标之前的数据
//   if (cursor !== source.length) {
//     sourceData = source.slice(0, cursor + 1).concat(value);
//   } else {
//     sourceData = source.concat(value);
//   }
//   // 控制最多只能后退8次；
//   if (sourceData.length > 9) {
//     sourceData.shift();
//   }
//   this.setState({
//     test: value,
//     source: sourceData,
//     cursor: sourceData.length - 1,
//   });
// }