<template>
  <div>
    <input
      @keyup.enter="pressedEnter"
      v-model="taskName"
      class="new-task-field conjoined-right"
      placeholder="Mow the lawn"
    />
    <ActionButton
      :taskName="taskName"
      :isDisabled="isDisabled"
      @emitTaskName="receiveTask"
      class="conjoined-left"
    />
  </div>
</template>

<script>
import ActionButton from "./ActionButton.vue";
export default {
  name: "NewTask",
  components: { ActionButton },
  data() {
    return {
      taskName: "",
      idGen: 0,
    };
  },
  computed: {
    isDisabled() {
      return Boolean(this.taskName);
    },
  },
  methods: {
    receiveTask(taskName) {
      this.$emit("addTask", taskName);
      this.taskName = "";
    },

    pressedEnter() {
      this.idGen = this.idGen + 1;
      this.$emit("addOnEnter", {
        id: this.idGen,
        name: this.taskName,
        status: "Incompleted",
      });
      this.taskName = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-task-field {
  border: 1px solid #ededed;
  padding: 0.5em;
  display: inline-block;
  transition: border 0.2s ease-in-out;
}

.new-task-field:focus {
  outline: none;
  border: 1px solid #66679a;
}

.conjoined-left {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.conjoined-right {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
