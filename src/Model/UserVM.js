export default class UserVM {
  constructor(data = {}) {
    this.userId = data.userid || null;
    this.name = data.name || "";
    this.phonenumber = data.phonenumber || "";
    this.cic = data.cic || "";
    this.license = data.license || "",
    this.reportPoint = data.reportPoint || 0,
    this.image = data.image || ""; // Đường dẫn hoặc URL của ảnh icon từ API
    this.birthday = data.birthday || null, 
    this.role = data.role || null;
  }
}
