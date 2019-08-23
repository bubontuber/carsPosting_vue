<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-center mt-5" v-if="loading">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex xs10 md6 offset-md3 offset-xs1 v-else-if="!loading && orders.length !== 0">
        <h1 class="mb-3">List of orders</h1>
        <v-card>
          <v-list
            flat
            subheader
            three-line
          >

            <v-list-item-group
              multiple
              active-class=""
            >
              <v-list-item
              v-for="order in orders"
              :key="order.id"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox color="deep-purple accent-4" @change="markDone(order.id)" v-model="order.done"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>{{order.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-btn outlined color="deep-purple accent-4" :to="'/ad/' + order.adId">Open</v-btn>
                  </v-card-actions>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs10 md6 offset-md3 offset-xs1 v-else>
        <h1>You have no orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (orderId) {
      this.$store.dispatch('markDoneOrder', orderId)
        .then(() => {
        })
        .catch(() => {

        })
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>
