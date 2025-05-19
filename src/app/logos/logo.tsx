import React from "react";

export type IconType = {
  className?: string;
};

export const LogoBasement = ({ className }: IconType) => {
  return <span className={className}>Repository</span>;
};
