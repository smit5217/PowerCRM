// this hook is for AuthAction store so we just need to pass the object when we want to perform any action

import React, { useEffect, useState } from "react";
import { authAction } from "../store/authStore";
import { useDispatch } from "react-redux";

function useAuthAction() {
  // states
  const [obj, SetObj] = useState({ type: "", data: {} });

  //   storedispatcher

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(obj.data)?.length) {
      doDispatch();
    }
  }, [obj]);

  const doDispatch = () => {
    if (obj.type === "setAuthStatus")
      dispatch(authAction.setAuthStatus(obj.data));
    SetObj({ type: "", data: {} });
  };

  return SetObj;
}

export default useAuthAction;
