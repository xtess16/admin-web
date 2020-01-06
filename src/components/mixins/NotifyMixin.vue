<script>
  export default {
    name: "NotifyMixin",
    methods: {
      successCreate(title) {
        this.$notify({
          group: 'bottom-info',
          title,
          text: "Запись создана",
          type: 'success',
        });
      },
      successSave(title) {
        this.$notify({
          group: 'bottom-info',
          title,
          text: "Запись сохранена",
          type: 'success',
        });
      },
      errorSave() {
        this.$notify({
          group: 'bottom-info',
          title: 'Ошибка',
          text: "Запись не сохранена",
          type: 'error',
        });
      },
      successDelete(title) {
        this.$notify({
          group: 'bottom-info',
          title,
          text: 'Запись удалена',
          type: 'info',
        });
      },
      errorDelete() {
        this.$notify({
          group: 'bottom-info',
          title: 'Ошибка',
          text: "Запись не удалена",
          type: 'error',
        });
      },
    },
  }
</script>

<style scoped>

</style>
