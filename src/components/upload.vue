<template>
  <div class="vue-upload">
  </div>
</template>

<script>
// import { fileUrltest } from 'serviceApi/config'
export default {
  name: 'vue-upload',
  props: {
    //接受的类型文件，只需要传image,video,text三种字符串类型即可
    accept: {
      type: String,
      default: '',
    },
    // 上传地址
    url: {
      type: String,
      default: '',
    },
    // 上传最大数量 默认为100
    fileNumLimit: {
      type: Number,
      default: 100,
    },
    // 大小限制 默认2M
    fileSingleSizeLimit: {
      type: Number,
      default: 5 * 1024 * 1024,
    },
    // 上传时传给后端的参数，一般为token，key等
    formData: {
      type: Object,
      default: null
    },
    // 生成formData中文件的key，下面只是个例子，具体哪种形式和后端商议
    keyGenerator: {
      type: Function,
      default(file) {
        const currentTime = new Date().getTime()
        const key = `${currentTime}.${file.name}`
        return key
      },
    },
    // 是否多选，默认多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 上传按钮ID名
    uploadButton: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      uploader: null
    }
  },
  mounted() {
    this.initWebUpload()
  },
  methods: {
    initWebUpload() {
      this.uploader = WebUploader.create({
        auto: true, // 选完文件后，是否自动上传
        swf: '/static/third_lib/webuploader/Uploader.swf',  // swf文件路径
        server: this.url,  // 文件接收服务端
        pick: {
          id: this.uploadButton,     // 选择文件的按钮的id名称
          multiple: this.multiple,   // 是否多文件上传 默认false
          label: '',
        },
        accept: this.getAccept(this.accept),  // 允许选择文件格式。
        threads: 1,//上传并发数。允许同时最大上传进程数
        fileNumLimit: this.fileNumLimit, // 限制上传个数
        fileSingleSizeLimit: this.fileSingleSizeLimit, // 限制单个上传图片的大小
        formData: this.formData, // 上传所需参数
        chunked: true,          //分片上传
        chunkSize: 2048000,    //分片大小
        duplicate: false,  // 重复上传
        compress: false,//压缩
      })


      //当文件被加入队列之前触发
      this.uploader.on('beforeFileQueued', (file) => {
        this.$emit('beforeFileChange', file)
      })

      // 当有文件被添加进队列的时候
      this.uploader.on('fileQueued', (file) => {
        this.$emit('fileChange', file)
      })

      // 某个文件开始上传前触发，一个文件只会触发一次
      this.uploader.on('uploadStart', (file) => {
        this.$emit('start', file)
      })

      // 文件上传过程中创建进度条实时显示
      this.uploader.on('uploadProgress', (file, percentage) => {
        this.$emit('progress', file, percentage)
      })

      // 当文件上传成功时触发
      this.uploader.on('uploadSuccess', (file, response) => {
        this.$emit('success', file, response)
      })

      // 当文件上传出错时触发
      this.uploader.on('uploadError', (file, reason) => {
        this.$emit('uploadError', file, reason)
      })


      this.uploader.on('error', (type) => {
        let errorMessage = ''
        if (type === 'F_EXCEED_SIZE') {
          errorMessage = `文件大小不能超过${this.fileSingleSizeLimit / (1024 * 1000)}M`
        } else if (type === 'Q_EXCEED_NUM_LIMIT') {
          errorMessage = '文件上传已达到最大上限数'
        } else {
          errorMessage = `上传出错！请检查后重新上传！错误代码${type}`
        }
        console.log('errorMessage=' + errorMessage)
        this.$emit('error', errorMessage)
      })

      // 不管成功或者失败，文件上传完成时触发
      this.uploader.on('uploadComplete', (file, response) => {
        console.log(response);
        this.$emit('complete', file, response)
      })
    },

    upload(file) {
      this.uploader.upload(file)
    },
    stop(file) {
      this.uploader.stop(file);
      //this.$emit('stop');
    },
    // 取消并中断文件上传
    cancelFile(file) {
      this.uploader.cancelFile(file)
    },
    // 在队列中移除文件
    removeFile(file, bool) {
      this.uploader.removeFile(file, bool)
    },

    getAccept(accept) {
      switch (accept) {
        case 'text':
          return {
            title: 'Texts',
            exteensions: 'doc,docx,xls,xlsx,ppt,pptx,pdf,txt',
            mimeTypes: '.doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt'
          }
          break
        case 'video':
          return {
            title: 'Videos',
            extensions: 'mp3,wma,ogg,m4a,amr',
            mimeTypes: 'audio/*,audio/amr-wb'
          }
          break
        case 'image':
          return {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
          }
          break
        default: return accept
      }
    },

  },
}
</script>

<style lang="sass">
.webuploader-container 
  position: relative
.webuploader-element-invisible 
  position: absolute !important
  clip: rect(1px 1px 1px 1px) /* IE6, IE7 */
  clip: rect(1px,1px,1px,1px)
.webuploader-pick 
  position: relative
  display: inline-block
  cursor: pointer
  background: #00b7ee
  padding: 10px 15px
  color: #fff
  text-align: center
  border-radius: 3px
  overflow: hidden
.webuploader-pick-hover 
  background: #00a2d4

.webuploader-pick-disable 
    opacity: 0.6
    pointer-events:none

</style>
