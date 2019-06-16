import { putawayStatus, giftLevel }  from 'filter/filters';
import vueUpload from 'components/upload';

export const giftListCtrl = {
	inject: ['reload'],
	components: {
    	vueUpload
  	},
	data(){
		return{
			//查询参数
			gift_id: null,
			gift_name: null,
			putaway_status: '-1',
			currentPage: 1,
			pageSize:15,
			totalCount: 0,
			//数据列表
			giftDataList: [],
			giftColum: [
				{
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        _disabled: true
                },
				{title: '礼物ID', key:'gift_id', align: "center"},
				{title: '礼物名称', key:'gift_name', align: "center"},
				{title: '价格(爱豆)', key:'gift_price', align: "center"},
				{title: '排序', key:'gift_order', align: "center"},
				{title: '附带百宝箱名称', key:'adjunct_box_name', align: "center"},
				{title: '上架状态', key:'putaway_status', align: "center",
					render: (h, params) =>{
						return h('span', putawayStatus(params.row.putaway_status));
					}
				},
				{title: '操作', key:'action', align: "center",
					render: (h, params) =>{
						let editText = '';
						if(params.row.gift_type == 1){
							editText = '编辑礼物';
						}else if(params.row.gift_type == 2){
							editText = '编辑宝箱';
						}
						return h('div', [
								h(
									"Button", {
	                  					props: {
	                    					type: "primary",
	                    					size: "small"
	                  					},
	                  					style: {
	                    					marginRight: "5px"
	                  					},
	                  					on: {
	                    					click: () => {
	                    						console.log(params.row);
	                      						this.showEditModal(params.row);
	                    					}
	                  					}
	                				},
                				editText
								),
								h(
									"Button", {
	                  					props: {
	                    					type: "primary",
	                    					size: "small"
	                  					},
	                  					style: {
	                    					marginRight: "5px"
	                  					},
	                  					on: {
	                    					click: () => {
	                      						this.showGiftDetail(params.row);
	                    					}
	                  					}
	                				},
                				"查看"
								)
							]);
					}
				},
			],
			treasureGiftList: [],
			treasureGiftColum: [
				{title: '礼物ID', key:'one_gift_id', align: "center"},
				{title: '礼物名称', key:'one_gift_name', align: "center"},
				{title: '礼物数量', key:'one_gift_number', align: "center"},
				{title: '操作', key:'action', align: "center", 
					render: (h, params) =>{
						return h('div', [
								h(
									"Button", {
	                  					props: {
	                    					type: "primary",
	                    					size: "small"
	                  					},
	                  					style: {
	                    					marginRight: "5px"
	                  					},
	                  					on: {
	                    					click: () => {
	                    						console.log(params.row);
	                      						this.deleteTreasureGift(params.row.one_gift_id);
	                    					}
	                  					}
	                				},
                				"删除"
								)
							]);
					}
				},
			],
			treasureDetailColum: [
				{title: '礼物ID', key:'one_gift_id', align: "center"},
				{title: '礼物名称', key:'one_gift_name', align: "center"},
				{title: '礼物数量', key:'one_gift_number', align: "center"}
			],
			//多选选中的礼物
			chooseGiftList: [],
			//弹窗参数
			addGiftModal: false,
			addTresureModal: false,
			showGiftDetailModal: false,
			showTreasureDetailModal: false,
			giftType: null,
			giftId: null,
			giftEffectList: [],
			giftSpecialList: [],
			giftList: [],
			treasureList: [],
			giftDetailModer: {},
			treasureDetailModer: {},
			modalTitle: '',
			editGift: false,//编辑礼物
			editTreasure: false,//编辑宝箱
			editImg: false,//编辑礼物图片
			giftModer: {
				uuid: this.$api.uuid,
				gift_level:null,
				gift_order: '',
				gift_name: '',
				gift_picture_path: '',
				gift_price: '',
				adjunct_box_id: null,
				count_down: '',
				gift_special_effects: null,
				gift_trigger_effects: null,
				gift_trigger_effects_time: null,
				putaway_status: '',
			},
			treasureModer: {
				uuid: this.$api.uuid,
				gift_level:null,
				gift_order: '',
				gift_name: '',
				gift_picture_path: '',
				gift_price: '',
				adjunct_box_id: null,
				count_down: '',
				gift_special_effects: null,
				gift_trigger_effects: null,
				gift_trigger_effects_time: null,
				putaway_status: '',
				gift_list: ''
			},
			//宝箱中礼物
			//gifts: {},
			//宝箱中的礼物参数
			treasureGift: {
				one_gift_id: '',
				one_gift_name: '',
				one_gift_number: '',
				one_gift_price: ''
			},
			chooseGiftId: null,
			giftCount: '',
			giftPrice: 0,
			editTreasureGift: false,//编辑宝箱中的礼物
			addToTreasure: false,
			//上传
			showUploadTreasure:false,//是否显示上传图片组件，默认为否
			showUploadGift: false,
			voiceSingleSizeLimit: 200 * 1024 * 1024,
		    uploadUrl: this.$api.uploadUrl + 'yishuo/api_web/upload/image',//上传路径
		    formData: { img: 'file' },//上传时传给后端的参数
		    imgUrl: this.$api.fileUrl,
		}
	},
	created(){
		this.getGiftList();
	},
	methods: {
		//获取礼物列表
		getGiftList(){
			let getParams = {
				uuid: this.$api.uuid,
				gift_id: this.gift_id,
				gift_name: this.gift_name,
				putaway_status: this.putaway_status == '-1' ? null : this.putaway_status,
				page: this.currentPage,
				per_page: this.pageSize,
			};
			this.$api.getGiftList(getParams).then(res => {
				if(res.code == 200){
					this.giftDataList = res.data.list;
					//宝箱不可以多选
					for (var i = 0; i < this.giftDataList.length; i++) {
						if(this.giftDataList[i].gift_type == 2 || this.giftDataList[i].adjunct_box_name != ''){
							this.giftDataList[i]._disabled = true;
						}
					}
					this.totalCount = res.data.total_count;
					this.currentPage = res.data.page;
				}else {
					this.$Message.error(res.msg);
				}
			})
		},
		//查询
		searchData() {
			this.currentPage = 1;
			this.getGiftList();
		},
		//翻页
		pageChange(index) {
			this.currentPage = index;
			this.getGiftList();
		},
		//刷新页面
		refreshPage() {
			this.reload();
		},
		//初始化礼物参数
		initParam(type){
			if(type == 'gift'){
				this.giftModer = {
					gift_level:null,
					gift_order: '',
					gift_name: '',
					gift_picture_path: '',
					gift_price: '',
					adjunct_box_id: null,
					count_down: '',
					gift_special_effects: null,
					gift_trigger_effects: null,
					gift_trigger_effects_time: null,
					putaway_status: '',
					gift_list: ''
				};
			}else if(type == 'treasure'){
				this.treasureModer = {
					gift_level:null,
					gift_order: '',
					gift_name: '',
					gift_picture_path: '',
					gift_price: '',
					adjunct_box_id: null,
					count_down: '',
					gift_special_effects: null,
					gift_trigger_effects: null,
					gift_trigger_effects_time: null,
					putaway_status: '',
					gift_list: ''
				};
			}
		},
		//编辑礼物弹窗
		showEditModal(params){
			if(params.gift_type == 1){//礼物
				this.editGift = true;
				this.giftType = 1;
				this.showModal('gift');
			}else if(params.gift_type == 2){//宝箱
				this.editTreasure = true;
				this.giftType = 2;
				this.showModal('treasure');
			}
			this.getGiftOtherInfo(params);
		},
		//添加/编辑礼物弹窗显示
		showModal(type){
			let getParams = {
				gift_id: null,
				gift_type: null
			};
			if(type == 'gift'){
				this.addGiftModal = true;
				this.giftType = 1;
				if(this.editGift){
					this.modalTitle = '编辑礼物';
					$('#uploadGiftImg .webuploader-pick').text('更换图片');
				}else {
					this.modalTitle = '添加礼物';
				}
				this.showUploadGift = true;
				this.getGiftEffects();
				this.getGiftAndTReasure();
			}else if(type == 'treasure'){
				this.addTresureModal = true;
				this.giftType = 2;
				this.showUploadTreasure = true;
				this.getGiftEffects();
				this.getGiftAndTReasure();
				if(this.editTreasure){
					this.modalTitle = '编辑宝箱';
					$('#uploadGiftImg .webuploader-pick').text('更换图片');
				}else {
					this.modalTitle = '添加宝箱';
				}
				if(this.chooseGiftList.length){
					this.giftType = 1;
					this.addToTreasure = true;
					for (var i = 0; i < this.chooseGiftList.length; i++) {
						getParams.gift_id = this.chooseGiftList[i].gift_id;
						getParams.gift_type = this.chooseGiftList[i].gift_type;
						this.getGiftOtherInfo(getParams);
						getParams = {};
					}
				}
				console.log(this.giftType);
				console.log(this.chooseGiftList);
			}
			//this.getGiftEffects();
			//this.getGiftAndTReasure();
			//this.showUpload = true;
			//console.log(this.showUpload);
		},
		//获取礼物其他信息
		getGiftOtherInfo(params){
			let getParams = {
				uuid: this.$api.uuid,
				gift_id: params.gift_id,
				gift_type: params.gift_type
			};
			this.$api.getGiftOtherInfo(getParams).then(res =>{
				if(res.code == 200){
					//console.log(this.giftType);
					if(this.giftType == 1){
						this.giftModer = res.data;
						this.giftModer.putaway_status = this.giftModer.putaway_status.toString();
						if(this.addToTreasure){
							console.log('多选数组' + this.chooseGiftList.length)
							if(this.chooseGiftList.length){
								this.giftCount = 1;
							}
							this.treasureGift.one_gift_id = res.data.gift_id;
							this.treasureGift.one_gift_name = res.data.gift_name;
							console.log('礼物数量' + this.giftCount);
							this.treasureGift.one_gift_number = parseInt(this.giftCount);
							this.treasureGift.one_gift_price = res.data.gift_price;
							this.treasureGiftList.push(this.treasureGift);
							this.treasureGift = {};
							this.countGiftPrice(this.treasureGiftList);
						}
					}else if(this.giftType == 2){
						this.treasureModer = res.data;
						this.treasureGiftList = res.data.gifts;
						this.countGiftPrice(this.treasureGiftList);
						this.treasureModer.putaway_status = this.treasureModer.putaway_status.toString();
					}
					this.chooseGiftId = null;
					this.giftCount = '';
				}else {
					this.$Message.error(res.msg);
				}
			});
		},
		//获取礼物特效
		getGiftEffects(){
			let getParams = {
				uuid: this.$api.uuid,
				gift_type: this.giftType
			};
			this.$api.getGiftEffect(getParams).then(res => {
				if(res.code == 200){
					this.giftEffectList = res.special_list;
					this.giftSpecialList = res.tragger_special_list;
					console.log(this.giftEffectList);
				}else {
					this.$Message.error(res.msg);
				}
			})
		},
		//获取礼物与宝箱集合
		getGiftAndTReasure(){
			let getParams = {
				uuid: this.$api.uuid,
				gift_id: this.giftId
			};
			this.$api.getGiftAndTreasure(getParams).then(res =>{
				if (res.code == 200) {
					this.treasureList = res.treasure_box_list;
					this.giftList = res.gift_list;
				}else {
					this.$Message.error(res.msg);
				}
			})
		},
		// 当有文件被添加进队列的时候
	    fileChange(file) {
	    	console.log(file);
		    if (!file.size) {
		      	return
		    }
	    },
	    // 某个文件开始上传前触发，一个文件只会触发一次
	    onStart(file) {
	    	console.log(file);
	      	this.$Message.success('开始上传前触发');
	    },
	    // 当文件上传成功时触发
	    onSuccess(file, response) {
	      	this.$Message.success('上传成功');
	      	if(response.code == 200){
	      		//this.giftModer.gift_picture_path = fileUrl + response.data;
	      		if(this.addGiftModal){
	      			this.giftModer.gift_picture_path = response.data;
	      			$('#uploadGiftImg .webuploader-pick').text('更换图片');
	      		}else if(this.addTresureModal){
	      			this.treasureModer.gift_picture_path = response.data;
	      			$('#uploadTreasureImg .webuploader-pick').text('更换图片');
	      		}
	      	}
	    },
	    // 当文件上传出错时触发
	    onError(file, reason) {
	      	this.$Message.error('上传出错');
	    },
	    error(errorMessage) {
	      	this.$Message.error('上传失败');
	    },
	    complete(file, response) {
	      	this.$Message.success('不管成功或者失败，文件上传完成时触发');
	    },
	    //删除图片
	    deleteImg(type){
	    	if(type == 'gift'){
	    		this.giftModer.gift_picture_path = '';
	    		$('#uploadGiftImg .webuploader-pick').text('上传图片');
	    	}else if(type == 'treasure'){
	    		this.treasureModer.gift_picture_path = '';
	    		$('#uploadTreasureImg .webuploader-pick').text('上传图片');
	    	}
	    },
		//取消修改礼物
		cancelEdit(type){
			if(type == 'gift'){
				this.addGiftModal = false;
				this.initParam('gift');
				this.editGift = false;
			}else if(type == 'treasure'){
				this.addTresureModal = false;
				this.editTreasure = false;
				this.initParam('treasure');
				this.treasureGiftList = [];
				this.giftPrice = 0;
				this.editTreasureGift = false;
			}
			$('#uploadGiftImg .webuploader-pick').text('上传图片');
			$('#uploadTreasureImg .webuploader-pick').text('上传图片');
		},
		//判断是否为空
		checkIsEmpty(param){
			if(typeof param != 'number' && param == ''){
				return false;
			}else {
				return true;
			}
		},
		//检测礼物必填参数是否填写完整
		checkGiftAll(){
			if(this.giftModer.gift_level && this.checkIsEmpty(this.giftModer.gift_order) && 
				this.giftModer.gift_name && this.giftModer.gift_picture_path && 
				this.checkIsEmpty(this.giftModer.gift_price) && this.giftModer.gift_special_effects &&
				this.checkIsEmpty(this.giftModer.putaway_status)){
				if(this.giftModer.adjunct_box_id){
					if(this.checkIsEmpty(this.giftModer.count_down)){
						return true;
					}else {
						return false;
					}
				}else {
					return true;
				}
			}else {
				return false;
			}
		},
		//检查宝箱必填参数是否填写完整
		checkTreasureAll(){
			if(this.treasureModer.gift_level && this.checkIsEmpty(this.treasureModer.gift_order) && 
				this.treasureModer.gift_name && this.treasureModer.gift_picture_path && 
				this.treasureModer.gift_special_effects && this.checkIsEmpty(this.treasureModer.putaway_status)){
				return true;
			}else{
				return false;
			}
		},
		//确认修改礼物
		confirmEditGift(){
			//this.addGiftModal = true;
			let setParams = this.giftModer;
			setParams.uuid = this.$api.uuid;
			if(this.checkAll()){
				if(this.giftModer.gift_order < 0 || this.giftModer.gift_price < 0){
					this.$Message.error('礼物排序和价格不能为负数！');
					return false;
				}
				if(this.editGift){
					this.$api.editGiftTreasure(setParams).then(res =>{
						if(res.code == 200){
							this.$Message.success('编辑礼物成功！');
							this.addGiftModal = false;
							this.initParam('gift');
							this.getGiftList();
						}else {
							this.$Message.error(res.msg);
						}
					});
				}else{
					this.$api.addGift(setParams).then(res =>{
						if(res.code == 200){
							this.$Message.success('添加礼物成功！');
							this.addGiftModal = false;
							this.initParam('gift');
							this.getGiftList();
						}else {
							this.$Message.error(res.msg);
						}
					});
				}
			}else {
				this.$Message.error('请将必填参数填写完整！');
			}
		},
		//表格多选
		giftSelect(selection){
			console.log(selection);
			if(selection){
				this.chooseGiftList = selection;
			}
		},
		//计算宝箱中礼物价格总和
		countGiftPrice(giftList){
			this.giftPrice = 0;
            for(let i = 0; i < giftList.length; i++){
                this.giftPrice += giftList[i].one_gift_price * giftList[i].one_gift_number;
            }
            let num = this.giftPrice;
            if(String(num).indexOf('.') > -1){
                this.giftPrice = this.giftPrice.toFixed(1);
            }
            this.editTreasureGift = false;
            //console.log(this.giftPrice);
        },
        //检查礼物是否已经在宝箱中
        checkGiftSelect(){
        	if(this.chooseGiftId){
        		for(let i=0; i<this.treasureGiftList.length; i++){
        			if(this.treasureGiftList[i].one_gift_id == this.chooseGiftId){
        				this.giftCount = this.treasureGiftList[i].one_gift_number;
        				this.editTreasureGift = true;
        			}
        		}
        	}
        },
		//添加礼物进宝箱
		addGiftSure(){
			this.addToTreasure = true;
			this.giftType = 1;
			let params = {
				gift_id: this.chooseGiftId,
				gift_type: 1
			};
			let giftItem = {};
			if(this.editTreasureGift){
				for (let i = 0; i < this.treasureGiftList.length; i++) {
					if(this.treasureGiftList[i].one_gift_id == this.chooseGiftId){
						this.treasureGiftList[i].one_gift_number = parseInt(this.giftCount);
						giftItem = this.treasureGiftList[i];
						this.treasureGiftList.splice(i,1,giftItem);
						this.countGiftPrice(this.treasureGiftList);
					}
				}
				console.log(this.treasureGiftList);
				this.chooseGiftId = null;
				this.giftCount = '';
				//this.editTreasureGift = false;
			}else {
				this.getGiftOtherInfo(params);
			}
		},
		//删除宝箱中的礼物
		deleteTreasureGift(id){
			if(id){
				for(let i = 0; i < this.treasureGiftList.length; i++){
					if(this.treasureGiftList[i].one_gift_id == id){
						this.treasureGiftList.splice(i,1);
						this.countGiftPrice(this.treasureGiftList);
					}
				}
			}
		},
		//确认修改宝箱
		confirmEditTreasure(){
			let setParams = this.treasureModer;
			setParams.uuid = this.$api.uuid;
			console.log(setParams);
			if(!this.checkTreasureAll()){
				this.$Message.error('请将必填参数填写完整！');
				return false;
			}
			if(this.treasureModer.gift_order < 0){
					this.$Message.error('宝箱排序不能为负数！');
					return false;
			}
			if(this.editTreasure){
				setParams.gift_list = JSON.stringify(setParams.gifts);
				setParams.gift_price = this.giftPrice;
				delete setParams.gifts;
				this.$api.editGiftTreasure(setParams).then(res =>{
					if(res.code == 200){
						this.$Message.success('编辑宝箱成功！');
						this.addTresureModal = false;
						this.initParam('treasure');
						this.treasureGiftList = [];
						this.giftPrice = 0;
						this.getGiftList();
					}else {
						this.$Message.error(res.msg);
					}
				});
			}else {
				setParams.gift_list = JSON.stringify(this.treasureGiftList);
				setParams.gift_price = this.giftPrice;
				this.$api.addTreasure(setParams).then(res => {
					if(res.code == 200){
						this.$Message.success('添加宝箱成功！');
						//参数初始化
						this.addTresureModal = false;
						this.initParam('treasure');
						this.treasureGiftList = [];
						this.chooseGiftList = [];
						this.giftPrice = 0;
						this.getGiftList();
					}else {
						this.$Message.error(res.msg);
					}
				});
			}
		},
		//查看礼物、宝箱详情
		showGiftDetail(params){
			if(params.gift_type == 1){
				this.showGiftDetailModal = true;
			}else if(params.gift_type == 2){
				this.showTreasureDetailModal = true;
			}
			let getParams = {
				uuid: this.$api.uuid,
				gift_id: params.gift_id,
				gift_type: params.gift_type
			};
			this.$api.getGiftDetail(getParams).then(res =>{
				if(res.code == 200){
					if(params.gift_type == 1){
						this.giftDetailModer = res.data;
					}else if(params.gift_type == 2){
						this.treasureDetailModer = res.data;
					}
				}else {
					this.$Message.error(res.msg);
				}
			});
		},
		//取消查看
		cancelDetail(type){
			if(type == 'gift'){
				this.showGiftDetailModal = false;
			}else if(type == 'treasure'){
				this.showTreasureDetailModal = false;
			}
		}
	}
}