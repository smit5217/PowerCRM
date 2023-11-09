import React, { useState } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import SelectionBox from "../Form/SelectionBox";

const SupplyDetails = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Tabs>
        <Tab className="mt-3" eventKey={1} title="Meter Details (GAS)">
          <Form>
            <div className="row">
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>MRP</Form.Label>
                <Form.Control type="text" name="MRP" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Serial Number</Form.Label>
                <Form.Control type="text" name="Serial Number" />
              </Form.Group>
              <div className="d-flex justify-content-start gap-2">
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Smart Meter (AMR)"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="IGT Meter"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Green Deal"
                  />
                </Form.Group>
              </div>
            </div>
            <Button>Submit</Button>
          </Form>
        </Tab>
        <Tab className="mt-3" eventKey={2} title="Current Supplies (GAS)">
          <Form>
            <div className="row">
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Supplier</Form.Label>
                <Form.Control type="text" name="Supplier" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Product</Form.Label>
                <Form.Control type="text" name="Product" />
              </Form.Group>
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="contractType"
                label="Contract Type"
                name="Contract Type"
              />
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Won Date</Form.Label>
                <Form.Control type="date" name="Won Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Start Date</Form.Label>
                <Form.Control type="date" name="Contract Start Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract End Date</Form.Label>
                <Form.Control type="date" name="Contract End Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Length (months)</Form.Label>
                <Form.Control type="text" name="Contract Length" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Back Date</Form.Label>
                <Form.Control type="date" name="Contract Back Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Supplier Reference</Form.Label>
                <Form.Control type="text" name="Supplier Reference" />
              </Form.Group>
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation1"
                label="Supplier Information 1"
                name="Supplier Information 1"
              />
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation2"
                label="Supplier Information 2"
                name="Supplier Information 2"
              />
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation3"
                label="Supplier Information 3"
                name="Supplier Information 3"
              />
              <p>Notice of termination for this contract sent by : </p>
              <div className="d-flex justify-content-start gap-2">
                <Form.Group>
                  <Form.Check type="switch" id="custom-switch" label="Agent" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Customer"
                  />
                </Form.Group>
              </div>
            </div>
            <Button onClick={() => setOpen(true)}>Usage & Rates</Button>
            {open && (
              <div className="mt-3 row">
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Standing Charge (Pence/Day)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Standing Charge (Pence/Day)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Standing Charge Uplift (Pence/Day)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Standing Charge Uplift (Pence/Day)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Rate (Pence/KWH)</Form.Label>
                  <Form.Control type="text" name="Rate (Pence/KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Unit Rate Uplift</Form.Label>
                  <Form.Control type="text" name="Unit Rate Uplift" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Usage (KWH)</Form.Label>
                  <Form.Control type="text" name="Annual Usage (KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Total Commission (£)</Form.Label>
                  <Form.Control type="text" name="Supplier Reference" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Commission (£)</Form.Label>
                  <Form.Control type="text" name="Supplier Reference" />
                </Form.Group>
              </div>
            )}
            <Button>Submit</Button>
          </Form>
        </Tab>
        <Tab className="mt-3" eventKey={3} title="New Supplies (GAS)">
          <Form>
            <div className="row">
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Supplier</Form.Label>
                <Form.Control type="text" name="Supplier" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Product</Form.Label>
                <Form.Control type="text" name="Product" />
              </Form.Group>
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="contractType"
                label="Contract Type"
                name="Contract Type"
              />
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Won Date</Form.Label>
                <Form.Control type="date" name="Won Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Start Date</Form.Label>
                <Form.Control type="date" name="Contract Start Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract End Date</Form.Label>
                <Form.Control type="date" name="Contract End Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Length (months)</Form.Label>
                <Form.Control type="text" name="Contract Length" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Back Date</Form.Label>
                <Form.Control type="date" name="Contract Back Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Supplier Reference</Form.Label>
                <Form.Control type="text" name="Supplier Reference" />
              </Form.Group>
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation1"
                label="Supplier Information 1"
                name="Supplier Information 1"
              />
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation2"
                label="Supplier Information 2"
                name="Supplier Information 2"
              />
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation3"
                label="Supplier Information 3"
                name="Supplier Information 3"
              />
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control type="text" name="Notes" />
              </Form.Group>
              <p>Notice of termination for this contract sent by : </p>
              <div className="d-flex justify-content-start gap-2">
                <Form.Group>
                  <Form.Check type="switch" id="custom-switch" label="Agent" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Customer"
                  />
                </Form.Group>
              </div>
            </div>
            <Button onClick={() => setOpen(true)}>Usage & Rates</Button>
            {open && (
              <div className="mt-3 row">
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Standing Charge (Pence/Day)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Standing Charge (Pence/Day)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Standing Charge Uplift (Pence/Day)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Standing Charge Uplift (Pence/Day)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Rate (Pence/KWH)</Form.Label>
                  <Form.Control type="text" name="Rate (Pence/KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Unit Rate Uplift</Form.Label>
                  <Form.Control type="text" name="Unit Rate Uplift" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Usage (KWH)</Form.Label>
                  <Form.Control type="text" name="Annual Usage (KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Total Commission (£)</Form.Label>
                  <Form.Control type="text" name="Supplier Reference" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Commission (£)</Form.Label>
                  <Form.Control type="text" name="Supplier Reference" />
                </Form.Group>
              </div>
            )}
            <Button>Submit</Button>
          </Form>
        </Tab>
        <Tab className="mt-3" eventKey={4} title="Meter Details (ELECTRICITY)">
          <Form>
            <div className="row">
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>MPAN Top Line</Form.Label>
                <Form.Control type="text" name="MPAN Top Line" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>MPAN Bottom Line</Form.Label>
                <Form.Control type="text" name="MPAN Bottom Line" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Meter Type</Form.Label>
                <Form.Control type="text" name="Meter Type" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Serial Number</Form.Label>
                <Form.Control type="text" name="Serial Number" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Capacity (KVA)</Form.Label>
                <Form.Control type="text" name="Capacity (KVA)" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Voltage</Form.Label>
                <Form.Control type="text" name="Voltage" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Measurement Class</Form.Label>
                <Form.Control type="text" name="Measurement Class" />
              </Form.Group>
              <div className="d-flex justify-content-start gap-2">
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Smart Meter (AMR)"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Related Meter"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Key Meter"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Green Deal"
                  />
                </Form.Group>
              </div>
            </div>
            <Button>Submit</Button>
          </Form>
        </Tab>
        <Tab
          className="mt-3"
          eventKey={5}
          title="Current Supplies (ELECTRICITY)"
        >
          <Form>
            <div className="row">
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Supplier</Form.Label>
                <Form.Control type="text" name="Supplier" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Product</Form.Label>
                <Form.Control type="text" name="Product" />
              </Form.Group>
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="contractType"
                label="Contract Type"
                name="Contract Type"
              />
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Won Date</Form.Label>
                <Form.Control type="date" name="Won Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Start Date</Form.Label>
                <Form.Control type="date" name="Contract Start Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract End Date</Form.Label>
                <Form.Control type="date" name="Contract End Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Length (months)</Form.Label>
                <Form.Control type="text" name="Contract Length" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Back Date</Form.Label>
                <Form.Control type="date" name="Contract Back Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Supplier Reference</Form.Label>
                <Form.Control type="text" name="Supplier Reference" />
              </Form.Group>
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation1"
                label="Supplier Information 1"
                name="Supplier Information 1"
              />
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation2"
                label="Supplier Information 2"
                name="Supplier Information 2"
              />
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation3"
                label="Supplier Information 3"
                name="Supplier Information 3"
              />
              <p>Notice of termination for this contract sent by : </p>
              <div className="d-flex justify-content-start gap-2">
                <Form.Group>
                  <Form.Check type="switch" id="custom-switch" label="Agent" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Customer"
                  />
                </Form.Group>
              </div>
            </div>
            <Button onClick={() => setOpen(true)}>Usage & Rates</Button>
            {open && (
              <div className="mt-3 row">
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Standing Charge (Pence/Day)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Standing Charge (Pence/Day)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Standing Charge Uplift (Pence/Day)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Standing Charge Uplift (Pence/Day)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>KVA Rate (Pence/Day)</Form.Label>
                  <Form.Control type="text" name="KVA Rate (Pence/Day)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Unit Rate Uplift</Form.Label>
                  <Form.Control type="text" name="Unit Rate Uplift" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Feed-in Tariff (FiT)</Form.Label>
                  <Form.Control type="text" name="Feed-in Tariff (FiT)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Day Usage(KWH)</Form.Label>
                  <Form.Control type="text" name="Annual Day Usage(KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Day Rate (Pence/KWH)</Form.Label>
                  <Form.Control type="text" name="Day Rate (Pence/KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Total Annual Usage (KWH)</Form.Label>
                  <Form.Control type="text" name="Total Annual Usage (KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Total Commission (£)</Form.Label>
                  <Form.Control type="text" name="Supplier Reference" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Commission (£)</Form.Label>
                  <Form.Control type="text" name="Supplier Reference" />
                </Form.Group>
              </div>
            )}
            <Button>Submit</Button>
          </Form>
        </Tab>
        <Tab className="mt-3" eventKey={6} title="New Supplies (ELECTRICITY)">
          <Form>
            <div className="row">
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Supplier</Form.Label>
                <Form.Control type="text" name="Supplier" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Product</Form.Label>
                <Form.Control type="text" name="Product" />
              </Form.Group>
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="contractType"
                label="Contract Type"
                name="Contract Type"
              />
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Won Date</Form.Label>
                <Form.Control type="date" name="Won Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Start Date</Form.Label>
                <Form.Control type="date" name="Contract Start Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract End Date</Form.Label>
                <Form.Control type="date" name="Contract End Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Length (months)</Form.Label>
                <Form.Control type="text" name="Contract Length" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Contract Back Date</Form.Label>
                <Form.Control type="date" name="Contract Back Date" />
              </Form.Group>
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Supplier Reference</Form.Label>
                <Form.Control type="text" name="Supplier Reference" />
              </Form.Group>
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation1"
                label="Supplier Information 1"
                name="Supplier Information 1"
              />
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation2"
                label="Supplier Information 2"
                name="Supplier Information 2"
              />
              <SelectionBox
                groupClass="mb-3 col-md-3 selectbox"
                groupId="supplierinformation3"
                label="Supplier Information 3"
                name="Supplier Information 3"
              />
              <Form.Group className="mb-3 col-md-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control type="text" name="Notes" />
              </Form.Group>
              <p>Notice of termination for this contract sent by : </p>
              <div className="d-flex justify-content-start gap-2">
                <Form.Group>
                  <Form.Check type="switch" id="custom-switch" label="Agent" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Customer"
                  />
                </Form.Group>
              </div>
            </div>
            <Button onClick={() => setOpen(true)}>Usage & Rates</Button>
            {open && (
              <div className="mt-3 row">
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Standing Charge (Pence/Day)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Standing Charge (Pence/Day)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Standing Charge Uplift (Pence/Day)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Standing Charge Uplift (Pence/Day)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>KVA Rate (Pence/Day)</Form.Label>
                  <Form.Control type="text" name="KVA Rate (Pence/Day)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Unit Rate Uplift</Form.Label>
                  <Form.Control type="text" name="Unit Rate Uplift" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Feed-in Tariff (FiT)</Form.Label>
                  <Form.Control type="text" name="Feed-in Tariff (FiT)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Day Usage(KWH)</Form.Label>
                  <Form.Control type="text" name="Annual Day Usage(KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Day Rate (Pence/KWH)</Form.Label>
                  <Form.Control type="text" name="Day Rate (Pence/KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Night Usage (KWH)</Form.Label>
                  <Form.Control type="text" name="Annual Night Usage (KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Night Rate (Pence/KWH)</Form.Label>
                  <Form.Control type="text" name="Night Rate (Pence/KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Evening/Weekend Usage (KWH)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Annual Evening/Weekend Usage (KWH)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Evening/Weekend Rate (Pence/KWH)</Form.Label>
                  <Form.Control
                    type="text"
                    name="Evening/Weekend Rate (Pence/KWH)"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Total Annual Usage (KWH)</Form.Label>
                  <Form.Control type="text" name="Total Annual Usage (KWH)" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Total Commission (£)</Form.Label>
                  <Form.Control type="text" name="Supplier Reference" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-3">
                  <Form.Label>Annual Commission (£)</Form.Label>
                  <Form.Control type="text" name="Supplier Reference" />
                </Form.Group>
              </div>
            )}
            <Button>Submit</Button>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
};

export default SupplyDetails;
