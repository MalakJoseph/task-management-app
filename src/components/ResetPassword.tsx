import styled from "styled-components";
import InputWithIcon from "./InputWithIcon";
import { PrimaryButton } from "./Button";
import { Label } from "../utils/globals";
import { ReactComponent as EmailIcon } from "../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../assets/passkey.svg";

interface ResetPasswordProps {
  onSubmit: (e: any, submitType: "LOGIN" | "FORGOT_PASSWORD") => void;
}

const ResetPassword = ({ onSubmit }: ResetPasswordProps) => {
  return (
    <>
      <h2>Forgot Password</h2>
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

const StyledForm = styled.form`
  width: inherit;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;
