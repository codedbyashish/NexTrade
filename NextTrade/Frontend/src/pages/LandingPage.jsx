import React from "react";
import style from "./landingPage.module.css";
import Header from "../Components/Header";
import Trusted from "./Trusted";
import Explore from './Cards'
import InvestmentCards from "./Cards";
import Sip from "./Sip";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <>
    <Header/>
    <div className={style.hero}>
      <div className={style.heroInner}>
        <div className={style.leftContent}>
          <div className={style.inv}>
            <li className={style.dot}></li>
            <p>#1 RATED INVESTMENT APP IN INDIA</p>
          </div>

          <div className={style.mainContent}>
            <h2>
              NexTrade{" "}
              <span>
                your <br /> wealth
              </span>
            </h2>
          </div>

          <div className={style.smallpara}>
            <p>
              India's fastest growing investing platform. Stocks, Mutual Funds,
              F&O — all in one powerful terminal.
            </p>
          </div>

          <div className={style.btnRow}>
            <Link className={style.link} to="/login">
            <button className={style.btnPrimary}>Get started</button>
            </Link>
            <button className={style.btnSecondary}>▶ Watch Demo</button>
          </div>
        </div>

        <div className={style.page}>
          <div className={style.ticker}>
            <span className={style.dots}>
              <span className={style.red}></span>
              <span className={style.yellow}></span>
              <span className={style.green}></span>
            </span>
            <p>MARKET OPEN • NIFTY 50: 22,453.80 (+0.45%)</p>
          </div>

          <hr className={style.divider} />

          <div className={style.banner}></div>

          <div className={style.cardRow}>
            <div className={style.cardLeft}>
              <div className={style.cardImageArea}></div>
            </div>
            <div className={style.cardRight}></div>
          </div>

          <div className={style.cardWide}>
            <span className={style.chartIcon}>📈</span>
          </div>
        </div>
      </div>
    </div>
    <Trusted/>
    <InvestmentCards/>
    <Sip/>
    <Footer/>
     </>
  );
};

export default LandingPage;