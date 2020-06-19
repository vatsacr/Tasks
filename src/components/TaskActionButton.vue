<template>
  <div class="d-inline-block">
    <button
      :class="button.classStyle"
      v-for="button in buttons"
      :key="button.type"
      @click="sendAction(button.actionType,task)"
    >
      <i :class="button.type"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ["buttons", "task", "index"],
  methods: {
    sendAction(action, task) {
      if (action === "edit") {
        this.$emit("doAction", { type: action, task: task, index: this.index });
      } else if (action === "cancel" || action === "done") {
        this.$emit("doAction", { type: action, task: task, index: null });
      } else {
        task.previousStatus = task.status;
        task.status = "Removed";
      }
    }
  }
};
</script>

<style>
</style>