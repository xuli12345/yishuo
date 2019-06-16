// import {
//   uuid,
//   authenticationList,
//   delAuthenticationCol
// } from 'api/api-server';
import {
  veriStatus,
  formatTime
} from 'filter/filters';

export const authenticationListCtrl = {
  inject: ['reload'],
  data() {
    return {
      editModal: false, //编辑弹窗是否显示
      editModalConent: [], //编辑弹窗显示的内容
      auth_rel_user_id: null, //申请者id
      nickname: "", //昵称
      id_number: '', //申请人身份证号
      auth_time: '', //申请人认证时间
      veri_status: '-1', //审核状态
      applicantData: [], //传入到表格的数据
      currentPage: 1, //当前页数
      pageSize: 15, //每页条数
      totalCount: 0, //总条数 传入page组件
      columns: [{
          title: "申请者ID",
          key: "auth_rel_user_id",
          align: "center"
        },
        {
          title: "申请人昵称",
          key: "nickname",
          align: "center"
        },
        {
          title: "申请人身份证号",
          key: "id_number",
          align: "center"
        },
        {
          title: "提请认证时间",
          key: "auth_time",
          align: "center",
          render: (h, params) => {
            return h('span', formatTime(params.row.auth_time * 1000, 'YMDHMS'));
          }
        },
        {
          title: "审核状态",
          key: "veri_status",
          align: "center",
          render: (h, params) => {
            return h('span', veriStatus(params.row.veri_status));
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
              ),
              h(
                "Button", {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteModal(params.row.id);
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
    this._authenticationList();
  },
  methods: {
    //刷新页面
    refreshPage() {
      this.reload();
    },
    //获取版权方列表
    _authenticationList() {
      let objThis = this;
      let getParams = {
        uuid: objThis.$api.uuid,
        page: this.currentPage,
        per_page: this.pageSize,
        sort_by: '',
        sort_type: 1,
        // id:
        auth_rel_user_id: this.auth_rel_user_id,
        id_number: this.id_number,
        auth_time: this.auth_time,
        veri_status: this.veri_status,
        auth_rel_user_id: this.auth_rel_user_id,
        nickname: this.nickname
      };
      objThis.$api.authenticationList(getParams).then(res => {
        if (res.code == 200) {
          this.applicantData = res.data.list;
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
          id: params.auth_rel_user_id,
          from: 'fromAuthenticationList'
        }
      })
    },
    //删除
    deleteModal(id) {
      let objThis = this;
      let getParams = {
        uuid: objThis.$api.uuid,
        auth_rel_id: id
      };
      objThis.$api.delAuthenticationCol(getParams).then(res => {
        if (res.code == 200) {
          his.$Message.success('删除成功');
        } else {
          this.$Message.error('删除失败');
        }
      })
    },
    //查询
    search() {
      this.currentPage = 1;
      this._authenticationList();
    },
    //下一页
    changePage(index) {
      this.currentPage = index;
      this._authenticationList();
    },
  }
};
