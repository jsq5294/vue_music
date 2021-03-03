<template>
  <div class="search">
    <div class="find">
      <i></i>
      <form @submit.stop.prevent="searchList(inputVal)">
        <input
          v-model="inputVal"
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          value=""
          @input="search(inputVal)"
        />
      </form>
      <i @click="clear"></i>
    </div>
    <Suggest
      v-show="showSearch"
      :suggests="suggests"
      :inputVal="inputVal"
      @searchResult="searchList"
    ></Suggest>
    <Loading v-show="suggestsearch" />
    <SearchResult
      v-show="showList"
      :detailedartist="detailedartist"
      :searchMusicList="searchMusicList"
    />
    <Loading v-show="another"></Loading>
    <div class="hotsearch" v-show="searching">
      <p>热门搜索</p>
      <button v-for="(s, k) in butList" :key="k" @click="butadd">
        {{ s.first }}
      </button>
    </div>
    <div class="historySearch" v-show="searching">
      <History
        :suggests="historyList"
        :inputVal="inputVal"
        @searchResult="searchList"
      ></History>
    </div>
  </div>
</template>

<script>
import Suggest from "../components/Suggest";
import Loading from "../components/Loading";
import History from "../components/History";
import SearchResult from "../components/SearchResult";
export default {
  data() {
    return {
      butList: [],
      searchMusicList: [],
      suggests: [],
      historyList: [],
      detailedartist: {}, //歌手信息
      inputVal: "",
      searching: true,
      showSearch: false, //搜索结果显示
      suggestsearch: false, //加载显示
      showList: false, //搜索完成 跳转的页面显示
      another: false,
    };
  },
  components: {
    Suggest,
    Loading,
    SearchResult,
    History,
  },
  watch: {
    // inputVal(val) {
    //   this.suggests = [];
    //   if (val == "") {
    //     this.suggestsearch = false
    //     this.showSearch = false,
    //     this.searching = true;
    //   } else {
    //     this.searching = false;
    //     this.suggestsearch = true
    //     this.$http
    //       .get("/search/suggest?keywords=" + val + "&type=mobile")
    //       .then((data) => {
    //         if (data.data.code == 200) {
    //           this.suggests = data.data.result.allMatch;
    //           this.showSearch = true;
    //           this.suggestsearch = false
    //         }
    //       });
    //   }
    // },
  },
  methods: {
    butadd(e) {
      this.searchList(e.target.innerText);
    },
    clear() {
      this.inputVal = "";
      this.suggestsearch = false;
      this.showSearch = false;
      this.searching = true;
      this.showList = false;
    },
    searchList(inputVal) {
      this.inputVal = inputVal;
      this.showList = false;
      this.searching = false;
      this.showSearch = false;
      this.another = true;

      this.axios.get("/search/multimatch?keywords=" + inputVal).then((data) => {
        //根据关键词得到搜索结果.
        console.log(data);
        if (data.data.code == 200) {
          this.historyList.unshift(inputVal);
          this.historyList = [...new Set(this.historyList)]
          console.log(this.historyList)
          this.another = false;
          let artist = data.data.result.artist;
          let album = data.data.result.album;
          this.detailedartist = {
            artist: artist,
            album: album,
            // pic:artist[0].picUrl,
            // occupation:artist[0].occupation,
            // name:album.artist.name,
            // yname:artist[0].alias[0],
            // alpic:album.picUrl,
            // type:album.type,
            // alname:album.name
          };
        }
      });
      setTimeout(() => {
        this.axios.get("/search?keywords=" + inputVal).then((data) => {
          //根据关键词得到搜索结果.
          if (data.data.code == 200) {
            this.another = false;
            this.showList = true;
            this.showSearch = false;
            this.searchMusicList = data.data.result.songs;
            this.$root.playingMusic.newMusicList = this.searchMusicList;
          }
        });
      }, 500);
    },
    search(val) {
      this.suggests = [];
      this.showList = false;

      setTimeout(() => {
        if (val == "") {
          this.suggestsearch = false;
          this.showSearch = false;
          this.searching = true;
        } else {
          this.searching = false;
          this.suggestsearch = true;
          this.$http
            .get("/search/suggest?keywords=" + val + "&type=mobile")
            .then((data) => {
              if (data.data.code == 200) {
                this.suggests = data.data.result.allMatch;
                this.showSearch = true;
                this.suggestsearch = false;
              }
            });
        }
      }, 300);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$http("/search/hot").then((data) => {
        if (data.data.code == 200) {
          vm.butList = data.data.result.hots;
        }
      });
    });
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-top: 50px;
  overflow: hidden;
  div.find {
    display: flex;
    margin: 10px;
    padding: 5px 10px;
    background: #ebecec;
    border-radius: 20px;
    align-items: center;
    span {
      display: inline-block;
      position: absolute;
      left: 5.2%;
      top: 8px;
      background: url("../assets/title1.png") no-repeat -10px -108px;
      width: 13px;
      height: 14px;
    }
    form {
      flex: 1;
      input {
        width: 100%;
        border: none;
        outline: none;
        background-color: #ebecec;
      }
    }

    i {
      display: inline-block;
      width: 13px;
      height: 13px;
      &:first-of-type {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
      }
      &:last-of-type {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
      }
    }
  }

  .hotsearch {
    padding-left: 10px;
    margin-top: 10px;
    text-align: left;
    p {
      text-align: left;
      font-size: 13px;
    }
    button {
      background-color: white;
      border: 1px solid #ddd;
      outline: none;
      border-radius: 20px;
      margin-left: 0;
      margin-right: 10px;
      padding: 5px 15px;
      margin-top: 10px;
    }
  }
}
</style>