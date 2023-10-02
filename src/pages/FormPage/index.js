import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Tab, Tabs } from "react-bootstrap";
import SelectionBox from "../../components/Form/SelectionBox";
import Form from "react-bootstrap/Form";

export default function NewForm() {
  return (
    <>
      <div id="tabsSimple" className="col-xl-12 col-12 layout-spacing">
        {/* <div className="neumorphism-box"> */}
        <div className="statbox box box-shadow">
          <div className="widget-content widget-content-area">
            <Container>
              <h4>Site Supply Details</h4>
              <hr />
              <Row md={3} className="justifyCenter mb-3">
                <Col>
                  <button className="quoteBtn">Gas</button>
                </Col>
                <Col>
                  <button>Electricity</button>
                </Col>
              </Row>
              <h4 className="centerBtn">Group Details</h4>
              <hr />
              <Row>
                <Form.Label column="sm" lg={2}>
                  Group
                </Form.Label>
                <Col>
                  {/* <Form.Control size="sm" type="text" placeholder="Small text" /> */}
                  <SelectionBox
                    groupclassName=" selectbox"
                    groupId="businessType"
                    // label="Company Type"
                    // value={companyData.businessType}
                    // onChange={handleSelectionChange.bind(
                    //   null,
                    //   "businessType"
                    // )}
                    name="businessType"
                    isSearch={true}
                    objKey="name"
                    url="company-types/"
                  />
                </Col>
              </Row>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <SelectionBox
                    groupclassName=" selectbox"
                    groupId="businessType"
                    // label="Company Type"
                    // value={companyData.businessType}
                    // onChange={handleSelectionChange.bind(
                    //   null,
                    //   "businessType"
                    // )}
                    name="businessType"
                    isSearch={true}
                    objKey="name"
                    url="company-types/"
                  />
                </Col>
              </Form.Group>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
