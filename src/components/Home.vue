<template>
  <v-container fluid grid-list-xl>
    <v-layout row>
      <v-flex xs12>
        <v-carousel
          cycle
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          show-arrows-on-hover
        >
          <v-carousel-item
          v-for="ad in promoAds"
          :key="ad.id"
          :src="ad.imgSrc"
          >
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap grid-list-sm>
      <v-flex xs12 md4 lg3 sm6 m5
      v-for="ad in ads"
      :key="ad.id"
      >
        <v-card
          class="mx-auto my-12"
          max-width="374"
        >
          <v-img
            height="250"
            :src="ad.imgSrc"
          ></v-img>

          <v-card-title>{{ad.title}}</v-card-title>
          <v-card-text>
            <v-layout align-center>
              <v-rating
                :value="4.5"
                color="amber"
                half-increments
                dense
                size="14"
                readonly
              ></v-rating>

              <div class="grey--text ml-4">4.5 (413)</div>
            </v-layout>

            <div>{{ad.description}}</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="indigo" :to="'/ad/' + ad.id">Open</v-btn>
            <app-buy-modal :ad="ad" ></app-buy-modal>
          </v-card-actions>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    }
  }
}
</script>
