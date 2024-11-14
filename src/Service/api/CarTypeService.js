import CartypeDto from "../../DTOs/CartypeDto";
import axios from "axios";
const CarTypeService = {
  async getCompanies() {
    const response = await axios.get(
      "https://localhost:7265/api/admin/Company/GetAll"
    );
    console.log(response.data);
    return response.data;
  },
  async AddCartype(cartypeDto) {
    const token = sessionStorage.getItem("authToken");
    const jsonData = JSON.stringify(cartypeDto);
    const response = await fetch(
      "https://localhost:7265/api/admin/Cartype/Add",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: jsonData,
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
  async getCartypeById(id) {
    const response = await axios.get(
      `https://localhost:7265/api/admin/Cartype/GetByIdAsync/${id}`
    );
    console.log(response);
    if (response.status !== 200) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.data;
  },
  async UpdateCarType(cartypeDto){
    const token = sessionStorage.getItem("authToken");
    const jsonData = JSON.stringify(cartypeDto);
    const response = await fetch(`https://localhost:7265/api/admin/Cartype/Update/${cartypeDto.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Dữ liệu JSON
        },
        body: jsonData
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `${response.status} - ${response.statusText}: ${errorText}`
        );
      }
  
      return response.json();
  }
};
export default CarTypeService;
