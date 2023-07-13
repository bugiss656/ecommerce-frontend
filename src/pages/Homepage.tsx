import Header from "../components/Header/Header";
import Logo from "../components/Logo/Logo";
import SearchBar from "../components/SearchBar/SearchBar";
import Input from "../components/Input/Input";
import Menu from "../components/Menu/Menu";
import MenuItem from "../components/Menu/MenuItem";
import Navigation from "../components/Navigation/Navigation";
import NavigationList from "../components/Navigation/NavigationList";
import NavigationItem from "../components/Navigation/NavigationItem";
import { Link, Outlet } from "react-router-dom";

import logo from "../media/logo.png";
import { BsHeadset, BsPerson, BsCart3 } from "react-icons/bs";
import Carousel from "../components/Carousel/Carousel";

const data = [
    {
        title: "Slide title 1",
        src: "src/assets/slide-1.jpg",
    },
    {
        title: "Slide title 2",
        src: "src/assets/slide-2.jpg",
    },
    {
        title: "Slide title 3",
        src: "src/assets/slide-3.jpg",
    },
];

const Homepage = () => {
    return (
        <>
            <Header>
                <div className="container flex flex-row justify-between content-center py-[5px]">
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
                            children={
                                <ul>
                                    <li>One</li>
                                    <li>Two</li>
                                    <li>Three</li>
                                </ul>
                            }
                        />
                        <MenuItem
                            link="#"
                            icon={<BsPerson size={21} />}
                            text="Twoje konto"
                            dropdown={true}
                            children={
                                <ul>
                                    <li>Twoje konto</li>
                                    <li>Zamówienia</li>
                                    <li>Ustawienia konta</li>
                                </ul>
                            }
                        />
                        <MenuItem
                            link="#"
                            icon={<BsCart3 size={21} />}
                            text="Koszyk"
                            dropdown={true}
                            children={
                                <ul>
                                    <li>One</li>
                                    <li>Two</li>
                                    <li>Three</li>
                                </ul>
                            }
                        />
                    </Menu>
                </div>
                <Navigation>
                    <div className="container">
                        <NavigationList>
                            <NavigationItem href="#" text="Kategoria 1" dropdown={true} />
                            <NavigationItem href="#" text="Kategoria 2" dropdown={true} />
                            <NavigationItem href="#" text="Kategoria 3" dropdown={true} />
                            <NavigationItem href="#" text="Kategoria 4" dropdown={true} />
                        </NavigationList>
                    </div>
                </Navigation>
            </Header>
            <div className="container">
                <Carousel items={data} />
                <Outlet />
            </div>
        </>
    );
};

export default Homepage;
