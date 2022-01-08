<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.card {
  border-top: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  background-color: transparent;
  color: whitesmoke;
  box-shadow: 7px 5px 18px 10px rgba(0, 0, 0, 0.75);
}
</style>
