<template>
  <div class="comment">
    <ul class="hot">
      <li v-for="h in hotcommentList" :key="h.commentId">
        <div class="inform">
          <img :src="h.user.avatarUrl" alt="" />
          <div class="informr">
            <div class="nameTime">
              <div class="left">
                <p>{{ h.user.nickname }}</p>
                <span>{{ h.time | formatDate }}</span>
              </div>
              <p class="like">{{ h.likedCount }} <span class="switch fa fa-thumbs-o-up"></span></p>
            </div>
            <div class="contents">
              {{ h.content }}
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="new">
      <li v-for="n in newcommentList" :key="n.commentId">
        <div class="inform">
          <img :src="n.user.avatarUrl" alt="" />
          <div class="informr">
            <div class="nameTime">
              <div class="left">
                <p>{{ n.user.nickname }}</p>
                <span>{{ n.time | formatDate }}</span>
              </div>
              <p class="like">{{ n.likedCount }} <span class="switch fa fa-thumbs-o-up"></span></p>
            </div>
            <div class="contents">
              {{ n.content }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["hotcommentList", "newcommentList"],
  filters: {
    formatDate(value) {
      let d = new Date(value);
      let year = d.getFullYear();
      let m = d.getMonth() + 1;
      let day = d.getDate();
      m = m < 10 ? "0" + m : m;
      day = day < 10 ? "0" + day : day;
      return year + "年" + m + "月" + day + "日";
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  li {
    margin-top: 10px;
    border-bottom: 1px solid #ddd;
    .inform {
      display: flex;
      justify-content: space-between;
      padding: 5px;
      img {
        display: block;
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
      .informr {
        margin-left: 10px;

        flex: 1;
        justify-content: space-between;
        div.nameTime {
          display: flex;
          justify-content: space-between;
          .left {
            text-align: left;
            p {
            }
          }
          span {
            font-size: 13px;
            color: #b4aeaa;
          }
          p.like {
            color: #b4aeaa;
            font-size: 11px;
          }
        }
      }
    }
    .contents {
      position: relative;
      color: #333;
      font-size: 15px;
      line-height: 22px;
      margin-top: 5px;
      text-align: left;
    }
  }
}
</style>