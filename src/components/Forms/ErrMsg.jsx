import { Dangerous } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
const MSG = styled.div`
  position: fixed;
  top: 10px;
  right: 5px;
  padding: 15px;
  background-color: #dd0d0d;
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const ErrMsg = ({ errRef, errMsg }) => {
  return (
    <MSG
      ref={errRef}
      className={errMsg ? "errmsg" : "offscreen"}
      aria-live="assertive"
    >
      <Dangerous /> {errMsg}
    </MSG>
  );
};

export default ErrMsg;