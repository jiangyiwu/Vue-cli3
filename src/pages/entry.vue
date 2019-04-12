<template>
  <div>
    {{ hello }}
  </div>
</template>
<script>

export default {
  computed: {
    hello() {
      return this.$store.state.hello.helloWorld;
    }
  },

  mounted() {
    this.$store.dispatch('updateHello', 'Hello World');
  }
};
</script>
