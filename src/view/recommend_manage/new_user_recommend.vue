<template>
  <div class="newUserRecommend">
    <div class="but">
      <Button type="primary" @click="addModalShow" class="fr marginRight30">添加新用户推荐</Button>
    </div>
    <div class="marginBottom30 flex clear">
      <div class="flex">
        <label for="recommendType" class="searchLabel widther">推荐页类型</label>
        <Select class="searchSelect" id="recommendType" v-model="recommend_type">
          <Option value="-1" key="-1">全部</Option>
          <Option value="0" key="0">普通用户</Option>
          <Option value="1" key="1">电台</Option>
          <Option value="2" key="2">专辑</Option>
        </Select>
      </div>
      <div class="flex">
        <label for="newUserStatus" class="searchLabel">状态</label>
        <Select class="searchSelect" id="newUserStatus" v-model="new_user_status">
          <Option value="-1" key="-1">全部</Option>
          <Option value="1" key="1">正常</Option>
          <Option value="2" key="2">默认关注</Option>
        </Select>
      </div>
      <Button class="searchBtn" type="primary" icon="ios-search" @click="searchData">查询</Button>
    </div>
    <Table stripe border :loading="loading" :columns="newUserRecommendColum" :data="newUserRecommendList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    <!-- 弹窗 -->
    <!-- 新增新用户推荐 -->
    <template>
      <Modal v-model="addModel" title="添加新用户推荐">
        <div class="alignCenter">
          <p class="popupShow">
            <label class="showLabel widther">推荐类别：</label>
            <Select class="showGroup width200" v-model="add_recommend_type">
              <Option value="0" key="0">普通用户</Option>
              <Option value="1" key="1">电台</Option>
              <Option value="2" key="2">专辑</Option>
            </Select>
          </p>
          <p class="popupShow">
            <label class="showLabel widther">推荐对象ID：</label>
            <Input v-model="recommend_user_id" required></Input>
          </p>
          <p class="popupShow">
            <label class="showLabel widther">状态：</label>
            <RadioGroup class="showGroup width200" v-model="add_status">
              <Radio label="1">正常</Radio>
              <Radio v-if="add_recommend_type != 0" label="2">默认关注</Radio>
            </RadioGroup>
          </p>
        </div>
        <div slot="footer">
          <Button @click="cancelAdd" class="borderNone">取消</Button>
          <Button type="success" @click="confirmAdd">确认</Button>
        </div>
      </Modal>
    </template>
    <!-- 编辑新用户推荐 -->
    <template>
      <Modal v-model="editModel" title="新用户编辑">
        <div class="alignCenter">
          <p class="popupShow">
            <label class="showLabel">类别：</label>
            <Input v-model="edit_recommend_type" disabled></Input>
          </p>
          <p class="popupShow">
            <label class="showLabel">推荐ID：</label>
            <Input v-model="edit_recommend_id" disabled></Input>
          </p>
          <p class="popupShow">
            <label class="showLabel" for="sortOrder">序号：</label>
            <InputNumber id="sortOrder" v-model="sort_order" :min="0" :precision="0"></InputNumber>
          </p>
          <p class="popupShow">
            <label class="showLabel">状态：</label>
            <RadioGroup class="showGroup" v-model="edit_status">
              <Radio label="1">正常</Radio>
              <Radio v-if="canAttention" label="2">默认关注</Radio>
            </RadioGroup>
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
      <Modal v-model="deleteModal" title="删除新用户推荐">
        <div class="alignCenter">
          <p>确认删除该新用户推荐？</p>
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
	import { newUserRecommendCtrl } from "view_js/recommend_manage/new_user_recommend";
	export default {
	  mixins: [newUserRecommendCtrl]
	};
</script>

<style lang="sass" rel="stylesheet/sass">
	@import "static/sass/base"
	@import "static/sass/popup"
</style>