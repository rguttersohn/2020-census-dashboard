<template>
  <div class="tooltip"></div>
</template>

<script>
export default {
};
</script>

<style scoped>
.tooltip {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  color: #0099cd;
  font-family: "helvetica", sans-serif;
  line-height: 150%;
  font-weight: bold;
  background-color:white;
  padding: 1%;
  border: 1px solid #60bcda;
  border-radius: 15px;
  width: 200px;
  transition: opacity 0.3s ease-in-out;
}
</style>