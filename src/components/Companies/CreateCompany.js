import React, { useEffect, useReducer, useState } from "react";

import { uiAction } from "../../store/uiStore";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import SelectionBox from "../Form/SelectionBox";
import { Button, Form } from "react-bootstrap";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";
const initialSiteDetails = {
  name: "",
  parent_company: "",
  reference: "",
  // numberOfEmployees: "",
  // registrationNo: "",
  // estimatedTurnover: "",
  // accountName: "",
  // bankName: "",
  // accountNo: "",
  // shortCode: "",
};

const reducerSite = (state, action) => {
  if (action?.reset) {
    return action.value;
  }
  return { ...state, [action.type]: action.value };
};
function CreateCompany(props) {
  // state and reducers
  const [companyData, dispatchcompanyData] = useReducer(
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
    dispatchcompanyData({ type: fileName, value: file });
  };

  // create site
  const createSite = async function (e) {
    e.preventDefault();
    if (
      !companyData.name
      // !companyData.numberOfEmployees?.length ||
      // !companyData.registrationNo ||
      // !companyData.estimatedTurnover?.length ||
      // !companyData.accountName?.length ||
      // !companyData.bankName?.length ||
      // !companyData.accountNo?.length ||
      // !companyData.shortCode?.length
    ) {
      setErr("Company name is Required");
      return;
    } else if (err?.length) {
      setErr("");
    }
    // let body = {
    //   name: companyData.name,
    //   parent_company: "",
    //   reference: "",
    //   // number_of_employees: companyData.numberOfEmployees,
    //   // registration_no: companyData.registrationNo,
    //   // estimated_turnover: companyData.estimatedTurnover,
    //   // account_name: companyData.accountName,
    //   // bank_name: companyData.bankName,
    //   // account_no: companyData.accountNo,
    //   // shortcode: companyData.shortCode,
    // };
    setSendReqData({
      ...sendReqData,
      url: "company/",
      fetchObj: {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
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
          heading: "Company",
          msg: `${companyData.name} Company Created`,
        })
      );
      props.setRefreshTable(true);
      dispatchcompanyData({ reset: true, value: initialSiteDetails });
      // props.hideModal();
    }
  }, [responseData]);
  return (
    <div id="tabsSimple" className="col-xl-12 col-12 layout-spacing">
      {/* <div className="neumorphism-box"> */}
      <NeumorphismWrapper>
        <Form onSubmit={createSite}>
          <div className="row">
            <Form.Group className="mb-3 col-md-4" controlId="reference">
              <Form.Label>Parent Company</Form.Label>
              <Form.Control
                type="text"
                name="parent_company"
                value={companyData.parent_company}
                onChange={(e) =>
                  dispatchcompanyData({
                    type: "parent_company",
                    value: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* <SelectionBox
                groupClass="mb-3 col-md-4 selectbox"
                groupId="parent_company"
                label="Parent Company"
                value={companyData.parent_company}
                onChange={handleChange.bind(null, "parent_company")}
                name="Parent Company"
                isSearch={true}
                objKey="name"
                url="sites/get/company_name/"
              /> */}
            <Form.Group className="mb-3 col-md-4" controlId="name">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={companyData.name}
                onChange={(e) =>
                  dispatchcompanyData({
                    type: "name",
                    value: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-4" controlId="reference">
              <Form.Label>Reference</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={companyData.reference}
                onChange={(e) =>
                  dispatchcompanyData({
                    type: "reference",
                    value: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* <Form.Group
                  className="mb-3 col-md-3"
                  controlId="numberOfEmployees">
                  <Form.Label>Number Of Employees</Form.Label>
                  <Form.Control
                    type="text"
                    name="numberOfEmployees"
                    value={companyData.numberOfEmployees}
                    onChange={(e) =>
                      dispatchcompanyData({
                        type: "numberOfEmployees",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group> */}

            {/* <Form.Group
                  className="mb-3 col-md-3"
                  controlId="registrationNo">
                  <Form.Label>Registration Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="registrationNo"
                    value={companyData.registrationNo}
                    onChange={(e) =>
                      dispatchcompanyData({
                        type: "registrationNo",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-md-3"
                  controlId="estimatedTurnover">
                  <Form.Label>Estimated Turnover</Form.Label>
                  <Form.Control
                    type="text"
                    name="estimatedTurnover"
                    value={companyData.estimatedTurnover}
                    onChange={(e) =>
                      dispatchcompanyData({
                        type: "estimatedTurnover",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" controlId="accountName">
                  <Form.Label>Account Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountName"
                    value={companyData.accountName}
                    onChange={(e) =>
                      dispatchcompanyData({
                        type: "accountName",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" controlId="bankName">
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bankName"
                    value={companyData.bankName}
                    onChange={(e) =>
                      dispatchcompanyData({
                        type: "bankName",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" controlId="accountNo">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountNo"
                    value={companyData.accountNo}
                    onChange={(e) =>
                      dispatchcompanyData({
                        type: "accountNo",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3" controlId="shortCode">
                  <Form.Label>Shortcode</Form.Label>
                  <Form.Control
                    type="text"
                    name="shortCode"
                    value={companyData.shortCode}
                    onChange={(e) =>
                      dispatchcompanyData({
                        type: "shortCode",
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
                {reqStatus.isLoading ? "Creating Company" : "Create Company"}
              </Button>
            </div>
          </div>
        </Form>
      </NeumorphismWrapper>
      {/* </div> */}
    </div>
  );
}

export default CreateCompany;
