import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import LoadingData from "../../components/UI/LoadingData";

function DashboardCompany() {
  const [companyData, setCompanyData] = useState();
  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  const paramsId = useParams().companyId;

  useEffect(() => {
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
      setCompanyData(responseGetcompanyData.data);
    }
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
            <h4>{companyData?.name}</h4>
            <hr />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Company Info</h5>
                <p>Parent Company : {companyData?.parent_company}</p>
                <p>Reference : {companyData?.reference}</p>
                <p>Number Of Employees : {companyData?.number_of_employees}</p>
                <p>Registration Number : {companyData?.registration_no}</p>
                <p>Company Type : {companyData?.name}</p>
                <p>Estimated Turnover : {companyData?.estimated_turnover}</p>
                <p>Micro Business : {companyData?.is_macro_business ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Company Address</h5>
                <p>Address Line 1 : {companyData?.addressline1_company}</p>
                <p>Address Line 2 : {companyData?.addressline2_company}</p>
                <p>Address Line 3 : {companyData?.addressline3_company}</p>
                <p>Postcode : {companyData?.postcode}</p>
                <p>Country : {companyData?.country_of_company}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Bank Details</h5>
                <p>Account Name : {companyData?.account_name}</p>
                <p>Bank Name : {companyData?.bank_name}</p>
                <p>Account No : {companyData?.account_no}</p>
                <p>Shortcode : {companyData?.shortcode}</p>
                <p>SIC Code : {companyData?.sic_code}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Partner Details</h5>
                <p>Partner Name : {companyData?.partner_name}</p>
                <p>Partner DOB : {companyData?.partner_dob}</p>
                <p>Address : {companyData?.address}</p>
                <p>Home Postcode : {companyData?.home_post_code}</p>
                <p>Time At Address (Years) : {companyData?.time_at_address_years}</p>
                <p>Time At Address (Months) : {companyData?.time_at_address_months}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Contact</h5>
                <p>First Name : {companyData?.contacts?.first_name}</p>
                <p>Last Name : {companyData?.contacts?.last_name} </p>
                <p>Contact Title : {companyData?.contacts?.contact_title}</p>
                <p>Position : {companyData?.contacts?.position}</p>
                <p>Telephone Number : {companyData?.contacts?.telephone_number}</p>
                <p>Email : {companyData?.contacts?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCompany;
