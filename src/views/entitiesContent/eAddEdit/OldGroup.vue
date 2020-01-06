<template>
    <div>
        <EAddEdit :title="isEditPage() ? 'Редактирование группы' : 'Создание группы'" />
        <ul v-if="isEditPage()" class="nav nav-tabs" id="myTab" role="tablist">
            <li v-for="(tab, i) of tabs" :key="i"
                class="nav-item"
                @click="selectInternalTab(tab.link)">
                <a class="nav-link"
                   :class="{'active': isTab(tab.link)}">{{tab.title}}</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div v-if="isTab('home')"
                 class="tab-pane fade show active">
                <form @submit.prevent="submit">
                    <div class="form-row">
                        <div class="form-group col-md-4 mb-3">
                            <label for="name">Название группы</label>
                            <input type="text" id="name"
                                   class="form-control"
                                   :class="{'is-invalid': $v.name.$error}"
                                   @blur="$v.name.$touch()"
                                   v-model="name">
                            <div v-if="!$v.name.required"
                                 class="invalid-feedback">Поле обязательно</div>
                        </div>
                    </div>
                    <button class="btn btn-info" type="submit">Отправить</button>
                </form>
            </div>
            <div v-if="isTab('permissions')"
                 class="tab-pane fade show active">
                <div class="content-permission">
                    <div v-for="(item, i) in contentPerms" :key="i"
                         class="permission-item">
                        <h5 class="permission-item-title">{{$t('main.group.' + item.name)}}</h5>
                        <div class="permission-item-action">
                            <v-checkbox
                                    v-for="(perm, i) in item.permissions"
                                    :key="i" v-model="perm.isChecked"
                                    :label="$t('main.group.permissionAction.' + perm.action)"
                                    @click="groupPermissionSaveMethod(perm, $event)"
                            ></v-checkbox>
<!--                            <label v-for="(perm, i) in item.permissions"-->
<!--                                   :key="i" class="permission-item-action-label">-->
<!--                                <input type="checkbox"-->
<!--                                       v-model="perm.isChecked"-->
<!--                                       @click="groupPermissionSaveMethod(perm, $event)"-->
<!--                                > {{$t('main.group.permissionAction.' + perm.action)}}-->
<!--                            </label>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        name: '',
        tabs: [
          { link: 'home', title: 'Группа' },
          { link: 'permissions', title: 'Разрешения' },
        ],
        contentPerms: []
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
      groupPermissionSaveMethod(perm, $event) {
        this.groupPermissionSaveAction({
          groupId: this.id,
          permissionId: perm.id,
          isChecked: $event.target.checked
        }).then(() => {
          this.successSave('Разрешение группы');
        }, () => { this.errorSave() });
      },
      submit() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
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

<style scoped>

</style>
