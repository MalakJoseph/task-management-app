import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from "react";
import * as React from "react";
import styled from "styled-components/macro";
// import { themeColor } from "../../shared/styles-utils";

type SizeType = "small" | "medium";

export interface PrimaryButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  fullWidth?: boolean;
  target?: string;
  href?: string;
  size?: SizeType;
  className?: string;
  isActive?: boolean;
}

type RefType = HTMLButtonElement;

const StyledIconContainer = styled.div`
  padding: 0 8px;
  line-height: 0;
`;

// So React.forwardRef is accepting 2 args:
// first, refType. second, propsType.
const BaseButton = React.forwardRef<RefType, PrimaryButtonProps>(
  (props, ref) => {
    const {
      href,
      target,
      type = "button",
      children,
      className,
      fullWidth,
      prefixIcon,
      suffixIcon,
      isActive,
      ...rest
    } = props;
    let Component = "button";
    const buttonProps: any = {
      type,
      className,
      ...rest,
    };
    if (href) {
      Component = "a";
      delete buttonProps.type;
      buttonProps.target = target;
      buttonProps.href = href;
    }
    const prefixIconContent = prefixIcon ? (
      <StyledIconContainer>{prefixIcon}</StyledIconContainer>
    ) : null;
    const suffixIconContent = suffixIcon ? (
      <StyledIconContainer>{suffixIcon}</StyledIconContainer>
    ) : null;
    return (
      <Component ref={ref} className={className} {...buttonProps}>
        {prefixIconContent}
        {children}
        {suffixIconContent}
      </Component>
    );
  }
);

export const PrimaryButton = styled(BaseButton)`
  font-size: 14px;
  font-weight: 600;
  color: #4486d4;
  margin: 0;
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  flex: ${({ fullWidth }) => (fullWidth ? "1 1 auto" : "0 0 auto")};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  line-height: 1.25;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 30px;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
  }

  &.dimmed {
    opacity: 0.5;
    pointer-events: none;
  }
`;
