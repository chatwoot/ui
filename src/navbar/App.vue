<template>
  <div id="appnav">
    <sidebar :route="currentRoute" :class="sidebarClassName"></sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "../dashboard/components/layout/Sidebar";
export default {
  components: {
    Sidebar,
  },
    data() {
    return {
      isSidebarOpen: false,
      isOnDesktop: true,
    };
  },
  name: "AppNav",
  computed: {
    ...mapGetters({
      isLoggedIn: "agents/getAgents",
    }),
    currentRoute() {
      return " ";
    },
    sidebarClassName() {
      if (this.isOnDesktop) {
        return "";
      }
      if (this.isSidebarOpen) {
        return "off-canvas is-open ";
      }
      return "off-canvas position-left is-transition-push is-closed";
    },
  },
  mounted() {
    this.$store.dispatch("setUser");
    bus.$on('sidemenu_icon_click', () => {
      this.isSidebarOpen = !this.isSidebarOpen;
    });
  },
};
</script>

<style lang="scss">
@import "../dashboard/assets/scss/app";

</style>
