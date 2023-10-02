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
  // console.log(props.siteId);
  useEffect(() => {
    // console.log(props.siteId);
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

  const turnaryData = function (data) {
    return data || "-";
  };

  const returnYN = function (data) {
    return data ? "YES" : "NO";
  };
  return (
    <>
      <h2 className="text-center">{turnaryData(siteData?.site_name)}</h2>
      <div className="p50LR">
        <p>
          Current Gas & Electricity Supplier Details :{" "}
          {turnaryData(siteData?.current_gas_and_electricity_supplier_details)}
        </p>
        <p>Customer Consent : {returnYN(siteData?.customer_consent)}</p>
        <p>Lead Source : {turnaryData(siteData?.lead_source)}</p>
        <p>Lead Type : {turnaryData(siteData?.lead_type)}</p>
        <p>Loa Header To Use : {turnaryData(siteData?.loa_header_to_use)}</p>
        <p>Loa Template : {turnaryData(siteData?.loa_template)}</p>
        <p>Owner Name : {turnaryData(siteData?.owner_name)}</p>
        <p>Type Of Owner : {turnaryData(siteData?.type_of_owner)}</p>
        <p>Vacant : {siteData?.vacant ? "YES" : "NO"}</p>
        <p>
          Welcome Letter Send? : {siteData?.welcome_letter_send ? "YES" : "NO"}
        </p>
        <p>
          Contact person Name :{" "}
          {turnaryData(
            siteData?.contacts?.first_name + " " + siteData?.contacts?.last_name
          )}
        </p>
        <p>
          Contact Person position: {turnaryData(siteData?.contacts?.position)}
        </p>
      </div>
    </>
  );
}

export default SiteDetails;
