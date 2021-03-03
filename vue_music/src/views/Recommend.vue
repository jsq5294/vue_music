<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <Swipe :list="swipeList"></Swipe>

    <!-- 栏目板块 -->
    <div class="navbar-box">
      <div
        class="navbar-item"
        v-for="(item, index) in iconData"
        :key="index"
        @click="goCircle(item.go)"
      >
        <div class="icon-item">
          <img class="auto-img" :src="item.iconUrl" alt="" />
        </div>
        <div class="title-text">{{ item.name }}</div>
      </div>
    </div>

    <Title>推荐歌单</Title>
    <ul class="recommendList">
      <router-link
        :to="{ path: '/musiclist/' + rem.id }"
        tag="li"
        v-for="rem in recommendMusicList"
        :key="rem.id"
      >
        <div>
          <img :src="rem.picUrl" />
          <span>{{ rem.playCount | formatNum }}</span>
        </div>
        <p>{{ rem.name }}</p>
      </router-link>
    </ul>
    <Loading v-if="recommendMusicList.length <= 0" />
    <Title>最新音乐</Title>
    <keep-alive>
      <MusicItem :newMusicList="newMusicList"></MusicItem>
    </keep-alive>
  </div>
</template>

<script>
import Title from "../components/Title";
import MusicItem from "../components/MusicItem";
import Swipe from "../components/Swipe";
import Loading from "../components/Loading";
export default {
  name: "Recommend",
  components: {
    Title,
    MusicItem,
    Loading,
    Swipe,
  },
  data() {
    return {
      recommendMusicList: [],
      newMusicList: [],
      swipeList: [],
      iconData: [],
    };
  },
  methods: {
    playMusic(id) {
      this.$emit("playMusic", id);
    },

    // 获取图标
    getIcon() {
      this.axios({
        method: "get",
        url: "/homepage/dragon/ball",
      })
        .then((result) => {
          if (result.data.code == 200) {
            let goPageArr = ["", "List", "Rank", "", ""];
            let data = result.data.data.slice(1, 6);
            data.map((v, i) => {
              v.go = goPageArr[i];
            });
            this.iconData = data;
          }
        })
    },

    // 点击中部圆形导航
    goCircle(name) {
      if (name == "") {
        this.$toast("该功能开发中...");
      } else {
        this.$router.push({ name });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    //路由守卫,再录又进入之前获取数据
    next((vm) => {
      vm.$http("/banner?type=2").then((data) => {
        vm.swipeList = data.data.banners;
      });
      vm.$http.get("/personalized?limit=6").then((data) => {
        vm.recommendMusicList = data.data.result;
      });
      vm.$http.get("/personalized/newsong").then((data) => {
        vm.newMusicList = data.data.result.map((v) => {
          return {
            name: v.name,
            artists: v.song.artists,
            id: v.id,
            // song:{
            //   artists:v.artists,
            //   privilege:{
            //     maxbr:1
            //   }
            // }
          };
        });
        vm.$root.playingMusic.newMusicList = vm.newMusicList;
      });
      vm.getIcon()
    });
  },
  filters: {
    formatNum(value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  margin-top: 50px;
  margin-bottom: 50px;
  .navbar-box {
    padding: 10px;
    text-align: center;
    // background-color: #ccc;
    display: flex;
    justify-content: space-between;
    .icon-item {
      width: 50px;
      height: 50px;
      background-color: black;
      border-radius: 50%;
    }
    .title-text {
      color: black;
      margin-top: 5px;
    }
  }
  ul.recommendList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 10px;
    li {
      width: 32%;
      margin-top: 15px;
      div {
        position: relative;
        span {
          top: 2px;
          right: 3px;
          position: absolute;
          color: white;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          font-size: 10px;
          &::after {
            content: "";
            position: absolute;
            left: -17px;
            top: 3px;
            background: url("../assets/more.png") no-repeat 0 -24px;
            width: 14px;
            height: 11px;
            z-index: 999;
          }
        }
      }
    }
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      width: 100%;
      -webkit-line-clamp: 2;
      -moz-line-clamp: 2;
      -ms-line-clamp: 2;
      -o-line-clamp: 2;
      overflow: hidden;
      font-size: 13px;
      text-align: left;
      min-height: 30px;
      line-height: 1.2;
      padding: 2px 2px 0 6px;
    }
  }
}
</style>
