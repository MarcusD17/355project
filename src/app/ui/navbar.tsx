import NavbarIcon from "@/app/ui/navbar-icons";
import LogoIcon from "@/app/ui/logo-icons";
import {RiAccountCircleLine} from "react-icons/ri";
import {RiShoppingCartLine } from "react-icons/ri";
import { BiLogoStripe } from "react-icons/bi";


export default function Navbar() {
    return (
        <div className="fixed left-0 right-0 w-15 m-5 p-3 flex bg-blue-500 rounded-lg shadow-2xl
        text-white ">
            <div className="flex items-center mr-auto">
                <i className="mr-4">
                    <LogoIcon icon={<BiLogoStripe size="28"/>}/>
                </i>
            </div>
            <div className="flex items-center ">
                <i className="mr-4">
                    <NavbarIcon icon={<RiAccountCircleLine size="28"/>}/>
                </i>
                <i className="mr-16">
                    <NavbarIcon icon={<RiShoppingCartLine size="28"/>}/>
                </i>
            </div>
        </div>

    );
}