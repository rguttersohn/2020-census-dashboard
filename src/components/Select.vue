<template>
  <div class="select-form-wrapper">
    <select @change="handleStateClick">
      <option v-for="state in allStates[0]" :key="state[5]" :value="state[5]">{{state[0]}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    allStates: Array
  },
  methods: {
    handleStateClick() {
      console.log(event.target)
      this.$emit("select-event", event.target);
    }
  }
};
</script>

<style scoped>
.select-form-wrapper {
  min-height: 100px;
}
</style>