<template>
    <div>
        <component :is="component" />
    </div>
</template>

<script>
  import Group from "./Group";
  import User from "./User";

  export default {
    name: "DynamicEAddEdit",
    components: {
      Group,
      User,
    },
    data () {
      return {
        page: {
          groups: "Group",
          users: "User",
        },
        component: '',
      }
    },
    mounted() {
      this.getComponent();
    },
    methods: {
      getComponent() {
        const name = this.$route.params['name'];
        this.component = this.page[name] ? this.page[name] : "Group";
      },
    },
    watch: {
      $route () {
        this.getComponent();
      }
    },
  }
</script>

<style scoped>

</style>
