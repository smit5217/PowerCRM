import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import LoadingData from "./UI/LoadingData";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";

function DTable(props) {
  // store and reducers
  //   db data and data table usage states
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  // get current location
  const currentPath = useLocation().pathname;
  // custom hooks
  //   custom hook for ajax calls
  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    responseData,
    setResponseData,
  ] = useFetch();
  // handle row change functions
  const handlePerRowsChange = (newPerPage, page) => {
    // console.log("per row is changed and data is", newPerPage, page);
    setPerPage(newPerPage);
    setPageNo(page);
    setResponseData(null);

    setData([]);
  };

  // have to reset response data
  useEffect(() => {
    if (props.refreshTable) {
      props.setRefreshTable(false);
      setResponseData(null);
    }
  }, [props.refreshTable]);
  //   useEffect for sending and receiving data
  useEffect(() => {
    if (!responseData) {
      let url = `${props.url}&p=${pageNo}&records=${perPage}`;
      setSendReqData({
        ...sendReqData,
        url,
        fetchObj: {
          method: "GET",
        },
        isAuthNeeded: true,
        expectStatusCode: [200],
      });
    } else if (responseData && !reqStatus.isLoading) {
      setTotalRows(responseData.data.count);
      setData(props.transformFunction(responseData.data.results));
    }
  }, [props.url, responseData, reqStatus, pageNo, perPage]);

  // useEffect for just the group-sites
  useEffect(() => {
    if (currentPath === "/group-sites" && data) {
      if (props.showSites?.groupId) {
        const sites = data.find((data) => {
          return data.id === props.showSites.groupId;
        });
        props.SetShowSites({
          ...props.showSites,
          total: sites.sites?.length,
          show: true,
          sites: sites.sites,
        });
      }
    }
  }, [currentPath, data]);
  return (
    <DataTable
      onChangePage={(page) => {
        // console.log("new Page numbner is", page);
        setPageNo(page);
        setData([]);
        setResponseData(null);
      }}
      onChangeRowsPerPage={handlePerRowsChange}
      columns={props.columns}
      data={data}
      selectableRows
      progressPending={reqStatus.isLoading}
      progressComponent={<LoadingData className="loading-spinner-flex" />}
      paginationTotalRows={totalRows}
      key={totalRows}
      pagination
      paginationServer
    />
  );
}

export default DTable;
