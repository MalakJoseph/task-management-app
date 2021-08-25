import * as React from "react";
import axios from "axios";
import styled from "styled-components/macro";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import SignIn from "../components/SignIn";
import ResetPassword from "../components/ResetPassword";
import { AppContainer, FlexCol } from "../utils/globals";
import { UserInfo } from "../types";

const LoginPage = () => {
  const history = useHistory();
  const [isWrongValues, setIsWrongValues] = React.useState(false);
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  // tempError should be replaced with sending emails via postgres
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
      setIsLoading(true);
      await axios
        .patch("/users", body)
        .then((res) => res.status === 200 && setIsForgotPassword(false))
        .catch((err) => {
          // this is the one which needs to be handled by postgres
          if (err) setTempError(err.response.statusText);
        })
        .finally(() => setIsLoading(false));

      setIsWrongValues(false);
      history.replace("/login");
      return;
    }

    if (submitType === "LOGIN") {
      setIsLoading(true);
      const token = await axios
        .post("/users/login", body)
        .then((res) => res.data.token)
        .catch((err) => {
          if (err) setIsWrongValues(true);
        })
        .finally(() => setIsLoading(false));

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
          <ResetPassword
            onSubmit={handleSubmit}
            setIsForgotPassword={setIsForgotPassword}
          />
        ) : (
          <SignIn
            onSubmit={handleSubmit}
            onClickForgotPassword={handleClickForgotPassword}
          />
        )}
        {isLoading ? (
          <Loader type="Bars" width="100px" height="100px" color="#0075ff" />
        ) : (
          isWrongValues && (
            <p>Please enter correct values for Email and Password</p>
          )
        )}

        {tempError && <p>{tempError}</p>}
      </SignInForm>
      <SignUpRedirection>
        Don't have an account? <Link to={"/register"}>Sign up</Link>
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
