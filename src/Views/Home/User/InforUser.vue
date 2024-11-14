<template>
    <button @click="update = true">Chỉnh sửa thông tin cá nhân</button>
    <button @click="DangKyDriver()">Đăng ký làm tài xế</button>
    <div v-if="error == true">
        Bạn cần cập nhật tài khoản đầy đủ thông tin để trở thành tài xế.
    </div>
    <div class="user" v-if="update == false">
        {{ user.name }}
        <img :src="user.image" alt="">
        {{ user.birthday }}
    </div>
    <div v-if="update == true" class="update">
        <UpdateComfirm @Close="Close" />
    </div>

</template>

<script>
import UserVM from '../../../Model/UserVM';
import UpdateComfirm from './Info/UpdateComfirm.vue';
import AuthenticationService from '../../../Service/api/AuthenticationService';
export default {
    components: {
        UpdateComfirm
    },
    data() {
        return {
            user: new UserVM(),
            update: false,
            error: false
        }
    },
    methods: {
        async DangKyDriver() {
            if (this.user.birthday == null || this.user.cic == null || this.user.image == null
                || this.user.license == null || this.user.phonenumber == null) {
                this.error = true;
                const abc = this;
                setTimeout(function () { abc.error = false; }, 2000);
            }
            else {
                const token = sessionStorage.getItem("authToken");
                const response = await fetch(
                    `https://localhost:7265/api/User/SendSubmitDriver`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }


        },
        Close() {
            this.update = true;
        },
        async getUser() {
            const response = await AuthenticationService.getUser();
            this.logintrue = true;
            this.user = response;
            console.log(this.user);
        }
    },
    created() {
        this.getUser();
    },

}
</script>

<style></style>