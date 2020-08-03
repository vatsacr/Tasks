<template>
  <button @click="taskAction(status, task)" class="checkMark d-inline-block" :class="type">
    <i :class="taskType"></i>
  </button>
</template>
<script>
export default {
  props: ["task", "status", "taskType", "type"],
  methods: {
    taskAction(action, task) {
      if (action === "Removed") {
        task.status = task.previousStatus;
      } else if (action === "Delete") {
        task.previousStatus = task.status;
        task.status = "Removed";
      } else if (action === "Undo") {
        task.status = "Incomplete";
      } else {
        task.status = action;
      }
    }
  }
};
</script>
