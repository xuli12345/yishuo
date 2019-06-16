export const loginCtrl = {
  name: "login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [{
          required: true,
          message: "账号不能为空",
          trigger: "blur"
        }],
        password: [{
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }]
      },
      login_type: 4, //登录类型
      nickname: "",
      avatar: "",
      reg_channel: "",
      check_code: "", //校验码
      text: "",
      code: "", //生成的校验码
      show_error: false //校验状态
    };
  },
  created() {
    $("canvas").show();
  },
  mounted() {
    this.create_code();
  },
  methods: {
    //生成code
    create_code() {
      function shuffle() {
        const arr = [
          "1",
          "r",
          "Q",
          "4",
          "S",
          "6",
          "w",
          "u",
          "D",
          "I",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "2",
          "s",
          "t",
          "8",
          "v",
          "7",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "9",
          "E",
          "F",
          "G",
          "H",
          "0",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "3",
          "R",
          "5",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];
        return arr.sort(function () {
          return Math.random() - 0.5;
        });
      }
      shuffle();

      var show_code = () => {
        let ar1 = "";
        let code = shuffle();
        for (let i = 0; i < 4; i++) {
          ar1 += code[i];
        }
        this.check_code = ar1;
      };
      show_code();
    },
    //验证校验码
    textBlur() {
      if (this.text.toLowerCase() == this.check_code.toLowerCase()) {
        this.show_error = false;
      } else {
        this.show_error = true;
        this.create_code();
      }
    },
    loginSubmitTest() {
      if (this.text.toLowerCase() == this.check_code.toLowerCase()) {
        $("canvas").hide();
        this.$router.push({
          name: "general_view"
        });
      } else {
        this.show_error = true;
        this.create_code();
        this.text = "";
      }
    },
    loginSubmit() {
      this.$api.login(
        this.login_type,
        this.username,
        this.password,
        this.nickname,
        this.avatar,
        this.reg_channel
      ).then(res => {
        if (res.code == 200) {
          $("canvas").hide();
          this.$router.push({
            name: "general_view"
          });
          // Cookies.set("userName", this.form.userName);
          // Cookies.set("password", this.form.password);
          // Cookies.set("userId", res.data.user_id);
          // this.setUserId(res.data.user_id);
          // console.log(res.data)
          // this.$router.push("voiceList");
        } else {
          console.log("错误");
        }
      });
    },
  }
};
