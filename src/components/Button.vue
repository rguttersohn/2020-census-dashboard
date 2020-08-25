<template>
  <div>
    <button
      @click="handleStateClick"
      v-for="state in states[0]"
      :key="state[1]"
      :data-key="state[1]"
    >{{state[0]}}</button>
  </div>
</template>

<script>
export default {
  props: {
    states: Array
  },
  methods: {
    handleStateClick(event) {
      this.$emit("button-event", event.target);
    }
  }
};
</script>

<style scoped>
</style>