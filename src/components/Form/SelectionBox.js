import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import SelectSearch from "react-select-search";
import useFetch from "../../hooks/useFetch";
import "react-select-search/style.css";

const SelectionBox = (props) => {
  const [options, setOptions] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const placeHolder = useRef("Loading Data");

  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    responseData,
    setResponseData,
  ] = useFetch();

  useEffect(() => {
    if (!responseData) {
      setSendReqData({
        ...sendReqData,
        url: props.url,
        fetchObj: {
          method: "GET",
          headers: {},
        },
        isAuthNeeded: true,
        expectStatusCode: [200, 201],
      });
    } else if (responseData && !reqStatus.isLoading) {
      let selectOptions = [];
      if (responseData.data?.length) {
        placeHolder.current = "Select from options";
        selectOptions = responseData.data.map((option) => {
          return { value: option.id, name: option[props.objKey] };
        });
      } else {
        placeHolder.current = "No options found!";
      }
      setOptions(selectOptions);
    }
  }, [props.url, responseData, reqStatus]);

  useEffect(() => {
    let selectOptions = [];
    if (!reqStatus.isLoading && responseData && responseData.data?.length) {
      placeHolder.current = "Select from options";
      selectOptions = responseData.data.map((option) => {
        return { value: option.id, name: option[props.objKey] };
      });
    } else {
      placeHolder.current = "No options found!";
    }
    setOptions(selectOptions);
  }, []);

  return (
    <Form.Group className={props.groupClass} controlId={props.groupId}>
      <Form.Label className="text-center itsBlock">{props.label}</Form.Label>
      <SelectSearch
        options={options}
        placeholder={
          reqStatus.isLoading
            ? "Loading Options"
            : options?.length
            ? "Select Options"
            : "No Data found"
        }
        value={props.value}
        multiple={props?.multiple}
        onChange={props.onChange}
        name={props.name}
        search={props.isSearch}
      />
    </Form.Group>
  );
}

export default SelectionBox;
