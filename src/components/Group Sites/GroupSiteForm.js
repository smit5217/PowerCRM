import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import SelectionBox from "../Form/SelectionBox";
import { Link, useNavigate, useParams } from "react-router-dom";
import SelectSearch from "react-select-search";
import useFetch from "../../hooks/useFetch";
import LoadingData from "../UI/LoadingData";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";
import MultiSelectBox from "../UI/Form/MultiSelectBox";

function GroupSiteForm(props) {
  const [formData, setFormData] = useState({
    gName: "",
    sites: "",
    gType: "",
  });
  const groupSiteId = useParams().groupSiteId;
  const navigate = useNavigate();
  // const [reqStatus, setReqStatus] = useState({
  //   isLoading: false,
  //   err: "",
  // });
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const occurance = useRef(1);
  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    responseData,
    setResponseData,
  ] = useFetch();

  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  useEffect(() => {
    // mean we got data now
    if (responseGetcompanyData) {
      console.log("in responseGetcompanyData", occurance.current);
      console.log(responseGetcompanyData);
      occurance.current += 1;
      setFormData({
        gName: responseGetcompanyData?.data?.group_name,
        sites: responseGetcompanyData?.data?.sites?.length
          ? responseGetcompanyData?.data?.sites.map((site) => {
              return { id: site.id, name: site.site_name };
            })
          : [],
        gType: responseGetcompanyData?.data?.group_type,
      });
    }
  }, [responseGetcompanyData]);

  useEffect(() => {
    setMsg("");
    setErr("");

    occurance.current += 1;
    if (groupSiteId) {
      setCompanyGetResponseData(null);
      setCompanyGETData({
        ...companyGETData,
        url: `multisite/${groupSiteId}/`,
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
      setFormData({ gName: "", sites: "", gType: "" });
    }
  }, [groupSiteId]);

  const createGroupSite = function (e) {
    e.preventDefault();
    setMsg("");
    setErr("");
    if (!formData.gName) {
      setErr("Group Name is Required");
      return;
    } else if (!formData.gType) {
      setErr("Group Type is Required");
      return;
    }
    let body = {
      group_name: formData.gName,
      group_type: formData.gType,
      sites: formData?.sites?.map((site) => site.id),
    };
    setResponseData(null);
    let method = "POST",
      url = "multisite/";
    if (groupSiteId) {
      method = "PATCH";
      url = `multisite/${groupSiteId}/`;
    }
    setSendReqData({
      ...sendReqData,
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
    if (responseData) {
      if (responseData.status === 200 || responseData.status === 201) {
        setMsg(
          !groupSiteId
            ? "Group sites Created Succesfully"
            : "Group sites Edited Succesfully"
        );
        props.refreshTableEditMode();
        setFormData({ gName: "", sites: "", gType: "" });

        if (groupSiteId) {
          navigate("/group-sites/");
        }
      } else {
        setErr("Some Problem Occured, Please try again");
      }
    }
  }, [responseData]);

  const btnTitle = groupSiteId ? "Edit" : "Create";

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
        <Form onSubmit={createGroupSite}>
          <div className="row">
            <Form.Group className="mb-3 col-md-4" controlId="stuName">
              <Form.Label>Group name</Form.Label>
              <Form.Control
                type="text"
                name="stuName"
                value={formData.gName}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...prev, gName: e.target.value };
                  })
                }
              />
            </Form.Group>
            <MultiSelectBox
              groupClass="mb-3 col-md-4 selectbox"
              groupId="parentCompany"
              label="Sites"
              multiple={true}
              value={formData.sites}
              onSelect={(val) => {
                console.log(val);
                setFormData((prev) => {
                  return { ...prev, sites: val };
                });
              }}
              onRemove={(val) => {
                console.log(val);
                setFormData((prev) => {
                  return { ...prev, sites: val };
                });
              }}
              name="parentCompany"
              isSearch={true}
              objKey={["site_name"]}
              url="sites/get/site/?brief=True"
            />
            {/* <SelectionBox
              groupClass="mb-3 col-md-4 selectbox"
              groupId="parentCompany"
              label="Sites"
              multiple={true}
              value={formData.sites}
              onChange={(val) => {
                console.log(val);
                setFormData((prev) => {
                  return { ...prev, sites: val };
                });
              }}
              name="parentCompany"
              isSearch={true}
              objKey="site_name"
              url="sites/get/site/?brief=True"
            /> */}
            <Form.Group
              className={"mb-3 col-md-4 selectbox"}
              controlId={"companyName"}
            >
              <Form.Label className="text-center itsBlock">
                Group type
              </Form.Label>
              <SelectSearch
                options={[
                  { name: "Basic Site Group", value: "BASIC" },
                  { name: "Multi Site Group", value: "MULTI" },
                ]}
                placeholder={"Select Options"}
                value={formData.gType}
                onChange={(val) =>
                  setFormData((prev) => {
                    return { ...prev, gType: val };
                  })
                }
                name={"companyName"}
              />
            </Form.Group>
            <div className="col-md-12 text-center">
              {err?.length ? <p className="dengor">{err}</p> : ""}
              {msg?.length ? <p className="">{msg}</p> : ""}
              <Button
                variant="primary"
                type="submit"
                disabled={reqStatus.isLoading}
              >
                {reqStatus.isLoading
                  ? `${btnTitle} Group Sites`
                  : `${btnTitle} Group Sites`}
              </Button>
            </div>
          </div>
        </Form>
      </NeumorphismWrapper>
    </div>
  );
}

export default GroupSiteForm;
