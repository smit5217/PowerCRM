import React, { useEffect, useReducer, useState } from "react";
import { Button, Form } from "react-bootstrap";
import SelectionBox from "../Form/SelectionBox";
import useFetch from "../../hooks/useFetch";
import useUiAction from "../../hooks/useUiAction";
import { uiAction } from "../../store/uiStore";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";

const reducerSite = (state, action) => {
  return { ...state, [action.type]: action.value };
};
function CreateSite(props) {
  const initialSiteDetails = {
    parentCompany: "",
    siteName: "",
    companyName: "",
    reference: "",
    groupName: props.groupId || "",
    // typeOfOwner: "",
    // ownerName: "",
    // currentGasElectDetails: "",
  };
  // state and reducers
  const [siteData, dispatchSiteData] = useReducer(
    reducerSite,
    initialSiteDetails
  );
  const [err, setErr] = useState("");

  // store dispatch
  const dispatch = useDispatch();

  //   custom hook for ajax calls
  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    responseData,
    setResponseData,
  ] = useFetch();

  // for selectionbox value
  const handleChange = (fileName, file) => {
    // console.log(fileName, file);
    dispatchSiteData({ type: fileName, value: file });
  };

  // create site
  const createSite = async function (e) {
    e.preventDefault();

    if (!siteData.siteName) {
      setErr("Site name is Required");
      return;
    } else if (!siteData.companyName) {
      setErr("Company name is Required");
      return;
    } else if (err?.length) {
      setErr("");
    }
    let body = {
      // parent_company: siteData.parentCompany,
      site_name: siteData.siteName,
      company: siteData.companyName,
      // type_of_owner: siteData.typeOfOwner,
      // owner_name: siteData.ownerName,
      // current_gas_and_electricity_supplier_details:
      //   siteData.currentGasElectDetails,
    };
    if (siteData.groupName) {
      body.group_site = siteData.groupName;
    }
    setSendReqData({
      ...sendReqData,
      url: "sites/create/site/",
      fetchObj: {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
      isAuthNeeded: true,
      expectStatusCode: [200, 201],
    });
  };

  // when we get response lets close the modal and show them success msg
  useEffect(() => {
    if (responseData) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: "Site",
          msg: `${siteData.siteName} Site Created`,
        })
      );
      props.siteCreated();
      props.setRefreshTable(true);
    }
  }, [responseData]);

  return (
    <div id="tabsSimple" className="col-xl-12 col-12 layout-spacing">
      {/* <div className="neumorphism-box"> */}
      <NeumorphismWrapper>
        <Form onSubmit={createSite}>
          <div className="row">
            {/* <Form.Group className="mb-3 col-md-3" controlId="reference">
                <Form.Label>Parent Company</Form.Label>
                <Form.Control
                  type="text"
                  name="parentCompany"
                  value={siteData.parentCompany}
                  onChange={(e) =>
                    dispatchSiteData({
                      type: "parentCompany",
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group> */}

            {/* <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="parentCompany"
                label="Parent Name"
                value={siteData.parentCompany}
                onChange={handleChange.bind(null, "parentCompany")}
                name="parentCompany"
                isSearch={true}
                objKey="name"
                url="sites/get/company_name/"
              /> */}
            <Form.Group className="mb-3 col-md-3" controlId="stuName">
              <Form.Label>Site Name</Form.Label>
              <Form.Control
                type="text"
                name="stuName"
                value={siteData.siteName}
                onChange={(e) =>
                  dispatchSiteData({
                    type: "siteName",
                    value: e.target.value,
                  })
                }
              />
            </Form.Group>
            <SelectionBox
              groupClass="mb-3 col-md-3 selectbox"
              groupId="companyName"
              label={
                <>
                  Company Name{" "}
                  <Link to="/companies">
                    (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    )
                  </Link>
                </>
              }
              value={siteData.companyName}
              onChange={handleChange.bind(null, "companyName")}
              name="companyName"
              isSearch={true}
              objKey="name"
              url="sites/get/company_name/"
            />
            {/* <div className="col-md-1">
               
              </div> */}
            {/* <Form.Group className="mb-3 col-md-1">
                {" "}
                <Form.Label>Company Not in List?</Form.Label>
                <Link to="/companies" className="btn btn-primary">
                  {/* <i class="fa-solid fa-plus"></i> 
                  <FontAwesomeIcon icon="fa-solid fa-plus" size="xs" />
                  Add company
                </Link>
              </Form.Group> */}

            <Form.Group className="mb-3 col-md-3" controlId="reference">
              <Form.Label>Reference</Form.Label>
              <Form.Control
                type="text"
                name="reference"
                value={siteData.reference}
                onChange={(e) =>
                  dispatchSiteData({
                    type: "reference",
                    value: e.target.value,
                  })
                }
              />
            </Form.Group>

            <SelectionBox
              groupClass="mb-3 col-md-3 selectbox"
              groupId="groupName"
              label="Group Name"
              value={siteData.groupName}
              onChange={handleChange.bind(null, "groupName")}
              name="groupName"
              isSearch={true}
              objKey="group_name"
              url="multisite/multisitelist/"
            />

            {/* <Form.Group className="mb-3 col-md-3" controlId="stuName">
                    <Form.Label>Type Of Owner</Form.Label>
                    <Form.Control
                      type="text"
                      name="stuName"
                      value={siteData.typeOfOwner}
                      onChange={(e) =>
                        dispatchSiteData({
                          type: "typeOfOwner",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-3" controlId="stuName">
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="stuName"
                      value={siteData.ownerName}
                      onChange={(e) =>
                        dispatchSiteData({
                          type: "ownerName",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-3" controlId="stuName">
                    <Form.Label>
                      Current gas and electricity supplier details
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="stuName"
                      value={siteData.currentGasElectDetails}
                      onChange={(e) =>
                        dispatchSiteData({
                          type: "currentGasElectDetails",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group> */}
            <div className="col-md-12 text-center">
              {err?.length ? <p className="dengor">{err}</p> : ""}
              <Button
                variant="primary"
                type="submit"
                disabled={reqStatus.isLoading}
              >
                {reqStatus.isLoading ? "Creating Site" : "Create Site"}
              </Button>
            </div>
          </div>
        </Form>
      </NeumorphismWrapper>

      {/* </div> */}
    </div>
  );
}

export default CreateSite;
