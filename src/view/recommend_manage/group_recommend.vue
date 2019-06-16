<template>
  <div class="groupRecommend">
    <div class="marginBottom30 flex clear">
      <div>
        <label for="groupId">群组ID</label>
        <Input id="groupId" v-model="groupId" placeholder="查询群组ID"></Input>
      </div>
      <div>
        <label for="groupName">群组名称</label>
        <Input id="groupName" v-model="groupName" placeholder="查询群组名称"></Input>
      </div>
      <div class="flex">
        <label for="groupLevel" class="searchLabel">群组身份</label>
        <Select class="searchSelect" id="groupLevel" v-model="group_level">
          <Option value="-1" key="-1">全部</Option>
          <Option value="1" key="1">加V</Option>
          <Option value="0" key="0">不加V</Option>
        </Select>
      </div>
      <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
    </div>
    <Table stripe border :loading="loading" :columns="groupRecommendColum" :data="groupRecommendList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    <!-- 弹窗 -->
    <!-- 编辑声音推荐 -->
    <template>
      <Modal v-model="editModel" title="群组编辑">
        <div class="alignCenter">
          <p class="popupShow">
            <label class="showLabel">群组ID：</label>
            <Input v-model="edit_id" disabled></Input>
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
      <Modal v-model="deleteModal" title="删除群组推荐">
        <div class="alignCenter">
          <p>确认删除该群组推荐？</p>
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
	import { groupRecommendCtrl } from "view_js/recommend_manage/group_recommend";
	export default {
	  mixins: [groupRecommendCtrl]
	};
</script>

<style lang="sass" rel="stylesheet/sass">
	@import "static/sass/base"
	@import "static/sass/popup"
</style>