<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Stock Manager </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/create-entity"
              >create-entity</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="read-entity">read-entities</a>
          </li>
        </ul>
        <button class="btn btn-outline-danger" @click="logout()">
          <span id="user-name">{{ claims.name }}</span> Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderSection',
  data() {
    return {
      claims: '',
    };
  },
  async created() {
    // OKTA CLAIMS
    this.setup();
  },
  watch: {
    // Everytime the route changes, check for auth status
    $route: 'isAuthenticated',
  },
  methods: {
    // OKTA CLAIMS
    async setup() {
      this.claims = await this.$auth.getUser();
    },
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
    },
    async logout() {
      await this.$auth.signOut();
    },
  },
};
</script>

<style scoped>
#user-name {
  font-size: 14px;
}
</style>
