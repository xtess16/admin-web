<template>
  <div>
    <TopNav />
    <EntitiesContent />
    <v-footer color="blue darken-3"
              app><span class="white--text">&copy; 2020</span></v-footer>
  </div>
</template>

<script>
import TopNav from "./common/TopNav";
import EntitiesContent from "./entitiesContent/EntitiesContent";

export default {
  name: 'AdminMain',
  components: {
    TopNav,
    EntitiesContent
  }
}
</script>
