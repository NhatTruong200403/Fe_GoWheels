<template>
    <Message ref="message" />
    <div class="">
        <!-- <div class="listvoucher">
            <div class="modal-content">
                <div class="modal-header"><button type="button" class="close"><span aria-hidden="true">×</span><span
                            class="sr-only"></span></button>
                    <h5>Mã khuyến mãi</h5>
                </div>
                <div class="modal-body">
                    <div class="add-promotion">
                        <div class="custom-input">
                            <div class="wrap-input"><input type="text" placeholder="Nhập mã khuyến mãi"></div>
                        </div>
                        <div class="add-promotion__item ">
                            <div class="wrap-svg"></div>
                            <div class="promotion-info">
                                <p class="name">MI75</p>
                                <p>Giảm 8% (tối đa 80K). <span>Chi tiết</span></p>
                            </div><a class="btn btn-primary">Áp dụng</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="booking" style="padding:20px;" v-if="post != null">
            <div style="display: flex;gap: 20px;">
                <h3 style="font-size:30px;" class="giagiam">{{ post.pricePerHour }}/Giờ</h3>
                <h3 style="font-size:30px;" class="giagiam">{{ post.pricePerDay }}/Ngày</h3>
            </div>
            <form @submit.prevent="submitForm">
                <div class="date-time-form">
                    <div class="form-item" @click="ClickDay()">
                        <label for="startDate1">Ngày nhận xe:</label>
                        <label v-if="booking.recieveOn" for="">{{ booking.recieveOn }}</label>
                        <label v-else for="">Chưa chọn ngày</label>
                    </div>
                    <div class="line"></div>
                    <div class="form-item" @click="ClickDay()">
                        <label for="endDate1">Ngày trả xe:</label>
                        <label v-if="booking.returnOn" for="">{{ booking.returnOn }}</label>
                        <label v-else for="">Chưa chọn ngày</label>
                    </div>
                </div>
                <div v-if="boolHour == true">
                    <!-- <div class="form-check">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" v-model="booking.isRequireDriver" id="Total"
                                :checked="booking.isRequireDriver">
                            Đặt tài xế cho chuyến đi
                        </label>
                    </div> -->
                    <div class="">
                        <label class="circle-checkbox">
                            <input type="checkbox" v-model="booking.isRequireDriver" id="Total"
                                :checked="booking.isRequireDriver">
                            <span class="custom-circle"></span>
                        </label>
                        <label for="">Đặt tài xế cho chuyến đi</label>
                    </div>
                    <!-- <div class="form-group">
                        <label for="Total" class="control-label">Đặt tài xế cho chuyến đi</label>
                        <input v-model="booking.isRequireDriver" id="Total" type="checkbox" :checked="booking.isRequireDriver" class="form-" readonly
                             />
                        <span for="Total" class="text-danger"></span>
                    </div> -->
                    <div class="form-group">
                        <label for="Total" class="control-label">Tổng cộng</label>
                        <input v-model="booking.total" id="Total" class="form-control" readonly
                            style="border:none;background-color:white;" />
                        <span for="Total" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label for="PromotionId" class="control-label">Khuyến mãi: </label>
                        <div class="khuyenmai" v-if="post.postPromotions && post.postPromotions.length > 0"
                            @click="ShowVouCherPost()" @change="userPromotion = 1">
                            <div class="khuyenmai_trai">
                                <label class="circle-checkbox">
                                    <input type="checkbox" disabled :checked="userPromotion == 1">
                                    <span class="custom-circle"></span>
                                </label>
                                <img width="30" height="30" src="../../../../assets/logoWeb/voucherDo.png"
                                    alt="discount-ticket" />
                            </div>
                            <div class="khuyenmai_phai" v-if="post.postPromotionVMs != []">
                                <label style="display: flex;" for="">
                                    <div>Chương trình giảm giá</div>
                                    <img style="width: 15px; height: 15px;"
                                        v-if="post.postPromotions && post.postPromotions.length >= 2"
                                        src="https://img.icons8.com/material-rounded/24/chevron-right.png"
                                        alt="chevron-right" />
                                </label>
                                <label>
                                    <label for=""> Khuyến mãi 30% </label>
                                </label>
                            </div>
                            <div class="khuyenmai_phai" v-else>
                                <label for="">
                                    <div>Bài viết không có khuyến mãi</div>
                                </label>
                                <label></label>
                            </div>
                        </div>
                        <div class="khuyenmai" @change="userPromotion = 2" @click="ShowVouCherAdmin()">
                            <div class="khuyenmai_trai">
                                <label class="circle-checkbox">
                                    <input type="checkbox" disabled :checked="userPromotion == 2">
                                    <span class="custom-circle"></span>
                                </label>
                                <img width="30" height="30" src="../../../../assets/logoWeb/voucherXanh.png"
                                    alt="discount-ticket" />
                            </div>
                            <div class="khuyenmai_phai">
                                <label v-if="userKMAd == false" style="display: flex;" for="">
                                    <div>Chương trình giảm giá</div>
                                    <img style="width: 15px; height: 15px;"
                                        src="https://img.icons8.com/material-rounded/24/chevron-right.png"
                                        alt="chevron-right" />
                                </label>
                                <label v-else style="display: flex;justify-content: space-between;">
                                    <label v-if="promotion.discountValue < 1" for="" style="left: 0 !important;"> Khuyến
                                        mãi
                                        {{ promotion.discountValue * 100 }}% <label
                                            @click.stop="XoaKM()">x</label></label>
                                    <label v-else for="" style="left: 0 !important;"> Khuyến mãi {{
                                        format(promotion.discountValue) + "K" }} <label
                                            @click.stop="XoaKM()">x</label></label>
                                    <label for="">200304</label>
                                </label>
                            </div>

                        </div>
                        <!-- <div>
                        <div>
                            <input type="checkbox"> <img width="30" height="30"
                                src="../../../../assets/logoWeb/voucherXanh.png" alt="discount-ticket" />
                        </div>
                        <div>
                            <label for="">Khuyến mãi </label>
                        </div>
                    </div> -->
                    </div>
                    <div class="form-group">
                        <label asp-for="Total" class="control-label">Thành tiền</label>
                        <input v-model="booking.finalValue" class="form-control" id="finalValue" readonly
                            style="border:none;background-color:white;" />
                        <span for="FinalValue" class="text-danger"></span>
                    </div>
                    <div class="form-group">
                        <label asp-for="Total" class="control-label">Đặt cọc</label>
                        <input v-model="booking.prePayment" class="form-control" id="prePayment" readonly
                            style="border:none;background-color:white;" />
                        <span for="PrePayment" class="text-danger"></span>
                    </div>
                    <div class="form-group" v-if="remaining > 0">
                        <label asp-for="Total" class="control-label">Còn lại </label>
                        <input :value="remaining" class="form-control" id="prePayment"
                            style="border:none;background-color:white;" readonly />
                        <span for="PrePayment" class="text-danger"></span>
                    </div>
                </div>
                <div class="form-group">
                    <input style="margin-top:20px;" type="submit" value="Thuê xe" class="btn btn-primary w" />
                </div>
            </form>
        </div>
    </div>


</template>

<script>
import axios from 'axios';
import PostVM from '../../../../Model/PostVM';
import BookingDto from '../../../../DTOs/BookingDto';
import PromotionVM from '../../../../Model/PromotionVM';
import Message from '../../../../Message.vue';
import PromotionService from '../../../../Service/api/PromotionService';
import PostService from '../../../../Service/api/PostService';
import BookingService from '../../../../Service/api/BookingService';
export default {
    components: {
        Message
    },
    props: {
        postId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            authen: false,
            post: new PostVM(), // đã có khi bắt đầu chạy
            booking: new BookingDto(),
            promotion: new PromotionVM(),
            hour: false,
            boolHour: false,
            sumhour: 0,
            userKMAd: false,
            userPromotion: 0,
            remaining: 0
        }
    },
    methods: {
        ToTal() {
            //this.booking.total;// tổng tiền
            //this.booking.finalValue; // sau khi trừ km
            //this.booking.prePayment; // tiền cần cọc
            //this.remaining; // còn lại
            if (this.post != []) {
                if (this.sumhour % 24 == 0) {
                    this.booking.total = (this.sumhour / 24) * this.post.pricePerDay;
                }
                else {
                    this.booking.total = this.sumhour * this.post.pricePerHour;
                }
                if (this.promotion != null && this.promotion.discountValue > 0) {
                    if (this.promotion.discountValue > 1) {
                        this.booking.finalValue = this.booking.total - this.promotion.discountValue;
                    }
                    else {
                        this.booking.finalValue = this.booking.total * this.promotion.discountValue;
                    }
                }
                else {
                    this.booking.finalValue = this.booking.total;
                }
                this.booking.prePayment = this.booking.finalValue / 2;
                this.remaining = this.booking.finalValue / 2;
                if (this.booking.finalValue < 0) {
                    this.booking.finalValue = 0;
                    this.booking.prePayment = 0;
                    this.remaining = 0;
                }

            }
        },

        async submitForm() {
            console.log("Sau khi submit: ", this.booking);
            if (this.boolHour == false && this.authen == true) {
                this.open("Vui lòng chọn giờ đặt xe");
                return;
            }
            if (this.authen == false) {
                this.open("Vui lòng đăng nhập để đặt xe")
            }
            if (this.boolHour !== false && this.authen !== false) {
                //bắt đầu gửi đi 
                const response = await BookingService.AddBooking(this.booking);
                if(response.ok){
                    this.open("Đặt xe thành công");
                }
            }
        },

        open(message) {
            this.$refs.message.ShowMess(message);
        },

        // Voucher khi đã chọn
        async UserVoucher(id, bien) {
            await this.fetchPromotions(id);
            this.userPromotion = bien;
            this.booking.promotionId = id;
            this.booking.discountValue = this.promotion.discountValue;
            this.ToTal();
            if (bien == 2) {
                this.userKMAd = true;
            }
        },
        ShowVouCherPost() {
            this.$emit('ShowVouCher', this.postId);
        },
        ShowVouCherAdmin() {
            this.$emit('ShowVouCher', -1);
        },
        // Nhận được ngày nhận và ngày trả
        
        async getDayHour(start, end) {
            this.booking.recieveOn = start;
            this.booking.returnOn = end;
            this.boolHour = true;
            const startDate = new Date(start);
            const endDate = new Date(end);
            // Tính chênh lệch thời gian giữa hai ngày (theo milliseconds)
            const differenceInMilliseconds = endDate - startDate;
            console.log("Diff: ",differenceInMilliseconds);
            // Chuyển đổi từ milliseconds sang giờ
            this.sumhour = differenceInMilliseconds / (1000 * 60 * 60);
            console.log("Sum hour: ", this.sumhour);
            this.ToTal();
        },
        ClickDay() {
            this.hour = !this.hour;
            this.$emit('requestAction', this.hour);
        },


        // lấy bài viết
        async fetchPost() {
            const id = this.$route.params.id;
            //console.log("Id của bài post: ", id);
            try {
                const response = await axios.get(`https://localhost:7265/api/User/Post/GetByIdAsync/${id}`)
                this.post = response.data.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        //lấy khuyến mãi
        async fetchPromotions(id) {
            try {
                const response = await PromotionService.getPromotion(id);
                if (response && response.data) {
                    this.promotion = response.data;
                } else {
                    console.warn("No promotion data received");
                }
            } catch (error) {
                console.error("Error fetching promotion:", error);
                throw error; // Re-throw để có thể bắt ở UserVoucher
            }
        },
        XoaKM() {
            this.promotion = null;
            this.userPromotion = 0;
            this.userKMAd = false;
            this.booking.promotionId = null;
            this.booking.discountValue = 0;
            this.ToTal();
        },
        format(price) {
            if (price > 1) {
                return price / 1000;
            }
        }
    },
    async created() {
        await this.fetchPost();
        this.booking.postId = this.post.id;
        console.log("Post Create: ", this.post);
        const userString = sessionStorage.getItem('User');
        if (userString != null) {
            this.authen = true;
        }

    },

}
</script>

<style>
/* .listvoucher{
    position: absolute;
    width: 100%;
    height: 500px;
} */


.circle-checkbox input[type="checkbox"] {
    display: none;
}

/* Tạo một hình tròn */
.circle-checkbox .custom-circle {
    display: inline-block;
    width: 24px;
    /* Kích thước hình tròn */
    height: 24px;
    border-radius: 50%;
    /* Tạo viền tròn */
    border: 2px solid #000;
    /* Viền của hình tròn */
    cursor: pointer;
    position: relative;
}

/* Hiệu ứng khi được chọn */
.circle-checkbox input[type="checkbox"]:checked+.custom-circle {
    background-color: #000;
    /* Màu nền khi được chọn */
    border-color: #000;
    /* Đổi màu viền nếu cần */
}

/* Thêm dấu check bên trong */
.circle-checkbox input[type="checkbox"]:checked+.custom-circle::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    /* Kích thước dấu check */
    height: 10px;
    background-color: #fff;
    /* Màu của dấu check */
    border-radius: 50%;
    /* Dấu check cũng là hình tròn */
    transform: translate(-50%, -50%);
    /* Căn giữa dấu check */
}


















.khuyenmai {
    width: 100%;
    height: 50px;
    display: flex;
}

.khuyenmai_trai {
    padding: 10px 0;
    width: 20%;
}

.khuyenmai_trai img {
    height: 30px !important;
}

.khuyenmai_phai {
    padding: 10px;
    width: 80%;
}




.listvoucher {}
</style>
