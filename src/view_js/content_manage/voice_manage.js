import { formatTime, userLevel } from 'filter/filters';
import vueUpload from 'components/upload'
export const voiceListCtrl = {
  components: {
    vueUpload
  },
  data() {
    return {
      //查询数据
      voice_id: '',
      voice_name: '',
      voice_album: '',
      voice_big_type: '-1',
      voice_small_type: '-1',
      voice_post_name: '',
      publish_begin_time: '',
      publish_end_time: '',
      user_level: '-1',
      pageSize: 15,
      //各列表数据
      totalCount: 0,
      loading: true,
      bigTypeList: [],
      smallTypeList: [],
      voiceList: [],
      voiceColumns: [
        {type: 'selection', width: 50, align: 'center', fixed: 'left'},
        {title: '声音ID', key: 'voice_id', align: "center", fixed: 'left', width: 80},
        {title: '声音名称', key: 'voice_name', align: "center", width: 150},
        {title: '所属专辑', key: 'album_name', align: "center", width: 150},
        {title: '声音类别', align: "center", width: 140, 
          render: (h, params) => {
            if(params.row.p_name == '暂时无分类') {
              return h('span', '暂时无分类');
            } else {
              return h('span', params.row.p_name + '/' + params.row.name);
            }
          }
        },
        {title: '试听', align: "center", width: 70,
          render: (h, params) => {
            if(params.row.final_voice_file_md5) {
              return h('Icon', {
                props: {
                  type: "play"
                },
                style: {
                  width: '30px',
                  height: '30px',
                  lineHeight: '30px'
                },
                on: {
                  click: () => {
                    this.playAudio(params);
                  }
                }
              });
            } else {
              return h('span', '声音地址不存在');
            }
          }
        },
        {title: '播放数', key: 'play_count', align: "center", width: 70},
        {title: '真实播放数', key: 'real_play_count', align: "center", width: 80},
        {title: '转发数', key: 'forward_count', align: "center", width: 70},
        {title: '喜欢数', key: 'like_count', align: "center", width: 70},
        {title: '评论数', key: 'comment_count', align: "center", width: 70},
        {title: '发布者昵称', key: 'nickname', align: "center", width: 100},
        {title: '发布者类型', align: "center", width: 80,
          render: (h, params) => {
            return h('span', userLevel(params.row.level, params.row.is_copyright_owner));
          }
        },
        {title: '发布时间', key: 'release_time', align: "center", width: 120,
          render: (h, params) => {
            return h('span', formatTime(params.row.release_time*1000, 'YMDHMS'));
          }
        },
        {title: '推荐', align: "center", width: 100,
          render: (h, params) => {
            var recommendArr = [], recommendStr;
            if(params.row.is_hot) recommendArr.push('热门声音');
            if(params.row.section_list.length > 0) recommendArr.push('一说APP专栏');
            if(params.row.hw_app_section_list.length > 0) recommendArr.push('一说宝宝APP专栏');
            if(recommendArr.length){
              recommendStr = '已推荐到：' + recommendArr.join(",");
            } else {
              recommendStr = '未推荐';
            }
            return h('span', recommendStr);
          }
        },
        {title: '操作', align: "center", fixed: 'right', width: 180,
          render: (h, params) => {
            var canRecommend = 'none';
            if(params.row.level != 0 || params.row.is_copyright_owner == 1) {
              if(params.row.release_time * 1000 < new Date().getTime()) {
                canRecommend = 'inline-block';
              }
            }
            return h("div", [
              h(
                "Button", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: canRecommend
                  },
                  on: {
                    click: () => {
                      this.recommendModalShow(params.row);
                    }
                  }
                },
                "推荐"
              ),
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
                      this.deleteModalShow(params.row.voice_id);
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
      //addModal: false,
      editModal: false,
      editVoiceInfo: {},
      edit_album_id: '-1',
      editConfigTagCount: 3,
      userAlbumList: [],
      editVoiceCategory: '',
      edit_big_type: '-1',
      edit_small_type: '-1',
      editSmallTypeList: [],
      edit_tag_list: '',
      edit_secret_type: 0,
      voice_img_list: [],
      recommendModal: false,
      recommend_id: 0,
      recommend_type: [],
      hasRecommendApp: false,
      app_type: [],
      hasRecommendBabyApp: false,
      baby_app_type: [],
      appTypeList: [],
      babyAppTypeList: [],
      sort_order: null,
      deleteModal: false,
      delete_id: 0,
      delete_id_list: '',
      //上传配置
      showUpload: false,
      uploadVoiceUrl: this.$api.uploadUrl + 'voice/upload_voice',
      formVoiceData: { voice_file: 'file' },
      voiceSingleSizeLimit: 200 * 1024 * 1024,
      uploadImageUrl: this.$api.uploadUrl + 'yishuo/api_web/upload/image',
      formImageData: { img: 'file' },
      imageSingleSizeLimit: 5 * 1024 * 1024,
    }
  },
  created() {
    this.getVoicesList();
    this.getCategoryList();
    this.getAppTypeList();
    this.getBabyAppTypeList();
    this.getConfigTagCount();
  },
  methods: {
    //获取声音列表
    getVoicesList() {
      var getVoiceParams = {
        uuid: this.$api.uuid,
        page: this.currentPage,
        per_page: this.pageSize,
        last_request_time: this.last_request_time,
        voice_id: this.voice_id,
        voice_name: this.voice_name,
        album_name: this.voice_album,
        release_time_min: this.publish_begin_time == '' ? '' : this.publish_begin_time.getTime() / 1000,
        release_time_max: this.publish_end_time == '' ? '' : this.publish_end_time.getTime() / 1000,
        level: this.user_level
      };
      if(this.voice_big_type != '-1') {
        if(this.voice_small_type != '-1'){
          getVoiceParams.category_id = this.voice_small_type;
        } else {
          getVoiceParams.category_id = this.voice_big_type;
        }
      }
      this.$api.getVoiceList(getVoiceParams).then(res => {
        this.loading = false;
        if(res.code == 200) {
          this.totalCount = res.data.total_count;
          this.currentPage = res.data.page;
          this.voiceList = res.data.list;
          this.last_request_time = res.data.last_request_time;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    // 获取声音类别
    getCategoryList(bigId, smallId) {
      var getParams = {
        uuid: this.$api.uuid,
        p_id: bigId
      }
      this.$api.getCategoryList(getParams).then(res => {
        if(res.code == 200) {
          if(bigId != null) {
            if(this.addModal || this.editModal) {
              this.editSmallTypeList = res.data.list;
              if(smallId) {
                this.edit_small_type = smallId;
              }
            } else {
              this.smallTypeList = res.data.list;
            }
          } else {
            this.bigTypeList = res.data.list;
          }
        } else {
          this.$Message.error('获取声音类别失败');
        }
      })
    },
    //获取一说APP专栏
    getAppTypeList() {
      var getTypeParams = {
        uuid: this.$api.uuid,
        type: 1
      };
      this.$api.getAppTypeList(getTypeParams).then(res => {
        if(res.code == 200) {
          this.appTypeList = res.data.list;
        } else {
          this.$Message.error("获取一说APP专栏失败");
        }
      })
    },
    //获取一说宝宝APP专栏
    getBabyAppTypeList() {
      var getBabyTypeParams = {
        uuid: this.$api.uuid,
        type: 3
      };
      this.$api.getAppTypeList(getBabyTypeParams).then(res => {
        if(res.code == 200) {
          this.babyAppTypeList = res.data.list;
        } else {
          this.$Message.error("获取一说宝宝APP专栏失败");
        }
      })
    },
    //获取限制标签数
    getConfigTagCount() {
      var getTagParams = {
        uuid: this.$api.uuid,
        type: 1
      };
      this.$api.getConfigTagCount(getTagParams).then(res => {
        if(res.code == 200 && res.data.list[0].config) {
          this.editConfigTagCount = res.data.list[0].config;
        }
      });
    },
    //获取用户专辑列表
    getUserAlbumList(userId, albumId) {
      var getUserAlbumParams = {
        uuid: this.$api.uuid,
        user_id: userId
      };
      this.$api.getUserAlbumList(getUserAlbumParams).then(res => {
        if(res.code == 200) {
          this.userAlbumList = res.data.list;
          if(albumId) {   //编辑弹窗数据处理
            if(albumId != '暂无') {
              this.edit_album_id = albumId;
              for (var i = 0; i < this.userAlbumList.length; i++) {
                if(albumId == this.userAlbumList[i].album_id) {
                  if(this.userAlbumList[i].category_id){
                    this.editVoiceCategory = this.userAlbumList[i].p_name + ' / ' + this.userAlbumList[i].category_name;
                    this.edit_small_type = this.userAlbumList[i].category_id;
                  } else {
                    this.editVoiceCategory = '专辑无分类';
                  }
                  this.edit_secret_type = this.userAlbumList[i].secret_type;
                }
              }
            } else {
              this.editVoiceCategory = '';
            }
          }
        } else {
          this.$Message.error('获取用户专辑失败');
        }
      });
    },
    // 大类改变时
    bigTypeChange(index) {
      if(index == '-1') {
        if(this.addModal || this.editModal) {
          this.edit_small_type = '-1';
          this.editSmallTypeList = [];
        } else {
          this.voice_small_type = '-1';
          this.smallTypeList = [];
        }
      } else {
        this.getCategoryList(index);
      }
    },
    //上传图片成功
    onImageSuccess(file, res) {
      if(res.code == 200) {
        var dataArr = res.data.split("/");
        var oriMd5Arr = dataArr[3].split(".");
        var temp = {
          ori_md5: oriMd5Arr[0],
          img_url: this.$api.fileUrl + res.data
        }
        this.voice_img_list.push(temp);
        if(this.voice_img_list.length == 3){
          $("#upload_edit_image").addClass("none");
        }
      } else {
        this.$Message.error(res.msg);
      }
    },
    //上传图片失败
    onImageError(file, reason) {
      this.$Message.error('上传图片失败，请重试');
    },
    //上传出错
    error(msg) {
      this.$Message.error(msg);
    },
    //删除声音
    deleteVoice(idList) {
      var deleteParams = {
        uuid: this.$api.uuid,
        voice_id_list: idList
      };
      this.$api.deleteVoice(deleteParams).then(res => {
        if(res.code == 200){
          this.$Message.success("删除成功");
          this.loading = true;
          this.last_request_time = 0;
          this.getVoicesList();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //查询数据
    searchData() {
      if(this.publish_begin_time != '') {
        var now = new Date().getTime();
        if(this.publish_begin_time.getTime() > new Date().getTime()) {
          this.$Message.error('开始时间不能大于当前日期');
          return;
        } else {
          if(this.publish_end_time != '' && this.publish_begin_time.getTime() > this.publish_end_time.getTime()) {
            this.$Message.error('开始时间不能大于结束时间');
            return;
          }
        }
      }
      this.currentPage = 1;
      this.loading = true;
      this.getVoicesList();
    },
    //翻页
    pageChange(index) {
      this.currentPage = index;
      this.loading = true;
    },
    //播放
    playAudio(params) {
      $(".ivu-icon-play").css('color', "#495060");
      $(".ivu-icon-play").eq(params.index).css('color', '#00ff00');
      var trueSrc = this.$api.fileUrl + 'uploads/audio/voice/md5/' + params.row.final_voice_file_md5;
      var audio = document.getElementById('voicePlay');
      audio.src = trueSrc;
    },
    //添加弹窗
    addModalShow() {

    },
    //取消添加
    cancelAdd() {

    },
    //确认添加
    confirmAdd() {

    },
    //修改选择推荐
    changeRecommend(array) {
      this.hasRecommendApp = array.indexOf("2") >= 0 ? true : false;
      this.hasRecommendBabyApp = array.indexOf("3") >= 0 ? true : false;
    },
    //推荐弹窗
    recommendModalShow(voiceInfo) {
      this.recommend_type = [];
      this.hasRecommendApp = false;
      this.hasRecommendBabyApp = false;
      this.app_type = [];
      this.baby_app_type = [];
      this.sort_order = null;
      this.recommendModal = true;
      this.recommend_id = voiceInfo.voice_id;
      if(voiceInfo.is_hot) this.recommend_type.push(1);
      if(voiceInfo.section_list.length > 0) {
        this.recommend_type.push('2');
        this.hasRecommendApp = true;
        this.app_type = voiceInfo.section_list;
      }
      if(voiceInfo.hw_app_section_list.length > 0) {
        this.recommend_type.push('3');
        this.hasRecommendBabyApp = true;
        this.baby_app_type = voiceInfo.hw_app_section_list;
      }
    },
    //取消推荐
    cancelRecommend() {
      this.recommendModal = false;
    },
    //确认推荐
    confirmRecommend() {
      if(this.recommend_type.length == 0) {
        this.$Message.error('请选择推荐项');
      } else {
        var recommendParams = {
          uuid: this.$api.uuid,
          voice_id: this.recommend_id,
          recommend: this.recommend_type.join(','),
          section_type: this.app_type.join(','),
          hw_app_section_list: this.baby_app_type.join(','),
          sort_order: this.sort_order
        };
        this.$api.recommendVoice(recommendParams).then(res => {
          this.recommendModal = false;
          if(res.code == 200) {
            this.$Message.success('推荐成功');
            this.loading = true;
            this.getVoicesList();
          } else {
            this.$Message.success(res.msg);
          }
        });
      }
    },
    //修改声音所属专辑
    changeAlbum(index) {
      if(index == '-1') {
        this.editVoiceCategory = '';
        this.edit_big_type = '-1';
        this.edit_small_type = '-1';
        this.edit_secret_type = 0;
        this.editSmallTypeList = [];
      } else {
        for (var i = 0; i < this.userAlbumList.length; i++) {
          if(index == this.userAlbumList[i].album_id) {
            if(this.userAlbumList[i].category_id){
              this.editVoiceCategory = this.userAlbumList[i].p_name + ' / ' + this.userAlbumList[i].category_name;
              this.edit_small_type = this.userAlbumList[i].category_id;
            } else {
              this.editVoiceCategory = '专辑无分类';
            }
            this.edit_secret_type = this.userAlbumList[i].secret_type;
          }
        }
      }
    },
    //删除图片
    deleteImag(index) {
      this.voice_img_list.splice(index,1);
      if(this.voice_img_list.length < 3 && $("#upload_edit_image").hasClass("none")){
        $("#upload_edit_image").removeClass("none");
      }
    },
    //编辑弹窗
    editModalShow(voiceInfo) {
      this.getUserAlbumList(voiceInfo.user_id, voiceInfo.album_id);
      this.editModal = true;
      this.showUpload = true;
      this.editVoiceCategory = '';
      this.edit_big_type = '-1';
      this.edit_small_type = '-1';
      this.editVoiceInfo = voiceInfo;
      if(voiceInfo.p_id) {
        this.edit_big_type = voiceInfo.p_id;
        this.getCategoryList(this.edit_big_type, voiceInfo.category_id);
      }
      this.edit_tag_list = voiceInfo.tag_list.join(',');
      this.edit_secret_type = voiceInfo.secret_type;
      this.voice_img_list = [];
      for (var i = 0; i < voiceInfo.pic_list.length; i++) {
        let temp = {
          ori_md5: voiceInfo.pic_list[i].ori_md5,
          img_url: this.$api.fileUrl + "uploads/images/voice/md5/" + voiceInfo.pic_list[i].ori_md5 + "." + voiceInfo.pic_list[i].ext
        };
        this.voice_img_list.push(temp);
        if(this.voice_img_list.length == 3){
          $("#upload_edit_image").addClass("none");
          return;
        }
      }
    },
    //取消编辑
    cancelEdit() {
      this.editModal = false;
    },
    //确认编辑
    confirmEdit() {
      if(this.editVoiceInfo.voice_name != ''){
        if(this.edit_small_type != '-1') {
          this.edit_tag_list = this.edit_tag_list.replace(/，/g, ",");
          if(this.edit_tag_list.split(",").length <= this.editConfigTagCount){
            if(this.voice_img_list.length){
              var editParams = {
                uuid: this.$api.uuid,
                type: 2,
                voice_id: this.editVoiceInfo.voice_id,
                voice_name: this.editVoiceInfo.voice_name,
                voice_path: null,
                album_id: this.edit_album_id == '-1' ? '' : this.edit_album_id,
                category_id: this.edit_small_type,
                voice_desc: this.editVoiceInfo.voice_desc,
                play_count: this.editVoiceInfo.play_count == '' ? '0' : this.editVoiceInfo.play_count,
                tag_list: this.edit_tag_list,
                secret_type: this.edit_secret_type,
              };
              for (var i = 0; i < this.voice_img_list.length; i++) {
                if(i == 0) {
                  editParams.cover_img = this.voice_img_list[i].img_url.split(this.$api.fileUrl)[1];
                  editParams.cover_md5 = this.voice_img_list[i].ori_md5;
                }
                if(i == 1) {
                  editParams.second_img = this.voice_img_list[i].img_url.split(this.$api.fileUrl)[1];
                  editParams.second_md5 = this.voice_img_list[i].ori_md5;
                }
                if(i == 2) {
                  editParams.third_img = this.voice_img_list[i].img_url.split(this.$api.fileUrl)[1];
                  editParams.third_md5 = this.voice_img_list[i].ori_md5;
                }
              }
              this.$api.editVoice(editParams).then(res => {
                if(res.code == 200) {
                  this.$Message.success('修改成功');
                  this.editModal = false;
                  this.loading = true;
                  this.getVoicesList();
                } else {
                  this.$Message.error(res.msg);
                }
              })
            } else {
              this.$Message.error('请上传声音配图');
            }
          } else {
            this.$Message.error('标签个数不能超过设置个数');
          }
        } else {
          this.$Message.error('请选择声音类别');
        }
      } else {
        this.$Message.error('请填写声音名称');
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
    },
    //确认删除
    confirmDelete() {
      this.deleteModal = false;
      this.deleteVoice(this.delete_id);
    },
    //选择删除项
    changeSelect(selection){
      var deleteList = [];
      for (var i = 0; i < selection.length; i++) {
        deleteList.push(selection[i].voice_id);
      }
      this.delete_id_list = deleteList.join(",");
    },
    //批量删除
    deleteVoices() {
      if(this.delete_id_list == ''){
        this.$Message.error('请选择要删除的数据');
      } else {
        this.deleteVoice(this.delete_id_list);
      }
    },
    //跳转到批量添加页面
    addVoices() {

    }
  }
};
