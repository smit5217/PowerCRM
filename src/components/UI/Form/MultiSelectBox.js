import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";

const MultiSelectBox = (props) => {
  const authData = useSelector((state) => state.authStore);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [
    sendReqData,
    setSendReqData,
    reqStatus,
    responseData,
    setResponseData,
  ] = useFetch();

  const data = async () => {
    let url = props.url;
    if (props?.isNeed) {
      url = props.url + `${props.separator}${props.paramName}=${props.paramId}`;
    }
    setResponseData(null)
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
    if (responseData) {
      const allObj = responseData.data.map((option) => {
        let name = "";
        props.objKey?.forEach((key, index, arr) => {
          if (index != 0) name += " - ";
          name += option[key];
        });
        return { id: option.id, name };
      });
      if (props.isEdit) {
        if (props.multiple) {
          const selectedObj = allObj.filter((obj) => {
            for (let i = 0; i < props.idVals.length; i++) {
              if (props.idVals[i] === obj.id) return true;
            }
            return false;
          });
          props.onEditchange(selectedObj);
        } else {
          const selectedObj = allObj.filter((obj) => props.idVals === obj.id);
          props.onEditchange(selectedObj);
        }
      }
      setOptions(allObj);
      setIsLoading(false);
    }
  }, [responseData]);

  useEffect(() => {
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
    }
  }, [props.url, props.isEditLoading, props.isEdit]);
  
  return (
    <Form.Group className={props.groupClass} controlId={props.groupId}>
      <Form.Label className="text-center itsBlock">{props.label}</Form.Label>
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
