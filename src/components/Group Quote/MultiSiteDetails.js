import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingData from "../UI/LoadingData";
import { Tab, Table, Tabs } from "react-bootstrap";

const MultiSiteDetails = ({ siteId }) => {
  const [multiSiteData, setMultiSiteData] = useState();

  const [
    companyGetData,
    setCompanyGetData,
    reqGetCompanyStatus,
    responseGetCompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if (siteId) {
      setCompanyGetResponseData(null);
      setCompanyGetData({
        ...companyGetData,
        url: `multisite/${siteId}/`,
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
  }, [siteId]);

  useEffect(() => {
    if (responseGetCompanyData) {
      if (responseGetCompanyData.status === 200) {
        setMultiSiteData(responseGetCompanyData.data);
      }
    }
  }, [responseGetCompanyData]);

  if (reqGetCompanyStatus.isLoading) {
    return (
      <div className="text-center">
        <LoadingData />
      </div>
    );
  }

  return (
    <div>
      {multiSiteData?.sites?.length > 0 ? (
        <Tabs>
          <Tab eventKey={0} title="Sites Information">
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Site Name</th>
                  <th>Compnay Name</th>
                </tr>
              </thead>
              <tbody>
                {multiSiteData.sites?.map(({ id, site_name, company }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{site_name}</td>
                    <td>{company}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      ) : (
        <div>
          <b>No Sites Information Available</b>
        </div>
      )}
    </div>
  );
};
export default MultiSiteDetails;
