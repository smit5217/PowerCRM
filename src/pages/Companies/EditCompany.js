import React, { useEffect, useReducer, useState } from "react";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import SelectionBox from "../../components/Form/SelectionBox";
import SelectSearch from "react-select-search";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import LoadingData from "../../components/UI/LoadingData";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";

const initialSiteState = {
  accountName: "",
  accountNo: "",
  address: "",
  addressline1Company: "",
  addressline2Company: "",
  addressline3Company: "",
  bankName: "",
  businessType: "",
  countryOfCompany: "",
  creditScore: "",
  estimatedTurnover: "",
  homePostCode: "",
  isMacroBusiness: "",
  name: "",
  numberOfEmployees: "",
  partnerDob: "",
  partnerName: "",
  postCode: "",
  registrationNo: "",
  shortCode: "",
  sicCode: "",
  timeAtAddressMonths: "",
  timeAtAddressYears: "",
};

const CompanyReducer = (state, action) => {
  // console.log(action);
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }

  let returnedObj = { ...state, [action.type]: action.value };
  if (returnedObj.isBillingSiteSame) {
    returnedObj = {
      ...returnedObj,
      billingAddressLine1: returnedObj.siteAddressLine1,
      billingAddressLine2: returnedObj.siteAddressLine2,
      billingAddressLine3: returnedObj.siteAddressLine3,
      billingAddressLine4: returnedObj.siteAddressLine4,
      billingCountry: returnedObj.siteCountry,
      billingPostCode: returnedObj.sitePostCode,
    };
  }
  return returnedObj;
};

// helper function for turnary
const turnaryOperation = function (data) {
  return data ?? "";
};
function EditCompany() {
  // reducer
  const [companyData, dispatchInputChange] = useReducer(
    CompanyReducer,
    initialSiteState
  );
  //navigate back
  const navigate = useNavigate();
  // state for tabs
  const [key, setKey] = useState(0);
  const [formState, setFormState] = useState({
    error: "",
    // submitting: false,
  });
  // getting parameter
  const paramsId = useParams().editId;
  // console.log(paramsId);
  // const paramsId = useParams();

  // custom hook for sending data
  const [
    sendcompanyData,
    setCompanyReqData,
    reqCompanyStatus,
    responsecompanyData,
    setCompanyResponseData,
    setStatus,
  ] = useFetch();

  // for getting data by id
  const [
    companyGETData,
    setCompanyGETData,
    reqGetCompanyStatus,
    responseGetcompanyData,
    setCompanyGetResponseData,
  ] = useFetch();

  // useEffect to load the data
  useEffect(() => {
    // return;
    // console.log(paramsId);
    if (paramsId && !responseGetcompanyData) {
      setCompanyGETData({
        ...companyGETData,
        url: `company/${paramsId}/`,
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
    // mean we got data now
    if (responseGetcompanyData) {
      const responseData = {
        accountName: turnaryOperation(responseGetcompanyData.data.account_name),
        accountNo: turnaryOperation(responseGetcompanyData.data.account_no),
        address: turnaryOperation(responseGetcompanyData.data.address),
        bankName: turnaryOperation(responseGetcompanyData.data.bank_name),
        businessType: turnaryOperation(
          responseGetcompanyData.data.business_type
        ),
        countryOfCompany: turnaryOperation(
          responseGetcompanyData.data.country_of_company
        ),
        creditScore: turnaryOperation(responseGetcompanyData.data.credit_score),
        estimatedTurnover: turnaryOperation(
          responseGetcompanyData.data.estimated_turnover
        ),
        homePostCode: turnaryOperation(
          responseGetcompanyData.data.home_post_code
        ),
        isMacroBusiness: turnaryOperation(
          responseGetcompanyData.data.is_macro_business
        ),
        name: turnaryOperation(responseGetcompanyData.data.name),
        numberOfEmployees: turnaryOperation(
          responseGetcompanyData.data.number_of_employees
        ),
        partnerDob: turnaryOperation(responseGetcompanyData.data.partner_dob),
        partnerName: turnaryOperation(responseGetcompanyData.data.partner_name),
        postCode: turnaryOperation(responseGetcompanyData.data.postcode),
        registrationNo: turnaryOperation(
          responseGetcompanyData.data.registration_no
        ),
        shortCode: turnaryOperation(responseGetcompanyData.data.shortcode),
        sicCode: turnaryOperation(responseGetcompanyData.data.sic_code),
        timeAtAddressMonths: turnaryOperation(
          responseGetcompanyData.data.time_at_address_months
        ),
        timeAtAddressYears: turnaryOperation(
          responseGetcompanyData.data.time_at_address_years
        ),
        addressline1Company: turnaryOperation(
          responseGetcompanyData.data.billing_address?.addressline1_company
        ),
        addressline2Company: turnaryOperation(
          responseGetcompanyData.data.billing_address?.addressline2_company
        ),
        addressline3Company: turnaryOperation(
          responseGetcompanyData.data.billing_address?.addressline3_company
        ),
        // billingAddressLine4: turnaryOperation(
        //   responseGetcompanyData.data.billing_address?.addressline4
        // ),
        // billingCountry: turnaryOperation(
        //   responseGetcompanyData.data.billing_address?.country
        // ),
        // billingPostCode: turnaryOperation(
        //   responseGetcompanyData.data.billing_address?.postcode
        // ),
        // siteAddressLine1: turnaryOperation(
        //   responseGetcompanyData.data.site_address?.addressline1
        // ),
        // siteAddressLine2: turnaryOperation(
        //   responseGetcompanyData.data.site_address?.addressline2
        // ),
        // siteAddressLine3: turnaryOperation(
        //   responseGetcompanyData.data.site_address?.addressline3
        // ),
        // siteAddressLine4: turnaryOperation(
        //   responseGetcompanyData.data.site_address?.addressline4
        // ),
        // siteCountry: turnaryOperation(
        //   responseGetcompanyData.data.site_address?.country
        // ),
        // sitePostCode: turnaryOperation(
        //   responseGetcompanyData.data.site_address?.postcode
        // ),
        isBillingSiteSame: false,
        firstName: turnaryOperation(
          responseGetcompanyData.data.contacts?.first_name
        ),
        lastName: turnaryOperation(
          responseGetcompanyData.data.contacts?.last_name
        ),
        contactTitle: turnaryOperation(
          responseGetcompanyData.data.contacts?.contact_title
        ),
        positon: turnaryOperation(
          responseGetcompanyData.data.contacts?.positon
        ),
        telephoneNumber: turnaryOperation(
          responseGetcompanyData.data.contacts?.telephone_number
        ),
        email: turnaryOperation(responseGetcompanyData.data.contacts?.email),
      };
      dispatchInputChange({
        all: true,
        data: responseData,
      });
    }
  }, [paramsId, responseGetcompanyData]);

  // for selection box changed
  const handleSelectionChange = (fileName, file) => {
    // console.log(file);
    dispatchInputChange({ type: fileName, value: file });
  };

  // edit site function
  const editCompany = function (e) {
    // console.log("here");
    e.preventDefault();
    // console.log(companyData.businessType);
    let sendData = {
      account_name: companyData.accountName,
      account_no: companyData.accountNo,
      address: companyData.address,
      bank_name: companyData.bankName,
      business_type: companyData.businessType,
      country_of_company: companyData.countryOfCompany,
      credit_score: companyData.creditScore,
      estimated_turnover: companyData.estimatedTurnover,
      home_post_code: companyData.homePostCode,
      is_macro_business: companyData.isMacroBusiness,
      name: companyData.name,
      number_of_employees: companyData.numberOfEmployees,
      partner_dob: companyData.partnerDob,
      partner_name: companyData.partnerName,
      postcode: companyData.postCode,
      registration_no: companyData.registrationNo,
      shortcode: companyData.shortCode,
      sic_code: companyData.sicCode,
      time_at_address_months: companyData.timeAtAddressMonths,
      time_at_address_years: companyData.timeAtAddressYears,

      billing_address: {
        addressline1_company: companyData.addressline1Company,
        addressline2_company: companyData.addressline2Company,
        addressline3_company: companyData.addressline3Company,
      },

      // site_address: {
      //   addressline1: companyData.siteAddressLine1,
      //   addressline2: companyData.siteAddressLine2,
      //   addressline3: companyData.siteAddressLine3,
      //   addressline4: companyData.siteAddressLine4,
      //   country: companyData.siteCountry,
      //   postcode: companyData.sitePostCode,
      // },
    };
    const contactInfo = {
      contacts: {
        first_name: companyData.firstName,
        last_name: companyData.lastName,
        contact_title: companyData.contactTitle,
        positon: companyData.positon,
        telephone_number: companyData.telephoneNumber,
        email: companyData.email,
      },
    };

    if (
      contactInfo.contacts.first_name ||
      contactInfo.contacts.last_name ||
      contactInfo.contacts.contact_title ||
      contactInfo.contacts.positon ||
      contactInfo.contacts.telephone_number ||
      contactInfo.contacts.email
    ) {
      sendData = { ...sendData, ...contactInfo };
    }
    // console.log(companyData.firstName?.length);
    // console.log(companyData.lastName?.length);
    // console.log(companyData.contactTitle?.length);
    // console.log(companyData.telephoneNumber?.length);
    // console.log(companyData.email?.length);

    // if (
    //   companyData.firstName?.length < 1 ||
    //   companyData.lastName?.length < 1 ||
    //   // companyData.contactTitle?.length < 1 ||
    //   companyData.telephoneNumber?.length < 1 ||
    //   companyData.email?.length < 1
    // ) {
    //   setFormState({ error: "Please fill all fields" });
    // setisNext(false);
    //   return;
    // }
    setCompanyResponseData(null);
    setStatus({ isLoading: true, isError: false });
    setCompanyReqData({
      ...sendcompanyData,
      url: `company/${paramsId}/`,
      fetchObj: {
        method: "PATCH",
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
    // console.log(responsecompanyData.status);
    if (responsecompanyData) {
      if (
        responsecompanyData.status === 200 ||
        responsecompanyData.status === 201
      ) {
        navigate("/companies");
      }
    }
  }, [responsecompanyData]);

  if (reqGetCompanyStatus.isLoading) {
    return <LoadingData className="text-center" />;
  }
  const changeTab = function (isNext = true) {
    setKey((oldKey) => {
      return isNext ? oldKey + 1 : oldKey - 1;
    });
    // switch (key) {
    //   case 0:
    //     if (
    //       companyData.numberOfEmployees?.length < 1 ||
    //       companyData.companyName?.length < 1 ||
    //       companyData.businessType?.length < 1 ||
    //       companyData.registrationNo?.length < 1 ||
    //       companyData.estimatedTurnover?.length < 1
    //     ) {
    //       setFormState({ error: "Please fill all fields" });
    //       // setisNext(false);

    //       return;
    //     } else {
    //       setFormState({ error: "" });
    //       setKey((oldKey) => {
    //         return isNext ? oldKey + 1 : oldKey - 1;
    //       });
    //     }
    //     break;
    //   case 1:
    //     if (
    //       companyData.addressline1Company?.length < 1 ||
    //       companyData.postCode?.length < 1 ||
    //       companyData.countryOfCompany?.length < 1
    //     ) {
    //       setFormState({ error: "Please fill all fields" });
    //       // setisNext(false);

    //       return;
    //     } else {
    //       setFormState({ error: "" });
    //       setKey((oldKey) => {
    //         return isNext ? oldKey + 1 : oldKey - 1;
    //       });
    //     }
    //     break;
    //   case 2:
    //     if (
    //       companyData.accountName?.length < 1 ||
    //       companyData.bankName?.length < 1 ||
    //       companyData.accountNo?.length < 1 ||
    //       companyData.shortCode?.length < 1
    //     ) {
    //       setFormState({ error: "Please fill all fields" });
    //       // setisNext(false);

    //       return;
    //     } else {
    //       setFormState({ error: "" });
    //       setKey((oldKey) => {
    //         return isNext ? oldKey + 1 : oldKey - 1;
    //       });
    //     }
    //     break;
    //   case 3:
    //     console.log(companyData.partnerName?.length);
    //     console.log(companyData.partnerDob?.length);
    //     console.log(companyData.address?.length);
    //     console.log(companyData.homePostCode?.length);
    //     if (
    //       companyData.partnerName?.length < 1 ||
    //       companyData.partnerDob?.length < 1 ||
    //       companyData.address?.length < 1 ||
    //       companyData.homePostCode?.length < 1
    //     ) {
    //       setFormState({ error: "Please fill all fields" });
    //       // setisNext(false);

    //       return;
    //     } else {
    //       setFormState({ error: "" });
    //       setKey((oldKey) => {
    //         return isNext ? oldKey + 1 : oldKey - 1;
    //       });
    //     }
    //     break;

    //   // case 4:
    //   //   if (
    //   //     companyData.firstName?.length < 1 ||
    //   //     companyData.lastName?.length < 1 ||
    //   //     companyData.contactTitle?.length < 1 ||
    //   //     companyData.telephoneNumber?.length < 1 ||
    //   //     companyData.email?.length < 1
    //   //   ) {
    //   //     setFormState({ error: "Please fill all fields" });
    //   //     // setisNext(false);
    //   //     return;
    //   //   } else {
    //   //     setFormState({ error: "" });
    //   //     setKey((oldKey) => {
    //   //       return isNext ? oldKey + 1 : oldKey - 1;
    //   //     });
    //   //   }
    //   //   break;
    //   default:
    //     setFormState({ error: "" });
    //     break;
    // }
  };
  return (
    <>
      <NeumorphismWrapper>
        <div className="widget-header">
          <h4>Company Details</h4>
        </div>
        <div id="tabsSimple" className=" layout-spacing"></div>
        <div className="">
          <Form onSubmit={editCompany}>
            <Tabs
              activeKey={key}
              onSelect={(k) => setKey(+k)}
              id="controlled-tab-example"
              className="mb-3"
            >
              <Tab eventKey={0} title="Company Info">
                <Form.Group className="mb-3 col-12" controlId="name">
                  <Form.Label>Name of the Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={companyData.name}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "name",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="parentCompany">
                  <Form.Label>Parent Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentCompany"
                    // value={siteData.parentCompany}
                    // onChange={(e) =>
                    //   dispatchInputChange({
                    //     type: "parentCompany",
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="numberOfEmployees"
                >
                  <Form.Label>Number of employees</Form.Label>
                  <Form.Control
                    type="number"
                    name="numberOfEmployees"
                    value={companyData.numberOfEmployees}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "numberOfEmployees",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="registrationNo">
                  <Form.Label>Registration Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="registrationNo"
                    className="mb-3"
                    value={companyData.registrationNo}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "registrationNo",
                        value: e.target.value,
                      })
                    }
                  />
                  <SelectionBox
                    groupclassName="mb-3 col-md-6 selectbox"
                    groupId="businessType"
                    label="Company Type"
                    value={companyData.businessType}
                    onChange={handleSelectionChange.bind(null, "businessType")}
                    name="businessType"
                    isSearch={true}
                    objKey="name"
                    url="company-types/"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="estimatedTurnover"
                >
                  <Form.Label>Estimated turnover</Form.Label>
                  <Form.Control
                    type="number"
                    name="estimatedTurnover"
                    value={companyData.estimatedTurnover}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "estimatedTurnover",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3 col-12" controlId="typeOfOwner">
                      <Form.Label>Type of owner</Form.Label>
                      <Form.Control
                        type="text"
                        name="typeOfOwner"
                        value={companyData.typeOfOwner}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "typeOfOwner",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-12" controlId="ownerName">
                      <Form.Label>Owner Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="ownerName"
                        value={companyData.ownerName}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "ownerName",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-12"
                      controlId="currentSupplier">
                      <Form.Label>
                        Current gas and electricity supplier details
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="currentSupplier"
                        value={companyData.currentSupplier}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "currentSupplier",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group> */}

                <Form.Group className="mb-3 col-12" controlId="isMacroBusiness">
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Is Micro Business?"
                    checked={companyData.isMacroBusiness}
                    onChange={(e) => {
                      // console.log(companyData.isMacroBusiness);
                      // console.log(e.target.checked);
                      dispatchInputChange({
                        type: "isMacroBusiness",
                        value: e.target.checked,
                      });
                    }}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3 col-12" controlId="isVacant">
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Vacant"
                        value={companyData.isVacant}
                        onChange={(e) => {
                          dispatchInputChange({
                            type: "isVacant",
                            value: e.target.checked,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-12" controlId="isCoT">
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="CoT"
                        value={companyData.isCoT}
                        onChange={(e) => {
                          dispatchInputChange({
                            type: "isCoT",
                            value: e.target.checked,
                          });
                        }}
                      />
                    </Form.Group> */}
              </Tab>
              <Tab eventKey={1} title="Company Address">
                <Form.Group
                  className="mb-3 col-12"
                  controlId="addressline1Company"
                >
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressline1Company"
                    value={companyData.addressline1Company}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "addressline1Company",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="addressline2Company"
                >
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressline2Company"
                    value={companyData.addressline2Company}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "addressline2Company",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="addressline3Company"
                >
                  <Form.Label>Address Line 3</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressline3Company"
                    value={companyData.addressline3Company}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "addressline3Company",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="postCode">
                  <Form.Label>Postcode</Form.Label>
                  <Form.Control
                    type="number"
                    name="postCode"
                    value={companyData.postCode}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "postCode",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="countryOfCompany"
                >
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="countryOfCompany"
                    value={companyData.countryOfCompany}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "countryOfCompany",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {/* <SelectionBox
                      groupclassName="mb-3 col-md-6 selectbox"
                      groupId="supportContact"
                      label="Support Contact"
                      value={companyData.supportContact}
                      onChange={handleSelectionChange.bind(
                        null,
                        "supportContact"
                      )}
                      name="supportContact"
                      isSearch={true}
                      objKey="username"
                      url="sites/get/support_contact/"
                    />

                    <Form.Group className="mb-3 col-12" controlId="leadSource">
                      <Form.Label>Lead Source</Form.Label>
                      <Form.Control
                        type="text"
                        name="leadSource"
                        value={companyData.leadSource}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "leadSource",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 col-12" controlId="notes">
                      <Form.Label>Notes</Form.Label>
                      <Form.Control
                        type="textarea"
                        name="notes"
                        value={companyData.notes}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "notes",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 col-12" controlId="leadType">
                      <Form.Label>Lead Type</Form.Label>
                      <SelectSearch
                        options={[
                          { name: "GAS", value: "GAS" },
                          { name: "ELECTRICITY", value: "ELECTRICITY" },
                        ]}
                        placeholder="Choose from options"
                        value={companyData.leadType}
                        onChange={(val) => {
                          dispatchInputChange({
                            type: "leadType",
                            value: val,
                          });
                        }}
                        name="leadType"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 col-12" controlId="billToSent">
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        value={companyData.billToSent}
                        label="Bill to Sent"
                        onChange={(e) => {
                          dispatchInputChange({
                            type: "billToSent",
                            value: e.target.checked,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-12"
                      controlId="welcomeLetterSent">
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Welcome Letter Sent"
                        value={companyData.welcomeLetterSent}
                        onChange={(e) => {
                          dispatchInputChange({
                            type: "welcomeLetterSent",
                            value: e.target.checked,
                          });
                        }}
                      />
                    </Form.Group> */}
              </Tab>
              <Tab eventKey={2} title="Bank Details">
                <Form.Group className="mb-3 col-12" controlId="accountName">
                  <Form.Label>Account name</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountName"
                    value={companyData.accountName}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "accountName",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="bankName">
                  <Form.Label>Bank name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bankName"
                    value={companyData.bankName}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "bankName",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="accountNo">
                  <Form.Label>Account no</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountNo"
                    value={companyData.accountNo}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "accountNo",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="shortCode">
                  <Form.Label>Shortcode</Form.Label>
                  <Form.Control
                    type="text"
                    name="shortCode"
                    value={companyData.shortCode}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "shortCode",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3 " controlId="creditScore">
                      <Form.Label>Credit Score</Form.Label>
                      <Form.Control
                        type="number"
                        name="creditScore"
                        value={companyData.creditScore}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "creditScore",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group> */}
                {/* <Form.Group
                      className="mb-3 col-12"
                      controlId="loaHeaderToUse">
                      <Form.Label>LOA Header to Use</Form.Label>
                      <SelectSearch
                        options={[
                          { name: "Site Name", value: "GAS" },
                          { name: "Company Name", value: "ELECTRICITY" },
                        ]}
                        placeholder="Choose from options"
                        value={companyData.loaHeaderToUse}
                        onChange={(val) => {
                          dispatchInputChange({
                            type: "loaHeaderToUse",
                            value: val,
                          });
                        }}
                        name="loaHeaderToUse"
                      />
                    </Form.Group>
                    <SelectionBox
                      groupclassName="mb-3 col-md-6 selectbox"
                      groupId="loaTemplate"
                      label="LOA Template"
                      value={companyData.loaTemplate}
                      onChange={handleSelectionChange.bind(null, "loaTemplate")}
                      name="loaTemplate"
                      isSearch={true}
                      objKey="name"
                      url="sites/get/loa_template/"
                    /> */}
              </Tab>
              <Tab eventKey={3} title="Partner Details">
                <Form.Group className="mb-3 col-12" controlId="partnerName">
                  <Form.Label>Partner name</Form.Label>
                  <Form.Control
                    type="text"
                    name="partnerName"
                    value={companyData.partnerName}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "partnerName",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="partnerDob">
                  <Form.Label>Partner dob</Form.Label>
                  <Form.Control
                    type="date"
                    name="partnerDob"
                    value={companyData.partnerDob}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "partnerDob",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={companyData.address}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "address",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-12" controlId="homePostCode">
                  <Form.Label>Home post code</Form.Label>
                  <Form.Control
                    type="text"
                    name="homePostCode"
                    value={companyData.homePostCode}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "homePostCode",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="timeAtAddressYears"
                >
                  <Form.Label>Time At Address(years)</Form.Label>
                  <Form.Control
                    type="number"
                    name="timeAtAddressYears"
                    value={companyData.timeAtAddressYears}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "timeAtAddressYears",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="timeAtAddressMonths"
                >
                  <Form.Label>Time At Address(months)</Form.Label>
                  <Form.Control
                    type="number"
                    name="timeAtAddressMonths"
                    value={companyData.timeAtAddressMonths}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "timeAtAddressMonths",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3 col-12" controlId="siteCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="siteCountry"
                        value={companyData.siteCountry}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "siteCountry",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group> */}
              </Tab>
              <Tab eventKey={4} title="Contacts ">
                {/* <Form.Group
                      className="mb-3 col-12"
                      controlId="isBillingSiteSame">
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        value={companyData.isBillingSiteSame}
                        label="Is Billing Address Same As Site Address?"
                        onChange={(e) => {
                          dispatchInputChange({
                            type: "isBillingSiteSame",
                            value: e.target.checked,
                          });
                        }}
                      />
                    </Form.Group> */}
                <Form.Group className="mb-3 col-12" controlId="firstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={companyData.firstName}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "firstName",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="lastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={companyData.lastName}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "lastName",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-12" controlId="contactTitle">
                  <Form.Label>Contact Title</Form.Label>
                  <SelectSearch
                    options={[
                      { name: "Sir", value: "Sir" },
                      { name: "Mr", value: "Mr" },
                      { name: "Ms", value: "Ms" },
                      { name: "Mrs", value: "Mrs" },
                      { name: "Miss", value: "Miss" },
                      { name: "Dr", value: "Dr" },
                    ]}
                    placeholder="Choose from options"
                    value={companyData.contactTitle}
                    onChange={(val) => {
                      dispatchInputChange({
                        type: "contactTitle",
                        value: val,
                      });
                    }}
                    name="contactTitle"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="positon">
                  <Form.Label>Position </Form.Label>
                  <Form.Control
                    type="text"
                    name="positon"
                    value={companyData.positon}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "positon",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="telephoneNumber">
                  <Form.Label>Telephone number </Form.Label>
                  <Form.Control
                    type="number"
                    name="telephoneNumber"
                    value={companyData.telephoneNumber}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "telephoneNumber",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={companyData.email}
                    onChange={(e) =>
                      dispatchInputChange({
                        type: "email",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Tab>
              {/* <Tab eventKey={5} title="Contact">
                    <Form.Group className="mb-3 col-12" controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={companyData.firstName}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "firstName",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-12" controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={companyData.lastName}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "lastName",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-12"
                      controlId="contactTitle">
                      <Form.Label>Contact Title</Form.Label>
                      <SelectSearch
                        options={[
                          { name: "Sir", value: "Sir" },
                          { name: "Mr", value: "Mr" },
                          { name: "Ms", value: "Ms" },
                          { name: "Mrs", value: "Mrs" },
                          { name: "Miss", value: "Miss" },
                          { name: "Dr", value: "Dr" },
                        ]}
                        placeholder="Choose from options"
                        value={companyData.contactTitle}
                        onChange={(val) => {
                          dispatchInputChange({
                            type: "contactTitle",
                            value: val,
                          });
                        }}
                        name="contactTitle"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-12" controlId="positon">
                      <Form.Label>Positon</Form.Label>
                      <Form.Control
                        type="text"
                        name="positon"
                        value={companyData.positon}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "positon",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-12"
                      controlId="telephoneNumber">
                      <Form.Label>Telephone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="telephoneNumber"
                        value={companyData.telephoneNumber}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "telephoneNumber",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-12" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={companyData.email}
                        onChange={(e) =>
                          dispatchInputChange({
                            type: "email",
                            value: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Tab> */}
            </Tabs>
            <div className="col-md-12 centerBtn">
              {key === 0 ? (
                ""
              ) : (
                <Button
                  type="button"
                  className="mx-2"
                  onClick={changeTab.bind(null, false)}
                >
                  Prev
                </Button>
              )}

              <Button type="submit">
                {reqCompanyStatus.isLoading ? "Submitting" : "Submit"}
              </Button>

              {key === 4 ? (
                " "
              ) : (
                <Button type="button" className="mx-2" onClick={changeTab}>
                  Next
                </Button>
              )}
            </div>
            {/* {formState.error ? (
                  <p className="red">{formState.error}</p>
                ) : (
                  ""
                )} */}
          </Form>
        </div>
      </NeumorphismWrapper>
    </>
  );
}

export default EditCompany;
