<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="deep-purple accent-4" dark v-on="on" class="ml-3">Buy</v-btn>
    </template>
    <v-card>
      <v-card-title>Do you want to buy it?</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          label="Name"
          name="name"
          type="text"
          v-model="name"
        ></v-text-field>
        <v-text-field
          label="Your phone"
          name="phone"
          type="text"
          v-model="phone"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat text @click="onCancel" :disabled="localLoading">Close</v-btn>
        <v-btn class="success" text @click="onSave" :disabled="localLoading" :loading="localLoading">Buy it</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['ad'],
  data () {
    return {
      dialog: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.dialog = false
      this.name = ''
      this.phone = ''
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.dialog = false
          })
      }
    }
  }
}
</script>
