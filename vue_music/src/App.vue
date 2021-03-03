<template>
  <div id="app">
    <TopNav></TopNav>
    <div>
      <keep-alive>
        <router-view @updataend="updataend"/>
      </keep-alive>
    </div>
    <div class="playList">
      <Play  :musicID="$root.playingMusic.musicID"></Play>
    </div>
  </div>
</template>

<script>
import TopNav from "./components/TopNav";
import Play from "./components/Play";
export default {
  components: {
    TopNav,
    Play,
  },
  methods: {
    updataend(n){
      console.log(n)
    },
    playMusic(id) {
      this.musicID = id;
    },
  },
};
</script>

<style>
body {
    font-family: 'microsoft yahei', 'Helvetica', simhei, simsun, sans-serif;
    background-color: #F7F7F7;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* .playList{
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 20px;
} */
</style>
