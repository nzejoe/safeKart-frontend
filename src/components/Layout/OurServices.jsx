import React from 'react'
// icons
import { BsTruck, BsArchive, BsShieldCheck, BsHeadset } from "react-icons/bs";
// style
import styles from './OurServices.module.css'

const OurServices = () => {
    return (
      <section className={`section ${styles.our__services}`}>
        <div className="section__wrapper">
          <div className={styles.services}>
            <div className={styles.service}>
              <div className={styles.icon__container}>
                <BsTruck className={styles.icon}/>
              </div>
              <div className="info">
                <h5>Nationwide Shipping</h5>
                <p>Get free shipping over $75</p>
              </div>
            </div>
            <div className={styles.service}>
              <div className={styles.icon__container}>
                <BsArchive className={styles.icon}/>
              </div>
              <div className="info">
                <h5>Free Returns</h5>
                <p>30 days free return policy</p>
              </div>
            </div>
            <div className={styles.service}>
              <div className={styles.icon__container}>
                <BsShieldCheck className={styles.icon}/>
              </div>
              <div className="info">
                <h5>Secured Payments</h5>
                <p>Accept major credit cards</p>
              </div>
            </div>
            <div className={styles.service}>
              <div className={styles.icon__container}>
                <BsHeadset className={styles.icon}/>
              </div>
              <div className="info">
                <h5>Support Service</h5>
                <p>Top notch customer service</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default OurServices;
