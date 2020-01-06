<template>
    <div class="spot-container">
        <LeftSidebar />
        <v-content>
            <v-container fluid>
                <!--            <Tabs />-->
                <div class="e-work-area">
                    <router-view/>
                </div>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import LeftSidebar from "./LeftSidebar";
    // import Tabs from "./Tabs";

    export default {
      name: "EntitiesContent",
      components: {
        LeftSidebar,
        // Tabs,
      }
    }
</script>

<style lang="scss" scoped>

</style>
