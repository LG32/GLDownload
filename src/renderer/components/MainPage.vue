<template>
  <div id="MainPage">
    <div id="wrapper">
      <img src="../../img/banner.png" alt="" id="banner">
      <div class="bottom">
        <div v-if="startDownloadFlag">
          <div class="bottomTitle">下载速度:{{ speed }}</div>
          <div class="iconLine">
            <el-row>
              <el-button @click="pauseTask()" icon="el-icon-video-pause" circle></el-button>
              <el-button @click="resumeTask()" icon="el-icon-video-play" circle></el-button>
              <el-button @click="clickRemoveTask()" icon="el-icon-close" circle></el-button>
            </el-row>
          </div>
          <el-progress :text-inside="true"
                       :stroke-width="16"
                       :percentage="downloadProgress"
                       :color="customColor"
                       style="pointer-events:none"></el-progress>
        </div>
        <file-module v-else v-on:startDownload="startDownload"></file-module>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {bytesToSize} from "../../utils.js";
import fileModule from "./FileModule"

export default {
  name: "MainPage",
  data() {
    return {
      fileForm: {
        moveFileList: [],
        filePath: '',
        searchFilePath: ''
      },
      backgroundDiv: {
        backgroundImage: 'url(' + require('../../img/banner.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      customColor: '#f4da3b',
      completedLength: 0,
      totalLength: 0,
      status: null,
      timer: null,
      speed: 0,
      downloadProgress: 0,
      startDownloadFlag: false,
      gid: undefined
    }
  },

  components: {
    [fileModule.name]: fileModule
  },
  computed: {
    ...mapState('task', {
      taskObj: state => state.taskObj,
      selectedGidList: state => state.selectedGidList,
      selectedGidListCount: state => state.selectedGidList.length
    }),
  },
  created: function () {
    console.log('created clock')
    this.timer = setInterval(this.flush, 1000)
  },

  methods: {
    ...mapActions('task', {
      'addUri': 'addUri',
      'fetchList': 'fetchList'
    }),
    back: function () {
      window.history.back()
    },
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    },
    addTask() {
      let that = this;
      console.log('addTask', that.fileForm.filePath)
      this.$store.dispatch('task/addUri', that.fileForm.filePath)
          .then((task) => {
            console.log('addTask after task is:', task)
            this.gid = task.gid
          })
    },
    flush() {
      let task = this.taskObj
      if (!task) return;

      this.$store.dispatch('task/fetchList')

      let downloadSpeed = typeof task.downloadSpeed !== 'undefined'
          ? task.downloadSpeed : 0
      let speed = bytesToSize(parseInt(downloadSpeed))
      let completedLength = parseInt(task.completedLength)
      let totalLength = parseInt(task.totalLength)
      let downloadProgress = completedLength / totalLength
      downloadProgress = downloadProgress * 100

      this.completedLength = completedLength
      this.totalLength = totalLength
      this.status = task.status
      this.speed = speed
      this.downloadProgress = parseInt(downloadProgress)
      console.log('downloadProgress', typeof downloadProgress)
    },
    fileChange(e) {
      try {
        const fu = document.getElementById('targetFile')
        console.log('fileChange change', fu)
        if (fu == null) return
        const that = this
        let tbl = that.tableData
        let target = fu.files[0].path
        for (let i = 0; i < tbl.length; i++) {
          tbl[i].target_address = target
        }
        that.fileForm.filePath = target
        that.tableData = tbl
        console.log('fileChange1:', that.fileForm.filePath)
      } catch (error) {
        console.debug('choice file err:', error)
      }
    },

    startDownload(filePath) {
      if (filePath === '') {
        this.$message.error('请选择下载路径')
        return
      }
      let that = this
      that.startDownloadFlag = true
      that.fileForm.filePath = filePath
      that.addTask()
    },
    pauseTask() {
      let gid = this.gid
      if (typeof gid === 'undefined') {
        let task = this.taskObj
        gid = task.gid
        this.gid = gid
      }

      this.$message({
        message: '暂停下载',
        type: 'warning'
      });
      this.$store.dispatch('task/pauseTask', gid)
    },
    resumeTask() {
      let gid = this.gid
      this.$message({
        message: '恢复下载',
        type: 'success'
      });
      this.$store.dispatch('task/resumeTask', gid)
    },
    clickRemoveTask() {
      this.$confirm('此操作将取消下载并删除该文件, 是否继续?', '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
        this.removeTask()
        this.$message({
          type: 'success',
          message: '取消下载!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    removeTask() {
      let that = this
      let gid = that.gid
      if (typeof gid === 'undefined') {
        let task = this.taskObj
        gid = task.gid
        this.gid = gid
      }
      that.startDownloadFlag = false
      this.$store.dispatch('task/removeTask', gid)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

#wrapper {
  display: flex;
}

#banner {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-app-region: drag;
  pointer-events: none
}

.bottom {
  width: 1000px;
  -webkit-app-region: no-drag;
}

.bottomTitle {
  text-align: center;
  text-shadow: #000 2px 2px 2px;
  color: #fff;
  font-weight: bold;
}

.iconLine {
  float: right;
  margin-right: 10px;
}

</style>
