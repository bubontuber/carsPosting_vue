<template>
  <v-container fluid>
    <v-layout row align-center justify-center>
      <v-flex xs11 md6>
        <h1 class="mb-5">Create new ad</h1>

            <v-form v-model="valid" ref="form" validation>

              <v-text-field
                label="Title"
                name="title"
                type="text"
                v-model="title"
                required
                :rules="[v => !!v || 'This field is required']"
              ></v-text-field>

              <v-textarea
                multiline
                label="Description"
                name="description"
                type="text"
                v-model="description"
                :rules="[v => !!v || 'This field is required']"
              ></v-textarea>
            </v-form>
            <v-btn
              @click="triggerUpload"
              :loading="loading"
              outlined
              color="blue-grey"
              class="mt-3 mb-3 white--text"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input ref="fileInput" type="file" style="display: none" accept="image/*" @change="onFileChange">

            <v-switch v-model="promo" color="indigo" label="Add to promo?"></v-switch>
            <img :src="imgSrc" height="150px" v-if="imgSrc">
            <v-spacer></v-spacer>
            <v-btn :loading="loading" @click="createAd" tile color="success" class="mt-10" :disabled="!valid || !image || loading"><v-icon left>mdi-cart-plus</v-icon>Create ad</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      image: null,
      imgSrc: '',
      valid: false,
      promo: false,
      title: '',
      description: '',
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (e) {
      const file = e.target.files[0]

      const reader = new FileReader()
      reader.onload = e => {
        this.imgSrc = reader.result
      }

      reader.readAsDataURL(file)
      this.image = file
    },
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imgSrc: this.image
        }

        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    }
  }
}
</script>
