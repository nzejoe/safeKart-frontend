import React from 'react'
// style
import styles from './PromoOffer.module.css'

const PromoOffer = () => {
    return (
      <section className={`section ${styles.section__promo}`}>
        <div className="section__wrapper">
          <div className={styles.promo}>
            <h2>@safekart</h2>
            <h1>Up to 35% off on all items.</h1>
            <p>Last chance to take advantage of our discounts!</p>
            <form onSubmit={(e)=>e.preventDefault()}>
              <input type="email" name="" id=""  placeholder='Your email address'/>
              <button type="submit">subscribe</button>
            </form>
          </div>
        </div>
      </section>
    );
}

export default PromoOffer
