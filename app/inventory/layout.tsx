import { ReactNode } from "react";
type Props = {
  children: ReactNode;
}

export default function InventoryLayout({ children }: Props) {
  const BaseClasses = 'h-lvh w-full bg-gray-100 py-10 px-12'
  return (
    <div className={BaseClasses}>
      <header>Header</header>
      <div>
        <aside>Sidebar</aside>
        <main>
          <section>{children}</section>
        </main>
      </div>
      <footer>Footer</footer>
    </div>
  )
}
