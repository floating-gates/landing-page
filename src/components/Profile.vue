<script setup>
import { ref, onMounted } from 'vue';
import { create_subscription, get_subscription, delete_subscription } from '../user_handler/subscription.js';
import { themeColor, tier, price_list } from "../data/items.js";
import Header from "./Header.vue";

const subscription = ref(null);

const subscription_plan = ref('');
const host_address = ref('');
const error = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);
const showConfirmation = ref(false);
const showNewHubForm = ref(true);

async function handleDeleteSubscription() {
    const confirmed = window.confirm('Are you sure you want to delete this subscription?');
    if (!confirmed) return
    
    isLoading.value = true;
    error.value = '';
    isSuccess.value = false;
    
    try {
        const res = await delete_subscription();
        
        if (res.status !== 204) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to delete subscription');
        }
        
        isSuccess.value = true;
        
    } catch (e) {
        console.error('Delete error:', e);
        error.value = e.message;
    } finally {
        isLoading.value = false;
    }

}

function handleCreateSubscription() {
    showConfirmation.value = true;
}

function cancelConfirmation() {
    showConfirmation.value = false;
}

async function confirmSubscription() {
    isLoading.value = true;
    
    try {
        const response = await create_subscription(
            subscription_plan.value,
            host_address.value);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create subscription');
        }
        
        subscription.value = await response.json();
        isSuccess.value = true;
        showConfirmation.value = false;
    } catch (e) {
        console.error('Subscription error:', e);
        error.value = e.message;
    } finally {
        isLoading.value = false;
    }
}

onMounted(async () => {
    try {
        const res = await get_subscription();
        if (!res.ok) {
            throw new Error('Failed to fetch subscription');
        }
        subscription.value = await res.json();
        if (subscription.value.subscription_status === "active") {
            showNewHubForm.value = false
        }
    } catch (e) {
        error.value = e.message;
    }
});
</script>

<template>
<Header :context="'profile'" />

<div class="untree_co-section bg-light" id="user-subscription-section">
  <div class="container">
    
    <div class="row text-center mb-4">
      <div class="col-12">
        <h1 class="heading">Host your Manufacturing Hub</h1>
      </div>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div v-if="showNewHubForm">
        <div class="subscription-card bg-white p-4">
          <div v-if="error" class="error-text">{{ error }}</div>
          <div v-if="isSuccess" class="success-text">Subscription created successfully!</div>
          
          <form @submit.prevent="handleCreateSubscription">
            <div class="form-group">
              <label for="planSelect">What plan do you need?</label>
              <select v-model="subscription_plan" id="planSelect" class="form-control" required>
                <option v-for="([key, value], index) in Object.entries(tier)" :key="key" :value="value">
                  {{ value.charAt(0).toUpperCase() + value.slice(1) }}
                </option>
              </select>
            </div>
            
            <div class="form-group mb-4">
              <label for="hostUrl">Choose an address for your hub:</label>
              <input
                v-model="host_address"
                id="hostUrl"
                type="text"
                class="form-control"
                placeholder="Your HUB name"
                required
                />
            </div>
            
            <button
              type="submit"
              class="btn btn-primary w-100"
              :style="{ background: themeColor, borderColor: themeColor }"
              :disabled="isLoading"
              >
              {{ isLoading ? 'Subscribing...' : 'Subscribe' }}
            </button>
          </form>
          
          <!-- Confirmation Prompt -->
          <div v-if="showConfirmation" class="confirmation-overlay">
            <div class="confirmation-box">
              <p>
                Are you sure you want to subscribe to the
                <strong>{{ subscription_plan }}</strong> plan for
                <strong>{{ host_address }}</strong>?
              </p>
              <button class="btn btn-success" @click="confirmSubscription" :disabled="isLoading">
                {{ isLoading ? 'Processing...' : 'Yes, Proceed' }}
              </button>
              <button class="btn btn-secondary" @click="cancelConfirmation" :disabled="isLoading">
                Cancel
              </button>
            </div>
          </div>
        </div>
        </div>
        
        <!-- Subscription Table -->
        <div class="mt-5" v-if="subscription">
          <h4 class="text-center mb-3" :style="{ color: themeColor }">Your Current Hosting:</h4>
          <div class="table-responsive">
            <table class="table table-sm text-center">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Plan</th>
                  <th>Price (€/month)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a :href="subscription.host_address">
                      {{ subscription.host_address }}
                    </a>
                  </td>
                  <td>{{ subscription.subscription_plan }}</td>
                  <td>{{ Number(subscription.monthly_price).toFixed(2) }}</td>
                  <td>{{ subscription.subscription_status }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="handleDeleteSubscription">
                      Suspend
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>        
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
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error-text {
    color: red;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #fee;
    border: 1px solid #fcc;
    border-radius: 4px;
}

.success-text {
    margin-top: 1rem;
    color: green;
    font-weight: bold;
}

.table th {
    background-color: #f1f1f1;
    font-weight: 600;
    color: #333;
}

.table td, .table th {
    vertical-align: middle;
    padding: 0.5rem;
    border: 1px solid #dee2e6;
}

.confirmation-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.confirmation-box {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 420px;
    width: 90%;
    animation: fadeIn 0.3s ease-out;
}

.confirmation-box p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.confirmation-box button {
    min-width: 120px;
    margin: 0 0.5rem;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}
</style>
