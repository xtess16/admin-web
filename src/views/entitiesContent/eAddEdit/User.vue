<template>
    <div>
        <EAddEdit :title="isEditPage() ? 'Редактирование группы' : 'Создание группы'" />
        <v-card flat>
            <v-tabs v-if="isEditPage()"
                    v-model="currentTab">
                <v-tab v-for="(tab, i) of tabs"
                       :key="i" :href="`#${tab.link}`">{{tab.title}}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="currentTab">
                <v-tab-item value="home">

                </v-tab-item>
                <v-tab-item value="profile">
                    <v-card flat>
                        <v-form ref="form"
                                v-model="valid"
                                lazy-validation>
                            <v-container class="pb-0">
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                                v-model="user.email"
                                                :rules="validate.email"
                                                :counter="50"
                                                label="E-mail"
                                                required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                                v-model="user.firstName"
                                                :rules="validate.firstName"
                                                :counter="50"
                                                label="Имя"
                                                required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                                v-model="user.lastName"
                                                :rules="validate.lastName"
                                                :counter="50"
                                                label="Фамилия"
                                                required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="pb-0 pt-0" cols="12" md="4">
                                        <v-checkbox color="blue darken-3"
                                                    v-model="user.isActive"
                                                    label="Активный"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-btn :disabled="!valid"
                                   color="info"
                                   class="ml-2 mb-2"
                                   @click="submit">Отправить
                            </v-btn>
                        </v-form>
                    </v-card>
                </v-tab-item>
                <v-tab-item value="groups">
                    <v-card class="pl-3" flat>
                        <v-checkbox v-for="(group, i) in userGroups"
                                    color="blue darken-3"
                                    :key="i" v-model="group.isChecked"
                                    :label="group.name"
                                    @click="userGroupSaveMethod(group)"
                                    class="group-permissions mt-0"
                        ></v-checkbox>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>

<script>
  import EAddEdit from "../../../components/common/EAddEdit";
  import {mapGetters, mapActions} from "vuex";
  import {required} from "vuelidate/lib/validators";
  import AddEditMixin from "../../../components/mixins/AddEditMixin";
  import NotifyMixin from "../../../components/mixins/NotifyMixin";

  export default {
    name: "User",
    components: {
      EAddEdit
    },
    mixins: [AddEditMixin, NotifyMixin],
    data() {
      return {
        valid: false,
        currentTab: 'profile',
        tabs: [
          { link: 'home', title: 'Общая информация' },
          { link: 'profile', title: 'Личные данные' },
          { link: 'groups', title: 'Группы' },
        ],
        user: {
          email: '',
          firstName: '',
          lastName: '',
          isActive: false,
        },
        userGroups: [],
        validate: {
          email: [
            v => !!v || 'Поле обязательно',
            v => v.length <= 50 || 'Не более 50 символов',
            v => /.+@.+/.test(v) || 'Некорректный E-mail',
          ],
          firstName: [
            v => v.length <= 50 || 'Не более 50 символов',
          ],
          lastName: [
            v => v.length <= 50 || 'Не более 50 символов',
          ],
        }
      }
    },
    mounted() {
      const user = this.userById(this.id);
      if (user) {
        this.user = Object.assign(this.user, user);
      }
    },
    computed: {
      ...mapGetters({
        userById: 'users/getUserById',
      }),
    },
    methods: {
      ...mapGetters({
        getUserGroups: 'users/getUserGroups',
      }),
      ...mapActions({
        userSaveAction: 'users/userSave',
        userGroupSaveAction: 'users/userGroupSave',
      }),
      userGroupSaveMethod(group) {
        this.userGroupSaveAction({
          userId: this.id,
          groupId: group.id,
          isChecked: group.isChecked
        }).then(() => {
          this.successSave('Группа пользователя');
        }, () => { this.errorSave() });
      },
      submit() {
        if (this.$refs.form.validate()) {
          console.log(1, this.user)
          this.userSaveAction(this.user).then(() => {
            if (!this.id) {
              this.successCreate('Пользователь');
              this.$router.push({ name: 'eTable', params: { name: 'users' } })
            } else {
              this.successSave('Пользователь');
            }
          }, () => { this.errorSave() });
        }
      }
    },
    watch: {
      $route () {
        this.getId();
      },
      currentTab () {
        if (this.currentTab === 'groups') {
          this.userGroups = this.getUserGroups()(this.id);
        }
      }
    },
    validations: {
      name: {
        required
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
