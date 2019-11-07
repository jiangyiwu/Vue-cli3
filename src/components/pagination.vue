<template>
  <section v-if="total > 0" class="live-pagination">
    <button type="button" @click="toPrevPage">&lt;</button>
    <ul @click="onPagerClick">
      <li :class="{'pagination-avtive': page === 1}">1</li>
      <li class="pagination-ellipsis" v-if="showPrevEllipsis" data-type="ellipsis">...</li>
      <li
        v-for="(item, index) in pagers"
        :key="index"
        :class="{'pagination-avtive': page === item}"
      >{{item}}</li>
      <li class="pagination-ellipsis" v-if="showNextEllipsis" data-type="ellipsis">...</li>
      <li :class="{'pagination-avtive': page === total}" v-if="total > 1">{{total}}</li>
    </ul>
    <button type="button" @click="toNextPage">&gt;</button>
    <select class="form-control" v-model='limit' v-if="limitOptions.length > 0">
      <option v-for="(item, index) in limitOptions" :key="index" :value="item">{{ item }}条/页</option>
    </select>
    <div class="live-pagination-right" v-if="!hideControl">
      共 <span>{{ total }}</span> 页，
      跳到：
      <input
        type="text"
        autocomplete="off"
        validateevent="true"
        v-model="jumpPage"
        @keyup="jumpKeyup"
        v-limitNaturalNumber />
      页
      <button type="button" @click="goToSetPage">前往</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      page: this.currentPage,
      jumpPage: this.currentPage,
      limit: this.limitOptions[0]
    };
  },

  props: {
    total: Number,
    currentPage: Number,
    hideControl: {
      type: Boolean,
      default: false
    },
    limitOptions: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    page(val, oldVal) {
      val = parseInt(`${val}`, 10);
      let page = val;
      if (val < 1 || val > this.total) {
        page = parseInt(`${oldVal}`, 10);
      }
      this.page = isNaN(page) ? '' : page;
      this.jumpPage = this.page;
    },

    limit(val) {
      this.$emit('limitChange', val);
    }
  },

  computed: {
    showPrevEllipsis() {
      return this.page > 5 && this.total > 7;
    },

    showNextEllipsis() {
      const { page, total } = this;
      return (page === 5 && total === 8) || (page < (total - 3) && total > 7);
    },

    pagers() {
      const page = this.page;
      const total = this.total;
      if (total === 0) return [];
      let ary = [1, 2, 3, 4, 5];
      if (total < 7 && total > 1) {
        ary = ary.slice(0, total - 2);
      }
      if (total === 1) {
        ary = [];
      }
      if (page < 6 || total === 6) {
        ary = ary.map(item => item + 1);
      } else if (page >= total - 2) {
        ary = ary.map(item => (item + total) - 6);
      } else {
        ary = ary.map(item => (item + page) - 3);
      }
      return ary;
    }
  },

  methods: {
    onPagerClick(event) {
      const target = event.target;
      if (target.tagName === 'UL' || target.getAttribute('data-type') === 'ellipsis') return;
      const toPage = target.textContent / 1;
      if (toPage !== this.page) {
        this.triggerPageChange(toPage);
      }
    },

    toPrevPage() {
      if (this.page > 1) {
        this.triggerPageChange(this.page - 1);
      }
    },

    toNextPage() {
      if (this.page < this.total) {
        this.triggerPageChange(this.page + 1);
      }
    },

    triggerPageChange(toPage) {
      this.page = toPage;
      this.$emit('currentChange', parseInt(toPage, 10));
    },

    goToSetPage() {
      const page = this.page;
      if (!page || page < 1 || page > this.total) return;
      this.triggerPageChange(page);
    },

    jumpKeyup() {
      this.debonce(() => {
        if (!this.jumpPage) return;
        this.triggerPageChange(this.jumpPage);
      })();
    },

    debonce(fn, time = 500) {
      let timer = null;
      return function() {
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
          timer = null;
        }, time);
      };
    }
  }
};
</script>

<style lang="scss">
$pcolor: #cad2e1;

.live-pagination {
  text-align: center;
  line-height: 30px;
  color: #546e7a;
  white-space: nowrap;

  >select {
    margin-left: 15px;
    display: inline-block;
    width: auto;
    height: 32px;
    line-height: 30px;
    vertical-align: top;
  }

  button {
    display: inline-block;
    background: #fff;
    outline: none;
    border: 1px solid $pcolor;
    border-radius: 4px;
    line-height: 30px;
    padding: 0;
    vertical-align: top;
    cursor: pointer;
  }

  >button {
    width: 32px;
  }

  >ul {
    display: inline-block;
    user-select: none;
    font-size: 0;

    >li {
      margin: 0 5px;
      background: #fff;
      display: inline-block;
      min-width: 32px;
      font-size: 14px;
      border: 1px solid $pcolor;
      cursor: pointer;
      border-radius: 4px;


      &:hover {
        border-color: $color;
        color: $color;
        background-color: lighten($color, 40%);
      }

      &.pagination-ellipsis {
        margin: 0;
        border: 0;
        background: none;
        cursor: default;
        &:hover {
          background-color: none;
        }
      }

      &.pagination-avtive {
        background-color: $color;
        border-color: $color;
        color: #fff;
      }
    }
  }
}

.live-pagination-right {
  font-size: 14px;
  padding-left: 15px;
  display: inline-block;

  >span {
    color: $red;
  }

  >input {
    margin-right: 5px;
    width: 3em;
    height: 32px;
    border: 1px solid $pcolor;
    border-radius: 4px;
    text-align: center;
    -webkit-appearance: none !important;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
    }
  }

  >button {
    padding: 0 10px;
    margin-left: 15px;
    border-color: $color;
    color: $color;

    &:hover {
      background-color: lighten($color, 40%);
    }
  }
}
</style>
