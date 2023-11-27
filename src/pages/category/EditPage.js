import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useForm } from "react-hook-form";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

function EditPage() {
  const history = useHistory();
  const { id } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://api.codingthailand.com/api/category/${id}`
      );
      setValue("name", res.data.name);
      console.log(res.data);
    }
    getData();
  }, [id, setValue]);

  async function onSubmit(data) {
    const res = await axios.put("https://api.codingthailand.com/api/category", {
      id: id,
      name: data.name,
    });

    console.log(res.data.message);
    history.replace("/category");
  }

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
                  required: "กรุณากรอกนิดนึงนะจ้ะ",
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
}

export default EditPage;
