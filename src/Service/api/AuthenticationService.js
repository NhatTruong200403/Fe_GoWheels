// src/services/AmenityService.js // Sửa tên file nếu cần
import axios from "axios";
import UserDTO from "../../DTOs/UserDto";
const AuthenticationService = {
  async Login(EmailUser, PassUser) {
    const response = await axios.post(
      "https://localhost:7265/api/Authentication/Login",
      {
        Email: EmailUser,
        Password: PassUser,
      }
    );
    console.log(response);
    if (response.status != 200) {
      const errorText = await response.text();
      throw new Error(
        `${response.status} - ${response.statusText}: ${errorText}`
      );
    }

    return response;
  },
  async SignUp(NameUser, EmailDK, PassDK) {
    const response = await axios.post(
      "https://localhost:7265/api/Authentication/SignUp",
      {
        UserName: NameUser,
        Email: EmailDK,
        Password: PassDK,
      }
    );
    console.log(response);
    if (response.status != 200) {
      const errorText = await response.text();
      throw new Error(
        `${response.status} - ${response.statusText}: ${errorText}`
      );
    }

    return response;
  },

  async getUser() {
    const token = sessionStorage.getItem("authToken");
    const response = await fetch(
      `https://localhost:7265/api/Authentication/GetUser`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `${response.status} - ${response.statusText}: ${errorText}`
      );
    }

    return response.json();
  },
  async UpdateComfirmDriver(userDto) {
    console.log("1 : ", userDto);
      const token = sessionStorage.getItem("authToken");
      const formData = new UserDTO(userDto).toFormData();
      const response = await fetch(
        `https://localhost:7265/api/User/UpdateUserInfo`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData
        }
      );
      console.log("Service: ", response); // Log response từ API
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status} - ${response.statusText}: ${errorText}`);
      }
      return await response.json();
    
  }
  
};
export default AuthenticationService;
