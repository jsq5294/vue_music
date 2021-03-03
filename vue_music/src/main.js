import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import {
  Icon,
  Swipe,
  SwipeItem,
  Slider,
  NavBar,
  Circle,
  Popup,
  Collapse,
  CollapseItem,
  Toast,
  Search,
  List,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Empty
} from 'vant';

Vue
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Slider)
  .use(NavBar)
  .use(Circle)
  .use(Popup)
  .use(Collapse)
  .use(CollapseItem)
  .use(Toast)
  .use(Search)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(Cell)
  .use(CellGroup)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Empty)

Vue.config.productionTip = false
let playingMusic = {//定义一个对象 存储全局数据 存储音乐ID 
  musicID: 0,
  newMusicList: [],
  isPlay: true,
  playList: []
}
new Vue({
  router,
  data: {
    playingMusic
  },
  render: h => h(App)
}).$mount('#app')
