import { https } from "./configURL";

export const userServ = {
  postLogin: (dataLogin) => {
    let uri = `/api/QuanLyNguoiDung/DangNhap`;
    return https.post(uri, dataLogin);
  },
};
