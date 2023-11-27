import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { clearAllCart } from "../redux/actions/cartAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CartPage() {
  const history = useHistory();

  // redux
  const carts = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>ตะกร้าสินค้า</h2>
          <p>
            คุณมีสินค้าอยู่ในตะกร้า {total} ชิ้น{" "}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch(clearAllCart())}
            >
              ลบสินค้าทั้งหมด
            </button>
            <button
              className="btn btn-info btn-sm ml-2"
              onClick={() => history.push("/pdf")}
            >
              รายงาน PDF
            </button>
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th scope="col">ลำดับ</th>
                <th scope="col">รหัสสินค้า</th>
                <th scope="col">ชื่อสินค้า</th>
                <th scope="col">ราคา</th>
                <th scope="col">จำนวน</th>
                <th scope="col">รวม</th>
              </tr>
            </thead>

            <tbody>
              {carts.map((cart, i) => {
                return (
                  <tr key={cart.id}>
                    <td>{i + 1}</td>
                    <td>{cart.id}</td>
                    <td>{cart.name}</td>
                    <td>{cart.price}</td>
                    <td>{cart.qty}</td>
                    <td>{cart.price * cart.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
