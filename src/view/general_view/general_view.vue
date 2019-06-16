<template>
  <div class="home" id="home">
    <Row>
      <Col :md="24" :lg="16">
      <Row :gutter="5">
        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
        <infor-card id-name="user_created_count" :end-val="count.createUser" iconType="android-person-add" color="#2d8cf0" intro-text="今日新增用户"></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
        <infor-card id-name="visit_count" :end-val="count.visit" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="今日浏览量"></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
        <infor-card id-name="collection_count" :end-val="count.collection" iconType="upload" color="#ffd572" intro-text="今日数据采集量"></infor-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
        <infor-card id-name="transfer_count" :end-val="count.transfer" iconType="shuffle" color="#f25e43" intro-text="今日服务调用量"></infor-card>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row>
      <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="android-map"></Icon>
          上周每日来访量统计
        </p>
        <div class="data-source-row">
           <div style="width:100%;height:200px;" id="visite_volume_con"></div>
        </div>
      </Card>
      </Col>

      <Col :md="24" :lg="8" :style="{marginBottom: '10px',marginLeft:'50px'}">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="ios-pulse-strong"></Icon>
          数据来源统计
        </p>
        <div class="data-source-row">
            <div style="width:100%;height:200px;" id="data_source_con"></div>
        </div>
      </Card>
      </Col>
    </Row>
    <Row class="margin-top-10">
      <Card>
        <p slot="title" class="card-title">
          <Icon type="ios-shuffle-strong"></Icon>
          上周流量统计(G)
        </p>
        <div class="line-chart-con">
         <div style="width:100%;height:200px;" id="service_request_con"></div>
        </div>
      </Card>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
import { homeCtrl } from "../../view_js/home/home";

export default {
  mixins: [homeCtrl]
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
@import "../../../static/sass/variable"
.layout-content-main
  .ivu-row
    >.ivu-col-span-lg-16
      width: 100%
      >.ivu-row
        display: flex
        justify-content: space-between
        >.ivu-col-span-xs-24
          width: 20%
</style>
