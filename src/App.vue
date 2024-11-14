<template>
  <header class="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
    <!-- Logo và menu bên trái -->
    <div class="d-flex align-items-center">
      <a href="#" class="me-4">
        <img class="logo img-fluid" src="../src/assets/logoWeb/1.png" alt="Logo" style="max-width: 100px;">
      </a>
      <div class="collapse navbar-collapse d-sm-inline-flex justify-content-between mt-3">
        <ul class="d-flex align-items-center" v-if="role == 'Admin'">
          <li class="nav-item">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Amenity
              </button>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" :to="{ name: 'admin-amenity' }">Index</router-link></li>
                <li><router-link class="dropdown-item" :to="{ name: 'admin-amenity-create' }">Tạo Amenity</router-link>
                </li>
                <!-- <li><router-link class="dropdown-item" :to="{ name: 'admin-amenity-detail' }">Details</router-link></li>
                <li><router-link class="dropdown-item" :to="{ name: 'admin-amenity-edit' }">Edit</router-link></li> -->
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                CarType
              </button>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" :to="{ name: 'admin-cartype' }">Index</router-link></li>
                <li><router-link class="dropdown-item" :to="{ name: 'admin-cartype-create' }">Tạo CarType</router-link>
                </li>

              </ul>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Company
              </button>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" :to="{ name: 'admin-company' }">Index</router-link></li>
                <li><router-link class="dropdown-item" :to="{ name: 'admin-company-create' }">Tạo Company</router-link>
                </li>

              </ul>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                SalePromotion
              </button>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" :to="{ name: 'admin-promotion' }">Index</router-link></li>
                <li><router-link class="dropdown-item" :to="{ name: 'admin-promotion-create' }">Tạo
                    AdminPromotion</router-link></li>

              </ul>
            </div>
          </li>
          <li class="nav-item">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                ReportType
              </button>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" :to="{ name: 'admin-reportType' }">Index</router-link></li>
                <li><router-link class="dropdown-item" :to="{ name: 'admin-reportType-create' }">Tạo
                    ReportType</router-link></li>
              </ul>
            </div>
          </li>

        </ul>
        <ul class="d-flex align-items-center" v-if="role == 'Employee'">
          <li class="nav-item">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                SubmitDriver
              </button>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" :to="{ name: 'admin-amenity' }">Index</router-link></li>
                <li><router-link class="dropdown-item" :to="{ name: 'admin-amenity-create' }">Tạo Amenity</router-link>
                </li>
              </ul>
            </div>
          </li>

        </ul>
        <ul class="d-flex align-items-center" v-if="role == 'User'">
          <li class="nav-item">
            <div class="dropdown">
              <button  class="btn btn-secondary " @click="this.$router.push({ name: 'user-chatbox'});" type="button">
                ChatBox
              </button>
            </div>
          </li>

        </ul>
      </div>
    </div>

    <!-- Nút login bên phải -->
    <div class="d-flex align-items-center">
      <button v-if="!logintrue" @click="HamXoaLogin()" class="btn btn-outline-primary">
        <i>Login</i>
      </button>
      <span class="btn btn-light mt-3" v-if="logintrue" @click="showDrawer()">
        <img style="margin-left:10px;border-radius: 50px;" width="60px" height="60px" class="user-img-home"
          :src="user?.image" alt="User Avatar" />
        {{ user.Image }}
      </span>
    </div>
  </header>
  <Login v-if="login == true" @HamXoaLogin="HamXoaLogin" @HamGetUser="HamGetUser" />
  <div style="background-color: #f6f6f6;">
    <router-view></router-view>
  </div>

  <!-- Nút mở drawer -->


  <!-- Component InfoVue và a-drawer -->
  <InfoVue hidden />
  <a-drawer v-model:open="open" root-class-name="root-class-name" :root-style="{ color: 'blue' }" title="Danh mục"
    placement="right">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <button @click="Logout()">Đăng xuất</button>


    <div v-if="nozTB == true">
      <div class="">
        Bạn có chắc chắn muốn đăng xuất.
        <div class="mt-2 pt-2 border-top">
          <button type="button" class="btn btn-primary btn-sm" @click="Ok()">Take action</button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast"
            @click="nozTB = false">Close</button>
        </div>
      </div>
    </div>

  </a-drawer>

  <!-- <footer class="footer" style="margin-bottom:-200px;">
    <div class="container">
      <div class="logo_Small"><img src="../src/assets/logoWeb/bcd_preview_rev_1.png" alt=""></div>
      <div class="cs">
        <a class="a" asp-area="" asp-controller="Home" asp-action="ChinhSach">Chính sách về quyền tiêng tư</a>
        <a class="a" asp-area="" asp-controller="Home" asp-action="DieuKhoan">Điều khoản dịch vụ</a>
        <a class="a" asp-area="" asp-controller="Home" asp-action="GioiThieu">Giới thiệu công ty</a>
        <a class="a" asp-area="" asp-controller="Home" asp-action="LienHe">Liên hệ chúng tôi</a>

      </div>
      <div class="logo_Big"><img src="../src/assets/logoWeb/abc_preview_rev_1.png" alt=""></div>
    </div>
    <div class="copyright">
      <p>Bản quyền © 2024 - DoAnCNTT.</p>
    </div>
  </footer> -->


</template>
<script setup>
import { ref, provide, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import InfoVue from './components/Info.vue';
import Login from './Views/Authen/Login.vue';

// Mở thông tin người dùng
const open = ref(false);

const showDrawer = () => {
  open.value = true;
};



const route = useRoute()
const carTypes = ref([])
const amenities = ref([])
const companies = ref([])
const isLoading = ref(false)

provide('carTypes', carTypes)
provide('amenities', amenities)
provide('companies', companies)

const GetAllCarTypes = async () => {
  try {
    const response = await axios.get('https://localhost:7265/api/admin/Cartype/GetAll')
    if (response.status === 200 && response.data.data) {
      carTypes.value = response.data.data
      // console.log('Car Types:', carTypes.value)
    } else {
      carTypes.value = []
      console.log('Không có dữ liệu car types')
    }
  } catch (error) {
    console.error('Lỗi lấy dữ liệu car types:', error)
    carTypes.value = []
  }
}

const GetAllAmenities = async () => {
  try {
    const response = await axios.get('https://localhost:7265/api/admin/Amenity/GetAll')
    if (response.status === 200 && response.data.data) {
      amenities.value = response.data.data
      // console.log('Amenities:', amenities.value)
    } else {
      amenities.value = []
      console.log('Không có dữ liệu amenities')
    }
  } catch (error) {
    console.error('Lỗi lấy dữ liệu amenities:', error)
    amenities.value = []
  }
}
const GetAllCompanies = async () => {
  try {
    const response = await axios.get('https://localhost:7265/api/admin/Company/GetAll')
    if (response.status === 200 && response.data.data) {
      companies.value = response.data.data
      // console.log('Companies:', companies.value)
    } else {
      companies.value = []
      console.log('Không có dữ liệu companies')
    }
  } catch (error) {
    console.error('Lỗi lấy dữ liệu companies:', error)
    companies.value = []
  }
}
const fetchAllData = async () => {
  console.log('Fetching all data...')
  isLoading.value = true
  try {
    await Promise.all([
      GetAllCarTypes(),
      GetAllAmenities(),
      GetAllCompanies()
    ])
    console.log('All data fetched successfully')
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

watch(
  () => route.path,
  async (newPath, oldPath) => {
    if (newPath !== oldPath) {
      console.log('Route changed to:', newPath)

      // Chỉ fetch data cần thiết dựa trên route
      if (newPath.includes('/admin/company')) {
        await GetAllCompanies()
      } else if (newPath.includes('/admin/car-types')) {
        await GetAllCarTypes()
      } else if (newPath.includes('/admin/amenities')) {
        await GetAllAmenities()
      } else {
        // Fetch tất cả nếu cần
        await fetchAllData()
      }
    }
  }
)

onMounted(async () => {
  await fetchAllData()
})
</script>
<script>
import AuthenticationService from './Service/api/AuthenticationService';
import { ref, provide, onMounted } from 'vue';
import axios from 'axios';
import UserVM from './Model/UserVM';


// export function message(mess) {
//             this.show = true;
//             this.message = mess;
//         }

export default {
  data() {
    return {
      login: false,
      logintrue: false,
      user: new UserVM(),
      nozTB: false,
      message: "",
      role: ''
    };
  },
  methods: {
    close() {
            this.show = false;
        },
    
    async HamGetUser() {
      const response = await AuthenticationService.getUser();
      this.logintrue = true;
      this.login = false;
      this.user = response;
      this.role = this.user.role;
      sessionStorage.setItem('User', JSON.stringify(this.user));
    },
    HamXoaLogin() {
      if (this.login == true) {
        this.login = false;
        console.log(this.login);
      }
      else {
        this.login = true;
        console.log(this.login);
      }
    },
    Logout() {
      this.nozTB = !this.nozTB;
      console.log("Bấm nút đăng xuất: ", this.nozTB);
    },
    Ok() {
      sessionStorage.removeItem('User');
      sessionStorage.removeItem('authToken');
      window.location.reload();
    }

  },
  created() {
    const userString = sessionStorage.getItem('authToken'); // Lấy chuỗi JSON từ sessionStorage
    if (userString == null) {
      console.log("Chưa đăng nhập");
    }
    else {
      console.log("1");
      this.HamGetUser();
    }

  },
  
  // Kiểm tra xem có token trong sessionStorage hay không
};
</script>
<style>
.nav-item {
  margin-inline: 10px;
}
</style>
