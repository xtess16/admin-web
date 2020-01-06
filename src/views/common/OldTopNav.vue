<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand mb-0 h1">
            Панель администратора</router-link>
        <button class="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link">Профиль</a>
                </li>
            </ul>
            <div class="form-inline my-2 my-lg-0">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink"
                           data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false"
                           style="color: #fff !important;opacity: 1;">{{user.email}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item">Настройки</a>
                            <div class="dropdown-divider"></div>
                            <a @click="logout()" class="dropdown-item">Выйти</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

    export default {
      name: "TopNav",
      data() {
        return {
          user: {
            email: ''
          }
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
