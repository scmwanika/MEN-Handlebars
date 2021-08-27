<template>
  <div class="flex-container">
    <div class="flex-component-left"><AccommodationList /></div>

    <div class="flex-component-right">
      <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <h6>Upload File</h6>
        <br />
        <input type="file" ref="file" @change="onSelect" />
        <br /><br />
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="file name"
            v-model="accommodation.fileName"
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="fee"
            v-model="accommodation.fee"
            required
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="description"
            v-model="accommodation.description"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-success btn-block btn-add">+</button>
          <em>{{ message }}</em>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AccommodationList from '@/components/Visit/AccommodationList.vue';
import axios from 'axios';

const api = 'http://localhost:3000';
export default {
  name: 'UploadAccommodations',
  props: {
    message: String,
  },
  components: {
    AccommodationList,
  },
  data() {
    return {
      accommodation: {
        fileName: '',
        rate: '',
        message: '',
      },
    };
  },
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append('file', this.file);
      // Endpoints
      const endpoint1 = '/uploads';
      const endpoint2 = '/accommodations/add';
      try {
        // UPLOAD FILE TO STORAGE DIRECTORY
        await axios.post(api + endpoint1, formData);

        // UPLOAD DATA TO DATABASE
        await axios.post(api + endpoint2, this.accommodation);
        this.$router.push('/admin');
        this.accommodation = {
          fileName: '',
          role: '',
        };
        this.message = 'File and data uploaded successfully.';
      } catch {
        this.message = 'Failed to upload! Please, try again.';
      }
    },
  },
};
</script>
