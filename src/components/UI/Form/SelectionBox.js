import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import SelectSearch from "react-select-search";
import { ajaxCallWithHeaderOnly } from "../../../helpers/ajaxCall";

function SelectionBox(props) {
  const authData = useSelector((state) => state.authStore);
  const [options, setOptions] = useState([
    { name: "Select Options", value: "" },
  ]);
  const [throwErr, setThrowErr] = useState(null);
  if (props.name === "courseInterested") {
    // console.log("url is", props.url);
  }
  useEffect(() => {
    if (throwErr) throw throwErr;
  }, [throwErr]);
  // console.log("group id and valuee is", props.groupId, props.value);
  useEffect(() => {
    if (props.name !== "courseInterested" && props.name !== "married") {
      const data = async () => {
        const response = await ajaxCallWithHeaderOnly(props.url, {
          Authorization: `Bearer ${authData.accessToken}`,
        });
        if (response?.isNetwork) {
          setThrowErr({ ...response, page: "enquiries" });
          return;
        }
        if (response?.status === 401) {
          setThrowErr({ ...response, page: "enquiries" });
          return;
        }
        // console.log(response);
        setOptions((options) => {
          const date = new Date();
          const currentYr = date.getFullYear();
          let ajaxOptions;
          if (props.url === "intakes/") {
            ajaxOptions = [...response]
              .map((option) => {
                const months = {
                  jan: 1,
                  feb: 2,
                  mar: 3,
                  apr: 4,
                  may: 5,
                  jun: 6,
                  jul: 7,
                  aug: 8,
                  sep: 9,
                  oct: 10,
                  nov: 11,
                  dec: 12,
                };
                // option.intake_month;
                const currentMonth = option.intake_month.split("-");
                // console.log(currentMonth);
                // console.log(currentMonth[1]);
                // console.log(
                //   "data is",
                //   date.getMonth() + 1 <= months[currentMonth[1].toLowerCase()]
                // );
                if (currentYr === option.intake_year) {
                  if (
                    date.getMonth() + 1 <=
                      months[currentMonth[1].toLowerCase()] &&
                    currentYr === option.intake_year
                  ) {
                    return {
                      value: option.id,
                      name: option.intake_month + " " + option.intake_year,
                    };
                  } else if (
                    date.getMonth() + 1 <=
                      months[currentMonth[1].toLowerCase()] &&
                    currentYr !== option.intake_year
                  ) {
                    return {
                      value: option.id,
                      name: option.intake_month + " " + option.intake_year,
                    };
                  }
                } else if (currentYr < option.intake_year) {
                  return {
                    value: option.id,
                    name: option.intake_month + " " + option.intake_year,
                  };
                }
                // return false;
              })
              .filter((data) => data);
          } else {
            ajaxOptions = [...response].map((option) => {
              return { value: option.id, name: option[props.objKey] };
            });
          }
          return [{ name: "Select Options", value: "" }, ...ajaxOptions];
        });
      };
      try {
        data();
      } catch (e) {
        setThrowErr({ e, page: "enquiries" });
        return;
      }
    }
    if (props.name === "married") setOptions(props.col);
  }, []);
  useEffect(() => {
    if (props.name === "courseInterested" && props.url.length) {
      // console.log("i am inside and url is", props.url);
      const data = async () => {
        const response = await ajaxCallWithHeaderOnly(props.url, {
          Authorization: `Bearer ${authData.accessToken}`,
        });
        if (response?.isNetwork) {
          setThrowErr({ ...response, page: "select" });
          return;
        }
        if (response?.status === 401) {
          setThrowErr({ ...response, page: "select" });
          return;
        }
        // console.log(response);
        setOptions((options) => {
          const ajaxOptions = [...response].map((option) => {
            return { value: option.id, name: option[props.objKey] };
          });

          return [{ name: "Select Options", value: "" }, ...ajaxOptions];
        });
      };
      try {
        data();
      } catch (e) {
        setThrowErr({ e, page: "enquiries" });
        return;
      }
    }
  }, [props.url]);
  return (
    <Form.Group className={props.groupClass} controlId={props.groupId}>
      <Form.Label className="text-center itsBlock">{props.label}</Form.Label>
      <SelectSearch
        options={options}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        search={props.isSearch}
      />
    </Form.Group>
  );
}

export default SelectionBox;
