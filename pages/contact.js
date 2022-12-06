import ContactForm from "../components/ContactUs/ContactForm/ContactForm";
import ContactUs from "../components/ContactUs/ContactUs/ContactUs";

import Footer from "../components/Layout/Footer/Footer";

import Navbar from "../components/Layout/Navbar/Navbar";

const Contact = () => {
  const colour = "transparent";

  return (
    <div>
      <div className="contact">
        <Navbar colour={colour} />
        <ContactUs />
      </div>
      <ContactForm />

      <Footer />
    </div>
  );
};

export default Contact;
