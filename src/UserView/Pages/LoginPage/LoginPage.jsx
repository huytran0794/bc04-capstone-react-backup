import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { localServ } from "../../../services/localServ";
import { userServ } from "../../../services/userServ";
import { setUserInfo } from "../../redux/slices/userSlice";

const LoginPage = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    userServ
      .postLogin(values)
      .then((res) => {
        // console.log(res);
        dispatch(setUserInfo(res.data.content));
        localServ.user.set(res.data.content);
        // window.location.href = "/";
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto w-screen h-screen flex justify-center items-center">
      <div className="w-1/2 h-full">Hình đẹp</div>
      <div className="w-1/2 h-full">
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tài khoản"
            />
          </Form.Item>

          <Form.Item
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Mật khẩu",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
