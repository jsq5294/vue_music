<template>
  <div class="hot">
    <div class="head">
      <div class="bg"></div>
      <p>更新日期: {{ updateDate | formatDate }}</p>
    </div>
    <ul class="hotmusic">
      <!-- <li v-for="(hm, k) in hotMusicList" :key="k" @click="playMusic">
        <span>{{ (k + 1) | formatNum }}</span>

        <div class="left">
          <div>{{ hm.name }}</div>
          <p>
            <span v-if="hm.h.br >= 320000"></span>{{ hm.ar[0].name }} -
            {{ hm.name }}
          </p>
        </div>
        <div class="right">
          <span></span>
        </div>
      </li> -->
      <ListItem
        v-for="(item, k) in hotMusicList"
        :num="k + 1"
        :item="item"
        :key="item.id"
      >
        <div class="right">{{ k + 1 }}</div>
      </ListItem>
    </ul>
    <Loading v-show="showSearch" />

    <button class="more" @click="add">查看完整榜单 ></button>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import ListItem from "../components/ListItem";
export default {
  name: "Hot",
  data() {
    return {
      updateDate: new Date(),
      hotMusicList: [],
      limit: 20,
      num: 0,
      totalnum: Number,
      showSearch: false,
    };
  },
  components: {
    Loading,
    ListItem,
  },
  methods: {
    playMusic() {
      //把音乐ID传递给Vue实例里面playingMusic属性.
      this.$root.playingMusic.musicID = this.item.id;
    },
    loadMusic(vm) {
      let musicids = [];
      vm.num++;
      vm.$http.defaults.baseURL = "http://musicapi.leanapp.cn";
      vm.$http
        .get("/top/list?idx=1")
        .then((data) => {
          //获取热榜信息
          vm.updateDate = data.data.playlist.updateTime; //获取更新日期
          vm.totalnum = data.data.playlist.trackIds.length;
          musicids = data.data.playlist.trackIds.slice(
            20 * (vm.num - 1),
            20 * vm.num
          );
        })
        .then(() => {
          for (let v of musicids) {
            vm.$http.get("song/detail?ids=" + v.id).then((data) => {
              //根据热榜里面歌曲id获取歌曲详细信息
              vm.hotMusicList.push({
                name: data.data.songs[0].name,
                id: data.data.songs[0].id,
                song: {
                  privilege: {
                    maxbr: data.data.privileges[0].maxbr,
                  },
                },
                artists: data.data.songs[0].ar,
              });
              vm.$root.playingMusic.newMusicList = vm.hotMusicList;
            });
          }
        });
      vm.$http.defaults.baseURL = "http://localhost:3000";
    },
    add() {
      this.num++;
      if (this.num == this.totalnum / 20) {
        this.num = this.totalnum / 20;
      }
      this.loadMusic(this);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.loadMusic(vm);
    });
  },
  filters: {
    formatDate(value) {
      let d = new Date(value);
      let m = d.getMonth() + 1;
      let day = d.getDate();
      m = m < 10 ? "0" + m : m;
      day = day < 10 ? "0" + day : day;
      return m + "月" + day + "日";
    },
    formatNum(value) {
      value = value < 10 ? "0" + value : value;
      return value;
    },
  },
};
</script>

<style lang="less" scoped>
.hot {
    margin-top: 50px;
  .head {
    padding: 20px 0px 0px 20px;
    width: 100%;
    height: 145px;
    background: url("../assets/bg2.jpg") no-repeat;
    background-size: 100%;
    .bg {
      background: url("../assets/index_icon_2x.png") no-repeat -24px -30px;
      width: 283px;
      height: 75px;
      background-size: 166px 97px;
    }
    p {
      color: white;
      font-size: 12px;
      text-align: left;
    }
  }
  ul.hotmusic {
    li {
      display: flex;
      margin-top: 10px;
      padding-left: 10px;
      align-items: center;
      height: 49px;
      span {
        margin-right: 10px;
        font-size: 20px;
      }
      &:nth-child(-n + 3) {
        span {
          color: red;
        }
      }
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
        height: 100%;
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
  }
  .more {
    height: 55px;
    line-height: 55px;
    color: #999999;
    background-color: transparent;
    border: none;
    outline: none;
  }
}
</style>