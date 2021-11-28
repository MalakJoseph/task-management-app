import * as React from "react";
import axios from "axios";
import styled from "styled-components/macro";
import Loader from "react-loader-spinner";
import { Field, Form } from "react-final-form";
import InputWithIcon from "./shared/InputWithIcon";
import { PrimaryButton } from "./shared/Button";
import { Label } from "../utils/globals";
import { ReactComponent as EmailIcon } from "../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../assets/passkey.svg";
import { ReactComponent as LeftArrowIcon } from "../assets/left-arrow.svg";

type FormDataType = {
  EMAIL: string;
  NEW_PASSWORD: string;
  CONFIRM_PASSWORD: string;
};

interface ResetPasswordProps {
  active: boolean;
  setIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPassword = ({ active, setIsForgotPassword }: ResetPasswordProps) => {
  const [isMismatchPassword, setIsMismatchPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(false);
  // tempError should be replaced with sending emails via postgres
  const [tempError, setTempError] = React.useState("");

  const onSubmit = async (input: FormDataType) => {
    const body = {
      email: input.EMAIL,
      password: input.NEW_PASSWORD,
    };

    if (input.CONFIRM_PASSWORD !== input.NEW_PASSWORD) {
      setIsMismatchPassword(true);
      return;
    }

    resetStates();
    setIsLoading(true);

    await axios
      .patch("/users", body)
      .then((res) => res.status === 200 && setIsForgotPassword(false))
      .catch((err) => {
        if (err.message === "Network Error") setIsOffline(true);
        // this is the one which needs to be handled by postgres
        if (err) {
          console.dir(err);
          setTempError(err.response.statusText);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const resetStates = () => {
    setTempError("");
    setIsMismatchPassword(false);
    setIsOffline(false);
  };

  const handleBack = () => {
    resetStates();
    setIsForgotPassword(false);
  };

  return (
    <Container className={active ? "active" : ""}>
      <StyledHeading>
        <StyledButton onClick={handleBack}>
          <StyledIcon>
            <LeftArrowIcon />
          </StyledIcon>
        </StyledButton>
        <h2>Forgot Password</h2>
      </StyledHeading>
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

            <Field name="NEW_PASSWORD">
              {({ input, meta: { touched, error } }) => (
                <div>
                  <Label>
                    New Password
                    <InputWithIcon
                      {...input}
                      minLength={7}
                      prefix={<PasswordIcon />}
                      placeholder="Enter your New Password"
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
              Reset
            </PrimaryButton>
          </StyledForm>
        )}
      />
      {isMismatchPassword && <p>Doesn't match!</p>}
      {isLoading && (
        <Loader type="Bars" width="100px" height="100px" color="#0075ff" />
      )}
      {isOffline && <p>Please check your internet connection</p>}
      {tempError && <p>{tempError}</p>}
    </Container>
  );
};

export default ResetPassword;

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

  if (!values.NEW_PASSWORD) {
    errors.NEW_PASSWORD = "Required field";
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
 */

const Container = styled.div`
  width: 100%;
  text-align: center;
  transition: all 1s ease-in;
  transform: translateX(150%);
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

const StyledHeading = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
`;

const StyledButton = styled.button`
  width: 20px;
  padding: 0;
  margin-right: 40px;
  background-color: transparent;
  border: none;
  outline: none;
`;

const StyledIcon = styled.span`
  fill: #fff;
  background: transparent;
  border: none;
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
