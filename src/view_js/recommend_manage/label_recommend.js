import { formatTime } from 'filter/filters';

export const labelRecommendCtrl = {
	data() {
		return {
			//查询数据
			pageSize: 15,
			currentPage: 1,
			last_request_time: 0,
			labelName: '',
			totalCount: 0,
			//列表数据
			loading: true,
			labelRecommendList: [],
			labelRecommendColum: [
				{title: '序号', key: 'sort_order', align: "center"},
				{title: '标签名称', key: 'tag_name', align: "center"},
				{title: '标签下声音数', key: 'voice_count', align: 'center'},
				{title: '创建时间', key: 'create_time', align: 'center',
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
                      this.deleteModalShow(params.row.tag_name);
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
			edit_label_name: '',
			sort_order: null,
			deleteModal: false,
			delete_label_name: ''
		}
	},
	created() {
  	this.getLabelRecommend();
	},
	methods: {
		//获取用户推荐数据
		getLabelRecommend() {
			let getPramas = {
				uuid: this.$api.uuid,
				page: this.currentPage,
    		per_page: this.pageSize,
    		last_request_time: this.last_request_time,
    		tag_name: this.labelName
			};
			this.$api.getLabelRecommend(getPramas).then(res => {
				this.loading = false;
				if(res.code == 200) {
					this.totalCount = res.data.total_count;
					this.currentPage = res.data.page;
					this.labelRecommendList = res.data.list;
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
			this.getLabelRecommend();
		},
		//翻页
		pageChange(index) {
			this.currentPage = index;
			this.loading = true;
			this.getLabelRecommend();
		},
		//编辑弹窗
		editModalShow(labelInfo) {
			this.editModel = true;
			this.edit_label_name = labelInfo.tag_name;
			this.sort_order = labelInfo.sort_order;
		},
		//取消编辑
		cancelEdit() {
			this.editModel = false;
			this.edit_label_name = '';
		},
		//确认编辑
		confirmEdit() {
			if(this.sort_order == null){
				this.$Message.error('请输入排序');
			} else {
				let editParams = {
					uuid: this.$api.uuid,
					tag_name: this.edit_label_name,
					sort_order: this.sort_order
				};
				this.$api.editLabelRecommend(editParams).then(res => {
					if(res.code == 200) {
						this.$Message.success('修改成功');
						this.editModel = false;
						this.edit_label_name = '';
						this.loading = true;
						this.getLabelRecommend();
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		},
		//删除弹窗
		deleteModalShow(name) {
			this.deleteModal = true;
			this.delete_label_name = name;
		},
		//取消删除
		cancelDelete() {
			this.deleteModal = false;
			this.delete_label_name = '';
		},
		//确认删除
		confirmDelete() {
			let deleteParams = {
				uuid: this.$api.uuid,
				tag_name: this.delete_label_name
			};
			this.deleteModal = false;
			this.$api.deleteLabelRecommend(deleteParams).then(res => {
				if(res.code == 200){
					this.$Message.success('删除成功');
					this.deleteModal = false;
					this.delete_label_name = '';
					this.currentPage = 1;
					this.loading = true;
					this.getLabelRecommend();
				} else {
					this.$Message.error('删除失败');
				}
			})
		}
	}
}