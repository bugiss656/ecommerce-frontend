

type HeaderProps = {
  children: React.ReactElement | React.ReactElement[],
  testid?: string
}


const Header = ({ children, testid }: HeaderProps) => {
    return (
      <header className="sticky shadow-md h-[72px]" data-testid={testid}>
        <div className="container">
          {children}
        </div>
      </header>
    );
}

export default Header