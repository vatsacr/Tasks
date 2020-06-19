<template>
  <div class="todo-tasks p-2">
    <div class="todo-list-item p-2" v-for="(task, index) in getTasks" :key="task.id">
      <TaskTypeButton
        :status="'Completed'"
        :task="task"
        :type="'incompleted-mark'"
        :taskType="'far fa-square'"
        v-if="status === 'Incompleted'"
      />
      <TaskTypeButton
        :task="task"
        :status="'Undo'"
        :type="'completed-mark'"
        :taskType="'fas fa-check-square'"
        v-if="status === 'Completed'"
      />
      <TaskTypeButton
        :status="'Removed'"
        :task="task"
        :type="'removed-mark'"
        :taskType="'fas fa-undo'"
        v-if="status === 'Removed'"
      />
      <span v-if="!isTaskEditable(index)" class="align-middle task-name-space">{{ task.name }}</span>
      <input v-else v-model="task.name" class="edit-task-field" @keyup.enter="taskNameChanged" />
      <TaskActionButton
        v-if="status === 'Incompleted' && activeIndex !== index"
        :task="task"
        :index="index"
        @doAction="doAction"
        :buttons="[{type:'fas fa-edit',classStyle:'edit-btn mr-2',actionType: 'edit'},{type:'fas fa-trash',classStyle:'remove-btn',actionType:'delete'}]"
      />
      <TaskActionButton
        v-if="status === 'Incompleted' && activeIndex === index"
        :task="task"
        @doAction="doAction"
        :buttons="[{type:'fas fa-check',classStyle:'edit-btn mr-2 completed-mark',actionType: 'done'},{type:'fas fa-times',classStyle:'remove-btn',actionType:'cancel'}]"
      />
      <TaskActionButton
        v-if="status === 'Completed'"
        :task="task"
        :buttons="[{type:'fas fa-trash',classStyle:'remove-btn',actionType:'delete'}]"
      />
    </div>
  </div>
</template>
<script>
import TaskTypeButton from "./TaskTypeButton.vue";
import TaskActionButton from "./TaskActionButton.vue";
export default {
  name: "TasksList",
  props: ["tasks", "status"],
  components: { TaskTypeButton, TaskActionButton },
  computed: {
    getTasks() {
      return this.tasks.filter(item => item.status == this.status);
    }
  },
  data() {
    return {
      checked: false,
      activeIndex: null
    };
  },
  methods: {
    editTask(index) {
      this.activeIndex = index;
    },
    isTaskEditable(index) {
      return this.activeIndex === index;
    },
    doAction(task) {
      this.activeIndex = task.index;
    },
    taskNameChanged() {
      this.activeIndex = null;
    }
  }
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
  padding: 0 1em;
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
  padding: 0 1em;
  border: none;
  display: inline-block;
  width: 55%;
  white-space: nowrap;
  overflow-x: scroll;
  transition: all 0.2s ease-in-out;
}

.edit-task-field:after {
  transform: scale(0, 1);
  transform-origin: 0% 100%;
  transition: transform 0.35s;
}

.edit-task-field:focus {
  border: 1px solid #66679a;
}

.check-delete-button {
  display: inline-block;
}

/* .todo-list:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
} */
</style>
