<template>
  <div>
    <div class="panel">
      <div class="panel-heading is-flex is-justify-content-space-between is-align-items-center">
        <div>
          Добавление сотрудника
        </div>
        <div>
          <b-button
            size="is-small"
            icon-left="arrow-left"
            tag="router-link"
            :to="{ name: 'employeesAll' }"
            type="is-primary"
          >
            Назад
          </b-button>
        </div>
      </div>
      <div class="p-3">
        <div class="columns">
          <div class="column is-two-thirds">
            <EmployeeForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeForm from "@/components/employees/employeeForm";

export default {
  components: { EmployeeForm }
};
</script>
