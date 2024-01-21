import { ReactNode } from "react";
type Props = {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const BaseClasses = 'h-lvh w-full bg-gray-100 py-10 px-12'
  return (
    <div className={BaseClasses}>{children}</div>
  )
}
