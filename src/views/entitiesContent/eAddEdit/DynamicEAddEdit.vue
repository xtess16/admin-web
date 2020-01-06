<template>
    <div>
        <component :is="component" />
    </div>
</template>

<script>
  import Group from "./Group";

  export default {
    name: "DynamicEAddEdit",
    components: {
      Group,
    },
    data () {
      return {
        page: {
          groups: "Group",
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
