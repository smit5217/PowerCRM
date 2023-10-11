import React, { useEffect, useReducer, useState } from "react";
import { uiAction } from "../../store/uiStore";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";

const initialSiteDetails = {
  name: "",
  parent_company: "",
  reference: "",
};

const reducerSite = (state, action) => {
  if (action?.reset) {
    return action.value;
  }
  return { ...state, [action.type]: action.value };
};

function CreateCompany(props) {
  const [companyData, dispatchcompanyData] = useReducer(
    reducerSite,
    initialSiteDetails
  );
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    responseData,
    setResponseData,
  ] = useFetch();

  const handleChange = (fileName, file) => {
    dispatchcompanyData({ type: fileName, value: file });
  };

  const createSite = async function (e) {
    e.preventDefault();
    if (
      !companyData.name
    ) {
      setErr("Company name is Required");
      return;
    } else if (err?.length) {
      setErr("");
    }
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
    }
  }, [responseData]);

  return (
    <div id="tabsSimple" className="col-xl-12 col-12 layout-spacing">
      <NeumorphismWrapper>
        <Form onSubmit={createSite}>
          <div className="row">
            <Form.Group className="mb-3 col-md-4" controlId="parent_company">
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
                name="reference"
                value={companyData.reference}
                onChange={(e) =>
                  dispatchcompanyData({
                    type: "reference",
                    value: e.target.value,
                  })
                }
              />
            </Form.Group>
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
    </div>
  );
}

export default CreateCompany;
