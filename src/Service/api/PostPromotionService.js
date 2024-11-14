import PromotionDTO from "../../DTOs/PromotionDto";
import axios from 'axios';
const PostPromotionService = {

    async AddPromotion(promotionDTO){
        const formData = new PromotionDTO(promotionDTO).toFormData();
        const token = sessionStorage.getItem("authToken");
        const response = await fetch('https://localhost:7265/api/UserPromotion/Add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `${response.status} - ${response.statusText}: ${errorText}`
            );
          }
      
          return response.json();
    },
    async UpdatePromotion(promotionDTO){
        const formData = new PromotionDTO(promotionDTO).toFormData();
        const token = sessionStorage.getItem("authToken");
        const response = await fetch(`https://localhost:7265/api/UserPromotion/Update/${promotionDTO.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `${response.status} - ${response.statusText}: ${errorText}`
            );
          }
      
          return response.json();
    },
    async getPromotion(id) {
        const response = await axios.get(
            `https://localhost:7265/api/UserPromotion/GetById/${id}`
        );
        console.log(response.data);
        return response.data;
      },
    async getAllPromotion() {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(
            `https://localhost:7265/api/UserPromotion/GetAllByUserId`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        return response.data;
      },

}
export default PostPromotionService;