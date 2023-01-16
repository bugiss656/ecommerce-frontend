import Header from "../components/Header/Header"
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
          <div className="flex flex-row justify-between content-center">
            <div className="flex flex-row items-center">
              <Link to="/">
                <Logo src={logo} alt="" />
              </Link>
              <SearchBar>
                <Input type="text" placeholder="Czego szukasz?" value="" />
              </SearchBar>
            </div>

            <Menu>
              <MenuItem
                link="#"
                icon={<BsHeadset size={21} />} 
                text="Kontakt"
                dropdown={true}
              />
              <MenuItem 
                link="#"
                icon={<BsPerson size={21} />} 
                text="Twoje konto"
                dropdown={true} 
              />
              <MenuItem 
                link="#"
                icon={<BsCart3 size={21} />} 
                text="Koszyk"
                dropdown={true} 
              />
            </Menu>
          </div>
        </Header>
      </div>
    )
}

export default Homepage