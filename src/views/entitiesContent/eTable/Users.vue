<template>
    <div>
        <ETable :thead="thead" :tbody="users ? users.map(user => {
          return { key: user.id, values: [user.email, user.firstName,
            user.lastName, user.isStaff, user.isActive, getDateTimeStr(user.lastLogin)] }
        }) : []" />
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import ETable from "../../../components/tables/ETable";
  import AddEditMixin from "../../../components/mixins/AddEditMixin";

  export default {
    name: "Users",
    mixins: [AddEditMixin],
    components: {
      ETable
    },
    data() {
      return {
        thead: ['Email', 'Имя', 'Фамилия', 'Активен', 'Управление', 'Последний вход']
      }
    },
    created() {
      this.fetchGroups()
    },
    computed: {
      ...mapGetters({
        users: 'users/getUsers'
      }),
    },
    methods: {
      ...mapActions({
        fetchGroups: 'users/fetchUsers'
      }),
    },
  }
</script>

<style scoped>

</style>
