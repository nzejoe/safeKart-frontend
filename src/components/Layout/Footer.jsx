import React from "react";
import { Link } from "react-router-dom";
// icons
import {
  BsFacebook,
  BsTwitter,
  BsPinterest,
  BsInstagram,
  BsYoutube,
  BsCodeSlash,
} from "react-icons/bs";
// style
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`section ${styles.footer}`}>
      <div className={styles.items}>
        <div className={styles.item}>
          <h3>contact us</h3>
          <div className={styles.contact}>
            <p>No 3 Ademola Street Off Awolowo Rd.</p>
            <p>Lagos, Nigeria</p>
            <p>Phone: +2348064547029</p>
            <p>Email: jonathannzete@gmail.com</p>
          </div>
        </div>
        <div className={styles.item}>
          <h3>information</h3>
          <div className={styles.links}>
            <Link to="" className={styles.link}>
              Terms &amp; Conditions
            </Link>
            <Link to="" className={styles.link}>
              Privacy Policy
            </Link>
            <Link to="" className={styles.link}>
              Support
            </Link>
            <Link to="" className={styles.link}>
              FAQ
            </Link>
          </div>
        </div>
        <div className={styles.item}>
          <h3>about us</h3>
          <div className={styles.about__links}>
            <Link to="" className={styles.link}>
              Our company
            </Link>
            <Link to="" className={styles.link}>
              Our History
            </Link>
            <Link to="" className={styles.link}>
              Blog
            </Link>
          </div>
        </div>
        <div className={styles.item}>
          <h3>follow us</h3>
          <div className={styles.icons}>
            <BsFacebook className={styles.icon} />{" "}
            <BsTwitter className={styles.icon} />{" "}
            <BsPinterest className={styles.icon} />{" "}
            <BsInstagram className={styles.icon} />{" "}
            <BsYoutube className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.credit}>
        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} <span>SafeKart</span> powered by {" "}
            <span className={styles.power__by}>
              {" "}
              codeGenesis
              <BsCodeSlash className={styles.code__icon}/>
            </span>
          </p>
        </div>
        <div className={styles.misc}>
          <img src="images/misc/payment-paypal.png" alt="" />
          <img src="images/misc/payments.png" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
