import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  margin: auto;
  width: 100%;
  max-width: 32rem;
  background-color: #f7fafc;
  border-radius: 1.5rem;
  padding: 2rem;
  border: 0.0625rem solid #000;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.5;
`;

const SubTitle = styled.p`
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  color: #4a5568;
`;

const ErrorText = styled.p`
  text-align: center;
  color: #e53e3e;
  margin-top: 2rem;
`;

const StyledInput = styled.input`
  width: 90%;
  margin: 10px;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  border: 0.0625rem solid transparent;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 0.125rem rgba(79, 70, 229, 0.25);
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #4f46e5;
  color: #fff;
  border-radius: 0.375rem;
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: #4338ca;
  }
`;

function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Sign in to your account</Title>
        <SubTitle>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </SubTitle>
        {error && <ErrorText>{error}</ErrorText>}
        <form onSubmit={handleSubmit(login)} className="mt-5">
          <div className="space-y-5">
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <StyledInput
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">
                Password:
              </label>
              <StyledInput
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </div>
            <StyledButton type="submit">Login</StyledButton>
          </div>
        </form>
      </FormContainer>
    </Container>
  );
}

export default Login;
