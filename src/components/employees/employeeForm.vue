<template>
  <form>
    <b-field
      label="Имя"
      :type="{ 'is-danger': $v.form.name.$error }"
      :message="{ 'Поле, обязательное для заполнения': $v.form.name.$error }"
    >
      <b-input v-model.trim="$v.form.name.$model" />
    </b-field>
    <b-field
      label="Телефон"
      :type="{ 'is-danger': $v.form.phone.$error }"
      :message="{ 'Поле, обязательное для заполнения': $v.form.phone.$error }"
    >
      <b-input v-input-mask-phone v-model.trim="$v.form.phone.$model"></b-input>
    </b-field>
    <b-field
      label="Дата рождения"
      :type="{ 'is-danger': $v.form.birthday.$error }"
      :message="{
        'Поле, обязательное для заполнения': $v.form.birthday.$error
      }"
    >
      <b-datepicker v-model="$v.form.birthday.$model"></b-datepicker>
    </b-field>
    <b-field
      label="Должность"
      :type="{ 'is-danger': $v.form.role.$error }"
      :message="{ 'Поле, обязательное для заполнения': $v.form.role.$error }"
    >
      <b-select v-model="$v.form.role.$model">
        <option :value="id" :key="id" v-for="(role, id) in roles">
          {{ role.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Статус">
      <b-checkbox v-model="form.isArchive">В архиве</b-checkbox>
    </b-field>
    <b-field>
      <b-button
        @click.prevent="saveEmployee"
        class="button is-primary"
        :loading="loadingStatus"
      >
        <template v-if="edit">Сохранить</template>
        <template v-else>Создать</template>
      </b-button>
    </b-field>
  </form>
</template>

<script>
import { InputMaskPhone } from "@/helpers/directives";
import { employeeRoles } from "@/helpers/enums";
import { required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  props: {
    edit: Boolean // edit or create mark
  },
  data() {
    return {
      form: {
        name: "",
        phone: "",
        birthday: null,
        role: "",
        isArchive: false
      }
    };
  },
  directives: { InputMaskPhone },
  computed: {
    roles() {
      return employeeRoles();
    },
    ...mapGetters({
      employee: "employees/getEmployee",
      loadingStatus: "employees/getLoadingStatus"
    })
  },
  validations: {
    form: {
      name: {
        required
      },
      phone: {
        required
      },
      birthday: {
        required
      },
      role: {
        required
      }
    }
  },
  methods: {
    ...mapActions({
      createEmployee: "employees/createEmployee",
      updateEmployee: "employees/createEmployee",
      fetchEmployee: "employees/fetchEmployee"
    }),
    async saveEmployee() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let mutatedForm = { ...this.form };
        mutatedForm.birthday = moment(mutatedForm.birthday).format(
          "DD.MM.YYYY"
        ); // set Date to String Format
        if (!this.edit) {
          try {
            let newEmployeeId = await this.createEmployee(mutatedForm);
            await this.$router.push({
              name: "employeesEdit",
              params: { employeeId: newEmployeeId }
            });
            this.$buefy.toast.open({
              message: "Сотрудник создан",
              type: "is-success"
            });
          } catch (e) {
            this.$buefy.toast.open({
              message: e,
              type: "is-danger"
            });
          }
        } else {
          try {
            await this.updateEmployee(mutatedForm);
            this.$buefy.toast.open({
              message: "Сотрудник обновлен",
              type: "is-success"
            });
          } catch (e) {
            this.$buefy.toast({
              message: e,
              type: "is-danger"
            });
          }
        }
      }
    }
  },
  async mounted() {
    if (this.edit) {
      try {
        let employeeId = this.$route.params.employeeId;
        await this.fetchEmployee(employeeId);

        this.employee.birthday = moment(
          this.employee.birthday,
          "DD.MM.YYYY"
        ).toDate(); // parse to Date from string

        this.form = {
          ...this.employee
        };
      } catch (e) {
        this.$buefy.toast.open({
          message: e,
          type: "is-danger"
        });

        await this.$router.push("/");
      }
    }
  }
};
</script>
