<template>
    <div>
        <div v-show="hour" class="voucher">
            <Test class="test" @GetDay="GetDay" @Close="Close" />
        </div>
        <div v-show="voucher" class="voucher">
            <ListVoucher ref="voucher" @UserVoucher="UserVoucher" @Close="Close" />
        </div>

        <div class="container" :class="{ 'block': hour !== false || voucher !== false }"
            :aria-hidden="hour == false && voucher == false">
            <div v-if="post">
                <div v-if="post.isDisabled == true"
                    style="padding:10px 20px; background-color:crimson; color:white; border:1px solid white;text-align:center;border-radius:15px;">
                    <p>Bài đăng đã bị khóa</p>
                </div>

                <div style="margin-top:20px;">
                    <div class="cover-car-container">
                        <div class="main-img">
                            <div class="cover-car-item">
                                <img loading="lazy" alt="" :src="post.Image">
                            </div>
                        </div>
                        <div class="sub-img">

                            <div class="cover-car-item" v-for="(image, index) in post.imageList" :key="index">
                                <img loading="lazy" :src="image" alt="">
                            </div>

                        </div>
                    </div>
                    <div class="cover-car-container" style="margin-top:20px;">
                        <div class="main-img">
                            <div style="display:flex;justify-content: space-between;align-items: center;">
                                <div>

                                    <span style="font-size:35px;font-weight:bold;">{{ post.name }}</span>
                                    <ul style="display:flex;">

                                        <li v-if="post.rideNumber > 0" style="display:flex;margin-left:-35px;">
                                            <img width="24px" src="../../../../assets/logoWeb/star-s-fill.svg" alt="">
                                            <div style="margin-top:0px;font-size:18px;margin-right:10px;">5.0</div>
                                        </li>

                                        <li v-if="post.rideNumber > 0" style="display:flex;">
                                            <img width="24px" src="../../../../assets/logoWeb/luggage-cart-line.svg"
                                                alt="">
                                            <div style="margin-top:0px;font-size:18px;margin-right:15px;">{{
                                                post.rideNumber }} chuyến
                                            </div>
                                        </li>

                                        <li v-else style="margin-right:15px;">
                                            Chưa có chuyến
                                        </li>



                                        <li>
                                            {{ post.rentLocation }}
                                            <!-- @Html.DisplayFor(model => model.RentLocation) -->
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <!-- tym chưa đăng nhập -->
                                    <a v-if="user == null" class="nav-normal azzzz"><img
                                            src="../../../../assets/logoWeb/timtrong.png" /></a>

                                    <!-- Đã đăng nhập nhưng chính là chủ bài viết -->
                                    <div v-if="user && user.userId === post.createdById">
                                        <router-link :to="{ name: 'user-post-edit', params: { id: post.id } }">
                                            <a asp-action="Edit" asp-route-id="@Model?.Id"
                                                style="padding:15px 20px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);border-radius:5px;"><img
                                                    style="width:20px;" src="../../../../assets/logoWeb/edit.png" />
                                                Chỉnh
                                                sửa</a>
                                        </router-link>

                                        <a id="deleteButton"
                                            style="padding:15px 20px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);border-radius:5px;">
                                            <img style="width:20px;" src="../../../../assets/logoWeb/delete.png" /> Xóa
                                            bài
                                        </a>

                                        <div id="deleteConfirmation" class="delete none">
                                            <div style="padding:20px 35px; border:1px solid black;border-radius:10px;">
                                                <h3>Bạn có chắc chắn muốn xóa bài đăng</h3>
                                                <form asp-action="Delete">
                                                    <input type="hidden" asp-for="@Model.Id" />
                                                    <input type="submit" value="Xóa bài đăng" class="btn btn-danger" />
                                                    <a class="btn btn-danger" id="delete"
                                                        style="background-color:gray;">Không</a>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Đã đăng nhập nhưng là khách -->
                                    <div v-if="user && user.userId != post.createdById">
                                        <a v-if="favorite == true" class="nav-normal azzzz" @click="RemoveFavorite()" ><img
                                                src="../../../../assets/logoWeb/fulltim.png" />
                                        </a>

                                        <a v-else class="nav-normal azzzz" @click="AddFavorite()"><img
                                                src="../../../../assets/logoWeb/timtrong.png" />
                                        </a>
                                        <!-- Report bài viết -->
                                        <router-link>
                                            <a asp-area="Employee"
                                                style="padding:15px 20px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);border-radius:5px;"
                                                asp-controller="Reports" asp-action="Create"
                                                asp-route-id="@Model?.Id"><img style="width:20px;"
                                                    src="../../../../assets/logoWeb/error.png" /> Báo
                                                cáo</a>
                                        </router-link>

                                    </div>




                                </div>

                            </div>
                            <hr style="opacity:0.3;" />
                            <div>
                                <div style="font-weight:bold;margin-block:5px;" class="font">
                                    Đặc điểm
                                </div>
                                <ul class="grid-li">
                                    <li>
                                        <div><img style="width:35px;" src="../../../../assets/logoWeb/luggage.png" />
                                        </div>
                                        <div>Số chổ</div>
                                        <div style="font-weight:bold;">
                                            <!-- @Html.DisplayFor(model => model.Seat) -->
                                            {{ post.seat }}
                                        </div>
                                    </li>
                                    <li>
                                        <div><img style="width:35px;" src="../../../../assets/logoWeb/gearbox.png" />
                                        </div>
                                        <div>Hộp số</div>
                                        <div>

                                            <div v-if="post.gear" style="font-weight:bold;">Số tự động</div>

                                            <div v-else style="font-weight:bold;">Số sàn</div>

                                        </div>
                                    </li>
                                    <li>
                                        <div><img style="width:35px;" src="../../../../assets/logoWeb/fuel.png" /></div>
                                        <div>Nhiên liệu</div>
                                        <div style="font-weight:bold;">
                                            {{ post.fuel }}
                                            <!-- @Html.DisplayFor(model => model.Fuel) -->
                                        </div>
                                    </li>
                                    <li>
                                        <div><img style="width:35px;" src="../../../../assets/logoWeb/car-engine.png" />
                                        </div>
                                        <div>Nhiên liệu tiêu hao</div>
                                        <div style="font-weight:bold;">
                                            {{ post.fuelConsumed }} lít/100km
                                            <!-- @Html.DisplayFor(model => model.FuelConsumed) lít/100km -->
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <hr style="opacity:0.3;" />

                            <div>
                                <div style="font-weight:bold;" class="mar font">Mô tả</div>
                                <div>
                                    Loại xe: {{ post.carTypeName }}
                                </div>
                                <div>
                                    Hãng xe: {{ post.companyName }}
                                </div>

                                <div v-if="post.hasDriver">
                                    Xe có tài xế
                                </div>

                                <div>
                                    {{ post.description }}
                                    <!-- @Html.DisplayFor(model => model.Description) -->
                                </div>
                            </div>

                            <hr style="opacity:0.3;" />

                            <div>
                                <div style="font-weight:bold;" class="font">
                                    Các tiện nghi khác
                                </div>
                                <div class="grid-li">

                                    <div v-for="item in post.postAmenities" :key="item" class="item1"
                                        style="padding:10px;">
                                        <img :src="item.amenityIconImage" style="width:24px;margin-right:10px;"
                                            :alt="item.amenityName" />
                                        <span>{{ item.amenityName }}</span>
                                    </div>
                                </div>
                            </div>

                            <hr style="opacity:0.3;" />

                            <div>
                                <div style="font-weight:bold;" class="font">
                                    Giấy tờ thuê xe ?
                                </div>
                                <div class="mar">
                                    <div class="flex-container">
                                        <div class="small-div"></div>
                                        <div class="large-div" style="padding:10px 20px;">
                                            <span> ! Chọn 1 trong 2 hình thức</span>
                                            <div style="margin-left:10px;margin-block:5px;font-weight:600;">
                                                <img style="width:35px;margin-right:10px;"
                                                    src="../../../../assets/logoWeb/driving-license.png" />
                                                GPLX & CCCD gắn chip(Đối chiếu)
                                            </div>
                                            <div style="margin-left:10px;font-weight:600;">
                                                <img style="width:35px;margin-right:10px;"
                                                    src="../../../../assets/logoWeb/gplx_passport.png" />
                                                GPLX(Đối chiếu) & Passport(Giữ lại)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div>
                                <div class="font">
                                    Chính sách hủy chuyến : <a asp-area="" asp-controller="Home" asp-action="Dieukhoan"
                                        class="font1">Đọc điều khoản tại đây.</a>
                                </div>
                            </div>



                            <hr style="opacity:0.3;" />
                            <!-- <div>
                        @{
                        var user = await UserManager.FindByIdAsync(Model.CreatedById!);
                        }
                        <span>Chủ xe</span>
                        <div style="display:flex;">
                            <img src="@Url.Content(user!.Image)" style="width:70px;height:70px;border-radius:50%;" />
                            <div style="margin-left:20px;">
                                @{
                                if(User.IsInRole("Admin"))
                                {
                                <a asp-area="Admin" asp-controller="Customers" asp-action="Details"
                                    asp-route-id="@user.Id">@user.Name</a>
                                }
                                else
                                {
                                <a style="font-weight:bold;font-size:25px;" asp-area="" asp-controller="Home"
                                    asp-action="FindUser" asp-route-thue="0" asp-route-id="@user.Id">@user.Name</a>
                                }

                                }
                                @* <span style="font-weight:bold;font-size:25px;">@user.Name</span> *@

                            </div>

                        </div>
                        <!-- <div>
                            <ul class="grid-li">
                                <li>
                                    <div>
                                        Tỉ lệ phản hồi
                                    </div>
                                    <div>
                                        100%
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Thời gian phản hồi
                                    </div>
                                    <div>
                                        5 phút
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Tỉ lệ đồng ý
                                    </div>
                                    <div>
                                        100%
                                    </div>
                                </li>
                            </ul>
                        </div>  -->

                            <div style="margin-top:15px;">

                                <h3 v-if="post.avgRating == 0">Chưa có đánh giá.</h3>

                                <h3 v-else>Đánh giá tổng: {{ post.avgRating.ToString("F1") }} <img width="36px"
                                        src="../../../../assets/logoWeb/star-s-fill.svg" alt="" /></h3>

                            </div>
                            <div>
                                <!-- <div class="comment">

                                <div v-if="post.ratings.length > 0">
                                    <div v-for="item in post.ratings" :key="item"
                                        style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);margin:10px;padding:30px;background-color: #fef7f0;border-radius:5px;">

                                        <div class="comment-avatar">
                                            @{
                                            var userComment = await UserManager.FindByIdAsync(comment.CreatedById);
                                            if (userComment != null)
                                            {
                                            <div style="display:flex;justify-content:space-between;">
                                                <div style="display:flex;">
                                                    <img src="@Url.Content(@userComment.Image)" alt="No Img" />
                                                    <div style="margin-left:20px;">
                                                        <p>@userComment.Name</p>
                                                        <p style="margin-top:-20px;">
                                                            @for (int i = 0; i < comment.Point; i++) { <img
                                                                class="start" src="@Url.Content("
                                                                ~/images/logo/star-s-fill.svg")" alt="">
                                                                }
                                                        </p>

                                                    </div>
                                                </div>
                                                <input style="border:none;padding:0px;margin-top:-10px;"
                                                    value="@Model.CreatedOn" disabled />
                                            </div>
                                            }
                                            }
                                        </div>
                                        <div>
                                            <p style="font-size:20px;">
                                                @comment.Comment
                                            </p>
                                        </div>
                                        @if (currentUser != null && currentUser!.Id == comment.UserId)
                                        {
                                        <a asp-action="Delete"
                                            style="background-color: cadetblue;border-radius:5px;color:white;padding:10px 20px;"
                                            asp-controller="Rating" asp-route-id="@comment.Id"
                                            asp-route-postId="@Model.Id">Xóa bình luận</a>
                                        }
                                    </div>
                                </div>


                              
                                <p v-else>Không có đánh giá.</p>
                               



                        </div> -->


                            </div>
                        </div>
                        <div class="sub-img">
                            <Booking ref="booking" :postId="post.id" @requestAction="ShowHour"
                                @ShowVouCher="ShowVouCher" />

                        </div>

                    </div>
                </div>

            </div>
        </div>


    </div>

</template>

<script>
import axios from 'axios';
import ListVoucher from '../../../Home/User/Voucher/ListVoucher.vue';
import Booking from '../Bookings/Create.vue';
import Test from '../../../Home/test.vue';
import PromotionService from '../../../../Service/api/PostService'
import FavoriteService from '../../../../Service/api/FavoriteService';
import FavoriteDTO from '../../../../DTOs/FavoriteDto';
export default {
    data() {
        return {
            post: null,
            carTypes: [],
            companies: [],
            amenities: [],
            user: null,
            hour: false,
            voucher: false,
            favorite: false

        };
    },
    components: {
        Booking, Test, ListVoucher
    },
    methods: {

        async AddFavorite(){
            // AddToFavorite
            const favoriteDto = new FavoriteDTO();
            favoriteDto.postId = this.post.id;
            const response = await FavoriteService.addFavorite(favoriteDto);
            if(response.status == 200){
                await this.GetAllFavorite();
            }
        },
        async RemoveFavorite(){
            const response = await FavoriteService.DeleteFavorite(this.post.id);
            if(response.status == 200){
                this.favorite = false;
                await this.GetAllFavorite();
            }
        },

        async GetAllFavorite(){
            const response = await FavoriteService.getAllFavorite();
            var listFavorite= [];
            if(response.data.length > 0){
                listFavorite =  response.data;
                listFavorite.forEach(p => {
                    if(p.id == this.post.id){
                        this.favorite = true;
                        return;
                    }
                })
            }
        },
        Close() {
            this.voucher = this.hour = false;
        },
        async UserVoucher(id, bien) {
            this.voucher = false;
            this.$nextTick(() => {
                if (this.$refs.booking && typeof this.$refs.booking.UserVoucher === 'function') {
                    this.$refs.booking.UserVoucher(id, bien);
                } else {
                    console.error("ShowList is not defined in ListVoucher or ListVoucher not yet rendered.");
                }
            });
        },
        async ShowVouCher(id) {
            console.log(id);
            this.voucher = true;
            this.$nextTick(() => {
                if (this.$refs.voucher && typeof this.$refs.voucher.ShowList === 'function') {
                    this.$refs.voucher.ShowList(id);
                } else {
                    console.error("ShowList is not defined in ListVoucher or ListVoucher not yet rendered.");
                }
            });
        },
        GetDay(start, end) {
            this.hour = false;
            console.log("Detail Post: ",start, end);
            this.$nextTick(() => {
                if (this.$refs.booking && typeof this.$refs.booking.getDayHour === 'function') {
                    this.$refs.booking.getDayHour(start, end);
                } else {
                    console.error("ShowList is not defined in ListVoucher or ListVoucher not yet rendered.");
                }
            });
            //this.$refs.booking.getDayHour(start, end);
        },
        ShowHour(hour) {
            this.hour = hour;
        },
        async fetchPost() {
            const id = this.$route.params.id;
            try {
                const response = await axios.get(`https://localhost:7265/api/User/Post/GetByIdAsync/${id}`)
                this.post = response.data.data;
                console.log("Post: ", this.post);
            }
            catch (error) {
                console.log(error);
            }
        },

    },
    async mounted() {
        this.fetchPost();
        var usered = sessionStorage.getItem('User');
        if (usered != null) {
            this.user = JSON.parse(usered);
            await this.GetAllFavorite();
        }

        // this.fetchAmenities();
    }
};
</script>

<style>

.voucher {
    z-index: 1000;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    background-color: #FFD700;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    justify-items: center;
    align-content: center;
}
.container{

    position: relative;
    z-index: 999;
}

.test {
    width: 700px !important;
    height: 500px;
}

.azzzz img {
    width: 50px;
}

.none {
    display: none;
}

.delete {
    position: absolute;
    z-index: 99990000;
    background-color: rgb(225, 225, 225) !important;
    margin-top: -40px;
}

.start {
    width: 20px !important;
    height: 20px !important;
}

.font {
    font-size: 25px;
}

.font1 {
    font-size: 20px;
    color: blue;
    text-decoration: underline;
}

.mar {
    margin-block: 20px;
}

.flex-container {
    display: flex;
}

.small-div {
    flex: 0 0 1%;
    background-color: #f26a2b;
    /* Màu nền của div đầu tiên */
    border-top-left-radius: 10px;
    /* Độ cong góc trái trên */
    border-bottom-left-radius: 10px;
    /* Độ cong góc trái dưới */
}

.large-div {
    flex: 0 0 99%;
    background-color: #fef7f0;
}

.grid-li {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 4 cột bằng nhau */
    gap: 10px;
    /* Khoảng cách giữa các cột */
}

.cover-car-container {
    display: flex;
    position: relative;
    grid-gap: 16px;
    gap: 16px;
    width: 100%;
}

.cover-car-container .main-img {
    position: relative;
    width: calc(68% - 16px);
    height: 100%;
}

.cover-car-container .sub-img {
    width: 32%;
    height: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
    gap: 16px;
}

.cover-car-container .sub-img img {
    height: 176px;
}

.cover-car-item {
    cursor: pointer;
}

.cover-car-item img {
    width: 100%;
    height: 560px;
    border-radius: 16px;
    object-fit: cover;
}

.comment-item {
    display: flex;
    margin-bottom: 20px;
}

.comment-avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.comment-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 10px;
}

.comment-content .rating {
    font-size: 20px;
}

.comment-content .star {
    color: #FFD700;
    display: inline-block;
}

.comment-content .star-none {
    color: none;
    display: inline-block;
}

.comment-content .comment-text {
    margin-top: 5px;
    font-size: 14px;
}
</style>