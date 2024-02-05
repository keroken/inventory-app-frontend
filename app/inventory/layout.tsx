import { ReactNode } from "react";
type Props = {
  children: ReactNode;
}

export default function InventoryLayout({ children }: Props) {
  const BaseClasses = 'h-lvh w-full bg-gray-100 py-10 px-12'
  const HeaderClasses = 'bg-blue-200 p-5'
  const ContainerClasses = 'grow flex'
  const NavbarClasses = 'w-{200} bg-blue-100 p-5'
  const ContentClasses = 'grow-2 p-5'
  const FooterClasses = 'bg-blue-200 p-5'
  return (
    <div className={BaseClasses}>
      <header className={HeaderClasses}>Header</header>
      <div className={ContainerClasses}>
        <aside className={NavbarClasses}>Sidebar</aside>
        <main className={ContentClasses}>
          <section>{children}</section>
        </main>
      </div>
      <footer className={FooterClasses}>Footer</footer>
    </div>
  )
}
