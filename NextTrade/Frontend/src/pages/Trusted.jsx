import React, { useState, useEffect } from 'react';
import style from './Trusted.module.css'

const Trusted = () => {
  const [num, setNum] = useState({
    a: 0,
    b: 0,
    c: 0,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setNum({
        a: Math.floor(Math.random() * 10),
        b: Math.floor(Math.random() * 10),
        c: Math.floor(Math.random() * 10),
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    
    <div className={style.trustsection}>
      
      <p className={style.trustlabel}>JOIN THE REVOLUTION</p>
      <h1 className={style.trustheading}>
        Trusted by 1,3{num.a},8{num.b},5{num.c}6+ Indians
      </h1>
    </div>
  );
};

export default Trusted;