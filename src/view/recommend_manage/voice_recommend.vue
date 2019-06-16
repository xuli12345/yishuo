<template>
  <div class="voiceRecommend">
    <div class="marginBottom30 flex clear">
      <div>
        <label for="voiceId">声音ID</label>
        <Input id="voiceId" v-model="voiceId" placeholder="查询声音ID"></Input>
      </div>
      <div>
        <label for="voiceName">声音名称</label>
        <Input id="voiceName" v-model="voiceName" placeholder="查询声音名称"></Input>
      </div>
      <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
    </div>
    <audio id="voicePlay" autoplay controls></audio>
    <Table stripe border :loading="loading" :columns="voiceRecommendColum" :data="voiceRecommendList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    <!-- 弹窗 -->
    <!-- 编辑声音推荐 -->
    <template>
      <Modal v-model="editModel" title="声音编辑">
        <div class="alignCenter">
          <p class="popupShow">
            <label class="showLabel">声音ID：</label>
            <Input v-model="edit_voiceId" disabled></Input>
          </p>
          <p class="popupShow">
            <label class="showLabel" for="sortOrder">序号：</label>
            <InputNumber id="sortOrder" v-model="sort_order" :min="0" :precision="0"></InputNumber>
          </p>
        </div>
        <div slot="footer">
          <Button @click="cancelEdit" class="borderNone">取消</Button>
          <Button type="success" @click="confirmEdit">确认</Button>
        </div>
      </Modal>
    </template>
    <!-- 删除弹窗 -->
    <template>
      <Modal v-model="deleteModal" title="删除声音推荐">
        <div class="alignCenter">
          <label>取消推荐版块：</label>
          <Checkbox v-model="delete_picked">热门声音</Checkbox>
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
	import { voiceRecommendCtrl } from "view_js/recommend_manage/voice_recommend";
	export default {
	  mixins: [voiceRecommendCtrl]
	};
</script>

<style lang="sass" rel="stylesheet/sass">
	@import "static/sass/base"
	@import "static/sass/popup"
</style>