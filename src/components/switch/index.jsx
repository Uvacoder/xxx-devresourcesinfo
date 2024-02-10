"use client";

import { useData } from "@/app/context/store";
import { useEffect, useState } from "react";
import { getCurrentDate, addQuotesToString } from "@/utils/utils";
import {
  getUpcomingConferences,
  getAllConferences,
} from "@/services/api/conferenceAPI";

const Switch = () => {
  const { state, dispatch } = useData();
  const [checked, setChecked] = useState(state.pastConf);
  const currentDate = getCurrentDate();
  const convertedDate = addQuotesToString(currentDate);

  const changeHandler = () => {
    setChecked(() => !checked);
  };

  const fetchData = async () => {
    dispatch({ type: "SET_PAST_CONFERENCES", payload: checked });
    try {
      if (checked) {
        const response = await getAllConferences();
        dispatch({ type: "FETCH_CONFERENCES", payload: response.data });
      } else {
        const response = await getUpcomingConferences(convertedDate);
        dispatch({ type: "FETCH_CONFERENCES", payload: response.data });
      }
    } catch (error) {
      console.log("Error in fetching conference data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [checked]);

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={(e) => changeHandler()}
        checked={state?.pastConf}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;
