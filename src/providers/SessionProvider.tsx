"use client";

import { ReactNode } from "react";

export default function SessionProvider({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <>
      {children}
    </>
  );
}
