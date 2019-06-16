<template>
  <div class="writerManage">
    <div class="but">
      <Button type="primary" @click="refreshPage" class="fr marginRight30">刷新</Button>
    </div>
    <div class="marginBottom30 flex">
      <div>
        <label for="applicantId">申请者ID</label>
        <Input id="applicantId" v-model="auth_rel_user_id" placeholder="查询申请者ID"></Input>
      </div>
      <div>
        <label for="nickname">申请人昵称</label>
        <Input id="nickname" v-model="nickname" placeholder="查询申请人昵称"></Input>
      </div>
       <div>
        <label for="applicantCardId">申请人身份证号</label>
        <Input id="applicantCardId" v-model="id_number" placeholder="查询申请人身份证号"></Input>
      </div>
       <div>
        <label for="applicantTime">申请人认证时间</label>
        <Input id="applicantTime" v-model="auth_time" placeholder="查询申请人认证时间"></Input>
      </div>
      <div class="flex marginRight20">
        <label for="checkStatus" class="searchLabel">审核状态:</label>
        <Select class="searchSelect" id="checkStatus" v-model="veri_status">
        	<Option value="-1">全部</Option>
        	<Option value="1">待审核</Option>
        	<Option value="2">审核通过</Option>
        	<Option value="3">审核不通过</Option>
        </Select>
      </div>
      <Button type="primary" icon="ios-search" @click="search">查询</Button>
    </div>
    <Table stripe border :columns="columns" :data="applicantData"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
  </div>
</template>

<script type="text/ecmascript-6">
import { authenticationListCtrl } from "view_js/create_terrace/writer_manage/authentication_list";
export default {
  mixins: [authenticationListCtrl],
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "static/sass/base"

</style>
