import Header from "../components/Header/Header"
import Flex from "../components/Flex/Flex"
import Logo from "../components/Logo/Logo"
import { Link } from "react-router-dom"

import logo from '../media/logo.png'


const Homepage = () => {
    return (
      <div className="">
        <Header>
          <Flex className="flex flex-row justify-between content-center">
            <Flex className="flex flex-row items-center">
              <Link to="/">
                <Logo src={logo} alt="" />
              </Link>
              <div>Search</div>
            </Flex>

            <Flex className="flex flex-row justify-center items-center">
              <div>Basket</div>
            </Flex>
          </Flex>
        </Header>
      </div>
    );
}

export default Homepage