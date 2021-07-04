<template>
  <div>
    <section class="app-content columns" :class="contentClassName">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>


export default {
  data() {
    return {
      isSidebarOpen: false,
      isOnDesktop: true,
    };
  },
  computed: {
    contentClassName() {
      if (this.isOnDesktop) {
        return '';
      }
      if (this.isSidebarOpen) {
        return 'off-canvas-content is-open-left has-transition-push has-position-left';
      }
      return 'off-canvas-content';
    },
  },
  mounted() {
    this.$store.dispatch('setCurrentAccountId', this.$route.params.accountId);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    bus.$on('sidemenu_icon_click', () => {
      this.isSidebarOpen = !this.isSidebarOpen;
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth > 1200) {
        this.isOnDesktop = true;
      } else {
        this.isOnDesktop = false;
      }
    },
  },
};
</script>
