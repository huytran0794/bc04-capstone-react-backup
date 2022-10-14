/* import packages */
import React from "react";

import { Form, Input, Select } from "antd";
import clsx from "clsx";
import CustomButton from "../Button/CustomButton";
import Label from "../Label/Label";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../../redux/slices/userSlice";
import _ from "lodash";
import { userServ } from "../../../../services/userServ";
import { localServ } from "../../../../services/localServ";

export default function TabProfile({
  formLayout = "vertical",
  size = "large",
  className = "tabProfile",
  userProfile,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;
  const initialValues = {
    username: userProfile.taiKhoan,
    password: userProfile.matKhau,
    fullname: userProfile.hoTen,
    useremail: userProfile.email,
    phone: userProfile.soDT,
    userType: userProfile.maLoaiNguoiDung,
  };

  const handleUpdateUserProfile = (data) => {
    userServ
      .updateUserProfile(data)
      .then((res) => {
        let { taiKhoan, hoTen, email, soDT, maLoaiNguoiDung } =
          res.data.content;
        let currentLoggedInUser = localServ.user.get();
        currentLoggedInUser.taiKhoan = taiKhoan;
        currentLoggedInUser.hoTen = hoTen;
        currentLoggedInUser.email = email;
        currentLoggedInUser.soDT = soDT;
        currentLoggedInUser.maLoaiNguoiDung = maLoaiNguoiDung;

        // update local storage
        localServ.user.set(currentLoggedInUser);
        dispatch(updateUserInfo(data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onFinish = (values) => {
    let {
      username: taiKhoan,
      password: matKhau,
      fullname: hoTen,
      useremail: email,
      phone: soDt,
      userType: maLoaiNguoiDung,
    } = values;

    let userDataToSubmit = {
      taiKhoan,
      matKhau,
      hoTen,
      email,
      soDt,
      maLoaiNguoiDung,
      maNhom: userProfile.maNhom,
    };
    handleUpdateUserProfile(userDataToSubmit);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const labelItem = (labelText) => (
    <Label className="text-lg font-semibold text-white">{labelText}</Label>
  );
  return (
    <div className="tabProfile py-4">
      <Form
        name="profleForm"
        layout={formLayout}
        form={form}
        initialValues={initialValues}
        size={size}
        wrapperCol={{
          span: 10,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={clsx("login-form", "text-lg", className)}
      >
        <Form.Item
          label={labelItem("Username")}
          name="username"
          rules={[{ required: true }]}
          className="mb-6 last:mb-0"
          hasFeedback
        >
          <Input
            disabled
            placeholder="Enter your username..."
            className="py-2 rounded-md outline-none border-2 border-solid border-transparent  hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
          />
        </Form.Item>

        <Form.Item
          label={labelItem("Passwords")}
          name="password"
          rules={[
            { required: true },
            { min: 6, message: "Username must be minimum 6 characters." },
          ]}
          hasFeedback
          className="mb-6"
        >
          <Input.Password
            placeholder="Enter your password..."
            className="py-2 rounded-md outline-none border-2 border-solid border-transparent  hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
          />
        </Form.Item>

        <Form.Item
          label={labelItem("Name")}
          name="fullname"
          rules={[
            { required: true },
            {
              pattern: /^[A-Za-z\s]*$/i,
              message: "Name must not contain number",
            },
          ]}
          className="mb-6"
          hasFeedback
        >
          <Input
            placeholder="Enter your fullname..."
            className="py-2 rounded-md outline-none border-2 border-solid border-transparent hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
          />
        </Form.Item>
        <Form.Item
          name="useremail"
          label={labelItem("user email")}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          className="mb-6"
          hasFeedback
        >
          <Input
            placeholder="Johndoe@email.com"
            className="py-2 rounded-md outline-none border-2 border-solid border-transparent hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label={labelItem("Phone")}
          rules={[
            { required: true },
            {
              pattern: /^(?:\d*)$/,
              message: "Phone number should contain just number",
            },
          ]}
          className="mb-6"
          hasFeedback
        >
          <Input
            placeholder="089123456"
            className="py-2 rounded-md outline-none border-2 border-solid border-transparent hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
          />
        </Form.Item>

        <Form.Item
          name="userType"
          label={
            <Label className="text-lg font-semibold text-white">
              Loại tài khoản
            </Label>
          }
          className={userProfile.maLoaiNguoiDung === "KhachHang" && "hidden"}
        >
          <Select>
            <Option value="KhachHang">Khách hàng</Option>
            <Option value="QuanTri">Quản trị</Option>
          </Select>
        </Form.Item>

        <Form.Item className="w-full">
          <CustomButton
            btnType="btnPink"
            className="w-full py-6 px-12 font-bold text-xl h-14"
            htmlType="submit"
          >
            Update profile
          </CustomButton>
        </Form.Item>
      </Form>
    </div>
  );
}
