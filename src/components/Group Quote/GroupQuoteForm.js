import React, { useEffect, useRef, useState } from "react";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";
import { Button, Form } from "react-bootstrap";
import LoadingData from "../UI/LoadingData";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MultiSelectBox from "../UI/Form/MultiSelectBox";

function GroupQuoteForm(props) {
  const [formData, setFormData] = useState({
    groupName: "",
    groupSelect: [],
  });

  const groupQuoteId = useParams().groupQuoteId;
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const occurance = useRef(1);

  const [
    sendcompanyData,
    setCompanyReqData,
    reqCompanyStatus,
    responsecompanyData,
    setCompanyResponseData,
  ] = useFetch();

  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  useEffect(() => {
    if (responseGetcompanyData) {
      occurance.current += 1;
      setFormData({
        groupName: responseGetcompanyData?.data?.group_name,
        groupSelect: responseGetcompanyData?.data?.group_detail?.map((data) => {
          return {
            id: data?.id,
            name: data?.supplier,
          };
        }),
      });
    }
  }, [responseGetcompanyData]);

  useEffect(() => {
    setMsg("");
    setErr("");

    occurance.current += 1;
    if (groupQuoteId) {
      setCompanyGetResponseData(null);
      setCompanyGETData({
        ...companyGETData,
        url: `quote/group-quote/${groupQuoteId}/`,
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
    } else {
      setFormData({ groupName: "", groupSelect: [] });
    }
  }, [groupQuoteId]);

  const createGroupQuotes = function (e) {
    e.preventDefault();
    if (!formData.groupName) {
      setErr("Group Name is required");
      return;
    } else if (!formData.groupSelect?.length) {
      setErr("Please Select Group from list");
      return;
    }
    let body = {
      group_detail: formData.groupSelect?.map((data) => data.id),
      group_name: formData.groupName,
    };
    setCompanyResponseData(null);
    let method = "POST",
      url = `quote/group-quote/`;
    if (groupQuoteId) {
      method = "PATCH";
      url = `quote/group-quote/${groupQuoteId}/`;
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
        body: JSON.stringify(body),
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
        setMsg(
          !groupQuoteId
            ? "Group quotes Created Succesfully"
            : "Group quotes Edited Succesfully"
        );
        props.refreshTableEditMode();
        setFormData({ groupName: "", groupSelect: [] });
        if (groupQuoteId) {
          navigate("/group-quotes");
        }
      } else {
        setErr("Some Proble Occured, Please try again");
      }
    }
  }, [responsecompanyData]);

  const btnTitle = groupQuoteId ? "Edit" : "Create";

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
          <Form.Group className="mb-3 col-6" controlId="supplier">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, groupName: e.target.value };
                })
              }
            />
          </Form.Group>
          <MultiSelectBox
            groupClass="mb-3 col-md-6"
            groupId="parentCompany"
            label="Group Detail"
            multiple={true}
            value={formData.groupSelect}
            onSelect={(val) => {
              setFormData((prev) => {
                return { ...prev, groupSelect: val };
              });
            }}
            onRemove={(val) => {
              setFormData((prev) => {
                return { ...prev, groupSelect: val };
              });
            }}
            name="parentCompany"
            isSearch={true}
            objKey={["supplier"]}
            url="quote/recent-quotes/"
          />
          <div className="col-md-12 text-center">
            {err ? <p className="text-center red">{err}</p> : ""}
            {msg?.length ? <p className="">{msg}</p> : ""}
            <Button type="submit">
              {reqCompanyStatus.isLoading
                ? `${btnTitle} Group Quotes`
                : `${btnTitle} Group Quotes`}
            </Button>
          </div>
        </Form>
      </NeumorphismWrapper>
    </div>
  );
}

export default GroupQuoteForm;
