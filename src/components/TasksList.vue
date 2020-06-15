<template>
  <div class="todo-tasks p-2">
    <div
      class="todo-list-item p-2"
      v-for="(task, index) in getTasks"
      :key="task.id"
    >
      <button
        @click="taskAction('Completed', task)"
        class="checkMark d-inline-block incompleted-mark"
        v-if="status === 'Incompleted'"
      >
        <i class="far fa-square"></i>
      </button>
      <button
        @click="taskAction('Incompleted', task)"
        v-if="status === 'Completed'"
        class="checkMark d-inline-block completed-mark"
      >
        <i class="fas fa-check-square"></i>
      </button>
      <button
        @click="taskAction('Removed', task)"
        v-if="status === 'Removed'"
        class="checkMark d-inline-block removed-mark"
      >
        <i class="fas fa-undo"></i>
      </button>
      <span
        v-if="!isTaskEditable(index)"
        class="align-middle task-name-space"
        >{{ task.name }}</span
      >
      <input v-else v-model="task.name" class="edit-task-field" />
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
      <div
        class="d-inline-block float-right text-center"
        v-if="status === 'Incompleted' && activeIndex === index"
      >
        <button
          class="edit-btn mr-2 completed-mark"
          @click="taskAction('Incompleted', task)"
        >
          <i class="fas fa-check"></i>
        </button>
        <button class="remove-btn" @click="activeIndex = null">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div
        class="d-inline-block float-right text-center"
        v-if="status === 'Completed'"
      >
        <button class="remove-btn" @click="taskAction('Delete', task)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TasksList",
  props: ["tasks", "status"],
  computed: {
    getTasks() {
      return this.tasks.filter((item) => item.status == this.status);
    },
  },
  data() {
    return {
      checked: false,
      activeIndex: null,
    };
  },
  methods: {
    editTask(index) {
      this.activeIndex = index;
    },
    taskAction(action, task) {
      if (action === "Removed") {
        task.status = task.previousStatus;
      } else if (action === "Delete") {
        task.previousStatus = task.status;
        task.status = "Removed";
      } else if (action === "Undo") {
        task.status = "Incompleted";
      } else {
        task.status = action;
      }
      this.$emit("taskAction", task);
    },
    isTaskEditable(index) {
      return this.activeIndex === index;
    },
  },
};
</script>
<style>
.todo-tasks {
  border: 1px solid #ededed;
  padding: 0.5em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.todo-list-item {
  text-align: left;
}

.task-name-space {
  display: inline-block;
  width: 55%;
  white-space: nowrap;
  overflow-x: auto;
}

.remove-btn {
  border: none;
  background: transparent;
  border-radius: 100%;
  font-size: 1.5em;
  color: #cc3300;
}

.edit-btn {
  border: none;
  background: transparent;
  border-radius: 100%;
  color: #66679a;
  font-size: 1.5em;
}

.undo-btn {
  border: none;
  background: transparent;
  border-radius: 100%;
  color: #ff9214;
  font-size: 1.5em;
}

.checkMark {
  vertical-align: sub;
  height: 0;
  padding: 0;
  border: none;
  font-size: 1.5em;
  background: transparent;
  margin-right: 0.5em;
}

.incompleted-mark {
  color: #ffcc00;
}

.completed-mark {
  color: #339900;
}

.removed-mark {
  color: #cc3300;
}

.align-sub {
  vertical-align: sub;
}

.edit-task-field {
  outline: none;
  padding: 0;
  height: 1.1em;
  border: none;
  border-bottom: 1px solid #66679a;
  display: inline-block;
  width: 55%;
  white-space: nowrap;
  overflow-x: scroll;
  transition: all 0.2s ease-in-out;
}

.edit-task-field:focus {
  height: 2em;
  border-bottom: 3px solid #66679a;
}

/* .todo-list:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
} */
</style>