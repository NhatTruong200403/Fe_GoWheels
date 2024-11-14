<template>
    <div class="infor">
        <div class="sidebar_left">

            <div class="name_img">GoWheels Xin chào</div>

            <hr width="100%" style="margin-block: 10px;color: #ccc;">

            <button style="margin-top: 0;" :class="{ click: isActiveRoute('user-profile-inforuser') }"
                @click="goToRoute('user-profile-inforuser')">
                Thông tin cá nhân
            </button>
            <button :class="{ click: isActiveRoute('user-profile-mycar') }"
                @click="goToRoute('user-profile-mycar')">
                Xe cho thuê của bạn
            </button>
            <button :class="{ click: isActiveRoute('user-profile-historyInvoice') }"
                @click="goToRoute('user-profile-historyInvoice')">
                Lịch sử giao dịch
            </button>
            <button :class="{ click: isActiveRoute('user-profile-historyBooking') }"
                @click="goToRoute('user-profile-historyBooking')">
                Lịch sử đặt xe
            </button>
            <button :class="{ click: isActiveRoute('user-profile-favoriteList') }"
                @click="goToRoute('user-profile-favoriteList')">
                Danh sách yêu thích
            </button>
            <button :class="{ click: isActiveRoute('user-profile-voucherList') }"
                @click="goToRoute('user-profile-voucherList')">
                Danh sách khuyến mãi
            </button>
            <button :class="{ click: isActiveRoute('user-profile-changEmail') }"
                @click="goToRoute('user-profile-changEmail')">
                Thay đổi Email
            </button>
            <button :class="{ click: isActiveRoute('user-profile-changPassword') }"
                @click="goToRoute('user-profile-changPassword')">
                Thay đổi password
            </button>
            <button :class="{ click: isActiveRoute('user-profile-mycar') }" @click="goToRoute('user-profile-mycar')">
                Yêu cầu xóa tài khoản
            </button>
            <button :class="{ click: false }">Đăng xuất</button>
        </div>
        <div class="sidebar_right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 0,
            user: []
        }
    },
    methods: {
        // Hàm kiểm tra nếu route hiện tại là đường dẫn đã chọn
        isActiveRoute(routeName) {
            return this.$route.name === routeName;
        },
        // Hàm chuyển hướng đến route cụ thể
        goToRoute(routeName) {
            this.$router.push({ name: routeName });
        }
    },
    created() {
        const userString = sessionStorage.getItem('User');
        this.user = JSON.parse(userString);
    },
}
</script>

<style>
.name_img {
    padding: 10px 20px;
    margin-top: 5px;
    font-size: 18px;
    color: #ccc;
}

.infor {
    margin-top: 1px;
    width: 100%;
    display: flex;
    height: 643px;
}

.sidebar_left {
    width: 25%;
}

.sidebar_left button {
    width: 100%;
    text-align: left;
    padding: 15px 10px;
    background-color: #f6f6f6;
    color: #ccc;
    border: none;
}

.sidebar_left button.click {
    background-color: #ccc;
    color: #333;
}

.sidebar_right {
    width: 75%;
    background-color: blue;
    height: 100%;
    overflow-y: auto;
}
</style>










































<!-- <template>
    <div class="infor">
        <div class="sidebar_left">

            <div class="name_img">GoWheels Xin chào</div>

            <hr width="100%" style="margin-block: 10px;color: #ccc;">

            <button style="margin-top: 0;" :class="{ click: page == 0 }"
                @click="page = 0; this.$router.push({ name: 'user-profile-inforuser' });">
                Thông tin cá nhân
            </button>
            <button :class="{ click: page == 1 }" 
                @click="page = 1; this.$router.push({ name: 'user-profile-mycar' });">
                Xe cho thuê của bạn
            </button>
            <button :class="{ click: page == 2 }"
                @click="page = 2; this.$router.push({ name: 'user-profile-historyInvoice' });">
                Lịch sử giao dịch
            </button>
            <button :class="{ click: page == 3 }"
                @click="page = 3; this.$router.push({ name: 'user-profile-historyBooking' });">
                Lịch sử đặt xe
            </button>
            <button :class="{ click: page == 4 }"
                @click="page = 4; this.$router.push({ name: 'user-profile-favoriteList' });">
                Danh sách yêu thích
            </button>
            <button :class="{ click: page == 5 }"
                @click="page = 5; this.$router.push({ name: 'user-profile-voucherList' });">
                Danh sách khuyến mãi
            </button>
            <button :class="{ click: page == 6 }"
                @click="page = 6; this.$router.push({ name: 'user-profile-changEmail' });">
                Thay đổi Email
            </button>
            <button :class="{ click: page == 7 }"
                @click="page = 7; this.$router.push({ name: 'user-profile-changPassword' });">
                Thay đổi password
            </button>
            <button :class="{ click: page == 8 }" @click="page = 8; this.$router.push({ name: 'user-profile-mycar' });">
                Yêu cầu xóa tài khoản
            </button>
            <button :class="{ click: page == 9 }">Đăng xuất</button>
        </div>
        <div class="sidebar_right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            page: 0,
            user: []
        }
    },
    methods: {
    },
    created() {
        const userString = sessionStorage.getItem('User');
        this.user = JSON.parse(userString);
    },

}
</script>

<style>
.name_img {
    padding: 10px 20px;
    margin-top: 5px;
    font-size: 18px;
    color: #ccc;
}

.infor {
    margin-top: 1px;
    width: 100%;
    display: flex;
    height: 643px;
}

.sidebar_left {
    width: 25%;
    /* background-color: #333; */
}

.sidebar_left button {
    width: 100%;
    text-align: left;
    padding: 15px 10px;
    background-color: #f6f6f6;
    color: #ccc;
    /* border: 0.2px solid #ccc; */
    border: none;
    float: left;
}

.sidebar_left router-link {
    width: 100%;
    text-align: left;
    padding: 15px 10px;
    background-color: #f6f6f6;
    color: #ccc;
    /* border: 0.2px solid #ccc; */
    border: none;
    float: left;
}

.sidebar_left button.click {
    background-color: #ccc;
    color: #333;
}

.sidebar_right {
    width: 75%;
    background-color: blue;
    height: 100%;
    overflow-y: auto;
}
</style> -->