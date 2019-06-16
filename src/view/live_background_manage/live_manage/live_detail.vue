<template>
	<div class="liveDetail">
		<div class="but">
	  		<Button type="primary" @click="refreshPage" class="fr marginRight30">刷新</Button>
	  		<Button type="primary" @click="goHistory" class="fr marginRight30">返回</Button>
	  	</div>
	  	<div class="baseInfo">
	  		<h1>基本信息</h1>
	  		<ul>
	  			<li class="liveDetailLi">
	  				<span>主播昵称：</span>
	  				<span>{{liveDetailData.live_nickname}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>房间ID:</span>
	  				<span>{{liveDetailData.room_num}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>房间隐私 :</span>
	  				<span>{{liveDetailData.live_secret | liveSecret}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>房间密码 :</span>
	  				<span>{{liveDetailData.live_password}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span class="imgSpan">直播封面 :</span>
	  				<img @click="showImgModal(liveDetailData.live_cover)" class="img" :src="liveDetailData.live_cover">
	  			</li>
	  		</ul>
	  	</div>
	  	<div class="anchorInfo">
	  		<h1>主播信息</h1>
	  		<ul>
	  			<li class="liveDetailLi">
	  				<span>主播姓名 :</span>
	  				<span>{{liveDetailData.live_user_information.real_name}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>身份证号 :</span>
	  				<span>{{liveDetailData.live_user_information.id_number}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>手机号 :</span>
	  				<span>{{liveDetailData.live_user_information.contact_number}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span class="imgSpan">身份证照片 :</span>
	  				<img class="img" src="static/img/bg-2.jpg" title="身份证正面照片">
	  				<img class="img" src="static/img/bg-2.jpg" style="margin-left: 10px" title="身份证反面照片">
	  			</li>
	  		</ul>
	  	</div>
	  	<div class="liveInfo">
	  		<h1>直播信息</h1>
	  		<ul>
	  			<li class="liveDetailLi">
	  				<span>直播主题 :</span>
	  				<span>{{liveDetailData.live_name}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>直播分类 :</span>
	  				<span>{{liveDetailData.live_category_name}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>直播标签 :</span>
	  				<span v-for="item in liveDetailData.live_tag_name">{{item}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>直播时间 :</span>
	  				<span>{{liveDetailData.live_begin_time*1000 | formatTime('YMDHMS')}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>直播时长 :</span>
	  				<span>{{liveDetailData.live_length | formatTime('HMS')}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>在线人数 :</span>
	  				<span>{{liveDetailData.listener_number}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>真实用户数 :</span>
	  				<span>{{liveDetailData.real_number}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>机器人人数 :</span>
	  				<span>{{liveDetailData.robot_number}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>参与人数 :</span>
	  				<span>{{liveDetailData.join_number}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>点赞人数 :</span>
	  				<span>{{liveDetailData.praise_number}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>分享次数 :</span>
	  				<span>{{liveDetailData.share_number}}</span>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>录制音频 :</span>
	  				<audio src=""></audio>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span>录制视频 :</span>
	  				<a>下载</a>
	  			</li>
	  			<li class="liveDetailLi">
	  				<span class="imgSpan">背景图 :</span>
	  				<img class="img" src="static/img/bg-2.jpg">
	  			</li>
	  		</ul>
	  	</div>
	  	<div class="giftInfoList">
	  		<h1>礼物排行榜信息</h1>
	  		<Table stripe border :columns="giftInfoColum" :data="giftInfoList"></Table>
	  	</div>
	  	<!-- 查看图片弹窗 -->
    	<template>
    		<Modal v-model="imgModal" title="查看图片">
    			<div class="alignCenter">
          			<img :src="imgUrl" style="width: 100%;">
        		</div>
    		</Modal>
    	</template>
	</div>
</template>

<script>
	import { liveDetailCtr } from "view_js/live_background_manage/live_manage/live_detail";
	export default {
 		mixins: [liveDetailCtr]
	};
</script>

<style lang="sass" rel="stylesheet/sass" type="">
	@import "static/sass/base"
	@import "static/sass/popup"
</style>