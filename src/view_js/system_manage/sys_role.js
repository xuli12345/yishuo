import {
  emailVerify,
  isEmptyNull,
  phoneNumVerify
} from '../../../static/util_js/verify'
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
        addUserType:'',
        
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
      userTypeList: [
        {
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
      addUserModal: false, //添加新用户弹窗是否显示
    }
  },

  methods: {
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
      // this.clearAddData();
      this.addUserModal = true;
    },
    // 确定新增用户
    confirmAdd() {
      console.log(isEmptyNull(this.formCustom.addUserId))
      // if(!this.validateAddUserId){
      //   alert('fd')
      // }else{
      //   alert('fdashjkf')
      // }
      // if (this.checkId && this.checkName && this.checkEmail && this.checkEmail && this.checkPhone && this.checkUserType) {
      //   // this.clearAddData();
      //   this.addUserModal = false;
      // }

    },
  }
};
