<template>
  <div id="MainPage">
<!--       style="-webkit-app-region:drag">-->
    <div id="wrapper">
      <img src="../../img/banner.png" alt="" id="banner">
      <div class="bottom">
        <div class="bottomTitle">下载速度:</div>
        <el-progress :text-inside="true" :stroke-width="16" :percentage="50" :color="customColor"></el-progress>
        <el-button type="primary" @click="addTask()">下载<i class="el-icon-download el-icon--right"></i></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: "MainPage",
  data() {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('../../img/banner.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      customColor: '#f4da3b'
    }
  },

  computed: {
    ...mapState('task', {
      taskObj: state => state.taskObj,
      selectedGidList: state => state.selectedGidList,
      selectedGidListCount: state => state.selectedGidList.length
    }),
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
    addTask(type, form) {
      console.log('addTask')
      this.$store.dispatch('task/addUri')
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
  //-moz-user-select: none;
  //-webkit-user-select: none;
  //-ms-user-select: none;
  //-khtml-user-select: none;
  //user-select: none;
  //-webkit-user-drag: none;
}

.bottom {
  width: 1000px;
  //height: 100px;
  margin: 0 50px 0 375px;
  overflow: auto;
  position: absolute;
  bottom: 60px;
}

.bottomTitle {
  text-align: center;
  text-shadow: #000 2px 2px 2px;
  color: #fff;
  font-weight: bold;
}

</style>
