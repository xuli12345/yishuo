<template>
  <div class="userManage">
    <div class="addBtn">
      <Button type="primary" @click="addModalShow" class="marginBottom20">添加声音</Button>
      <Button type="primary" @click="addVoices" class="marginBottom20">批量添加声音</Button>
      <Button type="error" @click="deleteVoices" class="marginBottom20 fr marginRight30">批量删除</Button>
    </div>
    <div class="searchVoiceData marginBottom30">
      <div>
        <label for="voiceId">声音ID</label>
        <Input id="voiceId" v-model="voice_id"></Input>
      </div>
      <div>
        <label for="voiceName">声音名称</label>
        <Input id="voiceName" v-model="voice_name"></Input>
      </div>
      <div>
        <label for="voiceAlbum">所属专辑</label>
        <Input id="voiceAlbum" v-model="voice_album"></Input>
      </div>
      <div>
        <label>声音类别</label>
        <Select class="searchSelect width200" v-model="voice_big_type" @on-change="bigTypeChange">
          <Option value="-1" key="-1">全部</Option>
          <Option v-for="item in bigTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select class="searchSelect width200" v-model="voice_small_type">
          <Option value="-1" key="-1">全部</Option>
          <Option v-for="item in smallTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
      <div>
        <label for="voicePostName">发布者昵称</label>
        <Input id="voicePostName" v-model="voice_post_name"></Input>
      </div>
      <div>
        <label for="publishTime">发布时间</label>
        <DatePicker type="date" placeholder="开始时间" v-model="publish_begin_time"></DatePicker>
        <DatePicker type="date" placeholder="结束时间" v-model="publish_end_time"></DatePicker>
      </div>
      <div>
        <label for="userLevel">发布者类型</label>
        <Select class="searchSelect width200" id="userLevel" v-model="user_level">
          <Option value="-1" key="-1">全部</Option>
          <Option value="0" key="0">普通用户</Option>
          <Option value="1" key="1">电台</Option>
          <Option value="2" key="2">资源账号</Option>
          <Option value="3" key="3">版权方</Option>
        </Select>
      </div>
      <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
    </div>
    <audio id="voicePlay" style="top: 178px" autoplay controls></audio>
    <Table class="clear" stripe border @on-selection-change="changeSelect" :loading="loading" :columns="voiceColumns" :data="voiceList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    <!-- 弹窗 -->
    <!-- 编辑声音 -->
    <template>
      <Modal v-model="editModal" title="编辑声音">
        <div class="alignCenter editVoicePop">
          <div class="flex marginBottom10">
            <label class="showLabel">声音ID：</label>
            <Input class="editVoiceInput" v-model="editVoiceInfo.voice_id" disabled></Input>
          </div>
          <div class="flex marginBottom10">
            <label class="showLabel">声音名称：</label>
            <Input class="editVoiceInput" v-model="editVoiceInfo.voice_name"></Input>
          </div>
          <div class="flex marginBottom10">
            <label class="showLabel">所属专辑：</label>
            <Select class="searchSelect editVoiceInput" style="width: 353px" v-model="edit_album_id" @on-change="changeAlbum">
              <Option value="-1" key="-1">请选择</Option>
              <Option v-for="item in userAlbumList" :value="item.album_id" :key="item.album_id">{{item.album_name}}</Option>
            </Select>
          </div>
          <div class="flex marginBottom10">
            <label class="showLabel">声音类别：</label>
            <span v-if="editVoiceCategory != ''" style="line-height: 32px;">{{editVoiceCategory}}</span>
            <div v-if="editVoiceCategory == ''" class="flex">
              <Select class="searchSelect" style="width: 170px" v-model="edit_big_type" @on-change="bigTypeChange">
                <Option value="-1" key="-1">全部</Option>
                <Option v-for="item in bigTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <Select class="searchSelect marginLeft10" style="width: 170px" v-model="edit_small_type">
                <Option value="-1" key="-1">全部</Option>
                <Option v-for="item in editSmallTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </div>
          </div>
          <div class="flex marginBottom10">
            <label class="showLabel">声音描述：</label>
            <Input class="editVoiceInput" type="textarea" v-model="editVoiceInfo.voice_desc" placeholder="300个字以内" :maxlength="300" :autosize="{minRows: 2,maxRows: 7}"></Input>
          </div>
          <div class="flex marginBottom10">
            <label class="showLabel">播放数：</label>
            <Input class="editVoiceInput" v-model="editVoiceInfo.play_count"></Input>
          </div>
          <div class="flex">
            <label class="showLabel">标签：</label>
            <Input class="editVoiceInput" v-model="edit_tag_list" placeholder="标签之间用英文逗号隔开"></Input>
          </div>
          <p class="marginBottom10" style="margin-left: -130px">标签个数不能超过{{editConfigTagCount}}个</p>
          <div class="flex marginBottom10">
            <label class="showLabel">隐私设置：</label>
            <RadioGroup v-model="edit_secret_type" style="line-height: 32px">
              <Radio :label="0">公开-所有人可见</Radio>
              <Radio :label="1">私密-仅自己可见</Radio>
            </RadioGroup>
          </div>
          <div class="flex marginBottom10">
            <label class="showLabel">更改配图：</label>
            <div class="voice_img marginRight10" v-for="(item, index) in voice_img_list">
              <img :src="item.img_url" />
              <Icon class="delete_img" type="ios-close" size="20" @click="deleteImag(index)"/>
            </div>
            <span id="upload_edit_image" class="marginLeft10 marginTop10">上传图片</span>
            <div v-if="showUpload">
              <vue-upload ref="uploader" uploadButton="#upload_edit_image" :url="uploadImageUrl" :formData="formImageData"  accept='image' @success="onImageSuccess" @uploadError="onImageError" @error="error"></vue-upload>
            </div>
          </div>  
        </div>
        <div slot="footer">
          <Button @click="cancelEdit" class="borderNone">取消</Button>
          <Button type="success" @click="confirmEdit">保存</Button>
        </div>
      </Modal>
    </template>
    <!-- 推荐弹窗 -->
    <template>
      <Modal v-model="recommendModal" title="推荐声音">
        <div class="alignCenter recommendPop">
          <div class="flex marginBottom10">
            <label class="showLabel">推荐版块：</label>
            <CheckboxGroup class="showCheckbox" v-model="recommend_type" @on-change="changeRecommend">
              <Checkbox label="1">热门声音</Checkbox>
              <Checkbox label="2">一说APP版块</Checkbox>
              <Checkbox label="3">一说宝宝APP版块</Checkbox>
            </CheckboxGroup>
          </div>
          <div class="flex marginBottom10" v-if="hasRecommendApp">
            <label class="showLabel" style="width: 240px">一说APP版块：</label>
            <CheckboxGroup class="showCheckbox" v-model="app_type">
              <Checkbox v-for="type in appTypeList" :label="type.id" :key="type.id">{{type.name}}</Checkbox>
            </CheckboxGroup>
          </div>
          <div class="flex marginBottom10" v-if="hasRecommendBabyApp">
            <label class="showLabel">一说宝宝APP版块：</label>
            <CheckboxGroup class="showCheckbox" v-model="baby_app_type">
              <Checkbox v-for="type in babyAppTypeList" :label="type.id" :key="type.id">{{type.name}}</Checkbox>
            </CheckboxGroup>
          </div>
          <div class="flex">
            <label class="showLabel" for="sortOrder">序号：</label>
            <InputNumber id="sortOrder" v-model="sort_order" :min="0" :precision="0"></InputNumber>
          </div>
        </div>
        <div slot="footer">
          <Button @click="cancelRecommend" class="borderNone">取消</Button>
          <Button type="success" @click="confirmRecommend">推荐</Button>
        </div>
      </Modal>
    </template>
    <!-- 删除弹窗 -->
    <template>
      <Modal v-model="deleteModal" title="删除声音">
        <div class="alignCenter">
          <p>确认删除该声音？</p>
        </div>
        <div slot="footer">
          <Button @click="cancelDelete" class="borderNone">取消</Button>
          <Button type="error" @click="confirmDelete">删除</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { voiceListCtrl } from "view_js/content_manage/voice_manage";
export default {
  mixins: [voiceListCtrl]
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "static/sass/base"
@import "static/sass/popup"
</style>
