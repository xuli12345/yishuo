import { liveType, formatTime, liveStatus }  from 'filter/filters';

export const liveListCtrl = {
	inject: ['reload'],
	data() {
		return {
			//查询数据初始化
			live_type: '-1',
			live_status: '-1',
			user_id: null,
			live_nickname: null,
			room_num: null,
			pageSize: 15,
			totalCount: 0,
			currentPage: 1,
			//数据列表
			liveDataList: [],
			liveColum: [
				{title: '主播ID', key: 'user_id', align: "center"},
				{title: '主播昵称', key: 'live_nickname', align: "center"},
				{title: '房间号', key: 'room_num', align: "center"},
				{title: '直播模式', key: 'live_type', align: "center", 
					render: (h, params) =>{
						return h('span', liveType(params.row.live_type));
					}
				},
				{title: '直播状态', key: 'live_status', align: "center", 
					render: (h, params) =>{
						return h('span', liveStatus(params.row.live_status));
					}
				},
				{title: '排序', key: 'sort_order', align: "center"},
				{title: '创建时间', key: 'create_time', align: "center", 
					render: (h, params) =>{
						return h('span', formatTime(params.row.create_time*1000, 'YMDHMS'));
					}
				},
				{title: '操作', key: 'action', align: "center", 
					render: (h, params) =>{
						let display = '', hideDisplay = '';
						if(params.row.live_status != 5) {
							display = "none";
						}else {
							display = "inline-block";
						}
						if(params.row.live_status == 5 && params.row.live_hide_status == 0){//0-公开1-隐藏
							hideDisplay = 'inline-block';
						}else {
							hideDisplay = 'none';
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
                      						this.getLiveDetail(params.row.live_id);
                    					}
                  					}
                				},
                			"查看"
							),
							h(
								"Button", {
                  					props: {
                    					type: "error",
                    					size: "small"
                  					},
                  					style: {
                    					marginRight: "5px",
                    					display: display
                  					},
                  					attrs: {
                  						
                  					},
                  					on: {
                    					click: () => {
                      						this.forbidModalShow(params.row.live_id);
                      						console.log(params.row);
                    					}
                  					}
                				},
                			"禁用"
							),
							h(
								"Button", {
                  					props: {
                    					type: "error",
                    					size: "small"
                  					},
                  					style: {
                    					marginRight: "5px",
                    					display: hideDisplay
                  					},
                  					on: {
                    					click: () => {
                      						this.hideModalShow(params.row.live_id);
                      						console.log(params.row);
                    					}
                  					}
                				},
                			"隐藏"
							),
						]);
					}
				}
			],
			//弹窗数据
			forbidModal: false,
			hideModal: false,
			cardNumberModal: false,
			backgroundImgNumberModal: false,
			linkNumberModal: false,
			likeNumberModal: false,
			robotNumberModal: false,
			//禁用直播
			forbidId: 0,
			//隐藏直播
			hideId: 0,
			//设置参数
			roleCardNumber: null,
			backgroundImgNumber: null,
			linkNumber: null,
			add_like_number_time: null,//开始增加点赞数时间（单位S）
			like_number_time_rate: null,//点赞数随时间增加的比例(时间长度：点赞数)
			like_number_real_virtual_rate: null,//真实点赞数与点赞数的比例(真实点赞数：总点赞数)
			add_robot_time_length: null,//增加机器人时间长度（单位S）
			random_add_robot_number_min: null,//随机机器人增加的数量的最小值
			random_add_robot_number_max: null,//随机机器人增加的数量的最大值
			reduce_robot_time_length: null,//减少机器人时间长度（单位S）
			random_reduce_robot_number_min: null,//随机减少机器人数量的最小值
			random_reduce_robot_number_max: null,//随机减少机器人数量的最大值
			robot_number_min: null,//机器人添加上限最小值
			robot_number_max: null//机器人添加上限最大值
		}
	},
	created(){
		this.getLiveList();
	},
	methods: {
		//获取直播列表数据
		getLiveList() {
			let getParams = {
				page: this.currentPage,
				per_page: this.pageSize,
				room_num: this.room_num,
				user_id: this.user_id,
				live_status: this.live_status == '-1' ? '' : this.live_status,
				live_type: this.live_type == '-1' ? '' : this.live_type,
				live_nickname: this.live_nickname
			};
			this.$api.getLiveList(getParams).then(res => {
				if(res.code == 200){
					this.totalCount = res.data.total_count;
					this.currentPage = res.data.page;
					for(let i = 0; i < res.data.list.length; i++){
						if(res.data.list[i].live_hide_status == null){
							res.data.list[i].live_hide_status = 0;
						}
					}
					this.liveDataList = res.data.list;
				}else {
					this.$Message.error(res.msg);
				}
			})
		},
		//查询
		searchData() {
			this.currentPage = 1;
			this.getLiveList();
		},
		//翻页
		pageChange(index) {
			this.currentPage = index;
			this.getLiveList();
		},
		//刷新页面
		refreshPage() {
			this.reload();
		},
		//查看直播详情
		getLiveDetail(index) {
			this.$router.push({
        		name: 'live_detail',
        		params: {
          			id: index
        		}
      		})
		},
		//禁用直播弹窗显示
		forbidModalShow(index) {
			this.forbidModal = true;
			this.forbidId = index;
		},
		//取消禁用
		cancelForbid() {
			this.forbidModal = false;
			this.forbidId = 0;
		},
		//确认禁用
		confirmForbid() {
			let setParams = {
				live_id: this.forbidId
			};
			console.log(this.forbidId);
			this.forbidModal = false;
			this.$api.setLiveForbid(setParams).then(res => {
				if(res.code == 200){
					this.$Message.success('禁用成功');
					this.currentPage = 1;
					this.getLiveList();
				} else {
					this.$Message.error('禁用失败');
				}
			})
		},
		//隐藏直播弹窗显示
		hideModalShow(index){
			this.hideModal = true;
			this.hideId = index;
		},
		//取消隐藏
		cancelHide() {
			this.hideModal = false;
			this.hideId = 0;
		},
		//隐藏直播
		confirmHide(){
			let setHideParams = {
				live_id: this.hideId,
				live_hide_status: 1
			};
			this.$api.setLiveHide(setHideParams).then(res => {
				if(res.code == 200){
					this.$Message.success('隐藏直播成功！');
					this.currentPage = 1;
					this.getLiveList();
				}else {
					this.$Message.error('隐藏直播失败！');
				}
			})
		},
		//获取角色卡原先数量设置
		getRoleCardNumber(){
			this.cardNumberModal = true;
			this.$api.getRoleCardNumber().then(res => {
				if(res.code == 200){
					this.roleCardNumber = res.role_card_number;
				}else {
					this.$Message.error(res.msg);
				}
			})
		},
		//获取直播原先背景图数
		getBackgroundImgNumber(){
			this.backgroundImgNumberModal = true;
			this.$api.getBackgroundImgNumber().then(res => {
				if(res.code == 200){
					this.backgroundImgNumber = res.background_image_number;
				}else {
					this.$Message.error(res.msg);
				}
			})
		},
		//获取原先直播连麦数
		getLinkNumber(){
			this.linkNumberModal = true;
			this.$api.getLinkNumber().then(res => {
				if(res.code == 200){
					this.linkNumber = res.link_number;
				}else {
					this.$Message.error(res.msg);
				}
			})
		},
		//获取直播点赞数
		getLikeNumber(){
			this.likeNumberModal = true;
			this.$api.getLikeNumber().then(res => {
				if(res.code == 200){
					this.add_like_number_time = res.add_like_number_time;
					this.like_number_time_rate = this.numberToRate(res.like_number_time_rate);
					this.like_number_real_virtual_rate = res.like_number_real_virtual_rate;
				}else {
				this.$Message.error(res.msg);
					}
			})
		},
		//将数字转为比例
        numberToRate(num){
            return num + ":1"
        },
        //比例数化为double类型
        toDouble(num){
        	if(num){
        		var st = num.replace(/：/g, ":").split(" "),
                c = st[0].split(":");
            	return c[0] / c[1];
        	}
        },
		//获取直播机器人数
		getRobotNumber(){
			this.robotNumberModal = true;
			this.$api.getRobotNumber().then(res => {
				if(res.code == 200){
					this.add_robot_time_length = res.add_robot_time_length;
					this.random_add_robot_number_min = res.random_add_robot_number_min;
					this.random_add_robot_number_max = res.random_add_robot_number_max;
					this.reduce_robot_time_length = res.reduce_robot_time_length;
					this.random_reduce_robot_number_max = res.random_reduce_robot_number_max;
					this.random_reduce_robot_number_min = res.random_reduce_robot_number_min;
					this.robot_number_min = res.robot_number_min;
					this.robot_number_max = res.robot_number_max;
				}else {
					this.$Message.error(res.msg);
				}
			})
		},
		//设置角色卡位数
		setRoleCardNumber(){
			let setCardParams = {
				role_card_number: this.roleCardNumber
			};
			this.$api.setRoleCardNumber(setCardParams).then(res => {
				if(res.code == 200){
					this.$Message.success("角色卡位数设置成功！");
					this.cardNumberModal = false;
				}else {
					this.$Message.error(res.msg);
				}
			})
		},
		//设置直播背景图数
		setBackgroundImgNumber(){
			let setImgParams = {
					background_image_number: this.backgroundImgNumber
				};
			this.$api.setBackgroundImgNumber(setImgParams).then(res => {
				if(res.code == 200){
					this.$Message.success("背景图数设置成功！");
					this.backgroundImgNumberModal = false;
				}else{
					this.$Message.error(res.msg);
				}
			})
		},
		//设置直播连麦数
		setLinkNumber(){
			let setLinkParams = {
					link_number: this.linkNumber
				};
			this.$api.setLinkNumber(setLinkParams).then(res => {
				if(res.code == 200){
					this.$Message.success("连麦数设置成功！");
					this.linkNumberModal = false;
				}else{
					this.$Message.error(res.msg);
				}
			})
		},
		//设置直播点赞数
		setLikeNumber(){
			let setLikeParams = {
					add_like_number_time: null,
					like_number_time_rate: this.toDouble(this.like_number_time_rate),
					like_number_real_virtual_rate: this.toDouble(this.like_number_real_virtual_rate)
				};
			if(this.add_like_number_time != ""){
	            var st = this.add_like_number_time.replace(/：/g, ":").split(" "),
	                c = st[0].split(":");
	            setLikeParams.add_like_number_time = parseInt(c[0] * 60) + parseInt(c[1]);
        	}
			this.$api.setLikeNumber(setLikeParams).then(res => {
				if(res.code == 200){
					this.$Message.success("点赞数设置成功！");
					this.likeNumberModal = false;
				}else{
					this.$Message.error(res.msg);
				}
			})
		},
		//设置直播机器人数
		setRobotNumber(){
			let setRobotParams = {
					add_robot_time_length: this.add_robot_time_length,
					random_add_robot_number_min: this.random_add_robot_number_min,
					random_add_robot_number_max: this.random_add_robot_number_max,
					reduce_robot_time_length: this.reduce_robot_time_length,
					random_reduce_robot_number_min: this.random_reduce_robot_number_min,
					random_reduce_robot_number_max: this.random_reduce_robot_number_max,
					robot_number_min: this.robot_number_min,
					robot_number_max: this.robot_number_max
				};
			this.$api.setRobotNumber(setRobotParams).then(res => {
				if(res.code == 200){
					this.$Message.success("机器人数设置成功！");
					this.robotNumberModal = false;
				}else{
					this.$Message.error(res.msg);
				}
			})
		},
		//取消设置
		cancelSet(type){
			if(type == 'card'){
				this.cardNumberModal = false;
			}else if(type == 'img'){
				this.backgroundImgNumberModal = false;
			}else if(type == 'link'){
				this.linkNumberModal = false;
			}else if(type == 'like'){
				this.likeNumberModal = false;
			}else if(type == 'robot'){
				this.robotNumberModal = false;
			}
		}
	}

}