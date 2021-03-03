<template>
  <li :key="item.id" @click="playMusic">
    <slot></slot>
    <div class="left">
      <div>{{ item.name }}</div>
      <p>
        <span></span>
         <!-- | formcheck  -->
        {{ item.artists| formcheck}}-{{ item.name }}
      </p>
    </div>
    <div class="right">
      <span></span>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    List:[],
    item: Object,
    num: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    playMusic() {
      //把音乐ID传递给Vue实例里面playingMusic属性.
      // this.$root.playingMusic.newMusicList = this.newMusicList;

      this.$root.playingMusic.musicID = this.item.id;
    },
  },
  filters: {
    formatNum(val) {
      return val < 10 ? "0" + val : val;
    },
    formcheck(value) {
      let str = "";
      if (value.length == 1) {
        return value[0].name;
      } else {
        value.forEach((v) => {
          str += v.name + " / ";
        });
        return str.substring(0, str.length - 3);
      }
    },
  },
};
</script>
<style lang="less" scoped>
li {
  display: flex;
  margin-top: 10px;
  padding-left: 10px;
  div.left {
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #ddd;
    div {
      font-size: 17px;
      color: black;
    }
    p {
      font-size: 12px;
      color: #888;
      padding: 5px 0px;
      display: flex;
      align-items: center;
      span {
        display: block;
        width: 20px;
        height: 16px;
        background: url("../assets/index_icon_2x.png") no-repeat 0px 4px/210px;
      }
    }
  }
  div.right {
    border-bottom: 1px solid #ddd;
    padding: 0px 5px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 22px;
      height: 22px;
      background-image: url(../assets/index_icon_2x.png);
      background-size: 166px 97px;
      background-position: -24px 0px;
    }
  }
}
</style>