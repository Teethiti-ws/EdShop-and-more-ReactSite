import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Badge, Image, Spinner, Table } from "react-bootstrap";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  // redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    async function getData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://api.codingthailand.com/api/course",
          { cancelToken: cancelToken.current.token }
        );
        // console.log(res.data.data);
        setProducts(res.data.data);
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
        <p>{error.response.data.message}</p>
      </div>
    );
  }

  function handleAddCart(product) {
    console.log(product);
    const cartProduct = {
      id: product.id,
      name: product.title,
      price: product.view,
      qty: 1,
    };

    // call action
    dispatch(addToCart(cartProduct, cart));
  }

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>สินค้า </h2>
          <p>
            {total > 0
              ? `มีสินค้าอยู่ในตระกร้า ${total} ชิ้น`
              : "สามารถกด add cart ได้เลย"}
          </p>

          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th scope="col">ลำดับ</th>
                  <th scope="col">ชื่อคอร์ส</th>
                  <th scope="col">รายละเอียด</th>
                  <th scope="col">วันที่สร้าง</th>
                  <th scope="col">จำนวนรับชม</th>
                  <th scope="col">รูปภาพ </th>
                  <th scope="col">เครื่องมือ </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => {
                  return (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>{product.title}</td>
                      <td>{product.detail}</td>
                      <td>
                        {format(new Date(product.date), "dd MMM yyyy", {
                          locale: th,
                        })}
                      </td>
                      <td>
                        <Badge variant="success">{product.view}</Badge>
                      </td>
                      <td>
                        <Image
                          width={100}
                          src={product.picture}
                          alt={product.title}
                          thumbnail
                        />
                      </td>
                      <td>
                        {/* <Link to={`/detail/${product.id}/title/${product.title}`}> */}
                        <Link to={`/detail/${product.id}/${product.title}`}>
                          <BsEyeFill />
                        </Link>

                        <button
                          className="btn btn-outline-success ml-2"
                          onClick={() => handleAddCart(product)}
                        >
                          add cart
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
