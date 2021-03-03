<template>
  <div class="MusicList">
    <!-- 导航栏 -->
    <div class="detail-back" @click="goBack">
      <van-icon name="arrow-left" size="20"  />
      <div>返回</div>
    </div>

    <div class="title">
      <div class="box" v-if="backgroundCoverUrl != null">
        <div ref="tImage" class="tImage"></div>
        <div class="cover"></div>
        <div class="content">
          <p>{{ name }}</p>
          <span>{{ updateFrequency }}</span>
          <span>{{ description }} ›</span>
        </div>
      </div>
      <div class="box" v-else>
        <div ref="tImage" class="tImage1"></div>
        <div class="cover"></div>
        <div class="otherImg">
          <div class="coverImg">
            <img :src="coverImgUrl" alt="" />
            <span class="lsthd_icon">歌单</span>
            <i class="lsthd_num">{{ playCount | formatNum }}</i>
          </div>
          <div class="Right">
            <p>{{ name }}</p>
            <p><img :src="userpic" alt="" />{{ creator }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="playMusicList">
      <p>歌曲列表</p>
      <ul class="playListmusic">
        <ListItem
          v-for="(item, k) in playlist"
          :num="k + 1"
          :item="item"
          :key="item.id"
        >
          <div class="right">{{ k + 1 }}</div>
        </ListItem>
      </ul>
      <Loading v-show="showSearch" />
    </div>
    <div class="cov1" v-if="num >= totalnum / 10">
      <p @click="add"><i>查看更多...</i></p>
    </div>
    <!-- <div v-else class="cov2">
      <i>已经到底啦,没有歌了哦!!!</i>
    </div> -->
    <div v-if="hotcommentList.length >= 1" class="hotcomments">
      <p>精彩评论</p>
      <Comment :hotcommentList="hotcommentList"></Comment>
    </div>
    <div v-if="newcommentList.length >= 1" class="newcomments">
      <p>最新评论({{ newcommentList.length }})</p>
      <Comment :newcommentList="newcommentList"></Comment>
    </div>
    <div v-if="hotcommentList.length < 1 && newcommentList.length < 1">
      <p>还没有人评论呢,快来抢沙发吧!!!</p>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import ListItem from "../components/ListItem";
import Comment from "../components/Comment";
export default {
  name: "MusicList",
  data() {
    return {
      playlist: [],
      // obj: {},
      backgroundCoverUrl: String,
      coverImgUrl: String,
      name: String,
      updateFrequency: String,
      description: String,
      userpic: "",
      creator: "",
      num: 1,
      totalnum: Number,
      showSearch: false,
      musicid: "",
      hotcommentList: [],
      newcommentList: [],
    };
  },
  components: {
    Loading,
    ListItem,
    Comment,
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    playMusic() {
      //把音乐ID传递给Vue实例里面playingMusic属性.
      this.$root.playingMusic.musicID = this.item.id;
    },
    loadMusic(vm) {
      let musicids = [];
      vm.playlist = [];
      vm.showSearch = true;
      console.log(vm.musicid);
      // vm.$http.defaults.baseURL = "http://localhost:3000";
      vm.$http("/playlist/detail?id=" + vm.musicid)
        .then((data) => {
          console.log(data);
          let pl = data.data.playlist;
          if (pl.backgroundCoverUrl != null) {
            vm.backgroundCoverUrl = pl.backgroundCoverUrl;
            vm.$refs.tImage.style.backgroundImage = `url(${vm.backgroundCoverUrl})`;
          } else {
            vm.coverImgUrl = pl.coverImgUrl;
            vm.backgroundCoverUrl = null;
            vm.$refs.tImage.style.backgroundImage = `url(${vm.coverImgUrl})`;
          }
          // vm.obj = {
          vm.name = pl.name;
          vm.updateFrequency = pl.updateFrequency;
          vm.description = pl.description;
          vm.userpic = pl.creator.avatarUrl;
          vm.creator = pl.creator.nickname;
          vm.totalnum = pl.trackIds.length;
          vm.playCount = pl.playCount;
          // };

          musicids = pl.trackIds.slice(0, 10 * vm.num);
        })
        .then(() => {
          for (let v of musicids) {
            vm.$http.get("song/detail?ids=" + v.id).then((data) => {
              //根据热榜里面歌曲id获取歌曲详细信息
              vm.playlist.push({
                name: data.data.songs[0].name,
                id: data.data.songs[0].id,
                song: {
                  privilege: {
                    maxbr: data.data.privileges[0].maxbr,
                  },
                },
                artists: data.data.songs[0].ar,
              });
              vm.$root.playingMusic.newMusicList = vm.playlist;

              vm.showSearch = false;
            });
          }
        });

      vm.$http("/comment/playlist?id=" + vm.musicid).then((data) => {
        vm.hotcommentList = data.data.hotComments;
        vm.newcommentList = data.data.comments;
      });
    },
    add() {
      this.num++;
      if (this.num >= this.totalnum / 10) {
        this.num = this.totalnum / 10;
      }
      this.loadMusic(this);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.musicid = to.params.musicid;
      vm.loadMusic(vm);
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
.MusicList {
  .detail-back{
    margin-top: 10px;
    display: flex;
    width: 100%;
    color: white;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    >div{
      height: 20px;
      font-size: 16px;
    }
  }
  .title {
    .box {
      width: 100%;
      overflow: hidden;
      position: relative;
      height: 210px;
      .tImage {
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-position: 0px 0px;
      }
      .tImage1 {
        width: 100%;
        height: 100%;
        background-size: 120%;
        background-position: -40px -90px;
        filter: blur(20px);
      }
      div.cover {
        z-index: 10;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        opacity: 0.25;
      }
      .content {
        z-index: 10;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        color: white;
        text-align: left;
        width: 90%;
        height: 80%;
        margin: auto auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        p {
          font-size: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        span {
          display: block;
          &:first-of-type {
            width: 66px;
            padding-left: 3px;
            padding-right: 3px;
            margin-top: 10px;
            display: inline-block;
            background-color: hsla(0, 0%, 100%, 0.2);
            border-radius: 2px;
            font-size: 10px;
            color: hsla(0, 0%, 100%, 0.6);
          }
          &:last-of-type {
            margin-top: 20px;
            color: #d2d1d0;
            font-size: 16px;
          }
        }
      }
      .otherImg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        padding: 20px 15px;
        z-index: 10;
        .coverImg {
          position: relative;
          margin-right: 10px;
          width: 126px;
          height: 126px;
          img {
            display: block;
            width: 100%;
          }
          .lsthd_icon {
            position: absolute;
            z-index: 3;
            top: 10px;
            left: 0;
            padding: 0 8px;
            height: 17px;
            color: #fff;
            font-size: 9px;
            text-align: center;
            line-height: 17px;
            background-color: rgba(217, 48, 48, 0.8);
            border-top-right-radius: 17px;
            border-bottom-right-radius: 17px;
          }
          .lsthd_num {
            position: absolute;
            right: 2px;
            top: 0;
            z-index: 3;
            padding-left: 15px;
            color: #fff;
            font-size: 12px;
            background-position: 0;
            background-repeat: no-repeat;
            background-size: 11px 10px;
            text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
            &::before {
              content: "";
              position: absolute;
              left: 0px;
              top: 3px;
              background: url("../assets/more.png") no-repeat 0 -24px;
              width: 14px;
              height: 11px;
              z-index: 999;
            }
          }
        }

        .Right {
          flex: 1;
          display: flex;
          flex-direction: column;
          color: white;
          p {
            text-align: left;
            margin-top: 20px;
            &:first-of-type {
              font-size: 18px;
            }
            &:last-of-type {
              img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
  .playMusicList {
    p {
      text-align: left;
      height: 23px;
      line-height: 23px;
      padding: 0 10px;
      font-size: 12px;
      color: #666;
      background-color: #eeeff0;
    }
  }
  .cov1 {
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    height: 150px;
    background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 97.3%, 0.7),
      #f8f8f8 60%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: -150px;
    p {
      margin-bottom: 10px;
      color: #999999;
      font-size: 15px;
    }
  }
  .hotcomments,
  .newcomments {
    p {
      text-align: left;
      height: 23px;
      line-height: 23px;
      padding: 0 10px;
      font-size: 12px;
      color: #666;
      background-color: #eeeff0;
    }
  }
  // div{
  //   &:last-of-type{
  //     margin-bottom: 100px;
  //   }
  // }
}
</style>