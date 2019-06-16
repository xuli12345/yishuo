import {
  taskIsTop,
  formatTime,
  taskStatus
} from 'filter/filters';
export const taskListCtrl = {
  inject: ['reload'],
  data() {
    return {
      currentPage: 1, //当前页数
      pageSize: 15, //每页条数
      totalCount: 0, //总条数

      id: null, //任务id
      title: null, //任务名称
      nickname: "", //发布人
      start_time: null, //任务发布时间
      end_time: null, //任务截止时间
      task_status: '-1', //任务状态：1-进行中，2-已结束，6-被终止
      task_allowance: null, //任务领取人数
      is_top: '-1', //置顶，1-置顶，0-不置顶
      recommend_type: '-1', //推荐类型，“活动”“热门”等

      taskList: [], //传入到表格的数据
      recommend_type_list: [], //推荐标签列表
      deleteModal: false, //删除弹窗是否显示
      deleteId: null, //删除id
      columns: [
        {
          title: "任务编号",
          key: "id",
          align: "center"
        },
        {
          title: "任务标题",
          key: "title",
          align: "center",
          width: 300
        },
        {
          title: "发布人",
          key: "nickname",
          align: "center"
        },
        {
          title: "任务发布时间",
          key: "create_time",
          align: "center",
          render: (h, params) => {
            return h('span', formatTime(params.row.create_time * 1000, 'YMDHMS'));
          }
        },
        {
          title: "任务截止时间",
          key: "end_time",
          align: "center",
          render: (h, params) => {
            return h('span', formatTime(params.row.end_time * 1000, 'YMDHMS'));
          }
        },
        {
          title: "任务热度(查看人数)",
          key: '',
          align: "center"
        },
        {
          title: "任务领取人数",
          key: "task_allowance",
          align: "center",
          render: (h, params) => {
            return h('span', 10 - params.row.task_allowance);
          }
        },
        {
          title: "是否置顶",
          key: "is_top",
          align: "center",
          render: (h, params) => {
            return h('span', taskIsTop(params.row.is_top));
          }
        },
        {
          title: "推荐标签",
          key: "recommend_type",
          align: "center"
        },
        {
          title: "任务文稿",
          key: "fav_anchor_num",
          align: "center"
        },
        {
          title: "任务状态",
          key: "task_status",
          align: "center",
          render: (h, params) => {
            return h('span', taskStatus(params.row.task_status, params.row.end_time));
          }
        },
        {
          title: "操作",
          key: "action",
          width: 180,
          align: "center",
          render: (h, params) => {
            //搜索用户id //搜索用户昵称 //搜索用户类型 //初始化信息总数 //每页显示条数
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
                      this.taskEdit(params.row);
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
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.taskDelete(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this._getTaskListInfo();
    this._getRecommendType();
  },
  methods: {
    //刷新页面
    refreshPage() {
      this.reload();
    },
    //获取版权方列表
    _getTaskListInfo() {
      let objThis = this;
      let getParams = {
        uuid: objThis.$api.uuid,
        page: this.currentPage,
        per_page: this.pageSize,
        id: this.id, //id
        title: this.title, //名字
        nickname: this.nickname,
        start_time: this.start_time, //创建时间
        end_time: this.end_time, //结束时间
        task_allowance: this.task_allowance,
        task_status: this.task_status, //状态
        is_top: this.is_top,
        recommend_type: this.recommend_type,
        sort_type: null, //排序方式: 升序asc, 降序:desc
        sort_by: '', //排序字段
      };
      objThis.$api.getTaskListInfo(getParams).then(res => {
        if (res.code == 200) {
          this.taskList = res.data.list;
          this.totalCount = res.data.total_count;
          this.currentPage = res.data.page;
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
    // 获取任务推荐标签列表
    _getRecommendType() {
      let objThis = this;
      let getRecommendParams = {
        uuid: objThis.$api.uuid,
        page: this.currentPage,
        per_page: this.pageSize,
        sort_type: null, //排序方式: 升序asc, 降序:desc
        sort_by: '', //排序字段
      };
      objThis.$api.getRecommendType(getRecommendParams).then(res => {
        if (res.code == 200) {
          this.recommend_type_list = res.data.list;
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
    // 编辑
    taskEdit(params) {
      this.$router.push({
        name: 'task_edit',
        params: {
          id: params.id,
          from: 'fromTaskList'
        }
      })
    },
    // 删除
    taskDelete(id) {
      this.deleteId = id;
      this.deleteModal = true;
    },
    // 取消
    cancel() {
      this.deleteModal = false;
    },
    // 确定删除
    confirmDelete() {
      let objThis = this;
      let delParams = {
        uuid: objThis.$api.uuid,
        id: this.deleteId
      };
      objThis.$api.delTaskInfo(delParams).then(res => {
        if (res.code == 200) {
          this.$Message.success('删除成功');
          this.deleteModal = false;
          this._getTaskListInfo();
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
    //查询
    search() {
      this.currentPage = 1;
      this._getTaskListInfo();
    },
    //下一页
    changePage(index) {
      this.currentPage = index;
      this._getTaskListInfo();
    },
  }
};
