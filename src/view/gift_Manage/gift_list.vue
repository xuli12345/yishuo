<template>
	<div class="giftList">
		<div class="but">
	  		<Button type="primary" @click="refreshPage" class="fr marginRight30">刷新</Button>
	  	</div>
	  	<div class="marginBottom30 flex clear">
	  		<div class="flex">
		        <label for="giftId" class="searchLabel">礼物ID:</label>
		        <Input id="giftId" v-model="gift_id" placeholder="查询礼物ID"></Input>
	      	</div>
		    <div>
		        <label for="giftName" class="searchLabel">礼物名称:</label>
		        <Input id="giftName" v-model="gift_name" placeholder="查询礼物名称"></Input>
		    </div>
		    <div class="flex">
		        <label for="putawayStatus" class="searchLabel">上架状态:</label>
		        <Select class="searchSelect" id="putawayStatus" v-model="putaway_status">
		        	<Option value="-1">全部</Option>
		        	<Option value="0">未上架</Option>
		        	<Option value="1">已上架</Option>
		        </Select>
		    </div>
	      	<Button class="searchBtn" type="primary" icon="ios-search" @click="searchData">查询</Button>
    	</div>
    	<div class="setButton">
    		<Button class="searchBtn" type="primary" @click="showModal('gift')">添加礼物</Button>
    		<Button class="searchBtn" type="primary" @click="showModal('treasure')">添加宝箱</Button>
    	</div>
    	<Table stripe border :columns="giftColum" :data="giftDataList" @on-selection-change="giftSelect"></Table>
    	<Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    	<!-- 添加/编辑礼物弹窗 -->
    	<template>
    		<modal v-model="addGiftModal" title="添加礼物" @on-ok="confirmEditGift" @on-cancel="cancelEdit('gift')">
    			<Form :model="giftModer" :label-width="80">
    				<div class="alignLeft">
	    				<div class="marginBottom30">
		          			<label class="searchLabel">礼物等级<span class="red">*</span>:</label>
		          			<select class="searchSelect modalSelect" v-model="giftModer.gift_level">
		          				<option value="1">初级礼物</option>
		          				<option value="2">中级礼物</option>
		          				<option value="3">高级礼物</option>
		          			</select>
	          			</div>
	          			<div class="marginBottom30">
	          				<label class="searchLabel">礼物排序<span class="red">*</span>:</label>
	            			<Input class="modalInput" v-model="giftModer.gift_order"></Input>
	            			<label for="gift_name" class="searchLabel">礼物名称<span class="red">*</span>:</label>
	            			<Input class="modalInput" id="gift_name" v-model="giftModer.gift_name"></Input>
	          			</div>
	          			<div class="marginBottom30" style="position: relative">
	          				<label class="searchLabel uploadImgLabel">上传礼物图片<span class="red">*</span>:</label>
					        <div id="uploadGiftImg">上传图片</div>
					        <div v-if="showUploadGift">
					            <vue-upload ref="uploader" uploadButton="#uploadGiftImg" :url="uploadUrl" :formData="formData" multiple accept='image' @fileChange="fileChange" @start="onStart" @success="onSuccess" @uploadError="onError" @error="error"></vue-upload>
					        </div>
					        <div class="ImgAndCover">
					        	<img class="uploadImgPic" v-show="giftModer.gift_picture_path" :src="imgUrl + giftModer.gift_picture_path">
						        <div class="imgCover">
						        	<span @click="deleteImg('gift')">删除图片</span>
						        </div>
					        </div>
	            			<label for="gift_name" class="searchLabel">礼物价格<span class="red">*</span>:</label>
	            			<Input class="modalInput" id="gift_name" v-model="giftModer.gift_price"></Input>
	          			</div>
	          			<div class="marginBottom30">
	          				<label class="searchLabel">附带百宝箱:</label>
	            			<select class="searchSelect modalSelect" v-model="giftModer.adjunct_box_id">
		          				<option v-for="item in treasureList" :value="item.box_id">{{item.box_name}}</option>
		          			</select>
		          			<label class="searchLabel" v-show="giftModer.adjunct_box_id">倒计时<span class="red">*</span>:</label>
	            			<Input class="modalInput" v-model="giftModer.count_down" v-show="giftModer.adjunct_box_id"></Input>
	          			</div>
	          			<div class="marginBottom30">
	          				<label class="searchLabel">礼物特效<span class="red">*</span>:</label>
	            			<select class="searchSelect modalSelect" v-model="giftModer.gift_special_effects">
		          				<option v-for="item in giftEffectList" :value="item.id">{{item.name}}</option>
		          			</select>
	            			<label for="gift_name" class="searchLabel">礼物触发特效:</label>
	            			<select class="searchSelect modalSelect" v-model="giftModer.gift_trigger_effects">
		          				<option v-for="item in giftEffectList" :value="item.id">{{item.name}}</option>
		          			</select>
	          			</div>
	          			<div class="marginBottom30">
	          				<label class="searchLabel">触发礼物数量个数:</label>
	            			<Input class="modalInput" v-model="giftModer.gift_trigger_effects_time"></Input>
	        				<label class="searchLabel">是否上架<span class="red">*</span>:</label>
					        <RadioGroup v-model="giftModer.putaway_status">
					            <Radio label="1">是</Radio>
					            <Radio label="0">否</Radio>
					        </RadioGroup>
	          			</div>
	          			<div class="marginBottom30" style="margin-left: 10px">
	          				(注：选择了百宝箱时，不要选择礼物触发特效和触发特效礼物数量。)
	          			</div>
        			</div>
    			</Form>
    			<div slot="footer">
	        		<Button @click="cancelEdit('gift')" class="borderNone">取消</Button>
		          	<Button type="success" @click="confirmEditGift">确认</Button>
	        	</div>
    		</modal>
    	</template>
    	<!-- 添加/编辑宝箱弹窗 -->
    	<template>
    		<modal v-model="addTresureModal" :title="modalTitle" @on-ok="confirmEditGift('treasure')" @on-cancel="cancelEdit('treasure')">
    			<Form :model="giftModer" :label-width="80">
    				<div class="alignLeft">
	    				<div class="marginBottom30">
		          			<label class="searchLabel">礼物等级<span class="red">*</span>:</label>
		          			<select class="searchSelect modalSelect" v-model="treasureModer.gift_level">
		          				<option value="1">初级礼物</option>
		          				<option value="2">中级礼物</option>
		          				<option value="3">高级礼物</option>
		          			</select>
	          			</div>
	          			<div class="marginBottom30">
	          				<label class="searchLabel">宝箱排序<span class="red">*</span>:</label>
	            			<Input class="modalInput" v-model="treasureModer.gift_order"></Input>
	            			<label for="gift_name" class="searchLabel">宝箱名称<span class="red">*</span>:</label>
	            			<Input class="modalInput" id="gift_name" v-model="treasureModer.gift_name"></Input>
	          			</div>
	          			<div class="marginBottom30" style="position: relative">
	          				<label class="searchLabel uploadImgLabel">上传宝箱图片<span class="red">*</span>:</label>
					        <div id="uploadTreasureImg">上传图片</div>
					        <div v-if="showUploadTreasure">
					            <vue-upload ref="uploader" uploadButton="#uploadTreasureImg" :url="uploadUrl" :formData="formData" multiple accept='image' @fileChange="fileChange" @start="onStart" @success="onSuccess" @uploadError="onError" @error="error"></vue-upload>
					        </div>
					        <div class="ImgAndCover">
					        	<img class="uploadImgPic" v-show="treasureModer.gift_picture_path" :src="imgUrl + treasureModer.gift_picture_path">
						        <div class="imgCover">
						        	<span @click="deleteImg('treasure')">删除图片</span>
						        </div>
					        </div>
	            			<label class="searchLabel">宝箱关闭特效<span class="red">*</span>:</label>
	            			<select class="searchSelect modalSelect" v-model="treasureModer.gift_special_effects">
		          				<option v-for="item in giftEffectList" :value="item.id">{{item.name}}</option>
		          			</select>
	          			</div>
	          			<div class="marginBottom30">
	            			<label for="gift_name" class="searchLabel">宝箱打开特效:</label>
	            			<select class="searchSelect modalSelect" v-model="treasureModer.gift_trigger_effects">
		          				<option v-for="item in giftEffectList" :value="item.id">{{item.name}}</option>
		          			</select>
		          			<label class="searchLabel">是否上架<span class="red">*</span>:</label>
					        <RadioGroup v-model="treasureModer.putaway_status">
					            <Radio label="1">是</Radio>
					            <Radio label="0">否</Radio>
					        </RadioGroup>
	          			</div>
	          			<div class="marginBottom30">
					        <label class="searchLabel">添加礼物:</label>
	            			<select class="searchSelect modalSelect" v-model="chooseGiftId" 
	            				@change="checkGiftSelect">
		          				<option v-for="item in giftList" :value="item.gift_id">{{item.gift_name}}</option>
		          			</select>
		          			<Input class="modalInput" v-model="giftCount"
		          			placeholder="请输入礼物数量"></Input>
		          			<Button type="success" @click="addGiftSure">确定</Button>
	          			</div>
	          			<div style="font-size:18px">合计：{{giftPrice}}元</div>
	          			<Table stripe border :columns="treasureGiftColum" :data="treasureGiftList"></Table>
        			</div>
    			</Form>
    			<div slot="footer">
	        		<Button @click="cancelEdit('treasure')" class="borderNone">取消</Button>
		          	<Button type="success" @click="confirmEditTreasure">确认</Button>
	        	</div>
    		</modal>
    	</template>
    	<!-- 查看礼物弹窗 -->
    	<template>
    		<modal v-model="showGiftDetailModal" :title="modalTitle" @on-cancel="cancelDetail('gift')">
    			<Form :model="giftModer" :label-width="80">
    				<div class="alignLeft">
	    				<div class="marginBottom30">
		          			<label class="searchLabel">礼物等级<span class="red">*</span>:</label>
		          			<span class="detailSpan">{{giftDetailModer.gift_level | giftLevel}}</span>	
	          			</div>
	          			<div class="marginBottom30">
	          				<label class="searchLabel">礼物排序<span class="red">*</span>:</label>
	          				<span class="detailSpan">{{giftDetailModer.gift_order}}</span>	
	            			<label for="gift_name" class="searchLabel">礼物名称<span class="red">*</span>:</label>
	            			<span class="detailSpan">{{giftDetailModer.gift_name}}</span>	       
	          			</div>
	          			<div class="marginBottom30" style="position: relative">
	          				<label class="searchLabel uploadImgLabel">礼物图片<span class="red">*</span>:</label>
					        <div class="detailImg">
					        	<img class="uploadImgPic" v-show="giftDetailModer.gift_picture_path" :src="imgUrl + giftDetailModer.gift_picture_path">
					        	<span v-show="!giftDetailModer.gift_picture_path" style="line-height: 30px">无</span>					    
					        </div>
	            			<label class="searchLabel">礼物价格<span class="red">*</span>:</label>
	            			<span class="detailSpan">{{giftDetailModer.gift_price}}</span>
	          			</div>
	          			<div class="marginBottom30">
	            			<label for="gift_name" class="searchLabel">附带宝箱名:</label>
	            			<span class="detailSpan">{{giftDetailModer.adjunct_box_name}}</span>
		          			<label class="searchLabel">倒计时:</label>
		          			<span class="detailSpan">{{giftDetailModer.count_down}}</span>
	          			</div>
	          			<div class="marginBottom30">
	            			<label for="gift_name" class="searchLabel">礼物特效<span class="red">*</span>:</label>
	            			<span class="detailSpan">{{giftDetailModer.special_effect_name}}</span>
		          			<label for="gift_name" class="searchLabel">
		          				礼物触发特效<span class="red">*</span>:</label>
	            			<span class="detailSpan">{{giftDetailModer.special_trigger_effect_name}}</span>
	          			</div>
	          			<div class="marginBottom30">
	            			<label for="gift_name" class="searchLabel">触发特效礼物数量:</label>
	            			<span class="detailSpan">{{giftDetailModer.gift_trigger_special_effects_time}}</span>
		          			<label class="searchLabel">是否上架<span class="red">*</span>:</label>
		          			<span class="detailSpan" v-show="giftDetailModer.putaway_status">已上架</span>
		          			<span class="detailSpan" v-show="!giftDetailModer.putaway_status">已下架</span>
	          			</div>
        			</div>
    			</Form>
    			<div slot="footer">
	        		<Button class="borderNone" @click="cancelDetail('gift')">取消</Button>
		          	<!-- <Button type="success">确认</Button> -->
	        	</div>
    		</modal>
    	</template>
    	<!-- 查看宝箱弹窗 -->
    	<template>
    		<modal v-model="showTreasureDetailModal" :title="modalTitle" @on-cancel="cancelDetail('treasure')">
    			<Form :model="giftModer" :label-width="80">
    				<div class="alignLeft">
	    				<div class="marginBottom30">
		          			<label class="searchLabel">礼物等级<span class="red">*</span>:</label>
		          			<span class="detailSpan">{{treasureDetailModer.gift_level | giftLevel}}</span>	
	          			</div>
	          			<div class="marginBottom30">
	          				<label class="searchLabel">宝箱排序<span class="red">*</span>:</label>
	          				<span class="detailSpan">{{treasureDetailModer.gift_order}}</span>	
	            			<label for="gift_name" class="searchLabel">宝箱名称<span class="red">*</span>:</label>
	            			<span class="detailSpan">{{treasureDetailModer.gift_name}}</span>	       
	          			</div>
	          			<div class="marginBottom30" style="position: relative">
	          				<label class="searchLabel uploadImgLabel">宝箱图片<span class="red">*</span>:</label>
					        <div class="detailImg">
					        	<img class="uploadImgPic" v-show="treasureDetailModer.gift_picture_path" :src="imgUrl + treasureDetailModer.gift_picture_path">
					        	<span v-show="!treasureDetailModer.gift_picture_path" style="line-height: 30px">无</span>					    
					        </div>
	            			<label class="searchLabel">宝箱关闭特效<span class="red">*</span>:</label>
	            			<span class="detailSpan">{{treasureDetailModer.special_effect_name}}</span>
	          			</div>
	          			<div class="marginBottom30">
	            			<label for="gift_name" class="searchLabel">宝箱打开特效:</label>
	            			<span class="detailSpan">{{treasureDetailModer.special_trigger_effect_name}}</span>
		          			<label class="searchLabel">是否上架<span class="red">*</span>:</label>
		          			<span class="detailSpan" v-show="treasureDetailModer.putaway_status">已上架</span>
		          			<span class="detailSpan" v-show="!treasureDetailModer.putaway_status">已下架</span>
	          			</div>
	          			<div style="font-size:18px">
	          				<span>宝箱中的礼物</span>
	          				<span class="fr">合计：{{treasureDetailModer.gift_price}}元</span>
	          			</div>
	          			<Table stripe border :columns="treasureDetailColum" 
	          			:data="treasureDetailModer.gifts"></Table>
        			</div>
    			</Form>
    			<div slot="footer">
	        		<Button class="borderNone" @click="cancelDetail('treasure')">取消</Button>
	        	</div>
    		</modal>
    	</template>
	</div>
</template>

<script type="text/javascript">
	import { giftListCtrl } from 'view_js/gift_manage/gift_list';
	export default {
 		mixins: [giftListCtrl]
	};
</script>