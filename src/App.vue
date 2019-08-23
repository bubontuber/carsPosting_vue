<template>
  <v-app  id="app">
    <v-app-bar
      app
      clipped-right
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title><router-link to="/" tag="span" class="pointer">Project cars</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text
              v-for="link in links"
               :key="link.title"
               :to="link.url">
        <v-icon left>{{link.icon}}</v-icon>
        {{link.title}}
        </v-btn>

        <v-btn
          v-if="isUserSignedIn"
          @click="onLogOut"
          text
        >
          <v-icon left>mdi-exit-to-app</v-icon>
          LogOut
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list dense>
        <v-list-item link
          v-for="link in links"
          :key="link.title"
          :to="link.url"
        >
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="onLogOut" v-if="isUserSignedIn">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>LogOut</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer
      app
      color="deep-purple accent-4"
      class="white--text"
    >
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
    <template v-if="error">
      <v-snackbar
        color="error"
        :value="true"
      >
        {{error}}
        <v-spacer></v-spacer>
        <v-btn
          dark
          text
          @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    error () {
      return this.$store.getters.error
    },
    isUserSignedIn () {
      return this.$store.getters.isUserSignedIn
    },
    links () {
      if (this.isUserSignedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark', url: '/orders' },
          { title: 'New ad', icon: 'mdi-note', url: '/new' },
          { title: 'My ads', icon: 'mdi-account-details', url: '/list' }
        ]
      } else {
        return [
          { title: 'Login', icon: 'mdi-lock', url: '/login' },
          { title: 'Registration', icon: 'mdi-face', url: '/registration' }
        ]
      }
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogOut () {
      this.$store.dispatch('logOutUser')
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
  .pointer{
    cursor: pointer;
  }
</style>
