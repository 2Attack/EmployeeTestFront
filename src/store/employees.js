import * as Filters from "@/helpers/filters";

import axios from "axios";

export const state = () => ({
  employees: [],
  filteredEmployees: [],
  employee: {},
  loadingStatus: false,
  filter: {
    role: "all",
    isArchive: false
  }
});

export const getters = {
  getAllEmployees(state) {
    return state.employees;
  },
  getEmployee(state) {
    return state.employee;
  },
  getLoadingStatus(state) {
    return state.loadingStatus;
  },
  getFilteredEmployees(state) {
    return state.filteredEmployees;
  }
};

export const mutations = {
  SET_LOADING_STATUS(state, newStatus) {
    state.loadingStatus = newStatus;
  },
  SET_EMPLOYEES(state, employeesData) {
    state.employees = employeesData;
  },
  SET_EMPLOYEE(state, employee) {
    state.employee = employee;
  },
  SET_FILTERED_EMPLOYEES(state, employeesData) {
    state.filteredEmployees = employeesData;
  },
  SET_FILTER_IS_ARCHIVE(state, isArchive) {
    state.filter.isArchive = isArchive;
  },
  SET_FILTER_ROLE(state, role) {
    state.filter.role = role;
  },
  FILTER_EMPLOYEES(state) {
    const employees = [...state.employees];
    state.filteredEmployees = Filters.filterEmployees(state.filter, employees);
  }
};

export const actions = {
  async fetchAllEmployees({ commit }) {
    try {
      commit("SET_LOADING_STATUS", true);
      const { data } = await axios.get("/api/employees");
      commit("SET_EMPLOYEES", data.employees);
      commit("SET_FILTERED_EMPLOYEES", data.employees);
    } catch (error) {
      console.log(error);
      throw "Ошибка, невозможно загрузить сотрудников";
    } finally {
      commit("SET_LOADING_STATUS", false);
    }
  },
  async fetchEmployee({ commit }, employeeId) {
    try {
      commit("SET_LOADING_STATUS", true);
      const { data } = await axios.get(`/api/employees/${employeeId}`);
      await commit("SET_EMPLOYEE", data.employee);
    } catch (error) {
      console.log(error);
      throw "Ошибка, невозможно загрузить сотрудника";
    } finally {
      commit("SET_LOADING_STATUS", false);
    }
  },
  async createEmployee({ commit }, newEmployeeData) {
    try {
      commit("SET_LOADING_STATUS", true);
      let { data } = await axios.post("/api/employees", newEmployeeData);
      return data.employee.id;
    } catch (error) {
      console.log(error);
      throw "Ошибка, невозможно создать сотрудника";
    } finally {
      commit("SET_LOADING_STATUS", false);
    }
  },
  async updateEmployee({ commit }, employeeId, updateEmployeeData) {
    try {
      commit("SET_LOADING_STATUS", true);
      await axios.put(`/api/employees/${employeeId}`, updateEmployeeData);
    } catch (error) {
      console.log(error);
      throw "Ошибка, невозможно обновить сотрудника";
    } finally {
      commit("SET_LOADING_STATUS", false);
    }
  },
  async filterIsArchive({ commit, dispatch }, isArchive) {
    await commit("SET_FILTER_IS_ARCHIVE", isArchive);
    dispatch("filterEmployees");
    console.log(`Сортировка по статусу ${isArchive}`);
  },
  async filterIsRole({ commit, dispatch }, role) {
    await commit("SET_FILTER_ROLE", role);
    dispatch("filterEmployees");
    console.log(`Сортировка по роли ${role}`);
  },
  async filterEmployees({ commit }) {
    await commit("FILTER_EMPLOYEES");
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
