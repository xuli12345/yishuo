export const writerListCtrl = {
  inject: ['reload'],
  
  data() {
    return {
      user_id: null, //版权方id
      nickname: "", //昵称
      writerData: [], //传入到表格的数据
      currentPage: 1, //当前页数
      pageSize: 15, //每页条数
      totalCount: 0, //总条数
      columns: [{
          title: "版权方ID",
          key: "user_id",
          align: "center"
        },
        {
          title: "昵称",
          key: "nickname",
          align: "center"
        },
        {
          title: "真实姓名",
          key: "real_name",
          align: "center"
        },
        {
          title: "联系电话",
          key: "contact_number",
          align: "center"
        },
        {
          title: '上传任务数',
          key: 'task_publish_num',
          align: "center",
          render: (h, params) => {
            return h('span', [
              h('a', {
                on: {
                  click: () => {
                    this.publishNumDetail(params.row, params.index);
                  }
                }
              }, params.row.task_publish_num)
            ]);
          }
        },
        {
          title: '采纳作品数',
          key: 'task_finish_num',
          align: "center",
          render: (h, params) => {
            return h('span', [
              h('a', {
                on: {
                  click: () => {
                    this.finishNumDetail(params.row, params.index);
                  }
                }
              }, params.row.task_finish_num)
            ]);
          }
        },
        {
          title: "收藏主播数",
          key: "fav_anchor_num",
          align: "center"
        },
        {
          title: '评分',
          key: 'score',
          align: "center",
          render: (h, params) => {
            return h('span', params.row.score.toFixed(2));
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
                      this.writerEdit(params.row);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this._writerList();
  },
  methods: {
    //刷新页面
    refreshPage() {
      this.reload();
    },
    //获取版权方列表
    _writerList() {
      let objThis = this;
      let getParams = {
        uuid: objThis.$api.uuid,
        page: this.currentPage,
        per_page: this.pageSize,
        sort_by: '',
        sort_type: 1,
        user_id: this.user_id,
        nickname: this.nickname
      };
      objThis.$api.writerList(getParams).then(res => {
        if (res.code == 200) {
          this.writerData = res.data.list;
          this.totalCount = res.data.total_count;
          this.currentPage = res.data.page;
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
    // 上传任务数详情页
    publishNumDetail(params, index) {
      console.log(params);
      console.log(index)
    },
    // 采纳作品数详情页
    finishNumDetail(params, index) {

    },
    // 编辑
    writerEdit(params) {
      this.$router.push({
        name: 'writer_edit',
        params: {
          id: params.user_id,
          from: 'fromWriterList'
        }
      })
    },
    //查询
    search() {
      this.currentPage = 1;
      this._writerList();
    },
    //下一页
    changePage(index) {
      this.currentPage = index;
      this._writerList();
    },
  }
};
