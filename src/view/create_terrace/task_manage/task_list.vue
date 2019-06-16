<template>
  <div class="writerManage">
    <div class="but">
      <Button type="primary" @click="refreshPage" class="fr marginRight30">刷新</Button>
    </div>
    <div class="marginBottom30 flex flexWrap">
      <div class="marginBottom20">
        <label for="taskId">任务编号</label>
        <Input id="taskId" v-model="id" placeholder="查询任务编号"></Input>
      </div>
      <div>
        <label for="taskTitle">任务标题</label>
        <Input id="taskTitle" v-model="title" placeholder="查询任务标题"></Input>
      </div>
      <div>
        <label for="publisher">发布人</label>
        <Input id="publisher" v-model="nickname" placeholder="查询发布人"></Input>
      </div>
      <div>
        <label for="taskPublishTime">任务发布时间</label>
        <Input id="taskPublishTime" v-model="start_time" placeholder="查询任务发布时间"></Input>
      </div>
      <div>
        <label for="taskStopTime">任务截止时间</label>
        <Input id="taskStopTime" v-model="end_time" placeholder="查询任务截止时间"></Input>
      </div>
      <div>
        <label for="taskReceiveNum">任务领取人数</label>
        <Input id="taskReceiveNum" v-model="task_allowance" placeholder="查询任务领取人数"></Input>
      </div>
      <div class="flex marginRight20">
        <label for="checkStatus" class="searchLabel">是否置顶</label>
        <Select class="searchSelect" id="checkStatus" v-model="is_top">
        	<Option value="-1">全部</Option>
        	<Option value="1">是</Option>
        	<Option value="0">否</Option>
        </Select>
      </div>
      <div class="flex marginRight20">
        <label for="checkStatus" class="searchLabel">推荐标签</label>
        <Select class="searchSelect" id="checkStatus" v-model="recommend_type">
        	<Option value="-1">全部</Option>
        	<Option value="0">无</Option>
          <Option v-for="item in recommend_type_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </div>
      <div class="flex marginRight20">
        <label for="checkStatus" class="searchLabel">任务状态</label>
        <Select class="searchSelect" id="checkStatus" v-model="task_status">
        	<Option value="-1">全部</Option>
        	<Option value="1">进行中</Option>
        	<Option value="2">已结束</Option>
        	<Option value="6">被终止</Option>
        </Select>
      </div>
      <Button type="primary" icon="ios-search" @click="search">查询</Button>
    </div>
    <Table stripe border :columns="columns" :data="taskList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>

    <!-- 删除 -->
    <template>
      <Modal v-model="deleteModal" title=文稿删除 width="300">
        <div class="alignCenter">
          <Icon type="information-circled" style="color:#f60;" class="fontBigSize"></Icon>
          <span class="fontMiddleSize">确定删除该文稿？？？</span>
        </div>
        <div slot="footer">
          <Button @click="cancel" class="borderNone">取消</Button>
          <Button type="error" @click="confirmDelete">确定</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { taskListCtrl } from "view_js/create_terrace/task_manage/task_list";
export default {
  mixins: [taskListCtrl],
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "static/sass/base"

</style>
