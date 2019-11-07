<template>
  <div class="c-tabs">
    <span
      class="c-tabs-pane"
      v-for="(tab,index) in tabs"
      @click="handleClick(index)"
      :class="{ active: index === tabIndex }"
      :data-tabindex="index"
      :key="tab.value">{{tab.name}}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 当前 Tab 的索引
    currentTabIndex: {
      type: Number,
      default: null
    },
    // tabs 内容, 对象数组，tab 应以{ name: 'xxx', value: 'xxx' }的形式给出
    tabs: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      tabIndex: 0
    };
  },

  created() {
    this.tabIndex = this.currentTabIndex || 0;
  },

  methods: {
    // 切换 tab 时触发
    handleClick(index) {
      this.tabIndex = index;
      this.$emit('tabClick', index);
      // this.$emit('update:currentTabIndex', newVal);
    }
  }
};

</script>

<style lang="scss">
.c-tabs{
  border-bottom: 1px solid #d4d6de;
  &-pane{
    display: inline-block;
    color: #263238;
    font-size: 12px;
    cursor: pointer;
    padding: 20px 26px;
    &.active{
      color: $color;
      padding: 20px 26px 19px;
      border-bottom: 2px solid $color;
    }
  }
}

</style>
