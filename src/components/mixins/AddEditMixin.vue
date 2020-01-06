<script>
  import moment from 'moment';

  export default {
    name: "AddEditMixin",
    data() {
      return {
        id: 0,
        currentTab: 'home',
      }
    },
    mounted() {
      this.getId();
    },
    methods: {
      getId() {
        this.id = this.$route.params['id'];
      },
      selectInternalTab(tabLink) {
        this.currentTab = tabLink;
      },
      isTab(tabLink) {
        return this.currentTab === tabLink;
      },
      isEditPage() {
        return !!this.id;
      },
      getDateStr(date) {
        return moment(date).format('DD-MM-YYYY');
      },
      getBoolStr(state) {
        return state ? 'Да' : 'Нет';
      },
    }
  }
</script>
