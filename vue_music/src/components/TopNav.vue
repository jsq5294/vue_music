<template>
  <div class="topnav" v-show="$route.meta.showNav">
    <ul class="nav" >
      <li @click="showMy">
        <van-icon name="wap-nav" size="25"/>
      </li>
      <li><router-link to="/hot/1">热歌榜</router-link></li>
      <li><router-link to="/home">发现</router-link></li>
      <li><router-link to="/list">歌单</router-link></li>
      <li @click="Tosearch"><van-icon name="search" size="25px" /></li>
    </ul>

    <van-popup v-model="showmyPopup" round position="left" :style="{ width: 'calc(80% - 20px)', height:'100%'}">
      <div class="my-top">
        <div>手机电脑多端同步，尽享海量高品质音乐</div>
        <div class="login-btn">立即登录</div>
      </div>
      <div class="tabbar">
        <van-tabbar active-color="#e6d68b" inactive-color="#e6d68b">
          <van-tabbar-item v-for="(item,index) in tabbarData" :key="index" :icon="item.icon">{{item.title}}</van-tabbar-item>
        </van-tabbar>
      </div>
      <div class="cell-box">
        <van-cell class="cell-item" value="内容" color="#fff" :icon="item.icon" v-for="(item,index) in myData" :key="index">{{item.title}}</van-cell>
      </div>
    </van-popup>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showmyPopup: false,
      tabbarData: [
        {title: '我的消息', icon: 'envelop-o'},
        {title: '我的好友', icon: 'friends-o'},
        {title: '个人主页', icon: 'wap-home-o'},
        {title: '个性装扮', icon: 'point-gift-o'}
      ],
      myData: [
        {title: '喜欢的音乐',icon: 'like-o'},
        {title: '听歌历史', icon: 'music-o'},
        {title: '收藏歌单', icon: 'orders-o'}
      ]
    };
  },
  methods: {
    showMy() {
      this.showmyPopup = true;
    },
    Tosearch(){
      this.$router.push({name:'Search'})
    }
  },
};
</script>

<style lang="less" scoped>
.topnav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    background-color: white;
    li {
      line-height: 40px;
      display: flex;
      align-items: center;
      font-size: 15px;
      a {
        display: inline-block;
        text-decoration: none;
        color: black;
        &.router-link-exact-active {
          color: red;
          border-bottom: 2px solid red;
        }
      }
    }
  }
}

/deep/ .van-popup {
  background-color: #424242;
  color: #fff;
  padding: 10px;
}
/deep/ .van-tabbar--fixed {
  position: static;
}
/deep/ .van-tabbar {
  background-color: transparent;
}
/deep/ .van-tabbar-item--active {
  background-color: transparent;
  color: #e6d68b;
}
/deep/ .van-tabbar-item__text {
  color: #fff;
  margin-top: 5px;
  font-size: 12px;
  transform: scale(0.9);
}
/deep/ .van-cell {
  background-color: transparent;
  color: #fff;
}
/deep/ .van-cell__value--alone {
  color: #fff;
}
/deep/ .van-cell--borderless::after,
.van-cell:last-child::after {
  display: block;
}
.my-top{
    text-align: center;
    margin-top: 50px;

  }
  .login-btn{
    width: 110px;
    height: 30px;
    line-height: 30px;
    margin: 20px auto;
    border-radius: 24px;
    background-color: #e6d68b;
    padding: 2px 20px;
  }

  .cell-box{
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }
</style>