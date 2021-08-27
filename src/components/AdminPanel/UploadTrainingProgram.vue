<template>
  <div class="flex-container">
    <div class="flex-component-left"><TrainingList /></div>

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
            v-model="training.fileName"
          />
        </div>

        <div class="form-group">
          <textarea
            rows="3"
            placeholder="description"
            v-model="training.description"
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
import TrainingList from '@/components/TrainingPrograms/TrainingList.vue';
import axios from 'axios';

const api = 'http://localhost:3000';
export default {
  name: 'UploadTrainings',
  props: {
    message: String,
  },
  components: {
    TrainingList,
  },
  data() {
    return {
      training: {
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
      const endpoint2 = '/trainings/add';
      try {
        // UPLOAD FILE TO STORAGE DIRECTORY
        await axios.post(api + endpoint1, formData);

        // UPLOAD DATA TO DATABASE
        await axios.post(api + endpoint2, this.training);
        this.$router.push('/admin');
        this.training = {
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
