<template>

    <h1>Danh sách xác nhận tài xế</h1>

    <table class="table">
        <thead>
            <tr>
                <th>
                    Tên
                </th>
                <th>
                    Ngày sinh
                </th>
                <th>
                    Số điện thoại
                </th>
                <th>
                    CIC
                </th>
                <th>
                    License
                </th>
                <th>Chức năng</th>
            </tr>
        </thead>

        <tbody v-if="drives.length > 0">
            <tr>
                <td>
                    {{ drive.name }}
                </td>
                <td>
                    {{ drive.birthday }}
                </td>
                <td>
                    {{ drive.phoneNumber }}
                </td>
                <td>
                    <img :src="'https://localhost:7265/'+drive.cic" alt="">
                </td>
                <td>
                    <img :src="'https://localhost:7265/'+drive.license" alt="">
                </td>
                <td>
                    <button @click="SubmitDriver(true)">Xác nhận</button>
                    <button @click="SubmitDriver(false)">Không</button>
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            Danh sách trống
        </tbody>
    </table>

</template>
<script>
import axios from 'axios';
import { inject, ref } from 'vue';
export default {


    data() {
        return {
            drives: [],
            drive: null,
        }
    },
    methods: {
        // async SubmitDriver(bien){
        //     // ExamineDriverSubmit
        //     const formData = new FormData();
        //     formData.append("userId", this.drive.id);
        //     formData.append("isAccept", bien);
        //     const token = sessionStorage.getItem("authToken");
        //     const response = await axios.post(`https://localhost:7265/api/ManageUser/ExamineDriverSubmit/${this.drive.id}`, {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //         body: formData
        //     });
        //     console.log(response);
        //     this.drives = response.data.data;

        // },
        async SubmitDriver(bien) {
            try {
                // Tạo formData để truyền dữ liệu
                const formData = new FormData();
                formData.append("userId", this.drive.id);
                formData.append("isAccept", bien);

                // Lấy token từ sessionStorage
                const token = sessionStorage.getItem("authToken");
                if (!token) {
                    console.error("Token không tồn tại");
                    return;
                }

                // Gọi API với cấu trúc chính xác
                const response = await axios.post(
                    `https://localhost:7265/api/ManageUser/ExamineDriverSubmit/${this.drive.id}`,
                    formData, // Form data là tham số thứ hai
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                console.log("Phản hồi từ server:", response);
                this.drives = response.data.data;
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                if (error.response && error.response.status === 401) {
                    console.error("Lỗi 401: Unauthorized - Vui lòng kiểm tra lại token xác thực.");
                }
            }
        },

        async getAllDiver() {
            const id = this.$route.params.id;
            console.log(id);
            const token = sessionStorage.getItem("authToken");
            const response = await axios.get('https://localhost:7265/api/ManageUser/GetAllDriverSubmit', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status == 200) {
                this.drives = response.data.data;
                this.drives.forEach(p => {
                    if (p.id == id) {
                        this.drive = p;
                        console.log(p);
                    }
                })
            }


        }
    },

    async created() {
        await this.getAllDiver();
    },
}
</script>

<style></style>