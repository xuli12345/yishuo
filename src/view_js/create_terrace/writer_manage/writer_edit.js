export const writerEditCtrl = {
  computed: {
    // 照片路径
    realPhoto() {
      return this.$api.baUrl + this.writerEditData.real_photo
    },
    // 身份证正面
    idPhoto() {
      return this.$api.baUrl + this.writerEditData.id_photo
    },
    // 身份证背面
    idPhotoBack() {
      return this.$api.baUrl + this.writerEditData.id_photo_back
    },
    // 下载链接
    downloadHref(){
      return this.$api.cpUrl + this.writerEditData.evidence
    }
  },
  data() {
    return {
      currentPage: 1, //当前页数
      pageSize: 0, //每页条数
      totalCount: 0, //总条数
      writerEditData: [], //编辑页数据
      noPassReason: '', //不通过原因
    }
  },
  created() {
    this._writerEdit()
    // if(this.$route.params.from == 'fromWriterList'){//从版权方列表跳转至详情
    //   this.writerId = this.$route.params.editParams.user_id;
    // }else if(this.$route.params.from == 'fromAuthenticationList'){//从版权方认证管理跳转至详情
    //   this.writerId = this.$route.params.editParams.auth_rel_user_id;
    // }
  },
  methods: {
    //获取版权方编辑数据
    _writerEdit() {
      let objThis = this;
      let getParams = {
        uuid: objThis.$api.uuid,
        page: this.currentPage,
        per_page: this.pageSize,
        auth_rel_user_id: this.$route.params.id,
        lastRequestTime: 0
      };
      objThis.$api.authenticationList(getParams).then(res => {
        if (res.code == 200) {
          if (res.data.list.length != 0) {
            this.writerEditData = res.data.list[0];
            this.writerEditData.veri_status = res.data.list[0].veri_status.toString()
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
      if(this.writerEditData.veri_status == "2"){
        if(this.noPassReason == ''){
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
        this.$router.push({name: 'writer_list'});
      } else if (this.$route.params.from == 'fromAuthenticationList') { //从版权方认证管理跳转至详情
        this.$router.push({name: 'authentication_list'});
      }
    }
  }
};
