<template>
    <div>
        <component :is="component" />
    </div>
</template>

<script>
  import Groups from "./Groups";

  export default {
    name: "DynamicETable",
    components: {
      Groups,
    },
    data () {
      return {
        pages: {
          groups: "Groups",
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
