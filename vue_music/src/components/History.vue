<template>
  <div class="history">
    <p>历史搜索记录</p>
    <div class="list-group">
      <div
        class="list-box"
        v-for="(s,k) in suggests"
        :key="k"
        @click="$emit('searchResult', s)"
      >
        <i></i>
        <a href="javascript:void(0)" class="list-group-item">
          {{ s }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    suggests: {
      type: Array,
      default: function () {
        return [];
      },
    },
    inputVal: String,
  },
};
</script>

<style lang="less" scoped>
.history {
  text-align: left;
  padding-left: 10px;
  p {
    font-size: 12px;
    height: 50px;
    line-height: 50px;
  }
  .list-group {
    display: flex;
    flex-direction: column;
    color: black;
    .list-box {
      display: flex;
      align-items: center;
      i {
        display: inline-block;
        margin-top: 3px;
        width: 13px;
        height: 13px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
      }
      .list-group-item {
        margin-left: 10px;
        flex: 1;
        color: black;
        text-decoration: none;
        height: 44px;
        border-bottom: 1px solid #ddd;
        line-height: 44px;
        font-size: 15px;
      }
    }
  }
}
</style>