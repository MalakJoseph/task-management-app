import React from "react";
import styled from "styled-components";

enum SizeEnum {
  small = "32px",
  medium = "40px",
  large = "48px",
  xLarge = "64px",
}
type SizeType = keyof typeof SizeEnum;

export interface AvatarProps {
  size?: SizeType;
  src?: string | null;
  fullName?: string;
}

const Avatar: React.FC<AvatarProps> = ({ size = "small", src, fullName }) => {
  const initials = getInitials(fullName);

  return (
    <StyledDiv size={size}>
      {src && <img src={src} width={SizeEnum[size]} height="auto" alt="User" />}
      {initials && !src && (
        <StyledIntials size={size}>{initials}</StyledIntials>
      )}
    </StyledDiv>
  );
};

export { Avatar };

/**
 *
 *
 * Helper functions
 *
 *
 */

const getInitials = (fullName?: string) => {
  if (!fullName) {
    return null;
  }
  const nameArray = fullName.split(" ");

  return nameArray
    .map((n, i) => (i === 0 || i === 1) && n[0])
    .filter((n) => n)
    .join("")
    .toUpperCase();
};

/**
 *
 *
 * Styles
 *
 *
 */

const StyledDiv = styled.div<{ size: SizeType }>`
  width: ${({ size }) => SizeEnum[size]};
  height: ${({ size }) => SizeEnum[size]};

  border-radius: 100%;
  background-color: ${({ theme }) => theme.palette.ink.light};
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIntials = styled.span<{ size: SizeType }>`
  display: inline-block;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.white.normal};
  line-height: 1;

  font-size: ${({ size }) =>
    size === "xLarge" ? "20px" : size === "large" ? "16px" : "14px"};
`;
