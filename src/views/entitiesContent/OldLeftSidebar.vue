<template>
    <div class="spot-left-sidebar bg-light border-right"
         id="sidebar-wrapper">
        <div class="list-group list-group-flush">
            <router-link :to="{name: 'eTable', params: {name: item.link}}"
                         active-class="item-active"
                         v-for="(item, i) in listItems" :key="i"
                         class="list-group-item list-group-item-action bg-light"
                         @click="selectEntity(item)">{{item.name}}</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: "LeftSidebar",
    data() {
      return {
        currentLink: '',
        listItems: [
          {
            name: "Группы",
            link: 'groups'
          },
          {
            name: "Пользователи",
            link: 'users'
          },
        ]
      }
    },
    computed: {

    },
    methods: {
      selectEntity: function (item) {
        this.currentLink = item.link
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
