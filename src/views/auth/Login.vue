<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height"
                         fluid>
                <v-row align="center"
                       justify="center">
                    <v-col cols="12"
                           sm="8"
                           md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="primary"
                                       dark
                                       flat>
                                <v-toolbar-title>Вход в панель администратора</v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form"
                                        v-model="valid"
                                        lazy-validation>
                                    <v-text-field
                                            label="Email"
                                            name="email"
                                            v-model="email"
                                            :rules="validate.email"
                                            required
                                            :counter="50"
                                            prepend-icon="person"
                                            type="text" />

                                    <v-text-field
                                            id="password"
                                            label="Пароль"
                                            v-model="password"
                                            :rules="validate.password"
                                            name="password"
                                            required
                                            :counter="100"
                                            prepend-icon="lock"
                                            type="password" />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="primary"
                                       :disabled="!valid"
                                       @click="submit">Вход</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  import {email, required, minLength} from "vuelidate/lib/validators";
  import {mapActions} from "vuex";

  export default {
    name: "Login",
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        validate: {
          email: [
            v => !!v || 'Поле обязательно',
            v => v.length <= 50 || 'Не более 50 символов',
          ],
          password: [
            v => !!v || 'Поле обязательно',
            v => v.length >= 4 || 'Не менее 4 символов',
            v => v.length <= 100 || 'Не более 100 символов',
          ],
        }
      }
    },
    methods: {
      ...mapActions({
        loginAction: 'users/login',
      }),
      submit() {
        if (this.$refs.form.validate()) {
            this.loginAction({
              email: this.email,
              password: this.password
            }).then(() => {
              console.log(2);
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
