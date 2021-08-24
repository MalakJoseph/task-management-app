import * as React from "react";
import styled from "styled-components/macro";
import InputWithIcon from "./InputWithIcon";
import { PrimaryButton } from "./Button";
import { Label } from "../utils/globals";
import { ReactComponent as EmailIcon } from "../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../assets/passkey.svg";
import { ReactComponent as LeftArrowIcon } from "../assets/left-arrow.svg";

interface ResetPasswordProps {
  setIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: any, submitType: "LOGIN" | "FORGOT_PASSWORD") => void;
}

const ResetPassword = ({
  setIsForgotPassword,
  onSubmit,
}: ResetPasswordProps) => {
  return (
    <>
      <StyledHeading>
        <StyledButton onClick={() => setIsForgotPassword(false)}>
          <StyledIcon>
            <LeftArrowIcon />
          </StyledIcon>
        </StyledButton>
        <h2>Forgot Password</h2>
      </StyledHeading>
      <StyledForm onSubmit={(e) => onSubmit(e, "FORGOT_PASSWORD")}>
        <Label>
          Email
          <InputWithIcon
            name="EMAIL"
            prefix={<EmailIcon />}
            placeholder="Enter your Email"
          />
        </Label>
        <Label>
          New Password
          <InputWithIcon
            name="PASSWORD"
            prefix={<PasswordIcon />}
            minLength={7}
            placeholder="Enter your New Password"
          />
        </Label>
        <PrimaryButton type="submit" fullWidth>
          Reset
        </PrimaryButton>
      </StyledForm>
    </>
  );
};

export default ResetPassword;

/**
 *
 *
 * Styles
 *
 */

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
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;
