<template>
  <div>
    <div class="fontBigSize alignCenter fontBoldWeight marginTop30">版权认证编辑</div>
    <template>
      <div class="fontMiddleSize writerEdit marginBottom30">
        <div class="marginTop20">
          <label for="userId" class="formLabel marginRight20">申请者ID</label>
          <Input class="width800" v-model="writerEditData.auth_rel_user_id" disabled/>
        </div>
        <div class="marginTop20">
          <label for="nickname" class="editLabelColor formLabel marginRight20">昵称</label>
          <Input class="width800" v-model="writerEditData.nickname" disabled/>
        </div>
        <div class="marginTop20">
          <label for="name" class="editLabelColor formLabel marginRight20">姓名</label>
          <Input class="width800" v-model="writerEditData.real_name" disabled/>
        </div>
        <!-- 从版权方列表跳转至详情 -->
        <div class="marginTop20  flex" v-if="this.$route.params.from == 'fromWriterList'">
          <label for="cardImg" class="editLabelColor formLabel marginRight20">照片</label>
          <img :src="realPhoto" alt="" class="cardImg">
        </div>

        <div class="marginTop20">
          <label for="cardID" class="editLabelColor formLabel marginRight20">身份证号码</label>
          <Input class="width800" v-model="writerEditData.id_number" disabled/>
        </div>
        <div class="marginTop20  flex">
          <label for="cardImg" class="editLabelColor formLabel marginRight20">身份证照片</label>
          <img :src="idPhoto" alt="" class="cardImg">
          <img v-if="writerEditData.id_photo_back" :src="idPhotoBack" alt="" class="cardImg">
        </div>
        <div class="marginTop20">
          <label for="phone" class="editLabelColor formLabel marginRight20">联系电话</label>
          <Input class="width800" v-model="writerEditData.contact_number" disabled/>
        </div>
        <div class="marginTop20">
          <label for="email" class="editLabelColor formLabel marginRight20">电子邮件</label>
          <Input class="width800" v-model="writerEditData.email" disabled/>
        </div>
        <div class="marginTop20">
          <label for="qqNum" class="editLabelColor formLabel marginRight20">QQ号码</label>
          <Input class="width800" v-model="writerEditData.qq_or_msn" disabled/>
        </div>
        <div class="marginTop20">
          <label for="wxNUm" class="editLabelColor formLabel marginRight20">微信号</label>
          <Input class="width800" v-model="writerEditData.weixin" disabled/>
        </div>
        <div class="marginTop20">
          <label for="address" class="editLabelColor formLabel marginRight20">地址</label>
          <Input class="width800" v-model="writerEditData.contact_address" disabled/>
        </div>
        <div class="marginTop20">
          <label for="intro" class="editLabelColor formLabel marginRight20">简介</label>
          <Input class="width800" type="textarea" v-model="writerEditData.desc" disabled/>
        </div>
        <div class="marginTop20">
          <label for="intro" class="editLabelColor formLabel marginRight20">证明材料</label>
          <Button type="primary">查看</Button>
          <Button type="primary"><a :href="downloadHref" :fileurl="downloadHref" style="color:#fff;">下载</a></Button>
        </div>
        <div class="marginTop20">
          <label for="checkStatus" class="editLabelColor formLabel marginRight20">审核状态</label>
          <RadioGroup v-model="writerEditData.veri_status" @on-change="changeRadio(writerEditData.veri_status)">
            <Radio label="0">待审核</Radio>
            <Radio label="1">审核通过</Radio>
            <Radio label="2">审核不通过</Radio>
          </RadioGroup>
        </div>
        <div class="marginTop20">
          <label for="checkBack" class="editLabelColor formLabel marginRight20">审核回复</label>
          <Select id="checkBack" v-model="writerEditData.veri_reply" class="width200" @on-change="changeSelect(writerEditData.veri_reply)">
            <Option value="版权认证待审核">版权认证待审核</Option>
            <Option value="恭喜您,您的版权认证已经通过!">恭喜您,您的版权认证已经通过!</Option>
            <Option value="非常抱歉的通知您,您的版权认证没有通过">非常抱歉的通知您,您的版权认证没有通过</Option>
          </Select>
        </div>
        <div class="marginTop20" v-if="writerEditData.veri_status == '2'">
          <label for="noPass" class="editLabelColor formLabel" style="margin-right:0">不通过原因</label>
          <span class="red marginRight10">*</span>
          <Input class="width800" v-model="noPassReason"/>
        </div>
        <div class="marginTop20 marginBottom30 fr" style="margin-right:345px;">
          <Button @click="cancel" class="borderNone">取消</Button>
          <Button type="primary" @click="confirmEdit">确定</Button>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { writerEditCtrl } from "view_js/create_terrace/writer_manage/writer_edit";
export default {
  mixins: [writerEditCtrl],
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "static/sass/base"

</style>

