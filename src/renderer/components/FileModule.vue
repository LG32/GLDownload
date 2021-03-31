<template>

  <el-container>
    <el-main class="bodyTip">
      <el-form ref="form" :model="form" label-width="120px" class="formBox">
        <el-form-item label="下载路径">
          <div style="display:inline; width: 80%; float:left;">
            <input type="file" id="file" hidden @change="fileChange" webkitdirectory>
            <el-input placeholder="请输入内容" v-model="form.filePath" class="input-with-select">
              <el-button slot="append" icon="el-icon-folder" type="success" @click="btnChange"></el-button>
            </el-input>
          </div>
          <div style="display:inline; width: 20%;float:right;">
            <el-button type="primary" @click="startDownload()" style="height:38px">下载<i class="el-icon-download el-icon--right"></i>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>

</template>

<script>
export default {
  name: 'file-module',
  data() {
    return {
      form: {
        filePath: ''
      }
    }
  },
  methods: {
    fileChange(e) {
      try {
        const fu = document.getElementById('file')
        if (fu == null) return
        const that = this
        that.form.filePath = fu.files[0].path
        console.log('fileChange:', that.form.filePath)
      } catch (error) {
        console.debug('choice file err:', error)
      }
    },
    btnChange() {
      const file = document.getElementById('file')
      file.click()
    },
    startDownload() {
      console.log('click start')
      this.$emit("startDownload", this.form.filePath)
    }
  }
}
</script>
<style scoped>

.bodyTip {
  display: flex;
  flex-direction: column;
}

.formBox {
  width: 75%;
  margin:50px 10px 10px 250px
}

</style>
