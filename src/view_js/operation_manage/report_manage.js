// import { getReportList, deleteReport } from '../../api/api-server'
import { reportType, formatTime, reportStatus, reportResult } from '../../filter/filters';

export const reportListCtrl = {
	inject: ['reload'],
	data() {
		return {
			//类别列表
			typeList: [
				{type_id: '-1', type_name: '全部'},
		    {type_id: '0', type_name: '普通声音'},
		    {type_id: '1', type_name: '声音评论'},
		    {type_id: '2', type_name: '声音评论回复'},
		    {type_id: '4', type_name: '付费声音'},
		    {type_id: '5', type_name: '付费声音评论'},
		    {type_id: '6', type_name: '付费声音评论回复'},
		    {type_id: '9', type_name: '普通专辑'},
		    {type_id: '10', type_name: '普通专辑评论'},
		    {type_id: '11', type_name: '普通专辑评论回复'},
		    {type_id: '3', type_name: '付费专辑'},
		    {type_id: '7', type_name: '付费专辑评论'},
		    {type_id: '8', type_name: '付费专辑评论回复'},
		    {type_id: '12', type_name: '动态'},
		    {type_id: '13', type_name: '动态评论'},
		    {type_id: '14', type_name: '动态评论回复'},
		    {type_id: '15', type_name: '直播'},
		    {type_id: '16', type_name: '艺人'}
			],
			//查询数据
			report_type: '-1',
			report_all_number: null,
			report_new_number: null,
			report_status: '-1',
			report_result: '-1',
			//列表数据
			reportList: [],
			reportColum: [
				{title: '举报编号', key: 'inform_id', align: "center"},
				{title: '举报类型', key: 'inform_type', align: "center",
					render: (h, params) => {
						return h('span', reportType(params.row.inform_type));
					}
				},
				{title: '总举报数', key: 'inform_total_number', align: "center"},
				{title: '新增举报数', key: 'inform_new_number', align: "center"},
				{title: '最新举报时间', key: 'last_inform_time', align: "center",
					render: (h, params) => {
						return h('span', formatTime(params.row.last_inform_time*1000, 'YMDHMS'));
					}
				},
				{title: '举报状态', key: 'inform_status', align: "center",
					render: (h, params) => {
						return h('span', reportStatus(params.row.inform_status));
					}
				},
				{title: '处理结果', key: 'deal_result', align: "center",
					render: (h, params) => {
						return h('span', reportResult(params.row.deal_result));
					}
				},
				{title: '处理备注', key: 'deal_notes', align: "center",
					render: (h, params) => {
						return h('span', params.row.deal_notes == "" ? "无" : params.row.deal_notes);
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
                      this.goReportDetail(params.row.inform_id);
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
                  on: {
                    click: () => {
                      this.deleteModalShow(params.row.inform_id);
                    }
                  }
                },
                "删除"
              )
            ]);
					}
				},
			],
			pageSize: 15,
			totalCount: 0,
			currentPage: 1,
			//弹窗数据
			deleteModal: false,
			deleteId: 0
		}
	},
	created() {
      console.log(this.$api)
    	this.getReportList();
  	},
	methods: {
		//获取列表数据
		getReportList() {
			let getPramas = {
				page: this.currentPage,
        		per_page: this.pageSize,
        		inform_type: this.report_type == '-1' ? '' : this.report_type,
        		inform_total_number: this.report_all_number,
        		inform_new_number: this.report_new_number,
        		inform_status: this.report_status == '-1' ? '' : this.report_status,
        		inform_result: this.report_result == '-1' ? '' : this.report_result
			};
			this.$api.getReportList(getPramas).then(res => {
				if(res.code == 200) {
					this.totalCount = res.data.total_count;
					this.currentPage = res.data.page;
					this.reportList = res.data.list;
				} else {
					this.$Message.error(res.msg);
				}
			})
		},
		//查询
		searchData() {
			this.currentPage = 1;
			this.getReportList();
		},
		//翻页
		pageChange(index) {
			this.currentPage = index;
			this.getReportList();
		},
		//刷新页面
		refreshPage() {
			this.reload();
		},
		//查看详情
		goReportDetail(index) {
			this.$router.push({
        		name: 'report_detail',
        		params: {
          			id: index
        		}
      		})
		},
		//删除弹窗
		deleteModalShow(index) {
			this.deleteModal = true;
			this.deleteId = index;
		},
		//取消删除
		cancelDelete() {
			this.deleteModal = false;
			this.deleteId = 0;
		},
		//确认删除
		confirmDelete() {
			let deleteParams = {
				inform_id: this.deleteId
			};
			this.deleteModal = false;
		  this.$api.deleteReport(deleteParams).then(res => {
				if(res.code == 200){
					this.$Message.success('删除成功');
					this.currentPage = 1;
					this.getReportList();
				} else {
					this.$Message.error('删除失败');
				}
			})
		}
	}
}
