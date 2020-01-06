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
                    <v-card flat>
                        <v-form ref="form"
                                v-model="valid"
                                lazy-validation>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                                v-model="name"
                                                :rules="validate.name"
                                                :counter="50"
                                                label="Название группы"
                                                required
                                        ></v-text-field>
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
                <v-tab-item value="permissions">
                    <v-card flat>
                        <v-container>
                            <v-row>
                                <v-col v-for="(item, i) in contentPerms"
                                       :key="i" cols="12" md="3">
                                    <v-card-title class="pl-0 pb-0 pt-0">{{$t('main.group.' + item.name)}}</v-card-title>
                                    <v-card flat>
                                        <v-checkbox v-for="(perm, i) in item.permissions"
                                                    color="blue darken-3"
                                                    :key="i" v-model="perm.isChecked"
                                                    :label="$t('main.group.permissionAction.' + perm.action)"
                                                    @click="groupPermissionSaveMethod(perm, $event)"
                                                    class="group-permissions mt-0"
                                        ></v-checkbox>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
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
    name: "Group",
    components: {
      EAddEdit
    },
    mixins: [AddEditMixin, NotifyMixin],
    data() {
      return {
        valid: false,
        name: '',
        tabs: [
          { link: 'home', title: 'Группа' },
          { link: 'permissions', title: 'Разрешения' },
        ],
        contentPerms: [],
        validate: {
          name: [
            v => !!v || 'Поле обязательно',
            v => v.length <= 50 || 'Не более 50 символов',
          ]
        }
      }
    },
    mounted() {
      const group = this.groupById(this.id);
      if (group) {
        this.name = group.name;
      }
    },
    computed: {
      ...mapGetters({
        groupById: 'users/getGroupById',
      }),
    },
    methods: {
      ...mapGetters({
        getContentPermissions: 'users/getContentPermissions',
      }),
      ...mapActions({
        groupSaveAction: 'users/groupSave',
        groupPermissionSaveAction: 'users/groupPermissionSave',
      }),
      groupPermissionSaveMethod(perm) {
        this.groupPermissionSaveAction({
          groupId: this.id,
          permissionId: perm.id,
          isChecked: perm.isChecked
        }).then(() => {
          this.successSave('Разрешение группы');
        }, () => { this.errorSave() });
      },
      submit() {
        if (this.$refs.form.validate()) {
          this.groupSaveAction({
            id: this.id,
            name: this.name,
          }).then(() => {
            if (!this.id) {
              this.successCreate('Группа');
              this.$router.push({ name: 'eTable', params: { name: 'groups' } })
            } else {
              this.successSave('Группа');
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
        if (this.currentTab === 'permissions') {
          this.contentPerms = this.getContentPermissions()(this.id);
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
