

type HeaderProps = {
  children: React.ReactElement | React.ReactElement[],
  testid?: string
}


const Header = ({ children, testid }: HeaderProps) => {
    return (
      <header className="sticky shadow-sm h-auto py-[5px]" data-testid={testid}>
        <div className="container">
          {children}
        </div>
      </header>
    );
}

export default Header