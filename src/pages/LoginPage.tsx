import * as React from "react";
import axios from "axios";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { UserInfo } from "../types";
import { AppContainer, FlexCol } from "../utils/globals";
import SignIn from "../components/SignIn";
import ResetPassword from "../components/ResetPassword";

const LoginPage = () => {
  const history = useHistory();
  const [isWrongValues, setIsWrongValues] = React.useState(false);
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);
  const [tempError, setTempError] = React.useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (
    e: any,
    submitType: "LOGIN" | "FORGOT_PASSWORD"
  ) => {
    e.preventDefault();

    const body = {
      email: e.target.EMAIL.value,
      password: e.target.PASSWORD.value,
    };

    if (!body.email.length || !body.password.length) {
      setIsWrongValues(true);
      return;
    }

    if (submitType === "FORGOT_PASSWORD") {
      await axios
        .patch("/users", body)
        .then((res) => res.status === 200 && setIsForgotPassword(false))
        .catch((e) => {
          if (e.response.status === 404) setTempError(e.response.statusText);
        });
      history.replace("/login");
      return;
    }

    if (submitType === "LOGIN") {
      const token = await axios
        .post<{ user: UserInfo; token: string }>("/users/login", body)
        .then((res) => res.data.token)
        .catch((e) => {
          if (e.response.status === 401) setIsWrongValues(true);
        });

      if (!token) {
        return;
      }
      setIsWrongValues(false);
      localStorage.setItem("token", token);
      history.replace("/");
    }
  };

  const handleClickForgotPassword = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsForgotPassword(true);
    setIsWrongValues(false);
  };

  if (token) history.replace("/");

  return (
    <StyledContainer>
      <SignInForm justify="space-between" align="flex-start">
        {isForgotPassword ? (
          <ResetPassword onSubmit={handleSubmit} />
        ) : (
          <SignIn
            onSubmit={handleSubmit}
            onClickForgotPassword={handleClickForgotPassword}
          />
        )}
        {isWrongValues && (
          <p>Please enter correct values for Email and Password</p>
        )}
        {tempError && <p>{tempError}</p>}
      </SignInForm>
      <SignUpRedirection>
        Have an account? <a href={"#"}>Sign up</a>
      </SignUpRedirection>
    </StyledContainer>
  );
};

export default LoginPage;

const StyledContainer = styled(AppContainer)`
  color: #fff;
  /* Credit: https://www.99colors.net/name/cyan */
  /* Background Gradient for Monochromatic Colors */
  background-color: #0075ff4d;
  /* For WebKit (Safari, Chrome, etc) */
  background: #0075ff4d -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#0075ff4d),
      to(#2487f8)
    ) no-repeat;
  /* Mozilla,Firefox/Gecko */
  background: #0075ff4d -moz-linear-gradient(top, #0075ff4d, #2487f8) no-repeat;
  /* IE 5.5 - 7 */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#2487f8, endColorstr=#0075ff4d) no-repeat;
  /* IE 8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#2487f8, endColorstr=#0075ff4d)"
    no-repeat;
`;

const SignInForm = styled(FlexCol)`
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const SignUpRedirection = styled.div``;
