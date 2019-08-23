<template>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="teal" text v-on="on">Edit</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            <v-text-field
              label="Title"
              name="title"
              type="text"
              v-model="editedTitle"
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-textarea
              label="Description"
              name="text"
              type="text"
              aria-multiline="true"
              v-model="editedDescription"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat text @click="onCancel">Cancel</v-btn>
            <v-btn flat class="success" text @click="onSave">Save</v-btn>
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
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },
  methods: {
    onCancel () {
      this.dialog = false
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
    },
    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })
      }
      this.dialog = false
    }
  }
}
</script>
