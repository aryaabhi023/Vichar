import React from "react";
import { logout } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid #4f46e5;
  border-radius: 9999px;
  color: #4f46e5;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4f46e5;
    color: #fff;
  }
`;

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return <StyledButton onClick={logoutHandler}>Logout</StyledButton>;
}

export default LogoutBtn;
