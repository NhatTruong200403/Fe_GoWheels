// src/services/AmenityService.js
import axios from "axios";
import FavoriteDTO from "../../DTOs/FavoriteDto"; // Sửa tên file nếu cần
const FavoriteService = {
  async getAllFavorite() {
    const token = sessionStorage.getItem("authToken");
    const response = await axios.get(
      `https://localhost:7265/api/User/Favorite/GetAllFavorite`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  async addFavorite(Data) {
    const token = sessionStorage.getItem("authToken");
    const formData = new FavoriteDTO(Data).toFormData();
    const response = await axios.post(
      `https://localhost:7265/api/User/Favorite/AddToFavorite`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.success) {
        console.log(response);
    }
    return response;
  },

  async DeleteFavorite(id) {
    const token = sessionStorage.getItem("authToken");
    const response = await axios.delete(
      `https://localhost:7265/api/User/Favorite/RemoveFavorite/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status != 200) {
      const errorText = response;
      throw new Error(
        `${response.status} - ${errorText}`
      );
    }

    return response;
  },
};
export default FavoriteService;
