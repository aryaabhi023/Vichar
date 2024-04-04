import React from "react";
import { Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "./index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  border-radius: 10px;
  padding: 0.5rem 0.5rem;
  background-color: #2d3748;
  color: #fff;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    display: grid;
    gap: 0.2rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const NavItem = styled.li``;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #90cdf4;
    color: #1a202c;
  }
`;

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <StyledHeader>
      <Container>
        <Nav>
          <div>
            <Link to="/">
              <Logo width="75px" />
            </Link>
          </div>
          <NavList>
            {navItems.map(
              (item) =>
                item.active && (
                  <NavItem key={item.name}>
                    <NavButton onClick={() => navigate(item.slug)}>
                      {item.name}
                    </NavButton>
                  </NavItem>
                )
            )}
            {authStatus && (
              <NavItem key={"logout"}>
                <LogoutBtn />
              </NavItem>
            )}
          </NavList>
        </Nav>
      </Container>
    </StyledHeader>
  );
}

export default Header;
