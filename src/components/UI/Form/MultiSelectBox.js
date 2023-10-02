import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ajaxCall, ajaxCallWithHeaderOnly } from "../../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";

function MultiSelectBox(props) {
  const [options, setOptions] = useState([]);
  const authData = useSelector((state) => state.authStore);
  const [isLoading, setIsLoading] = useState(true);
  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    responseData,
    setResponseData,
  ] = useFetch();
  console.log(props.value, options);
  const data = async () => {
    console.log("so i have loading parent state", props.isEditLoading);
    console.log("now id is", props.idVals);
    let url = props.url;
    if (props?.isNeed) {
      url = props.url + `${props.separator}${props.paramName}=${props.paramId}`;
    }
    setSendReqData({
      ...sendReqData,
      url,
      fetchObj: {
        method: "GET",
      },
      isAuthNeeded: true,
      expectStatusCode: [200],
    });
  };
  useEffect(() => {
    // console.log("i am inside and url is", props.url);
    if (props?.isStatic) {
      setOptions(props?.cols);
      setIsLoading(false);
      return;
    }
    if (props.url?.length) {
      props.isEdit
        ? props.isEditLoading
          ? data()
          : console.log("no need")
        : data();
      // data();
    }
  }, [props.url, props.isEditLoading, props.isEdit]);

  useEffect(() => {
    if (responseData) {
      const allObj = responseData.data.map((option) => {
        let name = "";
        props.objKey?.forEach((key, index, arr) => {
          if (index != 0) name += " - ";
          name += option[key];
        });
        return { id: option.id, name };
      });
      console.log("editing", props.isEdit);
      if (props.isEdit) {
        if (props.multiple) {
          const selectedObj = allObj.filter((obj) => {
            for (let i = 0; i < props.idVals.length; i++) {
              if (props.idVals[i] === obj.id) return true;
            }
            return false;
          });
          console.log("editing val", selectedObj);
          props.onEditchange(selectedObj);
        } else {
          console.log(allObj);
          const selectedObj = allObj.filter((obj) => props.idVals === obj.id);
          props.onEditchange(selectedObj);
          console.log("editing val", selectedObj);
        }
      }
      setOptions(allObj);

      setIsLoading(false);
    }
  }, [responseData]);
  return (
    <Form.Group className={props.groupClass} controlId={props.groupId}>
      <Form.Label>{props.label}</Form.Label>
      <Multiselect
        options={options}
        selectedValues={props.value}
        onSelect={props.onSelect}
        onRemove={props.onSelect}
        name={props.name}
        search={props.isSearch}
        placeholder="Select Options"
        singleSelect={!props.multiple}
        displayValue="name"
        loading={isLoading}
        loadingMessage={props.loadMsg}
      />
    </Form.Group>
  );
}

export default MultiSelectBox;
