<script setup>
import { ref, onMounted } from 'vue';
import { themeColor, login_user_api_endpoint} from '../data/items'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form state
const login_form = ref({ email: '', password: '' })
const error = ref('')
const isLoading = ref(false)
const isLoggedIn = ref(false)

async function handleLogin() {

  let hasError = false

  // Validate input
  if (!login_form.value.email) {
    error.value = 'Email is required.'
    hasError = true
  }

  if (!login_form.value.password) {
    error.value = 'Password is required.'
    hasError = true
  }

  if (hasError) return

  isLoading.value = true

  try {
    const response = await fetch(login_user_api_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(login_form.value),
      credentials: 'include', 
    })

    if (response.ok) {
      console.log('User logged in:', login_form.value)


    // TODO - Optionally store a JWT or redirect here
    } else {
      const err = await response.json()
      error.value = err.message || 'Invalid credentials.'
    }
  } catch (e) {
    console.error(e)
    error.value = 'Network error or server unavailable.'
  } finally {
    isLoading.value = false
  }
};

const verifyJwt = async () => {
  try {
    const response = await fetch('http://localhost:8000/user/me', {
      credentials: 'include',
    })
    if (response.ok) {
      const user = await response.json()
      isLoggedIn.value = true
      console.log('User is loggedsasasa in:', user)
      router.push('/user/app') // redirect
    } else {
      isLoggedIn.value = false
    }
  } catch (err) {
    console.error('JWT verification failed', err)
    isLoggedIn.value = false
  }
}

onMounted(() => {
  verifyJwt();
});

</script>

<template>
  <h2 class="heading" data-aos="fade-up">Login</h2>

  <div v-if="error" class="error-text">{{ error }}</div>

  <form @submit.prevent="handleLogin" data-aos="fade-up" data-aos-delay="100">
    <div class="form-group">
      <label>Email</label>
      <input
        v-model="login_form.email"
        type="email"
        class="form-control"
        required
        placeholder="Enter your email"
      />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input
        v-model="login_form.password"
        type="password"
        class="form-control"
        required
        placeholder="Enter your password"
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :style="{ background: themeColor, borderColor: themeColor }"
      :disabled="isLoading"
    >
      {{ isLoading ? 'Logging in...' : 'Login' }}
    </button>
  </form>

<div v-if="isLoggedIn" class="success-text" data-aos="fade-up">
  ✅ You are logged in.
</div>
<div v-else class="info-text" data-aos="fade-up">
  🔐 Please log in to continue.
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
