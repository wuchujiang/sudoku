const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 阿拉伯数字转大写汉字
const sectionToChinese = section =>  {
  let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
  let chnUnitChar = ["", "十", "百", "千"];
  let strIns = '', chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}

const numToMinute = (num) => {
  const number = parseInt(num);
  if(num === 0) {
    return '00:00';
  }
  const tenbits = Math.floor(number / 60);
  const position = number % 60;
  return `${formatNumber(tenbits)}:${formatNumber(position)}`;
}

module.exports = {
  formatTime: formatTime,
  sectionToChinese,
  numToMinute,
}
