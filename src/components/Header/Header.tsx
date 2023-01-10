

type HeaderProps = {
  children: React.ReactElement | React.ReactElement[],
  testid?: string
}


const Header = ({ children, testid }: HeaderProps) => {
    return (
      <header className="sticky p-3" data-testid={testid}>
        {children}
      </header>
    );
}

export default Header