import { useEffect, useRef, useState } from "react";
import SelectionBox from "../Form/SelectionBox";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";
import { Button, Form } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import LoadingData from "../UI/LoadingData";

const NotesForm = (props) => {
  const [formData, setFormData] = useState({
    select_site: "",
    site_notes: "",
    company_notes: "",
  });

  const noteId = useParams().noteId;
  const navigate = useNavigate();
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
    if (responseGetcompanyData) {
      occurance.current += 1;
      setFormData({
        select_site: responseGetcompanyData?.data?.select_site,
        site_notes: responseGetcompanyData?.data?.site_notes,
        company_notes: responseGetcompanyData?.data?.company_notes,
      });
    }
  }, [responseGetcompanyData]);

  useEffect(() => {
    setMsg("");
    setErr("");
    occurance.current += 1;
    if (noteId) {
      setCompanyGetResponseData(null);
      setCompanyGETData({
        ...companyGETData,
        url: `notes/note/${noteId}/`,
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
      setFormData({ select_site: "", site_notes: "", company_notes: "" });
    }
  }, [noteId]);

  const createNote = function (e) {
    e.preventDefault();
    setMsg("");
    setErr("");
    if (!formData.site_notes) {
      setErr("Site Note is Required");
      return;
    } else if (!formData.company_notes) {
      setErr("Company Note is Required");
      return;
    }
    let body = {
      select_site: formData?.select_site,
      site_notes: formData.site_notes,
      company_notes: formData.company_notes,
    };
    setResponseData(null);
    let method = "POST",
      url = "notes/note/";
    if (noteId) {
      method = "PATCH";
      url = `notes/note/${noteId}/`;
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
          !noteId ? "Note Created Succesfully" : "Note Edited Succesfully"
        );
        props.refreshTableEditMode();
        setFormData({ select_site: "", site_notes: "", company_notes: "" });

        if (noteId) {
          navigate("/notes/");
        }
      } else {
        setErr("Some Problem Occured, Please try again");
      }
    }
  }, [responseData]);

  const btnTitle = noteId ? "Edit" : "Create";

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
        <Form onSubmit={createNote}>
          <div className="row">
            <SelectionBox
              groupClass="mb-3 col-md-4 selectbox"
              groupId="site"
              label="Site Name"
              value={formData.select_site}
              onChange={(val) => {
                setFormData((prev) => {
                  return { ...prev, select_site: val };
                });
              }}
              name="site"
              isSearch={true}
              objKey="site_name"
              url="sites/get/site/?pagination=false&brief=true"
            />
            <Form.Group className="mb-3 col-md-4" controlId="stuName">
              <Form.Label>Site Notes</Form.Label>
              <Form.Control
                type="text"
                name="stuName"
                value={formData.site_notes}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...prev, site_notes: e.target.value };
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3 col-md-4" controlId="stuName">
              <Form.Label>Company Notes</Form.Label>
              <Form.Control
                type="text"
                name="stuName"
                value={formData.company_notes}
                onChange={(e) =>
                  setFormData((prev) => {
                    return { ...prev, company_notes: e.target.value };
                  })
                }
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
                {reqStatus.isLoading ? `${btnTitle} Note` : `${btnTitle} Note`}
              </Button>
            </div>
          </div>
        </Form>
      </NeumorphismWrapper>
    </div>
  );
};
export default NotesForm;
