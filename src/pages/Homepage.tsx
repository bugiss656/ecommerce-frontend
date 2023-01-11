import Header from "../components/Header/Header"
import Flex from "../components/Flex/Flex"
import Logo from "../components/Logo/Logo"
import SearchBar from "../components/SearchBar/SearchBar"
import Input from "../components/Input/Input"
import Menu from "../components/Menu/Menu"
import MenuItem from "../components/Menu/MenuItem"
import { Link } from "react-router-dom"

import logo from '../media/logo.png'
import { 
  BsHeadset,
  BsPerson,
  BsCart3
} from 'react-icons/bs'


const Homepage = () => {
    return (
      <div className="">
        <Header>
          <Flex className="flex flex-row justify-between content-center">
            <Flex className="flex flex-row items-center">
              <Link to="/">
                <Logo src={logo} alt="" />
              </Link>
              <SearchBar>
                <Input type="text" placeholder="Czego szukasz?" value="" />
              </SearchBar>
            </Flex>

            <Menu>
              <Flex className="flex flex-row items-center">
                <MenuItem
                  link="#"
                  icon={<BsHeadset />} 
                  text="Kontakt" 
                />
                <MenuItem 
                  link="#"
                  icon={<BsPerson />} 
                  text="Twoje konto" 
                />
                <MenuItem 
                  link="#"
                  icon={<BsCart3 />} 
                  text="Koszyk" 
                />
              </Flex>
            </Menu>
          </Flex>
        </Header>
      </div>
    );
}

export default Homepage