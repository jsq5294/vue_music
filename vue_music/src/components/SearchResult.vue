<template>
  <div style="margin-bottom:30px">
    <div class="detailed" v-if="typeof detailedartist.artist != 'undefined' || typeof detailedartist.album != 'undefined'">
      <p>最佳匹配</p>
      <ul>
        <li class="artist" v-if="typeof detailedartist.artist != 'undefined'">
          <img :src="detailedartist.artist[0].picUrl" alt="" />
          <p class="note">
            {{ detailedartist.artist[0].occupation }} :
            {{ detailedartist.artist[0].name }}({{
              detailedartist.artist[0].alias[0]
            }})
          </p>
          <div class="right">></div>
        </li>
        <router-link :to="{name:'MusicList',params:{musicid:detailedartist.album[0].id}}" tag="li" class="album"  v-if="typeof detailedartist.album != 'undefined'">
          <img :src="detailedartist.album[0].picUrl" alt="" />
          <p class="note">
            {{ detailedartist.album[0].type }} :
            {{ detailedartist.album[0].name }}
          </p>
          <div class="right">></div>
        </router-link>
      </ul>
    </div>

    <ul class="searchMusic">
      <ListItem v-for="sm in searchMusicList" :key="sm.id" :item="sm"></ListItem>
      <!-- <li v-for="sm in searchMusicList" :key="sm.id" :item="sm">
        <div class="left">
          <div>{{ sm.name }}</div>
          <p>
            <span></span>{{ sm.artists | formcheck }} -
            {{ sm.name }}
          </p>
        </div>
        <div class="right">
          <router-link to="/" tag="span"></router-link>
        </div>
      </li> -->
    </ul>
    <p>全部加载完啦!!</p>
  </div>
</template>
<script>
import ListItem from './ListItem'
export default {
  props: ["detailedartist", "searchMusicList"],
  components: {
    ListItem
  },
  methods:{
    playMusic(){
      this.$root.playingMusic.musicID = this.detailedartist.id;
    }
  }
  
};
</script>
<style lang="less" scoped>

.detailed {
  text-align: left;
  p {
    font-size: 12px;
    padding-left: 10px;
  }
  ul {
    padding: 0px 10px;
    li {
      margin-top: 10px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      img {
        width: 60px;
      }
      p.note {
        font-size: 17px;
      }
    }
  }

  .right {
    flex: 1;
    text-align: right;
    display: inline-block;
    padding-right: 10px;
    color: #9b9b9b;
  }
}

ul.searchMusic {
  li {
    display: flex;
    margin-top: 10px;
    padding-left: 10px;
    div.left {
      flex: 1;
      overflow: hidden;
      text-align: left;
      border-bottom: 1px solid #ddd;
      div {
        font-size: 17px;
        color: black;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        font-size: 12px;
        color: #888;
        padding: 5px 0px;
        // display: flex;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          display: inline-block;
          width: 20px;
          height: 12px;
          background: url("../assets/index_icon_2x.png") no-repeat 0px 4px/210px;
        }
      }
    }
    div.right {
      width: 40px;
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
}
</style>