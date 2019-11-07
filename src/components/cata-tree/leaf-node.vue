<template>
  <div data-type="select">
    <span v-for="(i, index) in tempArr" :key="index" class="live-cata-tree-indent"></span>
    <i data-type="toggle" :class="{ 'clickable': clickable }"></i>
    <span><slot></slot></span>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    tempArr() {
      return new Array(this.level);
    },
    clickable() {
      return (this.item.nodes || []).length > 0;
    }
  }
};
</script>
