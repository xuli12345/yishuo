import { formatTime, groupLevel } from 'filter/filters';

export const groupRecommendCtrl = {
	data() {
		return {
			//查询数据
			pageSize: 15,
			currentPage: 1,
			last_request_time: 0,
			groupId: '',
			groupName: '',
			group_level: '-1',
			totalCount: 0,
			//列表数据
			loading: true,
			groupRecommendList: [],
			groupRecommendColum: [
				{title: '序号', key: 'sort_order', align: "center"},
				{title: '群组ID', key: 'group_id', align: "center"},
				{title: '群组名称', key: 'group_name', align: "center"},
				{title: '群主', key: 'group_master_name', align: "center"},
				{title: '群组身份', key: 'level', align: "center",
					render: (h, params) => {
						return h('span', groupLevel(params.row.level));
					}
				},
				{title: '群成员数', key: 'group_member_count', align: 'center'},
				{title: '分享声音数', key: 'group_voice_count', align: 'center'},
				{title: '讨论数', key: 'discuss_count', align: 'center'},
				{title: '创建时间', key: 'recommend_time', align: 'center',
					render: (h, params) => {
						return h('span', formatTime(params.row.recommend_time*1000, 'YMDHMS'));
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
                      this.deleteModalShow(params.row.group_id);
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
			edit_id: 0,
			sort_order: null,
			deleteModal: false,
			delete_id: 0
		}
	},
	created() {
  	this.getGroupRecommend();
	},
	methods: {
		//获取用户推荐数据
		getGroupRecommend() {
			let getPramas = {
				uuid: this.$api.uuid,
				page: this.currentPage,
    		per_page: this.pageSize,
    		last_request_time: this.last_request_time,
    		group_id: this.groupId,
    		group_name: this.groupName,
    		level: this.group_level
			};
			this.$api.getGroupRecommend(getPramas).then(res => {
				this.loading = false;
				if(res.code == 200) {
					this.totalCount = res.data.total_count;
					this.currentPage = res.data.page;
					this.groupRecommendList = res.data.list;
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
			this.getGroupRecommend();
		},
		//翻页
		pageChange(index) {
			this.currentPage = index;
			this.loading = true;
			this.getGroupRecommend();
		},
		//编辑弹窗
		editModalShow(groupInfo) {
			this.editModel = true;
			this.edit_id = groupInfo.group_id;
			this.sort_order = groupInfo.sort_order;
		},
		//取消编辑
		cancelEdit() {
			this.editModel = false;
			this.edit_id = 0;
		},
		//确认编辑
		confirmEdit() {
			if(this.sort_order == null){
				this.$Message.error('请输入排序');
			} else {
				let editParams = {
					uuid: this.$api.uuid,
					group_id: this.edit_id,
					sort_order: this.sort_order
				};
				this.$api.editGroupRecommend(editParams).then(res => {
					if(res.code == 200) {
						this.$Message.success('修改成功');
						this.editModel = false;
						this.edit_id = 0;
						this.loading = true;
						this.getGroupRecommend();
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
				group_id: this.delete_id
			};
			this.deleteModal = false;
			this.$api.deleteGroupRecommend(deleteParams).then(res => {
				if(res.code == 200){
					this.$Message.success('删除成功');
					this.deleteModal = false;
					this.delete_id = 0;
					this.currentPage = 1;
					this.loading = true;
					this.getGroupRecommend();
				} else {
					this.$Message.error('删除失败');
				}
			})
		}
	}
}