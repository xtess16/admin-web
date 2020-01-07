<template>
    <div>
        <component :is="component" />
    </div>
</template>

<script>
  import Groups from "./Groups";
  import Users from "./Users";

  export default {
    name: "DynamicETable",
    components: {
      Groups,
      Users,
    },
    data () {
      return {
        pages: {
          groups: "Groups",
          users: "Users",
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
        this.component = this.pages[name] ? this.pages[name] : "Groups";
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
