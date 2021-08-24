import styled from "styled-components/macro";
import InputWithIcon from "./InputWithIcon";
import { PrimaryButton } from "../components/Button";
import { Label } from "../utils/globals";
import { ReactComponent as EmailIcon } from "../assets/email.svg";
import { ReactComponent as PasswordIcon } from "../assets/passkey.svg";

interface SignInProps {
  onSubmit: (e: any, submitType: "LOGIN" | "FORGOT_PASSWORD") => void;
  onClickForgotPassword: (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => void;
}

const SignIn = ({ onSubmit, onClickForgotPassword }: SignInProps) => {
  return (
    <>
      <h2>Sign In</h2>
      <StyledForm onSubmit={(e) => onSubmit(e, "LOGIN")}>
        <Label>
          Email
          <InputWithIcon
            name="EMAIL"
            prefix={<EmailIcon />}
            placeholder="Enter your Email"
          />
        </Label>
        <div>
          <Label>
            Password
            <InputWithIcon
              name="PASSWORD"
              prefix={<PasswordIcon />}
              placeholder="Enter your Password"
            />
          </Label>
          <StyledH5 onClick={(e) => onClickForgotPassword(e)}>
            Forgot Password?
          </StyledH5>
        </div>
        <PrimaryButton type="submit" fullWidth>
          LOGIN
        </PrimaryButton>
      </StyledForm>
    </>
  );
};

export default SignIn;

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

const StyledH5 = styled.h5`
  margin: 10px 0 0;
  text-align: right;
  font-size: 12.5px;
`;
