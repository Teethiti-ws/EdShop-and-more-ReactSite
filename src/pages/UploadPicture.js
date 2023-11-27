import axios from "axios";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg"];

const UploadPicture = () => {
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmited(data) {
    // javaScript pure
    try {
      let fileUpload = data.picture[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileUpload);
      reader.onload = async (e) => {
        let base64Image = e.target.result;
        console.log(base64Image);
        const urlAPI = "https://api.codingthailand.com/api/upload";
        const res = await axios.post(urlAPI, {
          picture: base64Image,
        });
        toast.success(res.data.data.message);
        history.replace("/");
      };
    } catch (err) {
      console.log("38", err);
    }
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <h4>อัปโหลดภาพ</h4>

          <form onSubmit={handleSubmit(onSubmited)}>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">
                Example file input
              </label>
              <input
                {...register("picture", {
                  required: "xx",
                  validate: {
                    checkFileType: (value) => {
                      return (
                        value && SUPPORTED_IMAGE_FORMATS.includes(value[0].type)
                      );
                    },
                  },
                })}
                type="file"
                className={`form-control-file ${
                  errors.picture ? "is-invalid" : ""
                }`}
                id="exampleFormControlFile1"
              />

              {errors.picture && errors.picture.type === "required" && (
                <div className="invalid-feedback">{errors.picture.message}</div>
              )}

              {errors.picture && errors.picture.type === "checkFileType" && (
                <div className="invalid-feedback">.jpg หรือ JPEG เท่านั้น</div>
              )}
            </div>

            <button className="btn btn-primary" type="submit">
              Upload...
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPicture;
