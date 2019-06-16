import {
  emailVerify,
  isEmptyNull,
  phoneNumVerify
} from '../../../static/util_js/verify'
import {
  removeClass,
  addClass
} from '../../../static/util_js/dom'
export const sysUserCtrl = {
  data() {
    const validateAddUserId = (rule, value, callback) => {
      if (isEmptyNull(value)) {
        callback(new Error('用户ID不能为空'));
        return false;
      } else {
        callback();
        return true;

      }
    };
    const validateAddUserName = (rule, value, callback) => {
      if (isEmptyNull(value)) {
        callback(new Error('用户昵称不能为空'));
      } else {
        callback();
      }
    };
    const validateAddUserEmail = (rule, value, callback) => {
      if (!emailVerify(value)) {
        callback(new Error('邮箱输入有误'));
      } else {
        callback();
      }
    };
    const validateAddUserPhone = (rule, value, callback) => {
      if (!phoneNumVerify(value)) {
        callback(new Error('手机号码输入有误'));
      } else {
        callback();
      }
    };
    const validateAddUserType = (rule, value, callback) => {
      if (isEmptyNull(value)) {
        callback(new Error('用户类型不能为空'));
      } else {
        callback();
      }
    };
    return {
      formCustom: {
        addUserId: '', //名称与ruleCustom内的要一致
        addUserName: '',
        addUserEmail: '',
        addUserPhone: '',
        addUserType:''
      },
      ruleCustom: {
        addUserId: [{
          validator: validateAddUserId,
          trigger: 'blur'
        }],
        addUserName: [{
          validator: validateAddUserName,
          trigger: 'blur'
        }],
        addUserEmail: [{
          validator: validateAddUserEmail,
          trigger: 'blur'
        }],
        addUserPhone: [{
          validator: validateAddUserPhone,
          trigger: 'blur'
        }],
        addUserType: [{
          validator: validateAddUserType,
          trigger: 'blur'
        }]
      },
      editModal: false, //编辑弹窗是否显示
      editModalConent: [], //编辑弹窗显示的内容
      deleteModal: false, //删除弹窗是否显示
      addUserModal: false, //添加新用户弹窗是否显示
      emptyId: false,
      inputUserId: "",
      // showIdTip:false,//是否显示错误提示
      inputNickName: "",
      inputEmail: "",
      inputPhone: "",
      userType: "普通用户",
      userTypeList: [{
          id: "1",
          typeName: "普通用户"
        },
        {
          id: "2",
          typeName: "电台用户"
        },
        {
          id: "3",
          typeName: "资源账号"
        },
        {
          id: "4",
          typeName: "版权者"
        }
      ],
      userId: "",
      nickname: "",
      userType: "",
      editUserType: '',
      ajaxHistoryData: [],
      userData: [],
      dataCount: 0,
      pageSize: 30,
      columns: [{
          title: "用户ID",
          key: "uuid",
          align: "center"
        },
        {
          title: "用户昵称",
          key: "nickname",
          align: "center"
        },
        {
          title: "邮箱",
          key: "userEmail",
          align: "center"
        },
        {
          title: "手机号码",
          key: "phoneNumber",
          align: "center"
        },
        {
          title: "用户类型",
          key: "usertype",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 180,
          align: "center",
          render: (h, params) => {
            //搜索用户id //搜索用户昵称 //搜索用户类型 //初始化信息总数 //每页显示条数
            return h("div", [
              h(
                "Button", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editModalShow(params.row, params.index);
                    }
                  }
                },
                "推荐"
              ),
              h(
                "Button", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editModalShow(params.row, params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button", {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteModalShow(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.generateData();
  },
  // watch: { //监听数据
  //   inputUserId: function (val) {
  //     if (isEmptyNull(val)) {
  //       removeClass(this.$refs.emptyId, 'none')
  //     } else {
  //       addClass(this.$refs.emptyId, 'none')
  //     }
  //   },
  //   inputNickName: function (val) {
  //     if (isEmptyNull(val)) {
  //       removeClass(this.$refs.emptyName, 'none')
  //     } else {
  //       addClass(this.$refs.emptyName, 'none')
  //     }
  //   },
  //   inputEmail: function (val) {
  //     if (emailVerify(val)) {
  //       addClass(this.$refs.emptyEmail, 'none')
  //     } else {
  //       removeClass(this.$refs.emptyEmail, 'none')
  //     }
  //   },
  //   inputPhone: function (val) {
  //     if (phoneNumVerify(val)) {
  //       addClass(this.$refs.emptyPhone, 'none')
  //     } else {
  //       removeClass(this.$refs.emptyPhone, 'none')
  //     }
  //   },
  //   userType: function (val) {
  //     if (isEmptyNull(val)) {
  //       removeClass(this.$refs.emptyType, 'none')
  //     } else {
  //       addClass(this.$refs.emptyType, 'none')
  //     }
  //   },
  //   // 编辑部分
  // },
  // computed: {
  //   checkId() {
  //     if (isEmptyNull(this.inputUserId)) {
  //       removeClass(this.$refs.emptyId, 'none')
  //       // this.emptyId = true
  //       return false
  //     } else {
  //       // this.emptyId = false
  //       addClass(this.$refs.emptyId, 'none')
  //       return true
  //     }
  //     if (isEmptyNull(this.editModalConent.uuid)) {
  //       removeClass(this.$refs.editId, 'none')
  //       return false
  //     } else {
  //       addClass(this.$refs.editId, 'none')
  //       return true
  //     }
  //   },
  //   checkName() {
  //     if (isEmptyNull(this.inputNickName)) {
  //       removeClass(this.$refs.emptyName, 'none')
  //       return false
  //     } else {
  //       addClass(this.$refs.emptyName, 'none')
  //       return true
  //     }
  //     if (isEmptyNull(this.editModalConent.nickname)) {
  //       removeClass(this.$refs.editName, 'none')
  //       return false
  //     } else {
  //       addClass(this.$refs.editName, 'none')
  //       return true
  //     }
  //   },
  //   checkEmail() {
  //     if (emailVerify(this.inputEmail)) {
  //       addClass(this.$refs.emptyEmail, 'none')
  //       return true
  //     } else {
  //       removeClass(this.$refs.emptyEmail, 'none')
  //       return false
  //     }
  //     if (emailVerify(this.editModalConent.userEmail)) {
  //       addClass(this.$refs.editEmail, 'none')
  //       return true
  //     } else {
  //       removeClass(this.$refs.editEmail, 'none')
  //       return false
  //     }
  //   },
  //   checkPhone() {
  //     if (phoneNumVerify(this.inputPhone)) {
  //       addClass(this.$refs.emptyPhone, 'none')
  //       return true
  //     } else {
  //       removeClass(this.$refs.emptyPhone, 'none')
  //       return false
  //     }
  //     if (phoneNumVerify(this.editModalConent.phoneNumber)) {
  //       addClass(this.$refs.editPhone, 'none')
  //       return true
  //     } else {
  //       removeClass(this.$refs.editPhone, 'none')
  //       return false
  //     }
  //   },
  //   checkUserType() {
  //     if (isEmptyNull(this.userType)) {
  //       removeClass(this.$refs.emptyType, 'none')
  //       return false
  //     } else {
  //       addClass(this.$refs.emptyType, 'none')
  //       return true
  //     }
  //     if (isEmptyNull(this.editUserType)) {
  //       removeClass(this.$refs.editType, 'none')
  //       return false
  //     } else {
  //       addClass(this.$refs.editType, 'none')
  //       return true
  //     }

  //   },
  // },
  methods: {
    clearAddData() {
      this.formCustom.addUserId = '';
      this.formCustom.addUserName = '';
      this.formCustom.addUserEmail = '';
      this.formCustom.addUserPhone = '';
      this.formCustom.addUserType = '';

    //   this.inputUserId = '';
    //   this.inputNickName = '';
    //   this.inputEmail = '';
    //   this.inputPhone = '';
    //   this.userType = '';
    //   // this.emptyId = false;
    //   addClass(this.$refs.emptyId, 'none');
    //   addClass(this.$refs.emptyName, 'none');
    //   addClass(this.$refs.emptyEmail, 'none');
    //   addClass(this.$refs.emptyPhone, 'none')
    //   addClass(this.$refs.emptyType, 'none');
    },

    //生成假数据
    generateData() {
      this.mockJsonData("/sys_user").then(res => {
        this.ajaxHistoryData = res.userArr;
        this.dataCount = res.userArr.length; //100长度
        this.handleListApproveHistory();
      });
    },
    //获取历史记录信息
    handleListApproveHistory() {
      // 保存取到的所有数据
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.ajaxHistoryData.length < this.pageSize) {
        this.userData = this.ajaxHistoryData;
      } else {
        this.userData = this.ajaxHistoryData.slice(0, this.pageSize);
      }
    },
    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.userData = this.ajaxHistoryData.slice(_start, _end);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    // 编辑弹窗
    editModalShow(params, index) {
      this.editModal = true;
      this.editModalConent = params
      console.log(index + JSON.stringify(params))
    },
    // 确定编辑
    confirmEdit() {
      // if (this.checkId && this.checkName && this.checkEmail && this.checkEmail && this.checkPhone && this.checkUserType) {
      //   this.addUserModal = false;
      // }
    },
    // 删除弹窗
    deleteModalShow(index) {
      this.deleteModal = true;
      console.log('删除=' + index)
    },
    // 确定删除
    confirmDelete() {
      this.$Message.error("删除失败");
      this.deleteModal = false;
    },
    // 取消
    cancel(isCloseModal) {
      if (isCloseModal) {
        this.addUserModal = false;
        this.editModal = false;
        this.deleteModal = false;
      }
    },
    // 新增用户
    addUser() {
      this.clearAddData();
      this.addUserModal = true;
    },
    // 确定新增用户
    confirmAdd() {
      if(!isEmptyNull(this.formCustom.addUserId) 
      && !isEmptyNull(this.formCustom.addUserName) 
      && emailVerify(this.formCustom.addUserEmail) 
      && phoneNumVerify(this.formCustom.addUserPhone)
      && !isEmptyNull(this.formCustom.addUserType)){
        this.addUserModal = false;
      }else{
        alert('信息填写有误')
      }
      // if (this.checkId && this.checkName && this.checkEmail && this.checkEmail && this.checkPhone && this.checkUserType) {
      //   // this.clearAddData();
      //   this.addUserModal = false;
      // }
      // var objThis = this;
      // // 验证用户id
      // if (isEmptyNull(objThis.inputUserId)) {
      //   removeClass(objThis.$refs.emptyId, 'none')
      // }
      // // 验证用户昵称
      // else if (isEmptyNull(objThis.inputNickName)) {
      //   removeClass(objThis.$refs.emptyName, 'none')
      // }
      // // 验证邮箱
      // else if (!emailVerify(objThis.inputEmail)) {
      //   removeClass(objThis.$refs.emptyEmail, 'none')
      // }
      // // 验证手机号
      // else if (!phoneNumVerify(objThis.inputPhone)) {
      //   removeClass(objThis.$refs.emptyPhone, 'none')
      // }
      // // 验证用户类型
      // else if (isEmptyNull(objThis.userType)) {
      //   removeClass(objThis.$refs.emptyType, 'none')
      // } else {
      //   // this.clearAddData();
      //   this.addUserModal = false;
      // }
    },
    //查询
    search() {
      console.log(this.userData);
      let searchArr = [];
      for (let i = 0; i < this.userData.length; i++) {
        if (this.userId == this.userData[i].uuid) {
          searchArr.push(this.userData[i]);
        } else if (this.nickname == this.userData[i].nickname) {
          searchArr.push(this.userData[i]);
        } else if (this.userType == this.userData[i].usertype) {
          searchArr.push(this.userData[i]);
        }
      }
      if (searchArr.length == 0) {
        this.$Message.error("匹配失败");
      } else {
        this.userData = searchArr;
      }
    }
  }
};
