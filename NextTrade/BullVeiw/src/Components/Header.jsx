import React from "react";
import { Link } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import Down from "./Down/Down";
import style from "./Header.module.css";
import useTheme from "../context/ThemeContext";
import ToggleTheme from "./toggle";

const Header = () => {
  const { darkmode, toggleDarkmode } = useTheme();

  return (
    <>
      <div className={style.navbar}>
        <div className={style.brand}>
          <Link className={style.link} to="/">
            NexTrade
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link className={style.link} to="/">
                <Down
                  text="Stocks"
                  icon={<RiArrowDownSLine />}
                  className={style.downLink}
                />
              </Link>
            </li>

            <li>
              <Link className={style.link} to="/">
                <Down
                  text="F&O"
                  icon={<RiArrowDownSLine />}
                  className={style.downLink}
                />
              </Link>
            </li>

            <li>
              <Link className={style.link} to="/">
                <Down
                  text="Mutual Funds"
                  icon={<RiArrowDownSLine />}
                  className={style.downLink}
                />
              </Link>
            </li>
          </ul>
         
          <div className={style.button}>
            <ToggleTheme />
            <Link className={style.link} to="/login">
              <button>Login</button>
            </Link>

            <Link className={style.link} to="/signup">
              <button>Signup</button>
            </Link>
            
          </div>
          
        </nav>
      </div>
    </>
  );
};

export default Header;
