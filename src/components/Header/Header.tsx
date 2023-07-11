

type HeaderProps = {
  children: React.ReactElement | React.ReactElement[],
  testid?: string
}


const Header = ({ children, testid }: HeaderProps) => {
    return (
      <header className="sticky z-10 shadow-md h-auto" data-testid={testid}>
        {children}
      </header>
    );
}

export default Header