import React from "react";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom/cjs/react-router-dom";

import { useQuery } from "react-query";
import { Spinner } from "react-bootstrap";

const Homepage = () => {
  // redux
  // FIXME
  // const profileRedux = useSelector((state) => state.authReducer.profile);
  // console.log(profileRedux);

  const query = useQuery("getData", () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const promise = fetch(
      "https://api.codingthailand.com/api/news?page=1&per_page=4",
      {
        method: "get",
        sigbal: signal,
      }
    ).then((res) => res.json());

    promise.cancel = () => controller.abort();

    return promise;
  });

  const { isLoading, error, data, isFetching } = query;

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
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">
              <BsFillBalloonHeartFill color="pink" /> Welcome to TeeTech
              {/* FIXME */}
              {/* {profileRedux.name && `, สวัสดีคุณ ${profileRedux.name}`} */}
            </h1>
            <h4>Unlock the Power of Learning with Our Web Courses</h4>
            <p>
              Are you ready to elevate your skills and embark on a journey of
              knowledge? Look no further! TeeTech is your gateway to a world of
              online courses designed to enhance your expertise in web
              development.
            </p>
            <p>
              <Link
                className="btn btn-primary btn-lg"
                role="button"
                to="/product"
              >
                Product &raquo;
              </Link>
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="mx-auto">
              {isFetching ? "กำลังอัปเดต.,." : null}
            </div>

            {data.data.map((news, i) => {
              return (
                <div key={news.id} className="col-md-4">
                  <h2>{news.topic}</h2>
                  <p>{news.detail}</p>
                  <p>วันที่: {news.dateadd}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="container">
        <p>&copy; Company 2017-2018</p>
      </footer>

      {/* <!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
<script src="../../assets/js/vendor/popper.min.js"></script>
<script src="../../dist/js/bootstrap.min.js"></script> */}
    </>
  );
};

export default Homepage;
