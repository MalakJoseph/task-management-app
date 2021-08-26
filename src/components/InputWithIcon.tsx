import React from "react";
import styled, { css } from "styled-components";
import { FlexRow } from "../utils/globals";
// import { rtl, themeColor } from "../../styles-utils";

interface InputFieldProps {
  name?: string;
  type?: string;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  value?: string;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  width?: string;
  borderWidth?: string;
  margin?: string;
  padding?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      name,
      type,
      value,
      className,
      prefix,
      suffix,
      min,
      max,
      minLength,
      maxLength,
      placeholder,
      width,
      borderWidth,
      margin,
      padding,
      onChange,
      onFocus,
      onKeyUp,
      ...restProps
    },
    ref
  ) => {
    return (
      <InputWrapper
        className={className}
        borderWidth={borderWidth}
        margin={margin}
      >
        {prefix && <StyledPrefix isIconExist={!!prefix}>{prefix}</StyledPrefix>}
        <StyledInput
          {...restProps}
          name={name}
          type={type}
          ref={ref}
          value={value}
          width={width}
          style={{ padding: padding }}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
        />
        {suffix && <StyledSuffix isIconExist={!!suffix}>{suffix}</StyledSuffix>}
      </InputWrapper>
    );
  }
);

export default InputWithIcon;

const InputWrapper = styled(FlexRow)<{
  borderWidth?: string;
  margin?: string;
}>`
  background-color: #89bfff80;
  margin-top: 4px;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 1px 1px 5px #6390c5;

  &.invalid {
    border: 1px solid #d21c1c;
  }

  ${({ borderWidth }) =>
    borderWidth &&
    css`
      border-width: ${borderWidth};
    `};
  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `};
`;

const StyledPrefix = styled.span<{ isIconExist: boolean }>`
  width: 20px;
  fill: #fff;
  ${({ isIconExist }) =>
    isIconExist &&
    css`
      margin-right: 12px;
    `};
`;

const StyledSuffix = styled.span<{ isIconExist: boolean }>`
  width: 20px;
  fill: #fff;
  ${({ isIconExist }) =>
    isIconExist &&
    css`
      margin-left: 12px;
    `};
`;

const StyledInput = styled.input<{ width?: string }>`
  width: 100%;
  background-color: transparent;
  border: 0;
  outline: 0;
  color: #fff;

  ::placeholder {
    color: #fff;
    opacity: 0.5;
  }

  /* Edge */
  ::-webkit-input-placeholder {
    color: #fff;
    opacity: 0.5;
  }

  /* Internet Explorer 10-11 */
  :-ms-input-placeholder {
    color: #fff;
    opacity: 0.5;
  }
`;
