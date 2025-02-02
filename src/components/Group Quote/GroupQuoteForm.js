import React, { useEffect, useReducer, useState } from "react";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";
import { Button, Form } from "react-bootstrap";
import LoadingData from "../UI/LoadingData";
import { uiAction } from "../../store/uiStore";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import SelectionBox from "../Form/SelectionBox";
import MultiSiteDetails from "./MultiSiteDetails";

const initialGroupQuotesState = {
  site: "",
  supplier: "",
  product: "",
  term: "",
  dayRate: "",
  nightRate: "",
  standingCharge: "",
  kvaCharge: "",
  additionalCharge: "",
  extraInfo: "",
  upLift: "",
  rateIncludedInUplift: false,
};

const GroupQuotesReducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};

const GroupQuoteForm = (props) => {
  const [groupQuotesForm, dispatchInputChange] = useReducer(
    GroupQuotesReducer,
    initialGroupQuotesState
  );

  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const [
    sendCompanyData,
    setCompanyReqData,
    reqCompanyStatus,
    responseCompanyData,
    setCompanyResponseData,
  ] = useFetch();

  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  const navigate = useNavigate();

  const handleSelectionChange = function (type, value) {
    dispatchInputChange({ type, value });
  };

  const createGroupQuotes = function (e) {
    e.preventDefault();
    if (!groupQuotesForm.site) {
      setErr("Group Site is required");
      return;
    } else if (!groupQuotesForm.supplier) {
      setErr("supplier is required");
      return;
    } else if (!groupQuotesForm.product) {
      setErr("product is required");
      return;
    } else if (!groupQuotesForm.term) {
      setErr("term is required");
      return;
    } else if (!groupQuotesForm.dayRate) {
      setErr("Day Rate is required");
      return;
    } else if (!groupQuotesForm.nightRate) {
      setErr("Night Rate is required");
      return;
    } else if (!groupQuotesForm.standingCharge) {
      setErr("Standing Charge is required");
      return;
    } else if (!groupQuotesForm.kvaCharge) {
      setErr("Kva Charge is required");
      return;
    } else if (!groupQuotesForm.upLift) {
      setErr("Up Lift is required");
      return;
    }
    let sendData = {
      additional_charge: groupQuotesForm.additionalCharge,
      day_rate: groupQuotesForm.dayRate,
      extra_info: groupQuotesForm.extraInfo,
      kva_charge: groupQuotesForm.kvaCharge,
      night_rate: groupQuotesForm.nightRate,
      product: groupQuotesForm.product,
      rates_already_include_at_uplift: groupQuotesForm.rateIncludedInUplift,
      standing_charge: groupQuotesForm.standingCharge,
      supplier: groupQuotesForm.supplier,
      term: groupQuotesForm.term,
      up_lift: groupQuotesForm.upLift,
    };
    setCompanyResponseData(null);
    let url = `quote/generate-quote/multisite/${groupQuotesForm.site}/`,
      method = "POST";
    if (props.quoteId) {
      url = `quote/group-quote/${props.quoteId}/`;
      method = "PATCH";
    }
    setCompanyReqData({
      ...sendCompanyData,
      url,
      fetchObj: {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      },
      isAuthNeeded: true,
      expectStatusCode: [200, 201],
    });
  };

  useEffect(() => {
    if (responseCompanyData) {
      if (
        responseCompanyData.status === 200 ||
        responseCompanyData.status === 201
      ) {
        navigate("/group-quotes");
        dispatch(
          uiAction.setNotification({
            show: true,
            heading: "Quote",
            msg: `${
              props.isEdit
                ? "Group Quote Edited Succesfully"
                : "Group Quote Created Succesfully"
            }`,
          })
        );
      } else {
        setErr("Some Proble Occured, Please try again");
      }
    }
  }, [responseCompanyData]);

  useEffect(() => {
    if (props.quoteId && !responseGetcompanyData) {
      setCompanyGetResponseData(null);
      setCompanyGETData({
        ...companyGETData,
        url: `quote/group-quote/${props.quoteId}/`,
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
      if (responseGetcompanyData?.status === 200) {
        dispatchInputChange({
          all: true,
          data: {
            supplier: responseGetcompanyData?.data?.supplier,
            product: responseGetcompanyData?.data?.product,
            term: responseGetcompanyData?.data?.term,
            dayRate: responseGetcompanyData?.data?.day_rate,
            nightRate: responseGetcompanyData?.data?.night_rate,
            standingCharge: responseGetcompanyData?.data?.standing_charge,
            kvaCharge: responseGetcompanyData?.data?.kva_charge,
            additionalCharge: responseGetcompanyData?.data?.additional_charge,
            extraInfo: responseGetcompanyData?.data?.extra_info,
            upLift: responseGetcompanyData?.data?.up_lift,
            rateIncludedInUplift:
              responseGetcompanyData?.data?.rates_already_include_at_uplift,
          },
        });
      }
    }
  }, [props.quoteId, responseGetcompanyData]);

  const btnTitle = props.quoteId ? "Edit" : "Create";

  if (reqGetCompanyStatus.isLoading) {
    return (
      <div className="text-center">
        <LoadingData />
      </div>
    );
  }
  return (
    <div id="tabsSimple" className="col-xl-12 col-12 layout-spacing">
      <NeumorphismWrapper>
        <div className="widget-header">
          <h4>{props.title}</h4>
        </div>
        <Form onSubmit={createGroupQuotes} className="row">
          <SelectionBox
            groupClass="mb-3 col-md-6 selectbox"
            groupId="groupQuote"
            label="Group"
            value={groupQuotesForm.site}
            onChange={handleSelectionChange.bind(null, "site")}
            name="site"
            isSearch={true}
            objKey="group_name"
            url="multisite/?brief=True"
          />
          <Form.Group className="mb-3 col-6" controlId="supplier">
            <Form.Label>Supplier</Form.Label>
            <Form.Control
              type="text"
              name="supplier"
              value={groupQuotesForm.supplier}
              onChange={(e) =>
                dispatchInputChange({
                  type: "supplier",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="product">
            <Form.Label>Product</Form.Label>
            <Form.Control
              type="text"
              name="product"
              value={groupQuotesForm.product}
              onChange={(e) =>
                dispatchInputChange({
                  type: "product",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="term">
            <Form.Label>Term</Form.Label>
            <Form.Control
              type="number"
              name="term"
              value={groupQuotesForm.term}
              onChange={(e) =>
                dispatchInputChange({
                  type: "term",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="dayRate">
            <Form.Label>Day Rate (pence/kwh)</Form.Label>
            <Form.Control
              type="number"
              name="dayRate"
              value={groupQuotesForm.dayRate}
              onChange={(e) =>
                dispatchInputChange({
                  type: "dayRate",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="nightRate">
            <Form.Label>Night Rate (pence/kwh)</Form.Label>
            <Form.Control
              type="number"
              name="nightRate"
              value={groupQuotesForm.nightRate}
              onChange={(e) =>
                dispatchInputChange({
                  type: "nightRate",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="standingCharge">
            <Form.Label>Standing Charge (pence)</Form.Label>
            <Form.Control
              type="number"
              name="standingCharge"
              value={groupQuotesForm.standingCharge}
              onChange={(e) =>
                dispatchInputChange({
                  type: "standingCharge",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="kvaCharge">
            <Form.Label>KVA Charge (pence)</Form.Label>
            <Form.Control
              type="number"
              name="kvaCharge"
              value={groupQuotesForm.kvaCharge}
              onChange={(e) =>
                dispatchInputChange({
                  type: "kvaCharge",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="name">
            <Form.Label>Additional Charge(£)</Form.Label>
            <Form.Control
              type="number"
              name="additionalCharge"
              value={groupQuotesForm.additionalCharge}
              onChange={(e) =>
                dispatchInputChange({
                  type: "additionalCharge",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="extraInfo">
            <Form.Label>Extra Info</Form.Label>
            <Form.Control
              type="text"
              name="extraInfo"
              value={groupQuotesForm.extraInfo}
              onChange={(e) =>
                dispatchInputChange({
                  type: "extraInfo",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="upLift">
            <Form.Label>Up Lift</Form.Label>
            <Form.Control
              type="number"
              name="upLift"
              value={groupQuotesForm.upLift}
              onChange={(e) =>
                dispatchInputChange({
                  type: "upLift",
                  value: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 col-6" controlId="name">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Rates Already Include At UpLift"
              checked={groupQuotesForm.rateIncludedInUplift}
              onChange={(e) => {
                dispatchInputChange({
                  type: "rateIncludedInUplift",
                  value: e.target.checked,
                });
              }}
            />
          </Form.Group>
          <div className="col-md-12 text-center">
            {err ? <p className="text-center red">{err}</p> : ""}
            <Button type="submit">
              {reqCompanyStatus.isLoading
                ? `${btnTitle} Group Quotes`
                : `${btnTitle} Group Quotes`}
            </Button>
          </div>
        </Form>
      </NeumorphismWrapper>
      {groupQuotesForm.site && (
        <NeumorphismWrapper>
          <div className="col-md-6">
            <MultiSiteDetails siteId={groupQuotesForm.site} />
          </div>
        </NeumorphismWrapper>
      )}
    </div>
  );
};

export default GroupQuoteForm;
