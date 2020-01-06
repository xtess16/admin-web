<template>
    <div>
        <ETable :thead="thead" :tbody="groups.map(group => {
          return { key: group.id, values: [group.name] }
        })" />
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import ETable from "../../../components/tables/ETable";

  export default {
    name: "Groups",
    components: {
      ETable
    },
    data() {
      return {
        thead: ['Название группы']
      }
    },
    created() {
      this.fetchGroups()
    },
    computed: {
      ...mapGetters({
        groups: 'users/getGroups'
      }),
    },
    methods: {
      ...mapActions({
        fetchGroups: 'users/fetchGroups'
      }),
    },
  }
</script>

<style scoped>

</style>
