import axios from "axios";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const API_LOGIN = "https://api.codingthailand.com/api/login";

const LoginPage = () => {
  const history = useHistory();
  // const userStored = useContext(UserStoreContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // call redux action
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      const res = await axios.post(API_LOGIN, {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", JSON.stringify(res.data));

      // get profile
      const urlProfile = "https://api.codingthailand.com/api/profile";
      const resProfile = await axios.get(urlProfile, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });
      console.log(resProfile.data.data.user);
      localStorage.setItem(
        "profile",
        JSON.stringify(resProfile.data.data.user)
      );

      const profileValue = JSON.parse(localStorage.getItem("profile"));
      //NOTE update profile by useContext
      // userStored.updateProfile(profileValue);
      //update profile by Redux
      dispatch(updateProfile(profileValue));

      // console.log(res.data.message);
      toast.success("เข้าสู่ระบบสำเร็จ");
      history.replace("/");
      // history.go(0);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {
                  required: "กรุณากรอก email จ่ะ",
                })}
                className={`form-Control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                {...register("password", {
                  required: "กรุณากรอกรหัสผ่านจ่ะ",
                })}
                className={`form-Control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button type="submit">บันทึก</Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
