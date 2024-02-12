"use client";
import { useEffect, useState } from "react";
import { getCurrentDate, addQuotesToString } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllConferences,
  fetchUpcomingConferences,
} from "@/redux/features/conference/action";
import { pastConfUpdate } from "@/redux/features/conference/conferenceSlice";

const Switch = () => {
  const { pastConf } = useSelector(({ conferences }) => conferences);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(pastConf);
  const currentDate = getCurrentDate();
  const convertedDate = addQuotesToString(currentDate);

  const changeHandler = () => {
    setChecked(() => !checked);
  };

  const fetchData = async () => {
    dispatch(pastConfUpdate(checked));

    if (checked) {
      dispatch(fetchAllConferences());
    } else {
      dispatch(fetchUpcomingConferences(convertedDate));
    }
  };

  useEffect(() => {
    fetchData();
  }, [checked]);

  useEffect(() => {
    setChecked(pastConf);
  }, [pastConf]);

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={(e) => changeHandler()}
        checked={pastConf}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;
