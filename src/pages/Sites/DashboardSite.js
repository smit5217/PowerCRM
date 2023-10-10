import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function DashboardSite() {
  const [companyData, setCompanyData] = useState();

  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  const paramsId = useParams().siteId;

  useEffect(() => {
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
      setCompanyData(responseGetcompanyData.data);
    }
  }, [paramsId, responseGetcompanyData]);

  return (
    <div className="col-xl-12 col-12 layout-spacing">
      <div className="statbox box box-shadow ">
        <div className="widget-content widget-content-area">
          <div className="text-center">
            <h4>{companyData?.site_name}</h4>
            <hr />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Site Info</h5>
                <p>Group Name : {companyData?.group_name}</p>
                <p>Company Name : {companyData?.contacts?.company}</p>
                <p>Type Of Owner : {companyData?.type_of_owner}</p>
                <p>Owner Name : {companyData?.owner_name}</p>
                <p>
                  Current Gas And Electricity Supplier Details :
                  {companyData?.current_gas_and_electricity_supplier_details}
                </p>
                <p>Tenant : {companyData?.tenant ? "Yes" : "No"} </p>
                <p>Vacant : {companyData?.vacant ? "Yes" : "No"} </p>
                <p>Change Of Tenancy : {companyData?.change_of_tenancy ? "Yes" : "No"} </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Our Details</h5>
                <p>Site Reference : {companyData?.site_reference}</p>
                <p>Support Contact : {companyData?.support_contact}</p>
                <p>Lead Source : {companyData?.lead_source}</p>
                <p>Notes : {companyData?.notes}</p>
                <p>Lead Type : {companyData?.lead_type}</p>
                <p>Bill To Sent : {companyData?.bill_to_sent ? "Yes" : "No"} </p>
                <p>
                  Welcome Letter Sent :{' '}
                  {companyData?.welcome_letter_send ? "Yes" : "No"}{" "}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Letter Of Authority</h5>
                <p>Agent Email : {companyData?.agent_email}</p>
                <p>LOA Header To Use : {companyData?.loa_header_to_use}</p>
                <p>LOA Template : {companyData?.loa_template}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Site Address</h5>
                <p>Postcode : {companyData?.site_address?.postcode}</p>
                <p>Address Line 1 : {companyData?.site_address?.addressline1}</p>
                <p>Address Line 2 : {companyData?.site_address?.addressline2}</p>
                <p>Address Line 3 : {companyData?.site_address?.addressline3}</p>
                <p>Address Line 4 : {companyData?.site_address?.addressline4}</p>
                <p>Country : {companyData?.site_address?.country}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Billing Address</h5>
                <p>Postcode : {companyData?.billing_address?.postcode}</p>
                <p>
                  Address Line 1 : {companyData?.billing_address?.addressline1}
                </p>
                <p>
                  Address Line 2 : {companyData?.billing_address?.addressline2}
                </p>
                <p>
                  Address Line 3 : {companyData?.billing_address?.addressline3}
                </p>
                <p>
                  Address Line 4 : {companyData?.billing_address?.addressline4}
                </p>
                <p>Country : {companyData?.billing_address?.country}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="neumorphism-box">
                <h5>Contact</h5>
                <p>First Name : {companyData?.contacts?.first_name}</p>
                <p>Last Name : {companyData?.contacts?.last_name}</p>
                <p>Contact Title : {companyData?.contacts?.contact_title}</p>
                <p>Positon : {companyData?.contacts?.position}</p>
                <p>
                  Telephone Number : {companyData?.contacts?.telephone_number}
                </p>
                <p>Email : {companyData?.contacts?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSite;
