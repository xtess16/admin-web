<template>
    <v-app-bar color="blue darken-3" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title @click="toHomePage"
                         class="top-nav-title"
        >Панель администратора</v-toolbar-title>
        <v-spacer></v-spacer>
        <p class="app-bar-user-email">{{user.email}}</p>
        <v-menu left
                bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                        v-for="(item, i) in rightMenuItems"
                        :key="i"
                        @click="item.link()">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

    export default {
      name: "TopNav",
      data() {
        return {
          user: {
            email: ''
          },
          rightMenuItems: [
            { title: 'Настройки', link: () => {} },
            { title: 'Выйти', link: () => { this.logout()} },
          ],
        }
      },
      created() {
        this.user = Object.assign(this.user, this.currentUser);
      },
      computed: {
        ...mapGetters({
          currentUser: 'users/getCurrentUser'
        }),
      },
      methods: {
        ...mapActions({
          logout: 'users/logout'
        }),
        toHomePage() {
          if (this.$route.name !== 'adminMain')
            this.$router.push({name: 'adminMain'})
        },
      },
      watch: {
        currentUser (value) {
          if (value) {
            this.user = Object.assign(this.user, value);
          }
        }
      },
    }
</script>

<style lang="scss" scoped>
    /*@import '../assets/scss/app';*/
</style>
