<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11 md8>

        <v-card
          v-if="!loading"
          class="mx-auto mt-5"
        >
          <v-img
            class="white--text"
            height="400px"
            :src="ad.imgSrc"
          >
            <v-card-title class="align-end fill-height">{{ad.title}}</v-card-title>
          </v-img>

          <v-card-text>
            <span>Number 10</span><br>
            <span class="text--primary">
            <span>{{ad.description}}</span><br>
      </span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <EditAdModal :ad="ad" v-if="isOwner" />
              <app-buy-modal :ad="ad" v-if="!isOwner"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-center mt-10">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import EditAdModal from './EditAdModal'

export default {
  props: ['id'],
  computed: {
    ad () {
      const adId = this.id
      return this.$store.getters.adById(adId)
    },
    isOwner () {
      const isSigned = this.$store.getters.isUserSignedIn
      if (isSigned) {
        return this.ad.ownerId === this.$store.getters.user.id
      }
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  components: {
    EditAdModal
  }
}
</script>
