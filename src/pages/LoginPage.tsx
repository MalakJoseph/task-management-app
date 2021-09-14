import * as React from "react";
import styled from "styled-components/macro";
import { Link, useHistory } from "react-router-dom";
import SignIn from "../components/SignIn";
import ResetPassword from "../components/ResetPassword";
import { AppContainer, FlexCol } from "../utils/globals";
import { UserInfo } from "../types";

const LoginPage = () => {
  const history = useHistory();

  const [isForgotPassword, setIsForgotPassword] = React.useState(false);
  const token = localStorage.getItem("token");

  if (token) history.replace("/");

  return (
    <StyledContainer>
      <SignInForm justify="space-between" align="flex-start">
        {isForgotPassword ? (
          <ResetPassword setIsForgotPassword={setIsForgotPassword} />
        ) : (
          <SignIn setIsForgotPassword={setIsForgotPassword} />
        )}
      </SignInForm>
      <SignUpRedirection>
        Don't have an account? <Link to={"/register"}>Sign up</Link>
      </SignUpRedirection>
    </StyledContainer>
  );
};

export default LoginPage;

const StyledContainer = styled(AppContainer)`
  min-height: -webkit-fill-available;
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
