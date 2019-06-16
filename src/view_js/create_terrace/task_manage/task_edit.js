import {
  formatTime
} from 'filter/filters';
export const taskEditCtrl = {
  computed: {
    // 照片路径
    taskImg() {
      return this.$api.baUrl + this.taskEditData.task_pic
    },
    // 下载链接
    downloadHref() {
      return this.$api.cpUrl + this.taskEditData.manuscript
    }
  },
  data() {
    return {
      currentPage: 1, //当前页数
      pageSize: 15, //每页条数
      totalCount: 0, //总条数

      recommend_type_list: [], //推荐标签列表
      recommend_type: '', //推荐类型，“活动”“热门”等
      recommend_type_id:'',//推荐id

      task_status:'6',//是否下架
      sure_task_status:'6',
      obey_task_status:!'4' && !'6',
      taskEditData: [], //任务编辑页数据
      noPassReason: '', //不通过原因
      checkBoxTask: '90',
      taskSort: [{
          id: 105,
          name: "小说名著"
        },
        {
          id: 90,
          name: "时事点评"
        }
      ], //任务类别
    }
  },
  created() {
    this._getTaskListInfo();
    // if(this.$route.params.from == 'fromWriterList'){//从版权方列表跳转至详情
    //   this.writerId = this.$route.params.editParams.user_id;
    // }else if(this.$route.params.from == 'fromAuthenticationList'){//从版权方认证管理跳转至详情
    //   this.writerId = this.$route.params.editParams.auth_rel_user_id;
    // }
  },
  methods: {
    //获取任务编辑数据
    _getTaskListInfo() {
      let objThis = this;
      let getParams = {
        uuid: objThis.$api.uuid,
        type: '1',
        id: this.$route.params.id, //id
      };
      objThis.$api.getTaskListInfo(getParams).then(res => {
        if (res.code == 200) {
          this.taskEditData = res.data.list[0];
          this.taskEditData.create_time = formatTime(res.data.list[0].create_time * 1000, 'YMDHMS');
          this.taskEditData.end_time = formatTime(res.data.list[0].end_time * 1000, 'YMDHMS');
          this.taskEditData.requirement = JSON.stringify(res.data.list[0].requirement);
          this.taskEditData.is_top = res.data.list[0].is_top.toString();
          this.taskEditData.task_status = res.data.list[0].task_status.toString();
         
          this._getRecommendType();
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

          if (this.taskEditData.recommend_type == "") {
            this.recommend_type_id = "0";
          } else {
            for (var j = 0; j < $scope.recommend_type_list.length; j++) {
              if (this.recommend_type_list[j].name == this.taskEditData.recommend_type) {
                this.recommend_type_id = this.recommend_type_list[j].id + "";
              }
            }
          }
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
    // 修改单选按钮时
    changeRadio(veri_status) {
      switch (veri_status) {
        case "0":
          this.writerEditData.veri_reply = "版权认证待审核";
          break;
        case "1":
          this.writerEditData.veri_reply = "恭喜您,您的版权认证已经通过!";
          break;
        case "2":
          this.writerEditData.veri_reply = "非常抱歉的通知您,您的版权认证没有通过";
          break;
      }
    },
    // 修改下拉框时
    changeSelect(veri_reply) {
      switch (veri_reply) {
        case "版权认证待审核":
          this.writerEditData.veri_status = "0";
          break;
        case "恭喜您,您的版权认证已经通过!":
          this.writerEditData.veri_status = "1";
          break;
        case "非常抱歉的通知您,您的版权认证没有通过":
          this.writerEditData.veri_status = "2";
          break;
      }
    },

    // 取消
    cancel() {
      this.toListPage();
    },
    // 提交
    confirmEdit() {
      let objThis = this;
      if (this.writerEditData.veri_status == "2") {
        if (this.noPassReason == '') {
          this.$Message.error('请填写不通过原因');
          return;
        }
      }
      let editParams = {
        uuid: objThis.$api.uuid,
        auth_rel_user_id: this.$route.params.id,
        veri_reply: this.writerEditData.veri_reply,
        veri_status: this.writerEditData.veri_status,
        veri_comment: this.noPassReason
      };
      objThis.$api.confirmEditWriter(editParams).then(res => {
        if (res.code == 200) {
          this.$Message.success('修改成功');
          this.toListPage();
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
    // 跳转回之前的页面
    toListPage() {
      if (this.$route.params.from == 'fromWriterList') { //从版权方列表跳转至详情
        this.$router.push({
          name: 'writer_list'
        });
      } else if (this.$route.params.from == 'fromAuthenticationList') { //从版权方认证管理跳转至详情
        this.$router.push({
          name: 'authentication_list'
        });
      }
    }
  }
};
