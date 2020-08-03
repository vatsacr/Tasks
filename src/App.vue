<template>
  <div id="app" class="container">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <NewTask @addTask="receiveTask" @addOnEnter="addOnEnter" />
    <div class="row mt-5">
      <div class="col-xl-4 col-md-4 col-sm-4 col-12">
        <h2 class="mb-0 incompleted">Incomplete</h2>
        <TasksList
          :status="'Incomplete'"
          v-if="ifFound('Incomplete')"
          :tasks="tasks"
          @updatedTask="getUpdatedTasks"
        />
        <div class="todo-tasks p-3" v-else>No tasks to do...</div>
      </div>
      <div class="col-xl-4 col-md-4 col-sm-4 col-12">
        <h2 class="mb-0 completed">Complete</h2>
        <TasksList
          :status="'Completed'"
          v-if="ifFound('Completed')"
          :tasks="tasks"
          @updatedTask="getUpdatedTasks"
        />
        <div class="todo-tasks p-3" v-else>No tasks are completed...</div>
      </div>
      <div class="col-xl-4 col-md-4 col-sm-4 col-12">
        <h2 class="mb-0 removed">Removed</h2>
        <TasksList
          :status="'Removed'"
          v-if="ifFound('Removed')"
          :tasks="tasks"
          @updatedTask="getUpdatedTasks"
        />
        <div class="todo-tasks p-3" v-else>No tasks are removed...</div>
      </div>
    </div>
  </div>
</template>

<script>
import NewTask from "./components/NewTask.vue";
import TasksList from "./components/TasksList.vue";
import TaskService from "./services/TaskService";

export default {
  name: "App",
  data() {
    return {
      tasks: [],
    };
  },
  components: {
    NewTask,
    TasksList,
  },
  mounted() {
    this.getTasks();
  },
  computed: {},
  methods: {
    receiveTask(taskName) {
      TaskService.addTask(taskName)
        .then((response) => {
          if (response) {
            this.getTasks();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //this.tasks.push(taskName);
    },

    addOnEnter(taskName) {
      TaskService.addTask(taskName)
        .then((response) => {
          if (response) {
            this.getTasks();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ifFound(status) {
      return this.tasks.find((item) => item.status == status);
    },
    getTasks() {
      TaskService.fetchTasks()
        .then((response) => {
          this.tasks = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUpdatedTasks() {
      this.getTasks();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.completed {
  border-bottom: 3px solid #339900;
}
.incompleted {
  border-bottom: 3px solid #ffcc00;
}
.removed {
  border-bottom: 3px solid #cc3300;
}
</style>
