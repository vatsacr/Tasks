<template>
  <button
    @click="addTask"
    class="todo-button todo-primary"
    :disabled="!isDisabled"
  >
    Add
  </button>
</template>

<script>
export default {
  name: "AddTaskButton",
  props: ["isDisabled", "taskName"],
  data() {
    return {
      tempObject: { id: 0, name: "", status: "Incomplete" },
    };
  },
  methods: {
    addTask() {
      this.tempObject.name = this.taskName;
      //this.tempObject.id = this.tempObject.id + 1;
      //this.tempObject.status = "Incomplete";
      this.$emit("emitTaskName", this.tempObject);
      //this.tempObject = { id: this.tempObject.id };
    },
  },
};
</script>
<style scoped>
.todo-button {
  padding: 0.5em;
  border: 1px solid #66679a;
  border-radius: 3px;
  opacity: 1;
  transition: all 0.5s ease-in-out;
}
.todo-primary {
  background: #66679a;
  color: #ffffff;
}
.todo-button:disabled {
  opacity: 0.7;
}
</style>
