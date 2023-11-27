import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";

const PAGESIDE = 20;

const HospitalPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    async function getData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${PAGESIDE}`,
          { cancelToken: cancelToken.current.token }
        );
        setHospitals(res.data.data);
        setTotal(res.data.meta.pagination.total);
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
  }, [page]);

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
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <h2>สถานพยาบาล</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>code</th>
                  <th>ชื่อสถานพยาบาล</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((h, index) => {
                  return (
                    <tr key={h.id}>
                      <td>{h.id}</td>
                      <td>{h.code}</td>
                      <td>{h.h_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center align-items-center">
              <Pagination
                activePage={page}
                itemsCountPerPage={PAGESIDE}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                onChange={(page) => setPage(page)}
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="ก่อนหน้า"
                nextPageText="ต่อไป"
                firstPageText="หน้าแรก"
                lastPageText="หน้าสุดท้าย"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalPage;
