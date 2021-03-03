<template>
  <div class="rank">
    <div class="logo" @click="goBack">
      <van-icon name="arrow-left" size="20px" />返回
    </div>
    <div class="rank-box">
      <!-- 官方榜 -->
      <div class="office-rank">
        <div class="title">官方榜</div>
        <div class="rank-item" v-for="(item, index) in toplist" :key="index">
          <div class="rank-img">
            <img :src="item.coverImgUrl" class="auto-img" />
          </div>
          <div class="rank-info">
            <div
              class="one-text"
              v-for="(v, k) in item.tracks"
              :key="k"
              @click="getTopListDetail(item)"
            >
              {{ v.first }} - {{ v.second }}
            </div>
          </div>
        </div>
      </div>
      <!-- 特色榜 -->
      <div class="feature-rank">
        <div class="title">特色榜</div>
        <div class="feature-rank-box">
          <div
            class="feature-item"
            v-for="(item, index) in featureList"
            :key="index"
            @click="getTopListDetail(item)"
          >
            <div class="feature-img">
              <img class="auto-img" :src="item.coverImgUrl" />
            </div>
            <div class="feature-info">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rank",

  data() {
    return {
      toplist: [],
      featureList: [],
    };
  },

  created() {
    this.getTopList();
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getTopList() {
      this.axios({
        method: "get",
        url: "/toplist/detail",
      }).then((result) => {
        if (result.data.code == 200) {
          this.toplist = result.data.list.slice(0, 4);
          this.featureList = result.data.list.slice(4, 10);
        }
      });
    },

    // 获取榜单详情数据
    getTopListDetail(item) {
      let id = item.id;
      this.$router.push({ path: "/musiclist/" + id });
      // this.$router.push({
      //   name: "MusicList",
      //   params: { id: item.id },
      //   query: { isTopType: item.ToplistType },
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.rank {
  // background: #3c3c3c;
  color: #3c3c3c;
  margin-bottom: 50px;
  .logo{
    display: flex;
    align-items: center;
  }
  .rank-box {
    padding: 10px;
  }
  .office-rank {
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .rank-item {
      margin-top: 10px;
      height: 90px;
      display: flex;
      .rank-img {
        width: 90px;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
      }
      .rank-info {
        width: calc(~"100% - 110px");
        height: 100%;
        margin-left: 10px;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        > div {
          // background-color: silver;
          padding: 4px 0;
          box-sizing: border-box;
          font-size: 12px;
          color: #3c3c3c;
        }
      }
    }
  }

  .feature-rank {
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .feature-rank-box {
      display: flex;
      flex-wrap: wrap;
    }

    .feature-item {
      width: calc(~"100% / 3 - 10px + 10px/3");
      margin-top: 10px;
      margin-right: 10px;

      &:nth-of-type(3n) {
        margin-right: 0;
      }

      .feature-img {
        width: 100%;
        background-color: #999;
      }
      .feature-info {
        padding-top: 5px;
        transform-origin: left;
        font-size: 12px;
        display: inline-block;
        transform: scale(0.9);
      }
    }
  }
}
</style>
