"use client";

import { useData } from "@/app/context/store";
import { useState } from "react";

const Switch = () => {
  const { state, dispatch } = useData();
  const [checked, setChecked] = useState(state.pastConf);
  const changeHandler = () => {
    setChecked(() => !checked);
    
  };
  return (
    <label className="switch">
      <input type="checkbox" onChange={(e) => changeHandler()} />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;
