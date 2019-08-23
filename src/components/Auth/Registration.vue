<template>
  <v-container fluid>
    <v-layout row align-center justify-center>
      <v-flex xs11 md6>
        <h1 class="mb-5">Registration</h1>
        <v-card class="elevation-12">
          <v-toolbar
            color="deep-purple accent-4"
            dark
            flat
          >
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" validation>

              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>

              <v-text-field
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                counter
                :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                :type="show1 ? 'text' : 'password'"
                v-model="password"
                :rules="passwordRules"
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-text-field
                label="Confirm password"
                name="confirmPasswrod"
                prepend-icon="mdi-lock"
                type="password"
                counter
                :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                :type="show1 ? 'text' : 'password'"
                v-model="confirm"
                :rules="confirmPasswordRules"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              @click="onSubmit"
              :disabled="!valid || loading"
              :loading="loading"
            >Registration</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      show1: false,
      valid: false,
      email: '',
      confirm: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be less than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'This field is required',
        v => v === this.password || 'Passwords must match'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
      }
    }
  }
}
</script>
