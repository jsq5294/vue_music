// 轮播图组件
<template>
  <div class="swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="l in list" :key="l.bannerId"><img :src="l.pic" /></van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  //轮播数组
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
    };
  },
  methods: {
    
  },
};
</script>
<style lang="less" scoped>
.swipe {
  /deep/.van-swipe__track{
    display: flex;
  }
  position: relative;
  overflow: hidden;
}
</style>
