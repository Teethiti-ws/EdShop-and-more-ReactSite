import React from "react";
import { useSelector } from "react-redux";

const MemberPage = () => {
  // redux
  const profileRedux = useSelector((state) => state.authReducer.profile);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>สมาชิกเท่านั้นนะจ้ะ</h2>

          {profileRedux && (
            <p>
              ยินดีต้อนรับคุณ {profileRedux.name} Email: {profileRedux.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
