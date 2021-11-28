import * as React from "react";
import axios from "axios";
import styled from "styled-components/macro";
import Loader from "react-loader-spinner";
import { Field, Form } from "react-final-form";
import { useHistory } from "react-router-dom";
import InputWithIcon from "./shared/InputWithIcon";
import { PrimaryButton } from "./shared/Button";
import { Label } from "../utils/globals";
import { ReactComponent as EmailIcon } from "../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../assets/passkey.svg";

type FormDataType = {
  EMAIL: string;
  PASSWORD: string;
};

interface SignInProps {
  active: boolean;
  setIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({ active, setIsForgotPassword }: SignInProps) => {
  const history = useHistory();
  const [isWrongValues, setIsWrongValues] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(false);

  const onSubmit = async (input: FormDataType) => {
    const body = {
      email: input.EMAIL,
      password: input.PASSWORD,
    };

    setIsWrongValues(false);
    setIsLoading(true);
    setIsOffline(false);

    const token = await axios
      .post("/users/login", body)
      .then((res) => res.data.token)
      .catch((err) => {
        if (err.message === "Network Error") setIsOffline(true);
        if (err.response.status === 401) setIsWrongValues(true);
      })
      .finally(() => setIsLoading(false));

    if (!token) {
      return;
    }

    setIsWrongValues(false);
    localStorage.setItem("token", token);
    history.replace("/");
  };

  const handleClickForgotPassword = () => {
    setIsForgotPassword(true);
    setIsWrongValues(false);
  };

  return (
    <Container className={active ? "active" : ""}>
      <h2>Sign In</h2>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
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
            <div>
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
              <StyledH5 onClick={handleClickForgotPassword}>
                Forgot Password?
              </StyledH5>
            </div>
            <PrimaryButton type="submit" fullWidth>
              LOGIN
            </PrimaryButton>
          </StyledForm>
        )}
      />
      {isWrongValues && (
        <p>Please enter correct values for Email and Password</p>
      )}
      {isLoading && (
        <Loader type="Bars" width="100px" height="100px" color="#0075ff" />
      )}
      {isOffline && <p>Please check your internet connection</p>}
    </Container>
  );
};

export default SignIn;

/**
 *
 *
 * Helpers
 *
 *
 */

const validate = (values: FormDataType) => {
  const errors = {} as FormDataType;
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

  return errors;
};

/**
 *
 *
 * Styles
 *
 */

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  text-align: center;
  transition: all 1s ease-in;
  transform: translateX(-150%);
  visibility: hidden;
  opacity: 0;

  &.active {
    transform: translateX(0%);
    visibility: visible;
    opacity: 1;
  }

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const StyledForm = styled.form`
  width: inherit;
  text-align: left;

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

const StyledH5 = styled.h5`
  margin: 10px 0 0;
  text-align: right;
  font-size: 12.5px;
`;
