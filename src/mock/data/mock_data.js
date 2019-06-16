// 编辑mock数据

// 引入mockjs
const Mock = require("mockjs");
// Mock.mock( url, post/get , 返回的数据)

// home1的模拟数据
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
  let articles = [];
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }
  return {
    articles: articles
  };
};
Mock.mock("/home1", "post", produceNewsData);

//home2的模拟数据
const Goods = function() {
  let Goods = [];
  for (let i = 0; i < 10; i++) {
    let newGoods = {
      id: Mock.Random.integer(60, 100),
      desc: Mock.Random.cparagraph(10, 20),
      img: Mock.Random.image("200x100", "#4A7BF7", i)
    };
    Goods.push(newGoods);
  }
  return {
    Goods: Goods
  };
};
Mock.mock("/home2", "post", Goods);

//生成用户数据
const Users = function() {
  let userArr = [];
  for (let i = 0; i < 95; i++) {
    let user = {
      uuid: Random.id(),
      nickname: Random.cname(),
      userEmail: Random.email(),
      phoneNumber: Mock.mock({
        "number|1": /^1[0-9]{10}$/
      }).number,
      usertype: Mock.mock({
        "array|1": ["电台用户", "普通用户"]
      }).array
    };
    userArr.push(user);
  }
  return { userArr };
};
Mock.mock("/sys_user", "post", Users);

//生成声音数据
const voiceData = function() {
  let voiceArr = [];
  for (let i = 0; i < 95; i++) {
    let voice = {
      voiceId: Random.id(),
      voiceName: Random.name(),
      voiceType: Mock.mock({
        "array|1": ["大类", "小类"]
      }).array
    };
    voiceArr.push(voice);
  }
  return { voiceArr };
};
Mock.mock("/voiceManage", "post", voiceData);
