<template>
  <div class="userRecommend">
    <div class="marginBottom30 flex clear">
      <div>
        <label for="userId">用户ID</label>
        <Input id="userId" v-model="userId" placeholder="查询用户ID"></Input>
      </div>
      <div>
        <label for="nickname">用户昵称</label>
        <Input id="nickname" v-model="nickname" placeholder="查询用户昵称"></Input>
      </div>
      <div class="flex">
        <label for="pickedType" class="searchLabel">推荐版块</label>
        <Select class="searchSelect" id="pickedType" v-model="picked_type">
        	<Option value="1" key="1">热门主播</Option>
        	<Option value="2" key="2">新晋主播</Option>
        	<Option value="3" key="3">S2金牌主播</Option>
        </Select>
      </div>
      <div class="flex">
        <label for="userLevel" class="searchLabel">用户类型</label>
        <Select class="searchSelect" id="userLevel" v-model="user_level">
        	<Option value="-1" key="-1">全部</Option>
        	<Option value="1" key="1">电台</Option>
        	<Option value="2" key="2">资源账号</Option>
        	<Option value="3" key="3">版权方</Option>
        </Select>
      </div>
      <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
    </div>
    <Table stripe border :loading="loading" :columns="userRecommendColum" :data="userRecommendList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    <!-- 弹窗 -->
		<!-- 编辑用户推荐 -->
    <template>
      <Modal v-model="editModel" title="用户编辑">
        <div class="alignCenter">
        	<p class="popupShow">
        		<label class="showLabel">用户ID：</label>
        		<Input v-model="edit_userId" disabled></Input>
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
      <Modal v-model="deleteModal" title="删除用户推荐">
        <div class="alignCenter">
          <label>取消推荐版块：</label>
        	<CheckboxGroup style="display: inline-block" v-model="delete_picked_type">
		        <Checkbox v-if="hasPickedHot" label="1">热门主播</Checkbox>
		        <Checkbox v-if="hasPickedNew" label="2">新晋主播</Checkbox>
		        <Checkbox v-if="hasPickedS2" label="3">S2金牌主播</Checkbox>
			    </CheckboxGroup>
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
	import { userRecommendCtrl } from "view_js/recommend_manage/user_recommend";
	export default {
	  mixins: [userRecommendCtrl],
	};
</script>

<style lang="sass" rel="stylesheet/sass">
	@import "static/sass/base"
	@import "static/sass/popup"
</style>