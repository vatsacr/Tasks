<template>
  <div class="d-inline-block float-right text-center">
    <button class="edit-btn mr-2">
      <i :class="actionType[0]"></i>
    </button>
    <button class="remove-btn">
      <i :class="actionType[1]"></i>
    </button>
  </div>
</template>
<script>
export default {
  props:["actionType"],
};
</script>
<style></style>
