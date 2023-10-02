import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingData from "../../components/UI/LoadingData";

function DashboardCompany() {
  // hook to store compny data
  const [companyData, setCompanyData] = useState();
  // custom hook for sending data
  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();
  const paramsId = useParams().companyId;
  useEffect(() => {
    // return;
    // console.log(paramsId, responseGetcompanyData);
    if (paramsId && !responseGetcompanyData) {
      setCompanyGETData({
        ...companyGETData,
        url: `company/${paramsId}/`,
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
  if (reqGetCompanyStatus.isLoading) {
    return (
      <div className="text-center">
        <LoadingData />
      </div>
    );
  }
  return (
    <div className="col-xl-12 col-12 layout-spacing">
      <div className="statbox box box-shadow ">
        <div className="widget-content widget-content-area">
          <div className="text-center">
            <h4>{companyData?.name} Company</h4>
            <hr />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Company Info</h5>
                <p>Parent Company : {companyData?.name}</p>
                <p>Number of employees : {companyData?.name}</p>
                <p>Registration Number : {companyData?.name}</p>
                <p>Company Type : {companyData?.name}</p>
                <p>Estimated turnover : {companyData?.name}</p>
                <p>Is Micro Business? {companyData?.name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Company Address</h5>
                <p>Address Line 1 {companyData?.name}</p>
                <p>Address Line 2 {companyData?.name}</p>
                <p>Address Line 3 {companyData?.name}</p>
                <p>Postcode {companyData?.name}</p>
                <p>Country {companyData?.name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Bank Details</h5>
                <p>Account name {companyData?.name}</p>
                <p>Bank name {companyData?.name}</p>
                <p>Account no {companyData?.name}</p>
                <p>Shortcode {companyData?.name}</p>
                <p>Partner Details {companyData?.name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Partner Details</h5>
                <p>Partner name {companyData?.name}</p>
                <p>Partner dob {companyData?.name}</p>
                <p>Address {companyData?.name}</p>
                <p>Home post code {companyData?.name}</p>
                <p>Time At Address(years) {companyData?.name}</p>
                <p>Time At Address(months) {companyData?.name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Contact</h5>
                <p>First name {companyData?.name}</p>
                <p>Last name {companyData?.name} </p>
                <p>Contact Title {companyData?.name}</p>
                <p>Position {companyData?.name}</p>
                <p>Telephone number {companyData?.name}</p>
                <p>Email {companyData?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCompany;
