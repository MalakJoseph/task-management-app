import * as React from "react";
import axios from "axios";
import styled from "styled-components/macro";
import Loader from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import InputWithIcon from "./shared/InputWithIcon";
import { PrimaryButton } from "./shared/Button";
import { AppContainer, FlexCol, Label } from "../utils/globals";
import { ReactComponent as EmailIcon } from "../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../assets/passkey.svg";
import { ReactComponent as PhoneIcon } from "../assets/smartphone.svg";
import { ReactComponent as UserIcon } from "../assets/user.svg";
import { Field, Form } from "react-final-form";

type FormDataType = {
  NAME: string;
  PHONE: string;
  EMAIL: string;
  PASSWORD: string;
  CONFIRM_PASSWORD: string;
};

const SignUp = () => {
  const history = useHistory();
  const [isMismatchPassword, setIsMismatchPassword] = React.useState(false);
  const [isExistAccount, setIsExistAccount] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(false);

  const onSubmit = async (input: FormDataType) => {
    const body = {
      name: input.NAME,
      phone: input.PHONE,
      email: input.EMAIL,
      password: input.PASSWORD,
    };

    if (input.CONFIRM_PASSWORD !== input.PASSWORD) {
      setIsMismatchPassword(true);
      return;
    }

    setIsMismatchPassword(false);
    setIsExistAccount(false);
    setIsLoading(true);
    setIsOffline(false);

    const token = await axios
      .post("/users", body)
      .then((res) => res.data.token)
      .catch((err) => {
        if (err.message === "Network Error") setIsOffline(true);
        if (err.response.status === 403) setIsExistAccount(true);
      })
      .finally(() => setIsLoading(false));

    if (!token) {
      return;
    }

    localStorage.setItem("token", token);
    history.replace("/");
  };

  return (
    <StyledContainer>
      <SignUpForm justify="space-between" align="flex-start">
        <h2>Sign Up</h2>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Field name="NAME">
                {({ input, meta: { touched, error } }) => (
                  <div>
                    <Label>
                      Full Name
                      <InputWithIcon
                        {...input}
                        className={error && touched ? "invalid" : ""}
                        prefix={<UserIcon />}
                        placeholder="Enter your Name"
                      />
                    </Label>
                    {touched && error && <RequiredSpan>{error}</RequiredSpan>}
                  </div>
                )}
              </Field>
              <Field name="PHONE">
                {({ input, meta: { touched, error } }) => (
                  <div>
                    <Label>
                      Phone No
                      <InputWithIcon
                        {...input}
                        prefix={<PhoneIcon />}
                        placeholder="Enter your Phone no"
                      />
                    </Label>
                    {touched && error && <RequiredSpan>{error}</RequiredSpan>}
                  </div>
                )}
              </Field>
              <Field name="EMAIL">
                {({ input, meta: { touched, error } }) => (
                  <div>
                    <Label>
                      Email
                      <InputWithIcon
                        {...input}
                        prefix={<EmailIcon />}
                        placeholder="Enter your Email"
                      />
                    </Label>
                    {touched && error && <RequiredSpan>{error}</RequiredSpan>}
                  </div>
                )}
              </Field>
              <Field name="PASSWORD">
                {({ input, meta: { touched, error } }) => (
                  <div>
                    <Label>
                      Password
                      <InputWithIcon
                        {...input}
                        minLength={7}
                        prefix={<PasswordIcon />}
                        placeholder="Enter your Password"
                      />
                    </Label>
                    {touched && error && <RequiredSpan>{error}</RequiredSpan>}
                  </div>
                )}
              </Field>
              <Field name="CONFIRM_PASSWORD">
                {({ input, meta: { touched, error } }) => (
                  <div>
                    <Label>
                      Confirm Password
                      <InputWithIcon
                        {...input}
                        minLength={7}
                        prefix={<PasswordIcon />}
                        placeholder="Confirm Password"
                      />
                    </Label>
                    {touched && error && <RequiredSpan>{error}</RequiredSpan>}
                  </div>
                )}
              </Field>
              <PrimaryButton type="submit" fullWidth>
                REGISTER
              </PrimaryButton>
            </StyledForm>
          )}
        />
        {isMismatchPassword && <p>Doesn't match!</p>}
        {isExistAccount && <p>This E-mail already exists</p>}
        {isLoading && (
          <Loader type="Bars" width="100px" height="100px" color="#0075ff" />
        )}
        {isOffline && <p>Please check your internet connection</p>}
      </SignUpForm>
      <SignInRedirection>
        Have an account? <Link to={"/login"}>Sign in</Link>
      </SignInRedirection>
    </StyledContainer>
  );
};

export default SignUp;

/**
 *
 *
 * Helpers
 *
 *
 */

const validate = (values: FormDataType) => {
  const errors = {} as FormDataType;
  if (!values.NAME) {
    errors.NAME = "Your name is required";
  }

  if (!values.PHONE) {
    errors.PHONE = "Please enter a valid phone number";
  }

  if (
    !values?.EMAIL ||
    !values?.EMAIL?.match(
      /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
    )
  ) {
    errors.EMAIL = "Please enter a valid email address";
  }

  if (!values.PASSWORD) {
    errors.PASSWORD = "Required field";
  }

  if (!values.CONFIRM_PASSWORD) {
    errors.CONFIRM_PASSWORD = "Required field";
  }

  return errors;
};

/**
 *
 *
 * Styles
 *
 *
 */

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

const RequiredSpan = styled.span`
  font-size: 12px;
  color: #d21c1c;
  font-weight: 400;
  height: 0;
  margin-top: 4px;
`;

const SignInRedirection = styled.div`
  margin-top: 10px;
`;
