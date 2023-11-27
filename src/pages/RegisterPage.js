import axios from "axios";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const API_REGISTER = "https://api.codingthailand.com/api/register";

const RegisterPage = () => {
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const res = await axios.post(API_REGISTER, {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // console.log(res.data.message);
      toast.success(res.data.message);
      history.replace("/login");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.errors.email[0]);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>ชื่อ-นามสกุล</Form.Label>
              <Form.Control
                type="text"
                {...register("name", {
                  required: "กรุณากรอกชื่อจ่ะ",
                })}
                className={`form-Control ${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
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

export default RegisterPage;
