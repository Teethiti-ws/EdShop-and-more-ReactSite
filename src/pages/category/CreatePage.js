import axios from "axios";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const API_POST = "https://api.codingthailand.com/api/category";

const CreatePage = () => {
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);

    const res = await axios.post(API_POST, {
      name: data.name,
    });

    console.log(res.data.message);
    history.replace("/category");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>หมวดหมู่ข่าว</Form.Label>
              <Form.Control
                type="text"
                {...register("name", {
                  required: "กรุณากรอกนิดนึง",
                })}
                className={`form-Control ${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
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

export default CreatePage;
