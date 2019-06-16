import { formatTime, newUserPickedType, newUserStatus } from 'filter/filters';

export const newUserRecommendCtrl = {
	data() {
		return {
			//查询数据
			pageSize: 15,
			currentPage: 1,
			last_request_time: 0,
			recommend_type: '-1',
			new_user_status: '-1',
			totalCount: 0,
			//列表数据
			loading: true,
			newUserRecommendList: [],
			newUserRecommendColum: [
				{title: '序号', key: 'sort_order', align: "center"},
				{title: '推荐页类型', key: 'recommend_type', align: "center",
					render: (h, params) => {
						return h('span', newUserPickedType(params.row.recommend_type));
					}
				},
				{title: '推荐对象ID', key: 'rel_id', align: "center"},
				{title: '状态', key: 'status', align: "center",
					render: (h, params) => {
						return h('span', newUserStatus(params.row.status));
					}
				},
				{title: '推荐时间', key: 'create_time', align: 'center',
					render: (h, params) => {
						return h('span', formatTime(params.row.create_time*1000, 'YMDHMS'));
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
                      this.deleteModalShow(params.row.recommend_id);
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
			addModel: false,
			add_recommend_type: '0',
			recommend_user_id: '',
			add_status: '1',
			editModel: false,
			edit_recommend_type: '',
			edit_recommend_id: 0,
			edit_status: 0,
			sort_order: null,
			canAttention: false,
			deleteModal: false,
			delete_id: 0
		}
	},
	created() {
  	this.getNewUserRecommend();
	},
	methods: {
		//获取用户推荐数据
		getNewUserRecommend() {
			let getPramas = {
				uuid: this.$api.uuid,
				page: this.currentPage,
    		per_page: this.pageSize,
    		last_request_time: this.last_request_time,
    		recommend_type: this.recommend_type,
    		status: this.new_user_status
			};
			this.$api.getNewUserRecommend(getPramas).then(res => {
				this.loading = false;
				if(res.code == 200) {
					this.totalCount = res.data.total_count;
					this.currentPage = res.data.page;
					this.newUserRecommendList = res.data.list;
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
			this.getNewUserRecommend();
		},
		//翻页
		pageChange(index) {
			this.currentPage = index;
			this.loading = true;
			this.getNewUserRecommend();
		},
		//新增弹窗
		addModalShow() {
			this.addModel = true;
			this.add_recommend_type = '0';
			this.recommend_user_id = '';
			this.add_status = '1';
		},
		//取消新增
		cancelAdd() {
			this.addModel = false;
		},
		//确认新增
		confirmAdd() {
			if(this.recommend_user_id == ''){
				this.$Message.error('请输入推荐对象ID');
			} else {
				if(Number.isInteger(Number(this.recommend_user_id))){
					let addParams = {
						uuid: this.$api.uuid,
						recommend_type: this.add_recommend_type,
						rel_id: this.recommend_user_id,
						status: this.add_status
					};
					this.$api.addNewUserRecommend(addParams).then(res => {
						if(res.code == 200) {
							this.$Message.success("添加成功");
							this.addModel = false;
							this.currentPage = 1;
							this.recommend_type = '-1';
							this.new_user_status = '-1';
							this.getNewUserRecommend();
						} else {
							this.$Message.error(res.msg);
						}
					})
				} else {
					this.$Message.error('推荐对象ID请输入正整数');
				}
			}
		},
		//编辑弹窗
		editModalShow(newUserInfo) {
			this.editModel = true;
			this.edit_recommend_type = newUserPickedType(newUserInfo.recommend_type);
			this.edit_recommend_id = newUserInfo.recommend_id;
			this.sort_order = newUserInfo.sort_order;
			this.edit_status = newUserInfo.status.toString();
			if(newUserInfo.recommend_type != 0){
				this.canAttention = true;
			}
		},
		//取消编辑
		cancelEdit() {
			this.editModel = false;
			this.canAttention = false;
		},
		//确认编辑
		confirmEdit() {
			if(this.sort_order == null){
				this.$Message.error('请输入排序');
			} else {
				let editParams = {
					uuid: this.$api.uuid,
					recommend_id: this.edit_recommend_id,
					sort_order: this.sort_order,
					status: this.edit_status
				};
				this.$api.editNewUserRecommend(editParams).then(res => {
					if(res.code == 200) {
						this.$Message.success('修改成功');
						this.editModel = false;
						this.canAttention = false;
						this.loading = true;
						this.getNewUserRecommend();
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		},
		//删除弹窗
		deleteModalShow(id) {
			this.deleteModal = true;
			this.delete_id = id;
		},
		//取消删除
		cancelDelete() {
			this.deleteModal = false;
			this.delete_id = 0;
		},
		//确认删除
		confirmDelete() {
			let deleteParams = {
				uuid: this.$api.uuid,
				recommend_id: this.delete_id
			};
			this.deleteModal = false;
			this.$api.deleteNewUserRecommend(deleteParams).then(res => {
				if(res.code == 200){
					this.$Message.success('删除成功');
					this.deleteModal = false;
					this.delete_id = 0;
					this.currentPage = 1;
					this.loading = true;
					this.getNewUserRecommend();
				} else {
					this.$Message.error('删除失败');
				}
			})
		}
	}
}