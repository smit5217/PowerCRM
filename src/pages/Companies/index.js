import React, { useState } from "react";
import DTable from "../../components/DTable";
import { Link } from "react-router-dom";
import UiModal from "../../components/UI/UiModal";

import { Button } from "react-bootstrap";
// import CreateCompany from "../../components/Companies/CreateCompany";
import CreateCompany from "../../components/Companies/CreateCompany";
import useDTColumns from "../../hooks/useDTColumns";
import NeumorphismWrapper from "../../components/UI/Layouts/NeumorphismWrapper";
// import CreateSite from "../../components/Sites/CreateSite";

function Companies() {
  const [showSiteForm, SetShowSiteForm] = useState(false);
  const [refreshTable, setRefreshTable] = useState(true);
  const hideModal = () => SetShowSiteForm(false);
  const columns = [
    {
      cell: (row) => (
        <>
          <Link
            to={`/companies/edit/${row.id}`}
            className="enquiryAction"
            title="Edit Company "
          >
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
              class="feather feather-edit-2 p-1 br-8 mb-1"
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </Link>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      name: "Company Name",
      selector: (row) => (
        <Link
          to={`/companies/${row.id}`}
          className="enquiryAction"
          title="Company Details"
        >
          {row.name}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Postcode",
      selector: (row) => row.postcode,
    },
    {
      name: "Number of employees",
      selector: (row) => row.number_of_employees,
    },
    {
      name: "Registration Number",
      selector: (row) => row.registration_no,
    },
    {
      name: "Estimated turnover",
      selector: (row) => row.estimated_turnover,
    },
    {
      name: "Account Name",
      selector: (row) => row.account_name,
    },
    {
      name: "Account No",
      selector: (row) => row.account_no,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },

    {
      name: "Address line1",
      selector: (row) => row.addressline1_company,
    },
    {
      name: "Address line2",
      selector: (row) => row.addressline2_company,
    },
    {
      name: "Address line3",
      selector: (row) => row.addressline3_company,
    },
    {
      name: "Bank Name",
      selector: (row) => row.bank_name,
    },
    {
      name: "Business Type",
      selector: (row) => row.business_type,
    },
    {
      name: "Country_Of Company",
      selector: (row) => row.country_of_company,
    },
    {
      name: "Home Postcode",
      selector: (row) => row.home_post_code,
    },

    {
      name: "Is MAcro Business",
      selector: (row) => (row.is_macro_business ? "YES" : "NO"),
    },
    {
      name: "Home Postcode",
      selector: (row) => row.home_post_code,
    },
    {
      name: "Partner Date of birth",
      selector: (row) => row.partner_dob,
    },
    {
      name: "Partner Name",
      selector: (row) => row.partner_name,
    },
    {
      name: "Postcode",
      selector: (row) => row.postcode,
    },
    {
      name: "Registration No",
      selector: (row) => row.registration_no,
    },
    {
      name: "Shortcode",
      selector: (row) => row.shortcode,
    },
    {
      name: "Postcode",
      selector: (row) => row.postcode,
    },
    // {
    //   name: "Credit Score",
    //   selector: (row) => row.credit_score,
    // },
  ];

  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);
  console.log(cols);
  const DTableFunction = function (data) {
    // console.log(data);
    return data;
  };
  // console.log(DTableFunction);
  return (
    <>
      {/* <Button
        className="mb-3"
        onClick={() => SetShowSiteForm((state) => !state)}>
        Add Company
      </Button>
      {showSiteForm ? (
        <UiModal
          showStatus={showSiteForm}
          setModalStatus={hideModal}
          showHeader={true}
          title="Add Company"
          body={
            <CreateCompany
              hideModal={hideModal}
              refreshTable={setRefreshTable}
            />
          }
        />
      ) : (
        ""
      )} */}
      <CreateCompany setRefreshTable={setRefreshTable} />
      <NeumorphismWrapper>
        <div className="col-lg-12 flex-col-btns"> {renderColBtns()}</div>
        <DTable
          url="company/?ordering=-date_created"
          transformFunction={DTableFunction}
          columns={cols}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </NeumorphismWrapper>
    </>
  );
}

export default Companies;
