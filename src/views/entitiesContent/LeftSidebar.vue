<template>
    <v-navigation-drawer v-model="drawer"
                         :expand-on-hover="false"
                         :mini-variant="false"
                         permanent>
        <v-list dense
                nav>
            <v-list-item
                    v-for="item in listItems"
                    :key="item.title"
                    link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title style="font-size: 17px;"
                                       @click="selectItemList(item)"
                    >{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: "LeftSidebar",
    data() {
      return {
        drawer: true,
        currentLink: '',
        listItems: [
          {
            title: "Группы",
            link: 'groups',
            icon: 'group'
          },
          {
            title: "Пользователи",
            link: 'users',
            icon: 'person'
          },
        ]
      }
    },
    computed: {

    },
    methods: {
      selectItemList: function (item) {
        this.currentLink = item.link;
        if (this.$route.path !== `/e-table/${item.link}`) {
          this.$router.push({name: 'eTable', params: {name: item.link}});
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
