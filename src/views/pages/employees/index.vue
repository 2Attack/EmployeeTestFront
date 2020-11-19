<template>
  <div class="panel">
    <div class="panel-heading is-flex is-justify-content-space-between">
      <div>
        Сотрудники
      </div>
      <div>
        <b-button
          size="is-small"
          icon-left="plus"
          tag="router-link"
          :to="{ name: 'employeesCreate' }"
          type="is-primary"
        >
          Создать
        </b-button>
      </div>
    </div>
    <div class="p-3">
      <EmployeeFilter class="mt-3 mb-3" />
      <b-table :data="filteredEmployees" :loading="loadingStatus">
        <b-table-column field="name" label="Имя" sortable v-slot="props">
          <router-link
            :to="{
              name: 'employeesEdit',
              params: { employeeId: props.row.id }
            }"
            >{{ props.row.name }}
          </router-link>
        </b-table-column>
        <b-table-column field="role" label="Должность" sortable v-slot="props">
          {{ props.row.role | roleEnum }}
        </b-table-column>
        <b-table-column
          field="phone"
          label="Номер телефона"
          sortable
          v-slot="props"
        >
          {{ props.row.phone }}
        </b-table-column>
      </b-table>
      <b-message
        class="mt-3 mb-3"
        v-if="!filteredEmployees.length && employees.length"
        type="is-info"
      >
        Ни один сотрудник не соответствует вашему фильтру
      </b-message>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EmployeeFilter from "@/components/employees/employeeFilter";
import { employeeRoles } from "@/helpers/enums";

export default {
  components: { EmployeeFilter },
  computed: {
    ...mapGetters({
      employees: "employees/getAllEmployees",
      filteredEmployees: "employees/getFilteredEmployees",
      loadingStatus: "employees/getLoadingStatus"
    })
  },
  methods: {
    ...mapActions({
      fetchEmployees: "employees/fetchAllEmployees"
    })
  },
  filters: {
    roleEnum(val) {
      return employeeRoles(val, "name");
    }
  },
  async mounted() {
    try {
      await this.fetchEmployees();
    } catch (e) {
      this.$buefy.toast.open({
        message: e,
        type: "is-danger"
      });
    }
  }
};
</script>
