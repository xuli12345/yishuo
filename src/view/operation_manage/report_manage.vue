<template>
	<div class="reportManage">
	  <div class="but">
	  	<Button type="primary" @click="refreshPage" class="fr marginRight30">刷新</Button>
	  </div>
	  <div class="marginBottom30 flex clear">
  		<div class="flex">
        <label for="reportType" class="searchLabel">举报类型</label>
        <Select class="searchSelect" id="reportType" v-model="report_type">
        	<Option v-for="item in typeList" :value="item.type_id" :key="item.type_id">{{ item.type_name }}</Option>
        </Select>
      </div>
      <div>
        <label for="reportAllNum" class="searchLabel">总举报数</label>
        <InputNumber id="reportAllNum" v-model="report_all_number" :min="0"></InputNumber>
      </div>
      <div>
        <label for="reportNewNum" class="searchLabel">新增举报数</label>
        <InputNumber id="reportNewNum" v-model="report_new_number" :min="0"></InputNumber>
      </div>
      <div class="flex">
        <label for="reportStatus" class="searchLabel">举报状态</label>
        <Select class="searchSelect" id="reportStatus" v-model="report_status">
        	<Option value="-1">全部</Option>
        	<Option value="0">未处理</Option>
        	<Option value="1">已处理</Option>
        </Select>
      </div>
      <div class="flex">
        <label for="reportResult" class="searchLabel">处理结果</label>
        <Select class="searchSelect" id="reportResult" v-model="report_result">
        	<Option value="-1">全部</Option>
        	<Option value="0">有效举报</Option>
        	<Option value="1">无效举报</Option>
        </Select>
      </div>
      <Button class="searchBtn" type="primary" icon="ios-search" @click="searchData">查询</Button>
    </div>
    <Table stripe border :columns="reportColum" :data="reportList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    <!-- 删除弹窗 -->
    <template>
      <Modal v-model="deleteModal" title="删除举报信息">
        <div class="alignCenter">
          <p>你确定删除此条举报信息？</p>
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
import { reportListCtrl } from "../../view_js/operation_manage/report_manage";
export default {
  mixins: [reportListCtrl]
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "../../../static/sass/base"
@import "../../../static/sass/popup"
</style>