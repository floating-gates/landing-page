<script setup>
import { ref, onMounted } from 'vue';
import { themeColor, themeColorOrange, themeColorWhite } from "../data/items.js";
import mainPhoto from "../assets/images/heat_exchanger.webp";
import LogoOnlyHeader from "./LogoOnlyHeader.vue"

import { create_project, get_project } from '../project_handler/project.js';

import { get_username }               from "../user_handler/user_info.js";
import { verify_jwt }                  from "../user_handler/login.js";

// Dashboard data
const recentProjects = ref([]);
const isAuthenticated = ref(false);
const error = ref('');

const userName = ref('');
const activeProjects = ref(recentProjects.value.length);
const pendingSimulations = ref(2);
const completedSimulations = ref(7);


// // Notifications data
// const notifications = ref([
//   {
//     id: 1,
//     message: 'Simulation completed for Heat Exchanger Model A45',
//     time: '2 hours ago',
//     read: false
//   },
//   {
//     id: 2,
//     message: 'New comment on Pressure Vessel P100',
//     time: '5 hours ago',
//     read: true
//   },
//   {
//     id: 3,
//     message: 'Manufacturing process started for project #1024',
//     time: '1 day ago',
//     read: true
//   }
// ]);

const dashboardTitle = "Manufacturing Hub";
const buttonNewProject = "Create New Project";
const buttonViewAll = "View All Projects";


// Toggle notification read status
const toggleNotification = (id) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = !notification.read;
  }
};



async function create_new_project() {
  const name = prompt("Enter project name:");
  if (!name) return;

  const description = "new";

  try {
    const res = await create_project(name, description);
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Failed to create project');
    }

    const newProject = await res.json();

    // Optional: prepend to the project list for immediate feedback
    recentProjects.value.unshift(newProject);
    activeProjects.value = recentProjects.value.length;

    alert(`Project "${newProject.name}" created successfully!`);
  } catch (err) {
    alert("Error creating project: " + err.message);
  }
    
};


onMounted(async () => {

    isAuthenticated.value = await verify_jwt();

    if (!isAuthenticated.value) {
        window.location.replace("/login");
    }

    try {
        const res = await get_username();
        if (!res.ok) {
            throw new Error('Failed to fetch username');
        }

        userName.value = await res.json()
    } catch (e) {
        error.value = e.message;
    }    
    
    
    try {
        const res = await get_project();
        if (!res.ok) {
            throw new Error('Failed to fetch projects');
        }

        const project_list   = await res.json()
        activeProjects.value = project_list.length
        recentProjects.value = project_list
    } catch (e) {
        error.value = e.message;
    }    
})
</script>

<template>
  <LogoOnlyHeader />
  <div class="untree_co-hero dashboard-section" id="dashboard-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="dots"></div>
          <div class="row">
            <!-- Dashboard Header -->
            <div class="col-lg-12 mb-4">
              <div class="dashboard-header" data-aos="fade-up" data-aos-delay="0">
                <h1 class="heading">{{ dashboardTitle }}</h1>
                <p class="welcome-message">
                  Welcome back, <span :style="{ color: themeColorOrange }">{{ userName }}</span>
                </p>
              </div>
            </div>

            <!-- Dashboard Stats -->
            <div class="col-lg-12 mb-5">
              <div class="row">
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
                  <div class="stats-card">
                    <h3 class="stats-number">{{ activeProjects }}</h3>
                    <p class="stats-label">Active Projects</p>
                  </div>
                </div>
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                  <div class="stats-card">
                    <h3 class="stats-number">{{ pendingSimulations }}</h3>
                    <p class="stats-label">Pending Simulations</p>
                  </div>
                </div>
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
                  <div class="stats-card">
                    <h3 class="stats-number">{{ completedSimulations }}</h3>
                    <p class="stats-label">Completed Simulations</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Dashboard Content -->
            <div class="col-12" data-aos="fade-up" data-aos-delay="400">
              <div class="dashboard-main-content">
                <div class="content-header">
                  <h2 class="section-title">Recent Projects</h2>
                  <div class="action-buttons">
                    <a
                      href="#"
                      class="btn btn-primary"
                      style="margin-right: 5px"
                      :style="[
                        { background: themeColor },
                        { borderColor: themeColor },
                      ]"
                      @click.prevent="create_new_project"
                      >{{ buttonNewProject }}</a
                    >
                  </div>
                </div>

                <!-- Projects List -->
                <div class="projects-list">
                  <div 
                    v-for="project in recentProjects" 
                    :key="project.id" 
                    class="project-item"
                  >
                    <div class="project-info">
                      <h3 class="project-name">{{ project.name }}</h3>
                      <p class="project-status">
                        Status: 
                        <span 
                          :style="{ 
                            color: project.status === 'Simulation Complete' ? themeColorOrange : themeColor}"
                        >
                          {{ project.status }}
                        </span>
                      </p>
                      <p class="project-date">Last updated: {{ project.updated_at }}</p>
                    </div>
                    <div class="project-progress">
                      <div class="progress">
                        <div 
                          class="progress-bar" 
                          role="progressbar" 
                          :style="{ 
                            width: project.progress + '%', 
                            backgroundColor: project.progress === 100 ? themeColorOrange : themeColor 
                          }" 
                          :aria-valuenow="project.progress" 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        >
                          {{ project.progress }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

      <!--       <\!-- Sidebar -\-> -->
      <!--       <div class="col-lg-4" data-aos="fade-up" data-aos-delay="500"> -->
      <!--         <div class="dashboard-sidebar"> -->
      <!--           <\!-- Preview Image -\-> -->
      <!--           <div class="sidebar-image mb-4"> -->
      <!--             <img :src="mainPhoto" alt="3D Model Preview" class="img-fluid" /> -->
      <!--             <div class="image-overlay"> -->
      <!--               <p>Latest 3D Model</p> -->
      <!--             </div> -->
      <!--           </div> -->

      <!--           <\!-- Notifications -\-> -->
      <!--           <div class="notifications-panel"> -->
      <!--             <h2 class="section-title">Notifications</h2> -->
      <!--             <div class="notifications-list"> -->
      <!--               <div  -->
      <!--                 v-for="notification in notifications"  -->
      <!--                 :key="notification.id"  -->
      <!--                 class="notification-item" -->
      <!--                 :class="{ 'unread': !notification.read }" -->
      <!--                 @click="toggleNotification(notification.id)" -->
      <!--               > -->
      <!--                 <div class="notification-content"> -->
      <!--                   <p class="notification-message">{{ notification.message }}</p> -->
      <!--                   <p class="notification-time">{{ notification.time }}</p> -->
      <!--                 </div> -->
      <!--                 <div class="notification-indicator" :class="{ 'read': notification.read }"></div> -->
      <!--               </div> -->
      <!--             </div> -->
      <!--           </div> -->
      <!--         </div> -->
      <!--       </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.dashboard-header {
  margin-bottom: 30px;
}

.welcome-message {
  font-size: 18px;
  margin-top: 10px;
}

.stats-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.stats-number {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  color: v-bind(themeColor);
}

.stats-label {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.dashboard-main-content, .dashboard-sidebar {
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 22px;
  margin: 0;
}

.project-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.project-item:last-child {
  border-bottom: none;
}

.project-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.project-status, .project-date {
  font-size: 14px;
  color: v-bind(themeColor);
  margin-bottom: 5px;
}

.progress {
  height: 8px;
  margin-top: 10px;
}

.sidebar-image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  text-align: center;
}

.notifications-panel {
  margin-top: 20px;
}

.notification-item {
  padding: 12px 0;
  border-bottom: 1px solid v-bind(themeColor);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item.unread {
  background-color: rgba(0, 123, 255, 0.05);
}

.notification-message {
  font-size: 14px;
  margin-bottom: 3px;
}

.notification-time {
  font-size: 12px;
  color: v-bind(themeColor);
  margin: 0;
}

.notification-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: v-bind(themeColor);
}

.notification-indicator.read {
  background-color: v-bind(themeColor);
}

.notification-indicator:not(.read) {
  background-color: v-bind(themeColorOrange);
}

.btn-hover:hover {
  color: v-bind(themeColorWhite);
  background-color: v-bind(themeColorOrange);
}
</style>
