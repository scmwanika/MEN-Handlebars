import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import UploadEmployee from '@/components/AdminPanel/UploadEmployee.vue';
import GuestForm from '@/components/GuestForm.vue';
import ReviewForm from '@/components/ReviewForm.vue';
import UploadActivity from '@/components/AdminPanel/UploadActivity.vue';
import UploadAccommodation from '@/components/AdminPanel/UploadAccommodation.vue';
import UploadTrainingProgram from '@/components/AdminPanel/UploadTrainingProgram.vue';

// RENDERS PROPS MESSAGE WHEN PASSED
describe('UploadEmployee.vue', () => {
  it('renders props.message when passed', () => {
    const message = 'new message';
    const wrapper = shallowMount(UploadEmployee, {
      propsData: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
});

// RENDERS PROPS MESSAGE WHEN PASSED
describe('GuestForm.vue', () => {
  it('renders props.message when passed', () => {
    const message = 'new message';
    const wrapper = shallowMount(GuestForm, {
      propsData: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
});

// RENDERS PROPS MESSAGE WHEN PASSED
describe('ReviewForm.vue', () => {
  it('renders props.message when passed', () => {
    const message = 'new message';
    const wrapper = shallowMount(ReviewForm, {
      propsData: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
});

// RENDERS PROPS MESSAGE WHEN PASSED
describe('UploadActivity.vue', () => {
  it('renders props.message when passed', () => {
    const message = 'new message';
    const wrapper = shallowMount(UploadActivity, {
      propsData: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
});

// RENDERS PROPS MESSAGE WHEN PASSED
describe(' UploadAccommodation.vue', () => {
  it('renders props.message when passed', () => {
    const message = 'new message';
    const wrapper = shallowMount(UploadAccommodation, {
      propsData: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
});

// RENDERS PROPS MESSAGE WHEN PASSED
describe('UploadTrainingProgram.vue', () => {
  it('renders props.message when passed', () => {
    const message = 'new message';
    const wrapper = shallowMount(UploadTrainingProgram, {
      propsData: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
});
