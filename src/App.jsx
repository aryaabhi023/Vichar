import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header } from "./Component";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: 64rem;
`;

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <Container>
      <Content>
        <Header />
        <Outlet />
      </Content>
    </Container>
  ) : null;
}

export default App;
