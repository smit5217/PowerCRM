import React, { useEffect, useReducer, useState } from "react";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";
import { Button, Form } from "react-bootstrap";
import SelectionBox from "../Form/SelectionBox";
import LoadingData from "../UI/LoadingData";
import { uiAction } from "../../store/uiStore";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import MultiSelectBox from "../UI/Form/MultiSelectBox";
const initialSiteState = {
  groupName: "",
  groupSelect: [],
};
const QuoteReducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  return { ...state, [action.type]: action.value };
};
function GroupQuoteForm(props) {
  const [quoteForm, dispatchInputChange] = useReducer(
    QuoteReducer,
    initialSiteState
  );

  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const [
    sendcompanyData,
    setCompanyReqData,
    reqCompanyStatus,
    responsecompanyData,
    setCompanyResponseData,
    setStatus,
  ] = useFetch();

  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();
  const navigate = useNavigate();
  // const [
  //   companyGETData,
  //   setCompanyGETData,
  //   reqGetCompanyStatus,
  //   responseGetcompanyData,
  //   setCompanyGetResponseData,
  // ] = useFetch();
  const handleSelectionChange = function (value) {
    dispatchInputChange({ type: "groupSelect", value });
  };

  const submitData = function (e) {
    e.preventDefault();
    if (!quoteForm.groupName) {
      setErr("Group Name is required");
      return;
    } else if (!quoteForm.groupSelect?.length) {
      setErr("Please Select Group from list");
      return;
    }

    let sendData = {
      group_detail: quoteForm.groupSelect?.map((data) => data.id),
      group_name: quoteForm.groupName,
    };
    setCompanyResponseData(null);
    let url = `quote/group-quote/`,
      method = "POST";
    if (props.quoteId) {
      url = `quote/group-quote/${props.quoteId}/`;
      method = "PATCH";
    }
    setCompanyReqData({
      ...sendcompanyData,
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
    if (responsecompanyData) {
      if (
        responsecompanyData.status === 200 ||
        responsecompanyData.status === 201
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
  }, [responsecompanyData]);

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
            groupName: responseGetcompanyData?.data?.group_name,
            groupSelect: responseGetcompanyData?.data?.group_detail?.map(
              (data) => {
                return {
                  id: data?.id,
                  name: data?.supplier,
                };
              }
            ),
          },
        });
      }
      // console.log(responseGetcompanyData);
    }
  }, [props.quoteId, responseGetcompanyData]);

  if (reqGetCompanyStatus.isLoading) {
    return (
      <div className="text-center">
        <LoadingData />
      </div>
    );
  }
  return (
    <NeumorphismWrapper>
      <div className="widget-header">
        <h4>{props.title}</h4>
      </div>

      <Form onSubmit={submitData} className="row">
        <Form.Group className="mb-3 col-6" controlId="supplier">
          <Form.Label>Group name</Form.Label>
          <Form.Control
            type="text"
            name="groupName"
            value={quoteForm.groupName}
            onChange={(e) =>
              dispatchInputChange({
                type: "groupName",
                value: e.target.value,
              })
            }
          />
        </Form.Group>
        <MultiSelectBox
          groupClass="mb-3 col-md-6 selectbox"
          groupId="groupQuote"
          label="Group Detail"
          multiple={true}
          value={quoteForm.groupSelect}
          onSelect={(val) => {
            handleSelectionChange(val);
          }}
          onRemove={(val) => {
            handleSelectionChange(val);
          }}
          name="groupQuote"
          isSearch={true}
          objKey={["supplier"]}
          url="quote/recent-quotes/"
        />
        <div className="col-md-12">
          {err ? <p className="text-center red">{err}</p> : ""}
          <Button type="submit">
            {reqCompanyStatus.isLoading ? "Submitting" : "Submit"}
          </Button>
        </div>
      </Form>
    </NeumorphismWrapper>
  );
}

export default GroupQuoteForm;
