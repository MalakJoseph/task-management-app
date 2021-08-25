import * as React from "react";
import axios from "axios";
import styled from "styled-components/macro";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { PrimaryButton } from "./Button";
import InputWithIcon from "./InputWithIcon";
import { AppContainer, FlexCol, Label } from "../utils/globals";
import { ReactComponent as EmailIcon } from "../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../assets/passkey.svg";
import { ReactComponent as PhoneIcon } from "../assets/smartphone.svg";
import { ReactComponent as UserIcon } from "../assets/user.svg";

type FormEventHandler = React.FormEvent & {
  target: {
    NAME: { value: string };
    PHONE: { value: string };
    EMAIL: { value: string };
    PASSWORD: { value: string };
    CONFIRM_PASSWORD: { value: string };
  };
};

const SignUp = () => {
  const history = useHistory();
  const [isWrongValues, setIsWrongValues] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isWrongPassword, setIsWrongPassword] = React.useState(false);

  const handleSubmit = async (e: FormEventHandler) => {
    e.preventDefault();

    const body = {
      name: e.target.NAME.value,
      phone: e.target.PHONE.value,
      email: e.target.EMAIL.value,
      password: e.target.PASSWORD.value,
    };

    if (
      !body.name.length ||
      !body.phone.length ||
      !body.email.length ||
      !body.password.length ||
      !body.password.length ||
      !e.target.CONFIRM_PASSWORD.value
    ) {
      setIsWrongValues(true);
      return;
    }

    if (e.target.CONFIRM_PASSWORD.value !== body.password) {
      setIsWrongPassword(true);
      return;
    }

    setIsLoading(true);

    const token = await axios
      .post("/users", body)
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
  };

  return (
    <StyledContainer>
      {isLoading ? (
        <Loader type="Bars" width="100px" height="100px" color="#0075ff" />
      ) : (
        <>
          <SignUpForm justify="space-between" align="flex-start">
            <h2>Sign Up</h2>
            {/* @ts-ignore */}
            <StyledForm onSubmit={(e: FormEventHandler) => handleSubmit(e)}>
              <Label>
                Full Name
                <InputWithIcon
                  name="NAME"
                  prefix={<UserIcon />}
                  placeholder="Enter your Name"
                />
              </Label>
              <Label>
                Phone No
                <InputWithIcon
                  name="PHONE"
                  prefix={<PhoneIcon />}
                  placeholder="Enter your Phone no"
                />
              </Label>
              <Label>
                Email
                <InputWithIcon
                  name="EMAIL"
                  prefix={<EmailIcon />}
                  placeholder="Enter your Email"
                />
              </Label>
              <Label>
                Password
                <InputWithIcon
                  name="PASSWORD"
                  minLength={7}
                  prefix={<PasswordIcon />}
                  placeholder="Enter your Password"
                />
              </Label>
              <Label>
                Confirm Password
                <InputWithIcon
                  name="CONFIRM_PASSWORD"
                  minLength={7}
                  prefix={<PasswordIcon />}
                  placeholder="Confirm Password"
                />
              </Label>
              <PrimaryButton type="submit" fullWidth>
                REGISTER
              </PrimaryButton>
            </StyledForm>
            {isLoading ? (
              <Loader
                type="Bars"
                width="100px"
                height="100px"
                color="#0075ff"
              />
            ) : (
              <>
                {isWrongPassword && <p>Doesn't match!</p>}
                {isWrongValues && (
                  <p>Please enter correct values for Email and Password</p>
                )}
              </>
            )}
          </SignUpForm>
          <SignInRedirection>
            Have an account? <Link to={"/login"}>Sign in</Link>
          </SignInRedirection>
        </>
      )}
    </StyledContainer>
  );
};

export default SignUp;

/**
 *
 *
 * Styles
 *
 *
 */

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

const SignUpForm = styled(FlexCol)`
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const StyledForm = styled.form`
  width: inherit;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const SignInRedirection = styled.div``;
