// src/services/BookingService.js
import axios from "axios";
import BookingDTO from "../../DTOs/BookingDto";
const BookingService = {
  async AddBooking(bookingDto) {
    const formData = new BookingDTO(bookingDto).toFormData();
    console.log("Data gửi đi : ", formData);
    const token = sessionStorage.getItem("authToken");
    const response = await fetch(
      "https://localhost:7265/api/User/Booking/Add",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `${response.status} - ${response.statusText}: ${errorText}`
      );
    }
    console.log(response);
    return response.json();
  },
  async ConfirmBooking(id, bien) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("isAccept", bien);

    const token = sessionStorage.getItem("authToken");
    const response = await fetch(
      `https://localhost:7265/api/User/Booking/ConfirmBooking`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      }
    );
    console.log(response);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `${response.status} - ${response.statusText}: ${errorText}`
      );
    }
    return response.json();
  },

  async GetBookingById(id) {
    const token = sessionStorage.getItem("authToken");
    const response = await axios.get(
      `https://localhost:7265/api/User/Booking/GetById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Reponse:", response);
    if (!response.success) {
      console.log(response);
    }
    return response.data;
  },
  async GetAllBooking() {
    const token = sessionStorage.getItem("authToken");
    const response = await axios.get(
      "https://localhost:7265/api/User/Booking/GetPersonalBookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Reponse:", response);
    if (!response.success) {
      console.log(response);
    }
    return response.data;
  },
  async GetAllPenDing() {
    const token = sessionStorage.getItem("authToken");
    const response = await axios.get(
      "https://localhost:7265/api/User/Booking/GetAllPendingBookingsByUserId",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Reponse:", response);
    if (!response.success) {
      console.log(response);
    }
    return response.data;
  },
};
export default BookingService;
