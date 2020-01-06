<template>
    <div class="form-300">
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item">
                        <p class="nav-title">Вход в панель администратора</p>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <form @submit.prevent="submit">
                    <div class="form-row">
                        <div class="form-group col-md-12 mb-3">
                            <label>Email</label>
                            <input type="email"
                                   class="form-control"
                                   :class="{'is-invalid': $v.email.$error}"
                                   @blur="$v.email.$touch()"
                                   v-model="email">
                            <div v-if="!$v.email.required"
                                 class="invalid-feedback">Поле обязательно</div>
                            <div v-if="!$v.email.email"
                                 class="invalid-feedback">Некорректный email</div>
                        </div>
                        <div class="form-group col-md-12 mb-3">
                            <label>Пароль</label>
                            <input type="password"
                                   class="form-control"
                                   :class="{'is-invalid': $v.password.$error}"
                                   @blur="$v.password.$touch()"
                                   v-model="password">
                            <div v-if="!$v.password.required"
                                 class="invalid-feedback">Поле обязательно</div>
                            <div v-if="!$v.password.minLength"
                                 class="invalid-feedback">Не менее 8 символов</div>
                        </div>
                    </div>
                    <button class="btn btn-info" type="submit">Войти</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  import {email, required, minLength} from "vuelidate/lib/validators";
  import {mapActions} from "vuex";

  export default {
    name: "Login",
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      ...mapActions({
        loginAction: 'users/login',
      }),
      submit() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            this.loginAction({
              email: this.email,
              password: this.password
            }).then(() => {
              this.$router.push('/')
            }, () => {
              this.$notify({
                group: 'bottom-info',
                title: 'Ошибка',
                text: "Ошибка аутентификации",
                type: 'error',
              });
            })
        }
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(4)
      }
    }
  }
</script>

<style scoped>

</style>
