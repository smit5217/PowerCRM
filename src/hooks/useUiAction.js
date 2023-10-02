// this hook is for uiAction store so we just need to pass the object when we want to perform any action

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiAction } from "../store/uiStore";

function useUiAction() {
  // states
  const [obj, SetObj] = useState({ type: "", data: {} });

  //   storedispatcher

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("inside uidispatch", obj);
    if (Object.keys(obj.data).length) {
      doDispatch();
    }
  }, [obj]);

  const doDispatch = () => {
    if (obj.type === "setNotification") {
      // console.log("in UI and it's", obj);
      dispatch(uiAction.setNotification(obj.data));
    }
  };

  return SetObj;
}

export default useUiAction;
