export const liveDetailCtr = {
	inject: ['reload'],
	data(){
		return {
			liveDetailData: {},
			//礼物排行列表数据
			giftInfoList: [],
			giftInfoColum: [
				{title: '用户ID', key: 'audience_id', align: "center"},
				{title: '用户昵称', key: 'audience_name', align: "center"},
				{title: '排行称号', key: 'rank_name', align: "center"},
				{title: '排序', key: 'num', align: "center"},
				{title: '礼物贡献值（爱豆）', key: 'contribution', align: "center"}
			],
			imgModal: false,
			imgUrl: ''
		}
	},
	created(){
		console.log(this.$route.params.id);
		this.getLiveDetail();
	},
	methods: {
		//刷新页面
		refreshPage() {
			this.reload();
		},
		//返回
		goHistory() {
  			this.$router.go(-1);
  		},
  		//获取直播详情数据
  		getLiveDetail(){
  			let getParams = {
  				live_id: this.$route.params.id
  			};
  			this.$api.getLiveDetail(getParams).then(res => {
  				if(res.code == 200){
  					this.liveDetailData = res.data;
  					this.liveDetailData.live_cover = 'http://www30.1shuo.com/' + res.data.live_cover;
  					this.giftInfoList = res.data.rank_document_list;
  					console.log(this.liveDetailData.live_user_information);
  				}else {
  					this.$Message.error(res.msg);
  				}
  			})
  		},
  		//查看图片放大
  		showImgModal(url){
  			this.imgModal = true;
  			let picUrl = 'http://www30.1shuo.com/' + url;
  			if(url){
  				console.log(url);
  				this.imgUrl = url;
  			}
  		},
  		//取消禁用
		cancelForbid() {
			this.forbidModal = false;
			this.forbidId = 0;
		},
	}
}