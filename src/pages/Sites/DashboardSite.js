import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function DashboardSite() {
  const [companyData, setCompanyData] = useState();
  // custom hook for sending data
  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();
  const paramsId = useParams().siteId;
  useEffect(() => {
    // return;
    // console.log(paramsId, responseGetcompanyData);
    if (paramsId && !responseGetcompanyData) {
      setCompanyGETData({
        ...companyGETData,
        url: `sites/update/site/${paramsId}/`,
        fetchObj: {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
        isAuthNeeded: true,
        expectStatusCode: [200, 201],
      });
    }
    if (responseGetcompanyData) {
      // console.log(responseGetcompanyData);
      setCompanyData(responseGetcompanyData.data);
    }
    // mean we got data now
  }, [paramsId, responseGetcompanyData]);
  return (
    <div className="col-xl-12 col-12 layout-spacing">
      <div className="statbox box box-shadow ">
        <div className="widget-content widget-content-area">
          <div className="text-center">
            <h4>{companyData?.site_name} Site</h4>
            <hr />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Site Info</h5>
                <p>Group Name : {companyData?.name}</p>
                <p>Company Name : {companyData?.name}</p>
                <p>Type of owner : {companyData?.name}</p>
                <p>Owner Name : {companyData?.name}</p>
                <p>
                  Current gas and electricity supplier details :{" "}
                  {companyData?.name}
                </p>
                <p>Is Tenant? {companyData?.name}</p>
                <p>Is Vacant? {companyData?.name}</p>
                <p>Is CoT? {companyData?.name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Our Details</h5>
                <p>Site Reference {companyData?.name}</p>
                <p>Support Contact {companyData?.name}</p>
                <p>Lead Source {companyData?.name}</p>
                <p>Notes {companyData?.name}</p>
                <p>Lead Type {companyData?.name}</p>
                <p>Bill to Sent {companyData?.name}</p>
                <p>Welcome Letter Sent {companyData?.name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Letter Of Authority</h5>
                <p>Agent Email {companyData?.name}</p>
                <p>LOA Header to Use {companyData?.name}</p>
                <p>LOA Template {companyData?.name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Site Address</h5>
                <p>Postcode {companyData?.name}</p>
                <p>Address Line 1 {companyData?.name}</p>
                <p>Address Line 2 {companyData?.name}</p>
                <p>Address Line 3{companyData?.name}</p>
                <p>Address Line 4 {companyData?.name}</p>
                <p>Country {companyData?.name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Billing Address</h5>
                <p>Postcode {companyData?.name}</p>
                <p>Address Line 1 {companyData?.name}</p>
                <p>Address Line 2 {companyData?.name}</p>
                <p>Address Line 3{companyData?.name}</p>
                <p>Address Line 4 {companyData?.name}</p>
                <p>Country {companyData?.name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Contact</h5>
                <p>First Name {companyData?.name}</p>
                <p>Last Name {companyData?.name}</p>
                <p>Contact Title {companyData?.name}</p>
                <p>Positon{companyData?.name}</p>
                <p>Telephone Number {companyData?.name}</p>
                <p>Email {companyData?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSite;
