//日期格式
let formatTime = (date, type) => {
  let dataTime = '';
  date = typeof date == "object" ? date : new Date(Number(date));
  const year = date.getFullYear();
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  const hour = formatNumber(date.getHours());
  const minute = formatNumber(date.getMinutes());
  const second = formatNumber(date.getSeconds());
  if(type == "YMD"){
    dataTime =  year + "-"+ month + "-" + day;
  } else if(type == "YMDHMS"){
    dataTime = year + "-" + month + "-" + day + " " + hour + ":"+ minute + ":" + second;
  } else if(type == "HMS"){
    dataTime = hour + ":" + minute + ":" + second;
  }

  function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }
  
  return dataTime;
};
export { formatTime };

//举报类型
let reportType = (type) => {
  let name = '';
  type = typeof type == "Number" ? type : Number(type);
  switch(type){
    case 0:
      name = "普通声音";
      break;
    case 1:
      name = "声音评论";
      break;
    case 2:
      name = "声音评论回复";
      break;
    case 3:
      name = "付费专辑";
      break;
    case 4:
      name = "付费声音";
      break;
    case 5:
      name = "付费声音评论";
      break;
    case 6:
      name = "付费声音评论回复";
      break;
    case 7:
      name = "付费专辑评论";
      break;
    case 8:
      name = "付费专辑评论回复";
      break;
    case 9:
      name = "普通专辑";
      break;
    case 10:
      name = "普通专辑评论";
      break;
    case 11:
      name = "普通专辑评论回复";
      break;
    case 12:
      name = "动态";
      break;
    case 13:
      name = "动态评论";
      break;
    case 14:
      name = "动态评论回复";
      break;
    case 15:
      name = "直播";
      break;
    case 16:
      name = "用户";
      break;
  }
  return name;
};
export { reportType };

//举报状态
let reportStatus = (status) => {
  let name = '';
  status = typeof status == "Number" ? status : Number(status);
  switch(status){
    case 0:
      name = "未处理";
      break;
    case 1:
      name = "已处理";
      break;
  }
  return name;
};
export { reportStatus };

//举报处理结果
let reportResult = (type) => {
  let name = '';
  type = typeof type == "Number" ? type : Number(type);
  switch(type){
    case 0:
      name = "有效举报";
      break;
    case 1:
      name = "无效举报";
      break;
    default:
      name = '无';
  }
  return name;
};
export { reportResult };

/*------lmr start-------*/
//直播管理
//直播模式
let liveType = (type) => {
  let name = '';
  type = typeof type == "Number" ? type : Number(type);
  switch(type){
      case 1:
        name = "电台";
        break;
      case 2:
        name = "角色扮演";
        break;
      default:
        name = "无";
    }
    return name;
};
export { liveType };

//直播状态
let liveStatus = (type) =>{
    let name = '';
    type = typeof type == "Number" ? type : Number(type);
    switch(type){
      case 0:
        name = "取消直播";
        break;
      case 1:
        name = "尚未直播";
        break;
      case 2:
        name = "直播中断";
        break;
      case 3:
        name = "已禁用";
        break;
      case 4:
        name = "直播结束";
        break;
      case 5:
        name = "直播中";
        break;
      default:
        name = "无";
    }
    return name;
  }
  export { liveStatus };

//直播隐私
let liveSecret = (type) =>{
    let name = '';
    type = typeof type == "Number" ? type : Number(type);
    switch(type){
      case 0:
        name = "公开";
        break;
      case 1:
        name = "隐私";
        break;
      default:
        name = "无";
    }
    return name;
  }
  export { liveSecret };

//礼物上架状态
let putawayStatus = (type) =>{
    let name = '';
    type = typeof type == "Number" ? type : Number(type);
    switch(type){
      case 0:
        name = "未上架";
        break;
      case 1:
        name = "已上架";
        break;
      default:
        name = "无";
    }
    return name;
}
export { putawayStatus };

//礼物等级
let giftLevel = (type) =>{
    let name = '';
    type = typeof type == "Number" ? type : Number(type);
    switch(type){
      case 1:
        name = "初级礼物";
        break;
      case 2:
        name = "中极礼物";
        break;
      case 3:
        name = "高级礼物";
        break;
      default:
        name = "无";
    }
    return name;
}
export { giftLevel };
/*------lmr end-------*/

/*xh start*/
/*推荐管理*/
//推荐版块
let userRecommendPickedType = (type) => {
  let name = '';
  type = typeof type == "String" ? type : type.toString();
  if(type.indexOf("1") >= 0){
    name += "热门主播,";
  }
  if(type.indexOf("2") >= 0){
    name += "新晋主播,";
  }
  if(type.indexOf("3") >= 0){
    name += "S2金牌主播";
  }
  return name;
}
export { userRecommendPickedType };

//用户等级
let userLevel = (type, isCopyrightOwner) => {
  let name = '';
  type = typeof type == "Number" ? type : Number(type);
  isCopyrightOwner = typeof isCopyrightOwner == "Number" ? isCopyrightOwner : Number(isCopyrightOwner);
  if(isCopyrightOwner == 1){
    name = "资源账号";
    return name;
  }
  switch(type){
    case 0:
      name = "普通用户";
      break;
    case 1:
      name = "电台";
      break;
    case 2:
      name = "资源账号";
      break;
    case 2:
      name = "版权方";
      break;
  }
  return name;
}
export { userLevel };

//用户状态
let userStatus = (status) => {
  let name = '';
  status = typeof status == "Number" ? status : Number(status);
  switch(status) {
    case 0:
      name = '锁定';
      break;
    case 1:
      name = '正常';
      break;
  }
  return name;
}
export { userStatus };

//新用户推荐类型
let newUserPickedType = (type) => {
  let name = '';
  type = typeof type == "Number" ? type : Number(type);
  switch(type) {
    case 0:
      name = '普通用户';
      break;
    case 1:
      name = '电台';
      break;
    case 2:
      name = '专辑';
      break;
  }
  return name;
}
export { newUserPickedType };

// 新用户推荐状态
let newUserStatus = (status) => {
  let name = '';
  status = typeof status == "Number" ? status : Number(status);
  switch(status) {
    case 1:
      name = '正常';
      break;
    case 2:
      name = '默认关注';
      break;
  }
  return name;
}
export { newUserStatus };

/* ----- 创作平台 lx start -----*/
//版权方认证审核状态
let veriStatus = (type) => {
  let name = '';
  type = typeof type == "Number" ? type : Number(type);
  switch (type) {
    case 0:
      name = "待审核";
      break;
    case 1:
      name = "审核通过";
      break;
    case 2:
      name = "审核未通过";
      break;
  }
  return name;
}
export {
  veriStatus
};

// 任务管理-任务列表 是否置顶
let taskIsTop = (type) => {
  let name = '';
  type = typeof type == "Number" ? type : Number(type);
  switch (type) {
    case 0:
      name = "否";
      break;
    case 1:
      name = "是";
      break;
    case 2:
  }
  return name;
}
export {
  taskIsTop
};

// 任务管理-任务列表 任务状态
let taskStatus = (type,time) => {
  let name = '';
  var today = new Date().getTime();
  type = typeof type == "Number" ? type : Number(type);
  if (type == 1) {
    if (time * 1000 < today) {
      name = "任务已结束"
    } else {
      name = "任务进行中"
    }
  } else if (type == 2) {
    name = "任务已结束"
  } else if (type == 6) {
    name = "任务已下架"
  }
  return name;
}
export {
  taskStatus
};
/* -----创作平台 lx end -----*/