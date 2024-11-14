<template>
    <div class="Views">Đây là view của file ViewsUser </div>
    <!-- <Test/> -->
    <div class="container" style="margin-bottom:10px;margin-top:10px;">
        <router-view></router-view>
    </div>
    <!-- <footer class="footer" style="margin-bottom:-200px;">
        <div class="container" style="padding:50px;">
            <div class="logo_Small"><img src="../src/assets/logoWeb/bcd_preview_rev_1.png" alt=""></div>
            <div class="cs">
                <a class="a" style="color:white">Chính sách về
                    quyền riêng tư</a>
                <a class="a" style="color:white">Điều khoản
                    dịch vụ</a>
                <a class="a" style="color:white">Giới thiệu
                    công ty</a>
                <a class="a" style="color:white" href="https://www.facebook.com/profile.php?id=100025434997996">Liên hệ
                    chúng tôi</a>
            </div>
            <div class="logo_Big"><img src="../src/assets/logoWeb/abc_preview_rev_1.png" alt=""></div>
        </div>
        <div class="copyright" style="padding-bottom:30px;">
            <p>Bản quyền © 2024 - DoAnCNTT.</p>
        </div>
    </footer> -->

</template>

<script setup>

import { ref } from 'vue';
import { RouterView } from 'vue-router';
import '../style.css';
import Test from '../Views/Home/test.vue';
</script>

<style>
    .footer{
    background-color: #333;

}
</style>