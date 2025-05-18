<script setup>
import { reactive, ref } from 'vue'
import { themeColor, register_user_api_endpoint} from '../data/items'

const form = reactive({
  full_name: '',
  country: '',
  phone_number: '',
  postal_code: '',
  language: '',
  email: '',
  password: '',
  role: '',
  is_admin: false,
})

const errors = reactive({
  full_name: '',
  country: '',
  email: '',
  password: '',
  role: '',
})

const submitted = ref(false)

async function handleSubmit() {
  submitted.value = false
  Object.keys(errors).forEach(key => errors[key] = '')

  let hasError = false

  if (!form.full_name) {
    errors.full_name = 'Full name is required.'
    hasError = true
  }

  if (!form.country) {
    errors.country = 'Country is required.'
    hasError = true
  }

  if (!form.email) {
    errors.email = 'Email is required.'
    hasError = true
  }

  if (!form.password) {
    errors.password = 'Password is required.'
    hasError = true
  }

  if (hasError) return

  //////////////  REGISTRATION ON DB

  try {
      const response = await fetch(register_user_api_endpoint, {
      method: 'POST',
      headers: {
                'Content-Type': 'application/json',
                },
      body: JSON.stringify(form),
       })

  if (response.ok) {
    console.log('User registration submitted:', { ...form })
    submitted.value = true
    Object.keys(form).forEach(key => {
      if (typeof form[key] === 'boolean') form[key] = false
      else form[key] = ''
    })
    return
  }

  // Try to parse error response
  const errorData = await response.json()
  if (response.status === 409 && errorData.error_code === 'USER_DUPLICATE') {
    errors.email = 'Email already registered.'
  } else {
    console.error('Submission failed during registration:', errorData)
    alert(errorData.message || 'An error occurred.')
  }

  } catch (error) {
    console.error('Submission error:', error)
    alert('A network or unexpected error occurred.')
  }
}
</script>


<template>
  <div class="untree_co-hero" id="register-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 offset-lg-3">
          <h2 class="heading" data-aos="fade-up">Register</h2>

          <form @submit.prevent="handleSubmit" data-aos="fade-up" data-aos-delay="100">
            <!-- Full Name -->
            <div class="form-group">
              <label>Full Name</label>
              <input v-model="form.full_name" type="text" class="form-control" />
              <p v-if="errors.full_name" class="error-text">{{ errors.full_name }}</p>
            </div>

            <!-- Country -->
            <div class="form-group">
              <label>Country</label>
              <input v-model="form.country" type="text" class="form-control" />
              <p v-if="errors.country" class="error-text">{{ errors.country }}</p>
            </div>

            <!-- Optional Fields -->
            <div class="form-group">
              <label>Phone Number (optional)</label>
              <input v-model="form.phone_number" type="text" class="form-control" />
            </div>

            <div class="form-group">
              <label>Postal Code (optional)</label>
              <input v-model="form.postal_code" type="text" class="form-control" />
            </div>

            <div class="form-group">
              <label>Language (optional)</label>
              <input v-model="form.language" type="text" class="form-control" />
            </div>

            <!-- Email -->
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" class="form-control" />
              <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label>Password</label>
              <input v-model="form.password" type="password" class="form-control" />
              <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
            </div>

            <!-- Role -->
            <div class="form-group">
              <label>Role</label>
              <input v-model="form.role" type="text" class="form-control" />
              <p v-if="errors.role" class="error-text">{{ errors.role }}</p>
            </div>

            <!-- Admin Checkbox -->
            <div class="form-group">
              <label>
                <input v-model="form.is_admin" type="checkbox" />
                Is Admin
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn btn-primary"
              :style="[{ background: themeColor, borderColor: themeColor }]"
            >
              Submit
            </button>

            <!-- Success Message -->
            <p v-if="submitted" class="success-text" data-aos="fade-up" data-aos-delay="200">
              Registration successful!
            </p>
            <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-text {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.success-text {
  margin-top: 1rem;
  color: green;
  font-weight: bold;
}
</style>
