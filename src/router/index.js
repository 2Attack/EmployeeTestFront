import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/employees",
    name: "employeesAll",
    alias: "/",
    component: () =>
      import(
        /* webpackChunkName: "employeesIndex" */ "../views/pages/employees/index.vue"
      )
  },
  {
    path: "/employees/create",
    name: "employeesCreate",
    component: () =>
      import(
        /* webpackChunkName: "employeesCreate" */ "../views/pages/employees/create.vue"
      )
  },
  {
    path: "/employees/:employeeId/edit",
    name: "employeesEdit",
    component: () =>
      import(
        /* webpackChunkName: "employeesEdit" */ "../views/pages/employees/edit.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
