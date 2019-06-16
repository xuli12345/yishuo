<template>
  <div class="writerManage">
    <div class="but">
      <Button type="primary" @click="refreshPage" class="fr marginRight30">刷新</Button>
    </div>
    <div class="marginBottom30 flex">
      <div>
        <label for="writerId">版权方ID</label>
        <Input id="writerId" v-model="user_id" placeholder="查询版权方ID"></Input>
      </div>
      <div>
        <label for="nickname">昵称</label>
        <Input id="nickname" v-model="nickname" placeholder="查询昵称"></Input>
      </div>
      <Button type="primary" icon="ios-search" @click="search">查询</Button>
    </div>
    <Table stripe border :columns="columns" :data="writerData"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
  </div>
</template>

<script type="text/ecmascript-6">
import { writerListCtrl } from "view_js/create_terrace/writer_manage/writer_list";
export default {
  mixins: [writerListCtrl],
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "static/sass/base"

</style>
