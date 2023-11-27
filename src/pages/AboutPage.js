import React, { useEffect, useState } from "react";

import axios from "axios";

const AboutPage = () => {
  const [versionAPI, setVersionAPI] = useState("");

  useEffect(() => {
    async function getVersion() {
      const res = await axios.get("https://api.codingthailand.com/api/version");
      console.log(res.data.data.version);

      setVersionAPI(res.data.data.version);
    }

    getVersion();
  }, []);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>เกี่ยวกับเรา</h2>
          {versionAPI && <p>API V.{versionAPI}</p>}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
