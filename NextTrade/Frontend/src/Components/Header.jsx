import React from "react";
import { Link } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";

import style from "./Header.module.css";
import useTheme from "../Context/ThemeContext";
import ToggleTheme from "./Toggle";

const Header = () => {
  const { darkmode, toggleDarkmode } = useTheme();

  return (
    <div className={style.navbar}>
      {/* LOGO */}
      <div className={style.brand}>
        <Link className={style.link} to="/">
          NexTrade
        </Link>
      </div>

      <nav>
        <ul>
          {/* STOCKS */}
          <li className={style.navItem}>
            <div className={style.navTrigger}>
              <span>Stocks</span>
              <RiArrowDownSLine className={style.arrow} />
            </div>

            <div className={style.dropdown}>
              <div className={style.dropdownCard}>
                <h4>US Stocks</h4>
                <p>
                  Invest in Apple, Tesla, Nvidia and global companies.
                </p>
              </div>

              <div className={style.dropdownCard}>
                <h4>Top Gainers</h4>
                <p>
                  Discover today’s strongest performing market movers.
                </p>
              </div>

              <div className={style.dropdownCard}>
                <h4>AI Insights</h4>
                <p>
                  Smart trading analysis powered by real-time data.
                </p>
              </div>
            </div>
          </li>

          {/* F&O */}
          <li className={style.navItem}>
            <div className={style.navTrigger}>
              <span>F&O</span>
              <RiArrowDownSLine className={style.arrow} />
            </div>

            <div className={style.dropdown}>
              <div className={style.dropdownCard}>
                <h4>Options Trading</h4>
                <p>
                  Trade calls and puts with advanced option chains.
                </p>
              </div>

              <div className={style.dropdownCard}>
                <h4>Futures Market</h4>
                <p>
                  Access index and stock futures with low latency.
                </p>
              </div>

              <div className={style.dropdownCard}>
                <h4>Risk Analytics</h4>
                <p>
                  Monitor exposure and volatility before entering trades.
                </p>
              </div>
            </div>
          </li>

          {/* MUTUAL FUNDS */}
          <li className={style.navItem}>
            <div className={style.navTrigger}>
              <span>Mutual Funds</span>
              <RiArrowDownSLine className={style.arrow} />
            </div>

            <div className={style.dropdown}>
              <div className={style.dropdownCard}>
                <h4>SIP Investing</h4>
                <p>
                  Build wealth consistently with automated SIP plans.
                </p>
              </div>

              <div className={style.dropdownCard}>
                <h4>Top Rated Funds</h4>
                <p>
                  Explore high-performing equity and hybrid funds.
                </p>
              </div>

              <div className={style.dropdownCard}>
                <h4>Retirement Planning</h4>
                <p>
                  Long-term investment strategies for future growth.
                </p>
              </div>
            </div>
          </li>
        </ul>

        {/* BUTTONS */}
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
  );
};

export default Header;