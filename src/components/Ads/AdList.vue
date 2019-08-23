<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11 md6 sm11>
        <h1 class="mb-3">My List</h1>

        <v-card style="overflow: hidden" class="mt-2"
        v-for="ad in myAds"
                :key="ad.id"
        >
          <v-layout row>
            <v-flex xs4>
              <v-img
                :src="ad.imgSrc"
                height="160px"
              >
              </v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-title>{{ad.title}}</v-card-title>
              <v-card-text>{{ad.description}}</v-card-text>
              <v-card-actions class="ml-2">
                <v-btn :to="'/ad/' + ad.id" outlined color="indigo">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    myAds () {
      return this.$store.getters.myAds
    }
  }
}
</script>
