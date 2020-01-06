<template>
    <div>
        <v-toolbar flat>
            <v-toolbar-title>{{linkName ? $t('main.eTableTitle.' + linkName) : ''}}</v-toolbar-title>
            <v-btn color="success"
                   small
                   class="mr-4 ml-2"
                   @click="addOrSelectRow(0)">
                <v-icon>plus_one</v-icon>
            </v-btn>
        </v-toolbar>
        <v-simple-table fixed-header>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th v-for="(th, i) in thead" :key="i"
                            class="text-left">{{th}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tr in tbody" :key="tr.key"
                        @click="addOrSelectRow(tr.key)">
                        <td v-for="(td, i) in tr.values" :key="i"
                        ><span v-if="typeof td === 'string'">{{td}}</span>
                            <span v-if="typeof td === 'boolean'">{{getBoolStr(td)}}</span>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
  export default {
    props: ['thead', 'tbody'],
    name: "ETable",
    data() {
      return {
        linkName: '',
      }
    },
    mounted() {
      this.getTitle();
    },
    methods: {
      addOrSelectRow(id) {
        const name = this.$route.params['name'];
        this.$router.push({ name: 'eAddEdit', params: { name, id } })
      },
      getTitle() {
        this.linkName = this.$route.params['name'];
      },
      getBoolStr(state) {
        return state ? 'Да' : 'Нет';
      },
    },
    watch: {
      $route () {
        this.getTitle();
      }
    }
  }
</script>

<style lang="scss" scoped>
    tbody {
        td {
            cursor: pointer;
        }
    }
</style>
