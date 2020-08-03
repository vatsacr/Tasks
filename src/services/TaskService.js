import Api from "@/services/Api";

export default {
  fetchTasks() {
    return Api().get("Tasks");
  },

  addTask(params) {
    return Api().post("tasks/", params);
  },

  updateTask(params) {
    return Api().put("tasks/" + params._id, params);
  },

  getTask(params) {
    return Api().get("task/" + params.id);
  },

  deleteTask(id) {
    return Api().delete("tasks/" + id);
  },
};
