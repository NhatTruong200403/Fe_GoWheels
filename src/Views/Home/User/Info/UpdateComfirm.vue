<template>
    <div class="update">
        <form @submit.prevent="submitForm1" enctype="multipart/form-data">
            <div class="form-group">
                <label for="amenityName" class="control-label">Tên tài xế</label>
                <input v-model="userform.name" id="amenityName" type="text" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="iconImage" class="control-label">License</label>
                <input @change="handleFileUpload" id="iconLicense" type="file" class="form-control" accept="image/*" />
            </div>
            <div class="form-group">
                <label for="iconImage" class="control-label">CIC</label>
                <input @change="handleFileUpload01" id="iconCIC" type="file" class="form-control" accept="image/*" />
            </div>
            <div class="form-group">
                <label for="iconImage" class="control-label">Image</label>
                <input @change="handleFileUpload02" id="iconImage" type="file" class="form-control" accept="image/*" />
            </div>
            <div class="form-group">
                <label for="amenityName" class="control-label">Ngày sinh</label>
                <input v-model="userform.birthday" id="amenityName" type="datetime-local" class="form-control"
                    required />
            </div>
            <div class="form-group">
                <label for="amenityName" class="control-label">Số điện thoại</label>
                <input v-model="userform.phoneNumber" id="amenityName" minlength="9" maxlength="11" type="number"
                    required class="form-control" />
            </div>
            <div class="form-group">
                <input type="submit" value="Tạo" class="btn btn-primary" />
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import UserVM from '../../../../Model/UserVM';
import AuthenticationService from '../../../../Service/api/AuthenticationService';
import UserDTO from '../../../../DTOs/UserDto';
export default {

    data() {
        return {
            userform: new UserVM(),
            userDTO: new UserDTO(),
            name: "",
            license: false,
            cic: false,
            image: false,
            birthday: null,
            phone: "",
        }
    },
    methods: {
        async submitForm1() {
            if (this.license == false || this.image == false || this.cic == false) {
                if (this.license == false) {
                    this.userform.license = '';
                }
                if (this.image == false) {
                    this.userform.image = '';
                }
                if (this.cic == false) {
                    this.userform.cic = '';
                }
            }
            try {
                console.log(this.userform);
                this.userDTO = {
                    name : this.userform.name,
                    birthday : this.userform.birthday.toString(),
                    phonenumber : this.userform.phonenumber,
                    license : this.userform.license,
                    cic : this.userform.cic,
                    image : this.userform.image
                };
                const response = await AuthenticationService.UpdateComfirmDriver(this.userDTO);
                console.log("reponse from Update:", response);
                if(response.success){
                    this.$emit('Close');
                }
            }
            catch (error) {
                console.log(error);
            }

        },
        handleFileUpload(event) {
            // Lưu trữ file được tải lên
            this.userform.license = event.target.files[0];
            this.license = true;
        },
        handleFileUpload01(event) {
            // Lưu trữ file được tải lên
            this.userform.cic = event.target.files[0];
            this.cic = true;
        },
        handleFileUpload02(event) {
            // Lưu trữ file được tải lên
            this.userform.image = event.target.files[0];
            this.image = true;
        },
        async getUser() {
            const response = await AuthenticationService.getUser();
            this.userform = response;
            this.phone = this.userform.phonenumber;
            this.name = this.userform.name;
            this.birthday = this.userform.birthday;
        }
    },
    created() {
        this.getUser();
    },

}
</script>

<style></style>