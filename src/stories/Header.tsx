interface HeaderProps {
  title?: string;
}

export const Header = ({ title = "Untitled" }: HeaderProps) => (
  <header className="flex items-center font-sans border-b h-28">
    <h1 className="px-8 text-2xl uppercase">{title}</h1>
    <div className="ml-auto px-8 flex items-center"></div>
  </header>
);
