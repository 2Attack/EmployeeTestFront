<template>
  <div>
    <b-field grouped group-multiline>
      <div class="control is-flex">
        <b-select placeholder="Должность" v-model="roleFilter">
          <option value="all">Все</option>
          <option :value="id" :key="id" v-for="(role, id) in roles">
            {{ role.name }}
          </option>
        </b-select>
      </div>
      <div class="control is-flex">
        <b-checkbox v-model="isArchiveFilter">В архиве</b-checkbox>
      </div>
    </b-field>
  </div>
</template>

<script>
import { employeeRoles } from "@/helpers/enums";

export default {
  computed: {
    roles() {
      return employeeRoles();
    },
    isArchiveFilter: {
      get() {
        return this.$store.state.employees.filter.isArchive;
      },
      set(isArchiveStatus) {
        return this.$store.dispatch(
          "employees/filterIsArchive",
          isArchiveStatus
        );
      }
    },
    roleFilter: {
      get() {
        return this.$store.state.employees.filter.role;
      },
      set(role) {
        return this.$store.dispatch("employees/filterIsRole", role);
      }
    }
  }
};
</script>
