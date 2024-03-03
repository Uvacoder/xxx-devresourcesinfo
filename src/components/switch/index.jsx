"use client";
import { updateConferenceURL } from "@/utils/conferenceFunc";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Switch = ({ stateObj }) => {
  const router = useRouter();
  const switchValue = stateObj?.pastConf === "past" ? true : false;
  const [checked, setChecked] = useState(switchValue);

  const createQueryString = useCallback((queryParams) => {
    const params = new URLSearchParams();
    for (const [name, value] of Object.entries(queryParams)) {
      if (value !== "") {
        params.set(name, value);
      }
    }
    return params.toString();
  }, []);

  const changeHandler = () => {
    let newCheckedValue = checked ? false : true;
    setChecked(newCheckedValue);

    const url = updateConferenceURL(stateObj);
    let queryParams;
    if (newCheckedValue) {
      queryParams = {
        continent: stateObj?.continentSelected,
        country: stateObj?.countrySelected,
        city: stateObj?.citySelected,
        tech: stateObj?.techSelected,
        mode: "past",
      };
    } else {
      queryParams = {
        continent: stateObj?.continentSelected,
        country: stateObj?.countrySelected,
        city: stateObj?.citySelected,
        tech: stateObj?.techSelected,
        mode: "",
      };
    }

    router.push(`${url}/?${createQueryString(queryParams)}`);
  };

  useEffect(() => {
    const switchValue = stateObj?.pastConf === "past" ? true : false;
    setChecked(switchValue);
  }, [stateObj?.pastConf]);

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={() => changeHandler()}
        checked={checked}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;
