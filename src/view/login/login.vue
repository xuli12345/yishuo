
<template>
    <div class="login" @keydown.enter="loginSubmitTest">
    <!-- <div class="login-text">
      一说管理平台
    </div> -->
    <div class="login-con">
      <Card :bordered="true">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>

            <div class="code">
                <label for="">验证码</label>
                <input type="text" class="sradd" v-bind:class="{errorstyle:show_error}" id="key" value="" v-model="text"  style="color:#999;ime-mode:disabled;-webkit-ime-mode:inactive;" v-on:blur="textBlur"/>
                <span v-on:click="create_code" v-model="code" class="add phoKey">{{check_code}}</span>
                <div class="error error7"  v-if="show_error">请输入正确的验证码</div>
            </div>

            <FormItem>
              <!-- loginSubmit loginSubmitTest-->
              <Button @click="loginSubmitTest" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
    <div class="login-footer">Copyright@2014&nbsp;&nbsp;一说&nbsp;&nbsp;1shuo.com&nbsp;&nbsp;版权申明&nbsp;&nbsp;京ICP备09052857号-6</div>
  </div>
</template>

<script type="text/ecmascript-6">
import Cookies from "js-cookie";
import { mapMutations } from "vuex";
import { loginCtrl } from "../../view_js/login/login";
// import canvasNest from "../../../static/third_lib/canvasAnimate/canvas-nest";

export default {
  mixins: [loginCtrl]
};

</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.login
  position: absolute
  width: 100%
  height: 100%
  // background: rgb(22,160,133)
  background: url('../../../static/img/bg-4.jpg') no-repeat
  // background-color: linear-gradient(to bottom, #58b957,green)

  // background-size: 800px 300px
  // background-position: center
  .login-text
    position: absolute
    color: #fff
    font-size: 70px
    top: 40%
    transform: translateY(-50%)
    left: 35%
    transform: translateX(-50%)
    Letter-spacing: 50px
  .login-con
    position: absolute
    left: 66.5%
    top: 56%
    transform: translateY(-60%)
    width: 350px
    z-index: 2
    // background: #58b957
    background: #eee
    padding: 3px
    .login-con-header
      font-size: 16px
      font-weight: 300
      text-align: center
      padding: 30px 0
    .form-con
      padding: 10px 0 0
      .code
        font-size: 12px
        margin-bottom: 24px
        .sradd
          width: 148px
          height: 30px
          text-indent: 8px
          font-size: 14px
          border: 1px solid #dddee1
          border-radius: 4px
        .errorstyle
          border: 1px solid #ed3f14
        .error
          color: #ed3f14
        .add
          float: right
          height: 30px
          text-align: center
          line-height: 30px
          width: 75px
          background: skyblue
          Letter-spacing: 5px
          bdradius: 4px
    .login-tip
      font-size: 10px
      text-align: center
      color: #c3c3c3
  .login-footer
    position: absolute
    color: #fff
    font-size: 14px
    bottom: 5%
    left: 50%
    transform: translateX(-50%)
</style>
