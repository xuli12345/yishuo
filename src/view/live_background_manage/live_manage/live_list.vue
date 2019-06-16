<template>
  <div class="liveList">
    <div class="but">
	  	<Button type="primary" @click="refreshPage" class="fr marginRight30">刷新</Button>
	  </div>
	  <div class="marginBottom30 flex clear">
  		<div class="flex">
        <label for="userId" class="searchLabel">主播ID:</label>
        <Input id="userId" v-model="user_id" placeholder="查询主播ID"></Input>
      </div>
      <div>
        <label for="liveNickname" class="searchLabel">主播昵称:</label>
        <Input id="liveNickname" v-model="live_nickname" placeholder="查询主播昵称"></Input>
      </div>
      <div>
        <label for="roomNum" class="searchLabel">房间号:</label>
        <Input id="roomNum" v-model="room_num" placeholder="查询房间号"></Input>
      </div>
      <div class="flex">
        <label for="liveType" class="searchLabel">直播模式:</label>
        <Select class="searchSelect" id="liveType" v-model="live_type">
        	<Option value="-1">全部</Option>
        	<Option value="1">电台</Option>
        	<Option value="2">角色扮演</Option>
        </Select>
      </div>
      <div class="flex">
        <label for="liveStatus" class="searchLabel">直播状态:</label>
        <Select class="searchSelect" id="liveStatus" v-model="live_status">
        	<Option value="-1">全部</Option>
        	<Option value="0">取消直播</Option>
        	<Option value="1">尚未直播</Option>
        	<Option value="2">直播中断</Option>
        	<Option value="3">已禁用</Option>
        	<Option value="4">直播结束</Option>
        	<Option value="5">直播中</Option>
        </Select>
      </div>
      <Button class="searchBtn" type="primary" icon="ios-search" @click="searchData">查询</Button>
    </div>
    <div class="setButton">
      <Button class="searchBtn" type="primary" @click="getRoleCardNumber">角色卡位数设置</Button>
      <Button class="searchBtn" type="primary" @click="getBackgroundImgNumber">背景图数设置</Button><!-- setBackgroundImgNumber -->
      <Button class="searchBtn" type="primary" @click="getLinkNumber">连麦数设置</Button><!-- setLinkNumber -->
      <Button class="searchBtn" type="primary" @click="getLikeNumber">点赞数设置</Button><!-- setLikeNumber -->
      <Button class="searchBtn" type="primary" @click="getRobotNumber">机器人数设置</Button><!-- setRobotNumber -->
    </div>
    <Table stripe border :columns="liveColum" :data="liveDataList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    <!-- 禁用直播弹窗 -->
    <template>
    	<Modal v-model="forbidModal" title="禁用直播">
    		<div class="alignCenter">
          		<p>你确定禁用该直播？</p>
        	</div>
        	<div slot="footer">
          		<Button @click="cancelForbid" class="borderNone">取消</Button>
          		<Button type="error" @click="confirmForbid">确认</Button>
        	</div>
    	</Modal>
    </template>
    <!-- 隐藏直播弹窗 -->
    <template>
      <Modal v-model="hideModal" title="隐藏直播">
        <div class="alignCenter">
              <p>你确定隐藏该直播？</p>
          </div>
          <div slot="footer">
              <Button @click="cancelHide" class="borderNone">取消</Button>
              <Button type="error" @click="confirmHide">确认</Button>
          </div>
      </Modal>
    </template>
    <!-- 设置直播角色卡位数 -->
    <template>
      <Modal v-model="cardNumberModal" title="设置直播角色卡位数">
        <div class="alignCenter">
          <label for="roleCardNumber" class="searchLabel">角色卡位数:</label>
          <Input id="roleCardNumber" v-model="roleCardNumber" placeholder="填写角色卡位数"></Input>
        </div>
        <div slot="footer">
          <Button @click="cancelSet('card')" class="borderNone">取消</Button>
          <Button type="success" @click="setRoleCardNumber">确认</Button>
        </div>
      </Modal>
    </template>
    <!-- 设置直播背景图数 -->
    <template>
      <Modal v-model="backgroundImgNumberModal" title="设置直播背景图数">
        <div class="alignCenter">
          <label for="backgroundImgNumber" class="searchLabel">背景图数:</label>
          <Input id="backgroundImgNumber" v-model="backgroundImgNumber" placeholder="填写背景图数"></Input>
        </div>
        <div slot="footer">
          <Button @click="cancelSet('img')" class="borderNone">取消</Button>
          <Button type="success" @click="setBackgroundImgNumber">确认</Button>
        </div>
      </Modal>
    </template>
    <!-- 设置直播连麦数 -->
    <template>
      <Modal v-model="linkNumberModal" title="设置直播连麦数">
        <div class="alignCenter">
          <label for="linkNumber" class="searchLabel">连麦数:</label>
          <Input id="linkNumber" v-model="linkNumber" placeholder="填写连麦数"></Input>
        </div>
        <div slot="footer">
          <Button @click="cancelSet('link')" class="borderNone">取消</Button>
          <Button type="success" @click="setLinkNumber">确认</Button>
        </div>
      </Modal>
    </template>
    <!-- 设置直播点赞数 -->
    <template>
      <Modal v-model="likeNumberModal" title="设置直播点赞数">
        <div class="alignCenter">
          <div class="marginBottom30">
            <label for="add_like_number_time" class="searchLabel">开始增加点赞数时间:</label>
            <Input id="add_like_number_time" v-model="add_like_number_time" placeholder="00:00"></Input>
          </div>
          <div class="marginBottom30">
            <label for="like_number_time_rate" class="searchLabel">时间长度与增加点赞比例:</label>
            <Input id="like_number_time_rate" v-model="like_number_time_rate" placeholder="时间:点赞"></Input>
          </div>
          <div class="marginBottom30">
            <label for="like_number_real_virtual_rate" class="searchLabel">真实点赞与增加点赞比例:</label>
            <Input id="like_number_real_virtual_rate" v-model="like_number_real_virtual_rate" placeholder="真实点赞:点赞"></Input>
          </div>
        </div>
        <div slot="footer">
          <Button @click="cancelSet('like')" class="borderNone">取消</Button>
          <Button type="success" @click="setLikeNumber">确认</Button>
        </div>
      </Modal>
    </template>
    <!-- 设置直播机器人数 -->
    <template>
      <Modal v-model="robotNumberModal" title="设置直播机器人数">
        <div class="alignLeft" style="margin-left: 35px">
          <div class="marginBottom30">
            <label for="add_like_number_time" class="searchLabel">增加机器人时间长度（单位S）:</label>
            <!-- <Input id="add_like_number_time" v-model="add_robot_time_length" placeholder="00:00"></Input> -->
            <span>15S</span>
          </div>
          <div class="marginBottom30">
            <label for="like_number_time_rate" class="searchLabel">随机机器人增加的数量的最小值:</label>
            <Input id="like_number_time_rate" v-model="random_add_robot_number_min"></Input>
          </div>
          <div class="marginBottom30">
            <label for="like_number_real_virtual_rate" class="searchLabel">随机机器人增加的数量的最大值:</label>
            <Input id="like_number_real_virtual_rate" v-model="random_add_robot_number_max"></Input>
          </div>
          <div class="marginBottom30">
            <label for="like_number_real_virtual_rate" class="searchLabel">减少机器人时间长度（单位S）:</label>
            <Input id="like_number_real_virtual_rate" v-model="reduce_robot_time_length"></Input>
          </div>
          <div class="marginBottom30">
            <label for="like_number_real_virtual_rate" class="searchLabel">随机减少机器人数量的最小值:</label>
            <Input id="like_number_real_virtual_rate" v-model="random_reduce_robot_number_min"></Input>
          </div>
          <div class="marginBottom30">
            <label for="like_number_real_virtual_rate" class="searchLabel">随机减少机器人数量的最大值:</label>
            <Input id="like_number_real_virtual_rate" v-model="random_reduce_robot_number_max"></Input>
          </div>
          <div class="marginBottom30">
            <label for="like_number_real_virtual_rate" class="searchLabel">机器人添加上限最小值:</label>
            <Input id="like_number_real_virtual_rate" v-model="robot_number_min"></Input>
          </div>
          <div class="marginBottom30">
            <label for="like_number_real_virtual_rate" class="searchLabel">机器人添加上限最大值:</label>
            <Input id="like_number_real_virtual_rate" v-model="robot_number_max"></Input>
          </div>
        </div>
        <div slot="footer">
          <Button @click="cancelSet('robot')" class="borderNone">取消</Button>
          <Button type="success" @click="setRobotNumber">确认</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
	import { liveListCtrl } from "view_js/live_background_manage/live_manage/live_list";
	export default {
 		mixins: [liveListCtrl]
	};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "static/sass/base"
@import "static/sass/popup"
</style>
