import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import CurvedNav from "./design/CurvedNav";
import { useState } from "react";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[90%] max-w-[1000px] z-50 rounded-full border border-n-6/30 lg:bg-n-8/90 lg:backdrop-blur-md ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-md"
      }`}
    >
      <CurvedNav />
      <div className="flex items-center px-4 lg:px-5 xl:px-6 py-0.5 max-lg:py-1">
        <a className="block w-[8rem] xl:mr-6" href="#hero">
          <img src={brainwave} width={120} height={25} alt="Aveon AI" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[3.5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent z-50 rounded-2xl border border-n-6/30 backdrop-blur-md max-lg:p-4`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-5 py-5 md:py-6 lg:py-1.5 lg:-mr-0.25 lg:text-[0.65rem] lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/80"
                } lg:leading-5 lg:hover:text-n-1 xl:px-4`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>



        <Button
          className="ml-auto lg:hidden py-1.5"
          px="px-2"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
