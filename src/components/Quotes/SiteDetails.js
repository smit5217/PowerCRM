import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingData from "../UI/LoadingData";

function SiteDetails(props) {
  const [siteData, setSiteData] = useState();
  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if (props.siteId && !responseGetcompanyData) {
      setCompanyGetResponseData(null);
      setCompanyGETData({
        ...companyGETData,
        url: `sites/update/site/${props.siteId}/`,
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
      if (responseGetcompanyData.status === 200) {
        setSiteData(responseGetcompanyData.data);
      }
    }
  }, [props.siteId, responseGetcompanyData]);
  
  if (reqGetCompanyStatus.isLoading) {
    return (
      <div className="text-center">
        <LoadingData />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center">{siteData?.site_name}</h2>
      <div className="p50LR">
        <p>
          Current Gas & Electricity Supplier Details :{" "}
          {siteData?.current_gas_and_electricity_supplier_details}
        </p>
        <p>Customer Consent : {siteData?.customer_consent ? "Yes" : "No"}</p>
        <p>Lead Source : {siteData?.lead_source}</p>
        <p>Lead Type : {siteData?.lead_type}</p>
        <p>LOA Header To Use : {siteData?.loa_header_to_use}</p>
        <p>LOA Template : {siteData?.loa_template}</p>
        <p>Owner Name : {siteData?.owner_name}</p>
        <p>Type Of Owner : {siteData?.type_of_owner}</p>
        <p>Vacant : {siteData?.vacant ? "Yes" : "No"}</p>
        <p>
          Welcome Letter Send : {siteData?.welcome_letter_send ? "Yes" : "No"}
        </p>
        <p>
          Contact Person Name :
          {siteData?.contacts?.first_name + " " + siteData?.contacts?.last_name}
        </p>
        <p>Contact Person Position: {siteData?.contacts?.position}</p>
      </div>
    </>
  );
}

export default SiteDetails;
