<template>
    <v-toolbar flat>
        <v-btn color="primary"
               small
               class="mr-4 mr-2"
               @click="back()">Назад</v-btn>
        <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
</template>

<script>
  export default {
    name: "EAddEdit",
    props: ['title'],
    data() {
      return {

      }
    },
    methods: {
      back() {
        const name = this.$route.params['name'];
        this.$router.push({ name: 'eTable', params: { name } })
      },
    },
  }
</script>

<style scoped>

</style>
