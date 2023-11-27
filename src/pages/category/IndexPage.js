import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Spinner, Table, Button } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const IndexPage = () => {
  const [categorys, setCategorys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  const history = useHistory();

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    async function getData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://api.codingthailand.com/api/category`,
          { cancelToken: cancelToken.current.token }
        );
        setCategorys(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    getData();

    return () => {
      cancelToken.current.cancel();
    };
  }, []);

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
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <Button
              className="mb-3"
              variant="success"
              onClick={() => history.push("/category/create/")}
            >
              เพิ่มข้อมูล
            </Button>

            <h2>หวมดหมู่ข่าว</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>หมวดหมู่ข่าว</th>
                  <th>เครื่องมือ</th>
                </tr>
              </thead>
              <tbody>
                {categorys.map((category, index) => {
                  return (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>
                        <Button
                          className="ml-2"
                          variant="outline-info"
                          size="sm"
                          onClick={() =>
                            history.push(`/category/edit/${category.id}`)
                          }
                        >
                          <BsPencil />
                        </Button>
                        <Button
                          className="ml-2"
                          variant="outline-danger"
                          size="sm"
                          onClick={async () => {
                            const isConformed = window.confirm(
                              `คุณต้องการลบ ${category.name}?`
                            );
                            if (isConformed === true) {
                              const res = await axios.delete(
                                `https://api.codingthailand.com/api/category/${category.id}`
                              );

                              alert(res.data.message);
                              history.go(0);
                            }
                          }}
                        >
                          <BsTrash />
                        </Button>
                        {category.code}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center align-items-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
