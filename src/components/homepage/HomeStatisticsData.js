import React, { useDebugValue, useEffect, useState } from "react";
import { ajaxCallWithHeaderOnly } from "../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import LoadingData from "../UI/LoadingData";

function HomeStatisticsData() {
  const [data, setData] = useState({
    bestAgent: null,
    bestAgentCount: null,
    bestUni: null,
    bestUniCount: null,
    bestCourse: null,
    bestCourseCount: null,
  });

  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    // bestEmpData();
    // bestUniData();
    // bestCourseData();
  }, []);
  return (
    <>
      {/* {data.bestAgent ? ( */}
      <div className="row">
        <div className="col-md-4 homepageCard">
          <div className="neumorphism-box p50 text-center">
            <h4>Total Leads</h4>
            <h5 className="headingHome">
              {/* {data.bestAgent} [{data.bestAgentCount}] */}
            </h5>
          </div>
        </div>
        <div className="col-md-4 homepageCard">
          <div className="neumorphism-box p50 text-center">
            <h4>Total Sites</h4>
            <h5 className="headingHome">
              {/* {data.bestUni} [{data.bestUniCount}] */}
            </h5>
          </div>
        </div>
        <div className="col-md-4 homepageCard">
          <div className="neumorphism-box p50 text-center">
            <h4>Quotations</h4>
          </div>
        </div>
      </div>
      {/* ) : (
        <div className="col-md-12 text-center">
          <LoadingData />
        </div>
      )} */}
    </>
  );
}

export default HomeStatisticsData;
