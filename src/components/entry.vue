<template>
  <div class="p-home-container">
    <div class="container">
      <!-- {{ hello }} -->
      <Tab :tabs="tabAry" @tabClick="tabClick"/>
      <div class="p-list">
        <Pagination
          v-if="currentTab === 'pagination'"
          @currentChange="currentChange"
          :total="Number(20)"
          :currentPage="Number(1)" />
        <CataTree
          v-if="currentTab === 'cata-tree'"
          :items="TreeData" />
      </div>
    </div>
  </div>
</template>
<script>
import Tab from './tab';
import Pagination from './pagination';
import CataTree from './cata-tree/';
import TreeData from './test-tree-data';
export default {
  components: { Tab, Pagination, CataTree },

  data() {
    return {
      tabAry: [
        {
          name: '分页',
          value: 'pagination'
        },
        {
          name: '目录树',
          value: 'cata-tree'
        },
        {
          name: 'radio',
          value: 'radio'
        }
      ],
      currentTabIndex: 0,
      currentTab: 'pagination',
      TreeData
    };
  },

  computed: {
    hello() {
      return this.$store.state.hello.helloWorld;
    }
  },

  mounted() {
    this.$store.dispatch('updateHello', 'Hello World');
  },

  methods: {
    tabClick(val) {
      console.info(this.tabAry[val].value, 'val');
      this.currentTabIndex = val;
      this.currentTab = this.tabAry[val].value;
    },
    currentChange(val) {
      console.info(val, 'val');
    }
  }
};
</script>

<style lang="scss">
.p-home-container {
  min-height: 100%;
  position: relative;
  text-align: center;
  @include linear(#e8ebf5, #ffffff);
}

.p-list {
  padding-top: 40px;
}
</style>
