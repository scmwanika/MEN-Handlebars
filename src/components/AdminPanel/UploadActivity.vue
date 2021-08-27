<template>
  <div class="flex-container">
    <div class="flex-component-left"><ActivityList /></div>

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
            v-model="activity.fileName"
          />
        </div>

        <div class="form-group">
          <textarea
            rows="3"
            placeholder="description"
            v-model="activity.description"
            required
          >
          </textarea>
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
import ActivityList from '@/components/Visit/ActivityList.vue';
import axios from 'axios';

const api = 'http://localhost:3000';
export default {
  name: 'UploadActivities',
  props: {
    message: String,
  },
  components: {
    ActivityList,
  },
  data() {
    return {
      activity: {
        fileName: '',
        description: '',
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
      const endpoint2 = '/activities/add';
      try {
        // UPLOAD FILE TO STORAGE DIRECTORY
        await axios.post(api + endpoint1, formData);

        // UPLOAD DATA TO DATABASE
        await axios.post(api + endpoint2, this.activity);
        this.$router.push('/admin');
        this.activity = {
          fileName: '',
          description: '',
        };
        this.message = 'File and data uploaded successfully.';
      } catch {
        this.message = 'Failed to upload! Please, try again.';
      }
    },
  },
};
</script>
