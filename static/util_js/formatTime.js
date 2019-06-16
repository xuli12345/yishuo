//日期格式转换
/*
const formatTime = (date, isWeek) => {
  date = typeof date == "object" ? date : new Date(Number(date));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (isWeek) {
    const weekDayArr = ["日", "一", "二", "三", "四", "五", "六"];
    return (
      "星期" +
      weekDayArr[weekday] +
      " " +
      [hour, minute].map(formatNumber).join(":")
    );
  } else {
    return [year, month, day].map(formatNumber).join("-");
  }
};

//时长转换
// const formatDuration = duration => {
//   const durationHour = parseInt(duration / 3600);
//   const durationMin = parseInt((duration % 3600) / 60);
//   const durationSec = parseInt((duration % 3600) % 60);
//   if (durationHour > 0) {
//     return [durationHour, durationMin, durationSec].map(formatNumber).join(":");
//   } else {
//     return [durationMin, durationSec].map(formatNumber).join(":");
//   }
// };

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

// 为了供全局使用，无需重复调用
export default {
  install(Vue, options) {
    Vue.prototype.formatTime = formatTime;
  }
};
*/