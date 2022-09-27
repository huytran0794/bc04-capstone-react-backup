import { https, maNhom } from "./configURL";

export const movieServ = {
  getMovieList: () => {
    let uri = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`;
    return https.get(uri);
  },
};
