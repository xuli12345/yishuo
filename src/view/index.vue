<template>
  <div class="layout">
    <Header>
      <a class="logo" href="/home"><img src="../../static/img/logo.png" alt="">
        <span>一说管理平台</span>
      </a>
      <div class="userinfo">
        <Dropdown placement="bottom-end">
          <span class="head-name">
            <span class="userName">{{curUserName}} </span>
            <span class="logout" @click="logout()">退出 </span>
            <span class="alterPassword" @click="modifyPassWord()">修改密码 </span>
          </span>
        </Dropdown>

      </div>
    </Header>
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu :mode="modeType" theme="light" width="auto" @on-select="menuSelect" accordion>
          <template v-for="(item,index) in routesList">
            <template v-for="(child,childIndex) in item.children">
              <!-- 多个叶子 两级目录-->
              <Submenu :name="child.name" v-if="!child.leaf && !child.isThree">
                <template slot="title">
                  <Icon :type="child.iconCls" :size="iconSize"></Icon>
                  <span class="layout-text">{{child.title}}</span>
                </template>
                <template v-for="(childItem,childItemIndex) in child.children">
                  <Menu-item v-if="!childItem.isDetail" :name="childItem.name">{{childItem.title}}</Menu-item>
                </template>
              </Submenu>
              <!-- 多个叶子 三级目录下-->
              <Submenu :name="child.name" v-if="!child.leaf && child.isThree">
                <template slot="title">
                  <Icon :type="child.iconCls" :size="iconSize"></Icon>
                  <span class="layout-text">{{child.title}}</span>
                </template>

                <!-- 没有第三级孩子页面-->
                <template v-for="(childItem,childItemIndex) in child.children" v-if="!childItem.isThreeChild">
                  <Menu-item v-if="!childItem.isDetail" :name="childItem.name">{{childItem.title}}</Menu-item>
                </template>

                <!--具有第三级孩子页面-->
                <template v-for="(childItem,childItemIndex) in child.children" v-if="childItem.isThreeChild">
                  <Submenu :name="childItem.name">
                    <template slot="title">
                      <Icon :type="childItem.iconCls" :size="iconSize"></Icon>
                      <span class="layout-text">{{childItem.title}}</span>
                    </template>
                    <template v-for="(childItem3,childItem3Index) in childItem.children">
                      <Menu-item v-if="!childItem3.isDetail" :name="childItem3.name">{{childItem3.title}}</Menu-item>
                    </template>
                  </Submenu>
                </template>

              </Submenu>

              <!--一个叶子 -->
              <template v-if="child.leaf">
                <Menu-item :name="child.path">
                  <Icon :type="child.iconCls" :size="iconSize"></Icon>
                  <span class="layout-text">{{child.title}}</span>
                </Menu-item>
              </template>
            </template>

          </template>

        </Menu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-header">
          <div class="layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
              <Breadcrumb-item>{{$route.meta.title}}</Breadcrumb-item>
            </Breadcrumb>
          </div>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
      </i-col>
    </Row>
    <template>
      <Modal v-model="modal1" title="修改密码">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <Form-item label="原密码" prop="oldPassword">
            <Input v-model="formValidate.oldPassword" placeholder="请输入原始密码"></Input>
          </Form-item>
          <Form-item label="新密码" prop="newPassword">
            <Input v-model="formValidate.newPassword" placeholder="请输入新密码"></Input>
          </Form-item>
          <Form-item label="确认新密码" prop="resetPassword">
            <Input v-model="formValidate.resetPassword" placeholder="请再次输入新密码"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button @click="cancel" class="borderNone">取消</Button>
          <Button type="primary" @click="confirmEdit">确定</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import { passwordVerify, isEmptyNull } from 'static/util_js/verify'
import {
  removeClass,
  addClass
} from 'static/util_js/dom'
export default {
  created() {
    this.routesList.push(this.$router.options.routes[2]);
    console.log(this.$router);

  },
  data() {
    return {
      modal1: false,

      formValidate: {
        oldPassword: "",
        newPassword: "",
        resetPassword: ""
      },
      ruleValidate: {
        oldPassword: [
          { required: true, message: "原始密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        resetPassword: [
          { required: true, message: "与新密码不一致", trigger: "blur" }
        ]
      },

      routesList: [],
      curUserName: "晴",
      modeType: "vertical",
      spanLeft: 5, //spanLeft 左侧宽度大于等于5时显示，主要是为了点击按钮隐藏用的,没什么实际意义
      spanRight: 19,
      logoIsDisplay: false
    };
  },
  computed: {
    iconSize() {
      return this.spanLeft === 5 ? 14 : 24;
    },
    logoSize() {
      if (this.spanLeft !== 5) {
        this.logoIsDisplay = true;
        return 50;
      } else {
        this.logoIsDisplay = false;
        return 0;
      }
    },
    checkOldPsd() {
      if (isEmptyNull(this.oldPassword)) {
        removeClass(this.$refs.emptyOld, 'none')
        return false
      } else {
        addClass(this.$refs.emptyOld, 'none')
        return true
      }
    },
    checkNewPsd() {
      if (passwordVerify(this.newPassword)) {
        addClass(this.$refs.emptyNew, 'none')
        return true
      } else {
        removeClass(this.$refs.emptyNew, 'none')
        return false
      }
    },
    checkResetPsd() {
      if (this.newPassword === this.resetPassword) {
        addClass(this.$refs.emptyReset, 'none')
        return true
      } else {
        removeClass(this.$refs.emptyReset, 'none')
        return false
      }
    },
  },
  methods: {
    modifyPassWord() {
      this.modal1 = true;
    },
    logout() {
      this.$router.push("/login");
    },
    confirmEdit() {
      if (this.checkOldPsd && this.checkNewPsd && this.checkResetPsd) {
        this.modal1 = false;
      }
    },
    cancel() {
      this.modal1 = false;
    },
    menuSelect(name) {
      this.$router.push({ path: name });
    }
  }
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
@import "static/sass/variable"
@import "static/sass/popup"
.ivu-col-span-19
  width: 85%
  .layout-header
.ivu-col-span-5
  width: 15%
.ivu-menu-item>i,.ivu-menu-submenu-title>i
  font-size: $font-big-size !important
.layout
  background: #f5f7f9
  position: relative
  overflow: hidden
  height: 100%
  .ivu-row-flex,.ivu-menu-light
    height: 100%
    width: 100%
  .ivu-layout-header
    background: $theme-color
    .logo
      display: inline-block
      height: 31px
      line-height: 31px
      margin-top: 16px
      >img
        margin-right: 6px
      >span
       float: right
       font-size: 24px
       vertical-align: middle
       Letter-spacing: 6px
       color: #fff
.layout-breadcrumb
  padding: 0 15px
  float: left
.layout-content
  margin: 15px 0 0 15px
  background: #fff
  border-radius: 4px
  height: 100%
.layout-content-main
  padding: 10px
.layout-copy
  text-align: center
  padding: 10px 0 20px
  color: #9ea7b4
.layout-header
  height: 60px
  line-height: 60px
  background: #fff
.layout-logo-left
  width: 90%
  height: 60px
  line-height: 60px
  font-size: 28px
  text-align: center
.layout-ceiling-main
  a
    color: #9ba7b5
.layout-text
  font-weight: bold
  font-size: 15px
.ivu-col
  transition: width 0.2s ease-in-out
.userinfo
  display: inline-block
  float: right
  line-height: 16px
  .ivu-dropdown
    margin-top: 50px
.ivu-dropdown
  margin-right: 25px
  margin-top: 22px
.ivu-menu-submenu-title
  padding: 14px
.head-name
  width: 100%
  height: 60px
  line-height: 60px
  float: right
  margin-top: -50px
  color: $white
  font-size: 14px
  .userName
    margin-right: 20px
  .logout
    float: right
    cursor: pointer
  .alterPassword
    float: right
    cursor: pointer
    margin-right: 20px
.ivu-select-dropdown
  .ivu-dropdown
    margin: 0px 12px 0px 0px
// 子目录离左边的距离
.ivu-menu-vertical 
  .ivu-menu-submenu 
    .ivu-menu-item
      padding-left: 63px !important
      font-size: 15px
</style>

