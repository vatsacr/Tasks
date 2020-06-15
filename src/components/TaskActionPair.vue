<template>
  <div
    class="d-inline-block float-right text-center"
    v-if="status === 'Incompleted' && activeIndex === null"
  >
    <button class="edit-btn mr-2" @click="editTask(index)">
      <i class="fas fa-edit"></i>
    </button>
    <button class="remove-btn" @click="taskAction('Delete', task)">
      <i class="fas fa-trash"></i>
    </button>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
