<template>
<div>
  <ul class="newMusicList">
    <ListItem v-for="item in newMusicList" :item="item" :key="item.id"></ListItem>
  </ul>
  <Loading v-if="newMusicList.length<=0"/>
</div>
</template>
<script>
import Loading from './Loading'
import ListItem from './ListItem'
export default {
  name:"MusicItem",

  props:{
    newMusicList:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  components:{
    Loading,
    ListItem
  }
}
</script>
<style lang="less" scoped>
.newMusicList{
  
}
</style>