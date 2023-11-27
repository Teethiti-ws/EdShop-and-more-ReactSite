import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Spinner, CardDeck, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DetailPage = () => {
  const { id, title } = useParams();
  const history = useHistory();

  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    async function getData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://api.codingthailand.com/api/course/" + id,
          { cancelToken: cancelToken.current.token }
        );
        console.log(res.data.data);
        setDetails(res.data.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    getData();

    return () => {
      // console.log("exit");
      cancelToken.current.cancel();
    };
  }, [id]);

  if (isLoading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p>เกิดข้อผิดพลาดจาก server กรุณาลองใหม่</p>
        <p>{error.response.data.message}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <Button variant="success" onClick={() => history.goBack()}>
            ย้อนกลับ
          </Button>{" "}
          <h2>
            {title} - {id}
          </h2>
          {details.length > 0 ? (
            <CardDeck>
              {details.map((detail, i) => {
                return (
                  <div className="col-md-4" key={detail.ch_id}>
                    <Card className="mb-4 shadow-sm">
                      <Card.Body>
                        <Card.Title>{detail.ch_title}</Card.Title>
                        <Card.Text>{detail.ch_dateadd}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </CardDeck>
          ) : (
            <div className="mx-auto">ไม่พบข้อมูล...</div>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
