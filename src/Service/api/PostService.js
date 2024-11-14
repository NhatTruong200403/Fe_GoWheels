import PostDTO from "../../DTOs/PostDto";
import PostDto from "../../DTOs/PostDto";
import axios from "axios";
const PostService = {
  async getCarTypies(id) {
    const response = await axios.get(
      `https://localhost:7265/api/admin/Company/GetByIdAsync/${id}`
    );
    console.log(response.data);
    return response.data;
  },
  async getPost(id) {
    const response = await axios.get(
      `https://localhost:7265/api/User/Post/GetByIdAsync/${id}`
    );
    console.log("Get post: ", response.data);
    return response.data;
  },
  async getAllPostByUserId() {
    const token = sessionStorage.getItem("authToken");
    const response = await axios.get(
      `https://localhost:7265/api/User/Post/GetPersonalPosts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Get post: ", response.data);
    return response.data;
  },
  async getAllPost() {
    const token = sessionStorage.getItem("authToken");
    const response = await axios.get(
      `https://localhost:7265/api/User/Post/GetAll`);
    console.log("Get post: ", response.data);
    return response.data;
  },
  async AddPost(postDto) {
    const formData = new PostDTO(postDto).toFormData();
    const token = sessionStorage.getItem("authToken");
    const response = await fetch("https://localhost:7265/api/User/Post/Add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `${response.status} - ${response.statusText}: ${errorText}`
      );
    }
    return response;
  },
  async getCompanyById(id) {
    const response = await axios.get(
      `https://localhost:7265/api/admin/Company/GetByIdAsync/${id}`
    );
    console.log(response);
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.data;
  },
  async UpdatePost(postDto) {
    const formData = new PostDto(postDto).toFormData();
    console.log(postDto);
    const token = sessionStorage.getItem("authToken");
    const response = await fetch(
      `https://localhost:7265/api/User/Post/Update/${postDto.id}`,
      {
        method: "PUT",
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

    return response.json();
  },
};
export default PostService;
