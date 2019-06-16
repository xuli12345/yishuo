import { formatTime } from 'filter/filters';

export const albumRecommendCtrl = {
	data() {
		return {
			//查询数据
			pageSize: 15,
			currentPage: 1,
			last_request_time: 0,
			albumId: '',
			albumName: '',
			totalCount: 0,
			//列表数据
			loading: true,
			albumRecommendList: [],
			albumRecommendColum: [
				{title: '序号', key: 'sort_order', align: "center"},
				{title: '专辑ID', key: 'album_id', align: "center"},
				{title: '专辑名称', key: 'album_name', align: "center"},
				{title: '专辑描述', key: 'album_desc', align: "center", width: 220},
				{title: '被订阅数', key: 'subscribe_count', align: 'center'},
				{title: '被收听数', key: 'real_play_count', align: 'center'},
				{title: '创建者昵称', key: 'nickname', align: 'center'},
				{title: '创建时间', key: 'create_time', align: 'center',
					render: (h, params) => {
						return h('span', formatTime(params.row.create_time*1000, 'YMDHMS'));
					}
				},
				{title: '最后更新时间', key: 'last_update_time', align: 'center',
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
                      this.deleteModalShow(params.row.id);
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
			edit_albumId: 0,
			sort_order: null,
			deleteModal: false,
			delete_id: 0
		}
	},
	created() {
  	this.getAlbumRecommend();
	},
	methods: {
		//获取用户推荐数据
		getAlbumRecommend() {
			let getPramas = {
				uuid: this.$api.uuid,
				page: this.currentPage,
    		per_page: this.pageSize,
    		last_request_time: this.last_request_time,
    		album_id: this.albumId,
    		album_name: this.albumName
			};
			this.$api.getAlbumRecommend(getPramas).then(res => {
				this.loading = false;
				if(res.code == 200) {
					this.totalCount = res.data.total_count;
					this.currentPage = res.data.page;
					this.albumRecommendList = res.data.list;
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
			this.getAlbumRecommend();
		},
		//翻页
		pageChange(index) {
			this.currentPage = index;
			this.loading = true;
			this.getAlbumRecommend();
		},
		//编辑弹窗
		editModalShow(albumInfo) {
			this.editModel = true;
			this.edit_id = albumInfo.id;
			this.edit_albumId = albumInfo.album_id;
			this.sort_order = albumInfo.sort_order;
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
					uuid: uuid,
					id: this.edit_id,
					sort_order: this.sort_order
				};
				this.$api.editAlbumRecommend(editParams).then(res => {
					if(res.code == 200) {
						this.$Message.success('修改成功');
						this.editModel = false;
						this.edit_id = 0;
						this.loading = true;
						this.getAlbumRecommend();
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
				uuid: uuid,
				id: this.delete_id
			};
			this.deleteModal = false;
			this.$api.deleteAlbumRecommend(deleteParams).then(res => {
				if(res.code == 200){
					this.$Message.success('删除成功');
					this.deleteModal = false;
					this.delete_id = 0;
					this.currentPage = 1;
					this.loading = true;
					this.getAlbumRecommend();
				} else {
					this.$Message.error('删除失败');
				}
			})
		}
	}
}