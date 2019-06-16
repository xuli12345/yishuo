// 验证邮箱
export function emailVerify(email) {
  var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
  if (email == "" || !reg.test(email)) { //正则验证不通过，格式不对
    return false;　　
  } else {　　　　
    return true;　　
  }
}

// 验证手机号
export function phoneNumVerify(phoneNum) {
  var reg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
  if (phoneNum == "" || !reg.test(phoneNum)) { //正则验证不通过，格式不对
    return false;　　
  } else {　　　　
    return true;　　
  }
}

// 验证密码，6-20位字母加数字
export function passwordVerify(password) {
  var reg = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$")
  if (password == "" || !reg.test(password)) { //正则验证不通过，格式不对
    return false;　　
  } else {　　　　
    return true;　　
  }
}
// 验证是否为空
export function isEmptyNull(str) {
  if (str == null) {
      return true
  }
  if (typeof str == "undefined") {
      return true
  }
  if (str == "undefined") {
      return true
  }
  if (str.length == 0) {
      return true
  }
  if (str == "") {
      return true
  }
  if (typeof str == "number" && str == 0) {
      return true
  }
  return false
};