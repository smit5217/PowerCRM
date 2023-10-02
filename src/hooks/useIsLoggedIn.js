import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "../helpers/helperFunctions";
import useAuthAction from "./useAuthAction";
import { authAction } from "../store/authStore";
import { useDispatch } from "react-redux";

// this is just for checking whether we have localData or not and if yes do loggedIn
function useIsLoggedIn() {
  // built in hook
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // redux hook
  const dispatch = useDispatch();
  useEffect(() => {
    // get localdata and if not available then logout and if available set it, then it will give us If session expired then
    const localData = getFromLocalStorage("loginInfo", true);
    console.log("localdata i got is", localData);
    if (localData === -1) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      dispatch(
        authAction.setAuthStatus({
          ...localData,
          loggedIn: true,
          logInOperation: 1,
        })
      );
    }
  }, []);

  return isLoggedIn;
}

export default useIsLoggedIn;
