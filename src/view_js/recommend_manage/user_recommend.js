import { formatTime, userRecommendPickedType, userLevel, userStatus } from 'filter/filters';

export const userRecommendCtrl = {
	data() {
		return {
			//查询数据
			userId: '',
			nickname: '',
			picked_type: '1',
			user_level: '-1',
			last_request_time: 0,
			//列表数据
			loading: true,
			userRecommendList: [],
			userRecommendColum: [
				{title: '序号', key: 'sort_order', align: "center"},
				{title: '用户ID', key: 'user_id', align: "center"},
				{title: '用户昵称', key: 'nickname', align: "center"},
				{title: '声音数', key: 'voice_count', align: "center"},
				{title: '关注数', key: 'follow_count', align: "center"},
				{title: '好友数', key: 'friend_count', align: "center"},
				{title: '粉丝数', key: 'follower_count', align: "center"},
				{title: '专辑数', key: 'album_count', align: "center"},
				{title: '推荐版块', key: 'picked_type', align: "center",
					render: (h, params) => {
						return h('span', userRecommendPickedType(params.row.picked_type));
					}
				},
				{title: '用户类型', key: 'level', align: "center",
					render: (h, params) => {
						return h('span', userLevel(params.row.level, params.row.is_copyright_owner));
					}
				},
				{title: '状态', key: 'status', align: "center",
					render: (h, params) => {
						return h('span', userStatus(params.row.status));
					}
				},
				{title: '推荐时间', key: 'last_update_time', align: "center",
					render: (h, params) => {
						return h('span', formatTime(params.row.last_update_time*1000, 'YMDHMS'));
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
				}
			],
			pageSize: 15,
			totalCount: 0,
			currentPage: 1,
			//弹窗数据
			editModel: false,
			edit_userId: 0,
			sort_order: null,
			edit_picked_type: '',
			deleteModal: false,
			delete_userId: 0,
			hasPickedHot: false,
			hasPickedNew: false,
			hasPickedS2: false,
			delete_picked_type: []
		}
	},
	created() {
  	this.getUserRecommend();
	},
	methods: {
		//获取用户推荐数据
		getUserRecommend() {
			let getPramas = {
				uuid: this.$api.uuid,
				page: this.currentPage,
    		per_page: this.pageSize,
    		last_request_time: this.last_request_time,
    		user_id: this.userId,
    		nickname: this.nickname,
    		picked_type: this.picked_type,
    		level: this.user_level
			};
			this.$api.getUserRecommend(getPramas).then(res => {
				this.loading = false;
				if(res.code == 200) {
					this.totalCount = res.data.total_count;
					this.currentPage = res.data.page;
					this.userRecommendList = res.data.list;
					this.last_request_time = res.data.last_request_time;
				} else {
					this.$Message.error(res.msg);
				}
			})
		},
		//查询
		searchData() {
			this.currentPage = 1;
			this.loading = true;
			this.getUserRecommend();
		},
		//翻页
		pageChange(index) {
			this.currentPage = index;
			this.loading = true;
			this.getUserRecommend();
		},
		//编辑弹窗
		editModalShow(userInfo) {
			this.editModel = true;
			this.edit_userId = userInfo.user_id;
			this.sort_order = userInfo.sort_order;
			this.edit_picked_type = userInfo.picked_type;
		},
		//取消编辑
		cancelEdit() {
			this.editModel = false;
			this.edit_userId = 0;
			this.edit_picked_type = '';
		},
		//确认编辑
		confirmEdit() {
			if(this.sort_order == null){
				this.$Message.error('请输入排序');
			} else {
				let editParams = {
					uuid: this.$api.uuid,
					user_id: this.edit_userId,
					sort_order: this.sort_order,
					picked_type: this.picked_type
				};
				this.$api.editUserRecommend(editParams).then(res => {
					if(res.code == 200) {
						this.$Message.success('修改成功');
						this.editModel = false;
						this.edit_userId = 0;
						this.edit_picked_type = '';
						this.loading = true;
						this.getUserRecommend();
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		},
		//删除弹窗
		deleteModalShow(userInfo) {
			this.deleteModal = true;
			this.delete_userId = userInfo.user_id;
			this.delete_picked_type = [];
			userInfo.picked_type = typeof userInfo.picked_type == "String" ? userInfo.picked_type : userInfo.picked_type.toString();
			if(userInfo.picked_type.indexOf("1") >= 0){
				this.hasPickedHot = true;
			}
			if(userInfo.picked_type.indexOf("2") >= 0){
				this.hasPickedNew = true;
			}
			if(userInfo.picked_type.indexOf("3") >= 0){
				this.hasPickedS2 = true;
			}
		},
		//取消删除
		cancelDelete() {
			this.deleteModal = false;
			this.delete_userId = 0;
			this.delete_picked_type = [];
		},
		//确认删除
		confirmDelete() {
			var pickedType = this.delete_picked_type.join(',');
			if(pickedType == ''){
				this.$Message.error('请选择取消推荐的版块');
			} else {
				let deleteParams = {
					uuid: this.$api.uuid,
					user_id: this.delete_userId,
					picked_type: '1'
				};
				this.deleteModal = false;
				this.$api.deleteUserRecommend(deleteParams).then(res => {
					if(res.code == 200){
						this.$Message.success('删除成功');
						this.deleteModal = false;
						this.delete_userId = 0;
						this.delete_picked_type = [];
						this.currentPage = 1;
						this.loading = true;
						this.getUserRecommend();
					} else {
						this.$Message.error('删除失败');
					}
				})
			}
		}
	}
}