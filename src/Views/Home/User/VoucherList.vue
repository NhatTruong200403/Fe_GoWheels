<template>
    <div>
        <div v-if="page == 0">
            <label>Danh sách khuyến mãi của bạn</label>
            <button @click="page = 1">Tạo khuyến mãi </button>
            <ul v-if="promotions != null">
                <li v-for="item in promotions" :key="item">
                    <div>
                <li>GIFT</li>
                <li>VOU</li>
                <li>CHER</li>
        </div>
        <div>
            <!-- {{ item }} -->
            <div>
                <label for="">{{ item.content }}</label>
                <label for="">Thời gian hết hạn: {{ format(item.expiredDate) }}</label>
            </div>
            <div>
                Edit
            </div>
        </div>

        </li>
        </ul>
        <ul v-else>
            <li>Danh sách khuyến mãi trống</li>
        </ul>
    </div>






    <div v-if="page == 1">
        <Create @QuayLai="QuayLai" />
    </div>
    <div v-if="page == 2" :Id="heh">
        <Edit />
    </div>
    <div v-if="page == 3">
        <Use />
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import Create from './Voucher/CreateVoucher.vue';
import Edit from './Voucher/EditVoucher.vue';
import Use from './Voucher/UseVoucher.vue';
import PostPromotionService from '../../../Service/api/PostPromotionService';
export default {
    props: {
    },
    components: {
        Create, Edit, Use
    },
    data() {
        return {
            page: 0,
            promotions: null,
        }
    },
    methods: {
        format(dateString) {
            const date = new Date(dateString);

            // Lấy giờ và phút, đảm bảo định dạng 2 chữ số
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            // Lấy ngày, tháng, và năm, đảm bảo định dạng 2 chữ số
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            // Kết hợp các phần lại theo định dạng yêu cầu
            return `${hours}:${minutes} ${day}-${month}-${year}`;
        },
        QuayLai(page) {
            this.page = page;
            this.getAllPromotion();
        },
        async getAllPromotion() {
            const token = sessionStorage.getItem("authToken");
            try {
                const response = await PostPromotionService.getAllPromotion();
                this.promotions = response.data;
                console.log(response.data);
            }
            catch (error) {
                console.log(error);
            }
        },

    },
    created() {
        this.getAllPromotion();
    },

}
</script>

<style></style>