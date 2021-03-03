<template>
  <div class="list">
    <div class="list-tabs">
      <van-tabs @change="toogleTab"  v-model="activeName">
        <van-tab v-for="(item,index) in listData" :title="item.name" :key="index" :name="item.name">
          <div class="list-content">

            <!-- 歌单item -->

            <div class="list-item" v-for="(item,index) in playlistsData" :key="index" @click="selectRecommendId(item)">
              <div class="list-img">
                <img class="auto-img" :src="item.coverImgUrl">
              </div>
              <div class="list-desc two-text">{{item.name}}</div>
            </div>

          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',

    data() {
      return {
        activeName: '华语',
        listData: [],
        playlistsData: []
      }
    },

    computed: {
      // ...mapState(['currentAudio'])
    },

    created(){
      // 
      this.getListType();

      this.toogleTab();
    },

    methods: {

      // 获取歌单分类
      getListType(){
        this.axios({
          method: 'get',
          url: '/playlist/hot'
        })
        .then(result => {
          if(result.data.code == 200) {
            // 
            let data = result.data.tags;
            data.splice(7,1);
            this.listData = data;
           
          }
        })
      },

      // 根据歌单tab类型获取具体歌单
      toogleTab(){
        this.axios({
          method: 'get',
          url: '/top/playlist/highquality',
          // params: {
          //   cat: this.activeName
          // }
        })
        .then(result => {
          console.log(result)
          if(result.data.code == 200) {
            
            let data = result.data.playlists;
            this.playlistsData = data;
          }
        })
      },

      // 根据歌单id跳到歌单页面
      selectRecommendId(item) {
        let id = item.id;
        this.$router.push({path: '/musiclist/' + id});
      },

    }
  
  }
</script>

<style lang="less" scoped>
.list{
  margin-top: 50px;
  /deep/ .van-tabs__nav{
    background-color: black;
  }
  /deep/ .van-tab{
    color: #fff;
  }
  /deep/ .van-tab--active{
    color: #e6d68b;
  }
  /deep/ .van-tabs__line{
    background-color: #e6d68b;
  }


  .list-content{
    color: #fff;
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;

  }

  .list-item{
    background-color: #ccc;
    width: calc(~"100% / 3 - 10px + 10px/3");
    margin-right: 10px;
    margin-top: 10px;
    background-color: #333;
    &:nth-of-type(3n){
      margin-right: 0;
    }
  }

  .list-img{
    width: 100%;
    background-color: #ccc;
  }

  .list-desc{
    padding-top: 5px;
    height: 40px;
    font-size: 12px;
    // background-color: #e4393c;
  }
}

</style>

