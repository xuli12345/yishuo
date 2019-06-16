import { formatTime } from 'filter/filters';

export const voiceRecommendCtrl = {
	data() {
		return {
			//查询数据
			pageSize: 15,
			currentPage: 1,
			last_request_time: 0,
			voiceId: '',
			voiceName: '',
			totalCount: 0,
			//列表数据
			loading: true,
			voiceRecommendList: [],
			voiceRecommendColum: [
				{title: '序号', key: 'sort_order', align: "center"},
				{title: '声音ID', key: 'voice_id', align: "center"},
				{title: '声音名称', key: 'voice_name', align: "center"},
				{title: '播放试听', align: "center",
					render: (h, params) => {
						if(params.row.final_voice_file_md5) {
							return h('Icon', {
								props: {
                  type: "play"
                },
                style: {
                	width: '30px',
                	height: '30px',
                	lineHeight: '30px'
                },
                on: {
                  click: () => {
                    this.playAudio(params);
                  }
                }
							});
						} else {
							return h('span', '声音地址不存在');
						}
					}
				},
				{title: '播放数', key: 'play_count', align: 'center'},
				{title: '转发数', key: 'forward_count', align: 'center'},
				{title: '喜欢数', key: 'like_count', align: 'center'},
				{title: '评论数', key: 'comment_count', align: 'center'},
				{title: '发布者昵称', key: 'nickname', align: 'center'},
				{title: '推荐时间', key: 'create_time', align: 'center',
					render: (h, params) => {
						return h('span', formatTime(params.row.create_time*1000, 'YMDHMS'));
					}
				},
				{title: '推荐版块', align: 'center',
					render: (h, params) => {
						return h('span', '热门声音');
					}
				},
				{title: '操作', key: 'action', width: 180, align: "center", 
					render: (h, params) => {
						return h("div", [
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
                      this.editModalShow(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button", {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteModalShow(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
					}
				},
			],
			//弹窗数据
			editModel: false,
			edit_voiceId: 0,
			sort_order: null,
			deleteModal: false,
			delete_voiceId: 0,
			delete_picked: false,
		}
	},
	created() {
  	this.getVoiceRecommend();
	},
	methods: {
		//获取用户推荐数据
		getVoiceRecommend() {
			let getPramas = {
				uuid: this.$api.uuid,
				page: this.currentPage,
    		per_page: this.pageSize,
    		last_request_time: this.last_request_time,
    		voice_id: this.voiceId,
    		voice_name: this.voiceName
			};
			this.$api.getVoiceRecommend(getPramas).then(res => {
				this.loading = false;
				if(res.code == 200) {
					this.totalCount = res.data.total_count;
					this.currentPage = res.data.page;
					this.voiceRecommendList = res.data.list;
					this.last_request_time = res.data.last_request_time;
				} else {
					this.$Message.error(res.msg);
				}
			})
		},
		//播放
		playAudio(params) {
			$(".ivu-icon-play").css('color', "#495060");
			$(".ivu-icon-play").eq(params.index).css('color', '#00ff00');
			var trueSrc = fileUrl + 'uploads/audio/voice/md5/' + params.row.final_voice_file_md5;
			var audio = document.getElementById('voicePlay');
      audio.src = trueSrc;
		},
		//查询
		searchData() {
			this.currentPage = 1;
			this.loading = true;
			this.getVoiceRecommend();
		},
		//翻页
		pageChange(index) {
			this.currentPage = index;
			this.loading = true;
			this.getVoiceRecommend();
		},
		//编辑弹窗
		editModalShow(voiceInfo) {
			this.editModel = true;
			this.edit_voiceId = voiceInfo.voice_id;
			this.sort_order = voiceInfo.sort_order;
		},
		//取消编辑
		cancelEdit() {
			this.editModel = false;
			this.edit_voiceId = 0;
		},
		//确认编辑
		confirmEdit() {
			if(this.sort_order == null){
				this.$Message.error('请输入排序');
			} else {
				let editParams = {
					uuid: this.$api.uuid,
					voice_id: this.edit_voiceId,
					sort_order: this.sort_order
				};
				this.$api.editVoiceRecommend(editParams).then(res => {
					if(res.code == 200) {
						this.$Message.success('修改成功');
						this.editModel = false;
						this.edit_voiceId = 0;
						this.loading = true;
						this.getVoiceRecommend();
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		},
		//删除弹窗
		deleteModalShow(voiceInfo) {
			this.deleteModal = true;
			this.delete_voiceId = voiceInfo.voice_id;
			this.delete_picked = false;
		},
		//取消删除
		cancelDelete() {
			this.deleteModal = false;
			this.delete_voiceId = 0;
		},
		//确认删除
		confirmDelete() {
			if(this.delete_picked == false){
				this.$Message.error('请选择取消推荐的版块');
			} else {
				let deleteParams = {
					uuid: this.$api.uuid,
					voice_id: this.delete_voiceId,
					recommend: '1'
				};
				this.deleteModal = false;
				this.$api.deleteVoiceRecommend(deleteParams).then(res => {
					if(res.code == 200){
						this.$Message.success('删除成功');
						this.deleteModal = false;
						this.delete_voiceId = 0;
						this.currentPage = 1;
						this.loading = true;
						this.getVoiceRecommend();
					} else {
						this.$Message.error('删除失败');
					}
				})
			}
		}
	}
}