interface HeaderProps {
  title?: string;
}

export const Header = ({ title = "Untitled" }: HeaderProps) => (
  <header className="flex h-28 items-center border-b font-sans">
    <h1 className="px-8 text-2xl uppercase">{title}</h1>
    <div className="ml-auto flex items-center px-8"></div>
  </header>
);
