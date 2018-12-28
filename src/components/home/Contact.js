import React from 'react';
// import ReactGA from 'react-ga';

import './Contact.css';
import emailIcon from '../../images/envelopeWhite.svg';
import githubIcon from '../../images/githubWhite.svg';
import spinner from '../../images/spinner.svg';

const initialFormData = {
  name: '',
  email: '',
  message: ''
};

class Contact extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      formData: initialFormData,
      formSuccess: false,
      formFailure: false,
      loading: false
    };
  }

  onUpdateState = (event) => {
    const { target } = event;
    this.setState({
      formData: {
        ...this.state.formData,
        [target.name]: target.value
      }
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.formSuccess || this.state.formFailure || this.state.loading) {
      // Don't do anything when button is clicked
      return;
    }
    this.setState({ loading: true, formFailure: false, formSuccess: false });
    
    return fetch(process.env.GATSBY_AWS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(this.state.formData)
    })
    .then(response => {
      // console.log(response);
      this.setState({
        formData: initialFormData, 
        formSuccess: true,
        loading: false
      });
    })
    .catch(err => {
      console.log(err);
      this.setState({
        formData: initialFormData, 
        formFailure: true,
        loading: false
      });
    });
  }

  render() {
    const { reference } = this.props;
    const { name, email, message } = this.state.formData;
    const { loading, formSuccess, formFailure } = this.state;

    const loadingClass = loading
      ? "loading"
      : "";
    
    const successClass = formSuccess
      ? "success"
      : "";
    
    const failureClass = formFailure
      ? "failure"
      : "";

    let buttonText = "Send Message";
    if(formSuccess) {
      buttonText =  "Message Sent!"
    }
    if(formFailure) {
      buttonText =  "Message failed!"
    }

    return (
      <div className="contact" ref={reference} id="contact">
        <h2>Contact Me</h2>
        <p>If you want to discuss your project just send me an email or leave a message with the contact form below.</p>
  
        <form className="contactForm">
          <div className="contactFormInputBlock">
            <input
              onChange={this.onUpdateState}
              value={name}
              placeholder="Name"
              type="text"
              name="name"
              id="name"
            />
          </div>

          <div className="contactFormInputBlock">
            <input
              onChange={this.onUpdateState}
              value={email}
              placeholder="Email"
              type="text"
              name="email"
              id="email"
            />
          </div>

          <div className="contactFormInputBlock">
            <textarea
              onChange={this.onUpdateState}
              rows={4}
              value={message}
              placeholder="Message"
              name="message"
              id="message"
            />
          </div>

          <div onClick={this.onSubmit} className="buttonBaseC">
            <div className="buttonC">
              <span className={`buttonTextC ${loadingClass} ${successClass} ${failureClass}`}>
                {buttonText}
              </span>
              <div className={`buttonIconC ${loadingClass}`}>
                <img src={spinner} alt="" />
              </div>
            </div>
            <div className="buttonBottomC" />
            <div className={`buttonBottomVarC ${loadingClass} ${successClass} ${failureClass}`} />
          </div>
         
        </form>
  
        <div className="contactItem">
          <h3 className="contactSpan">Email</h3>
          <div>
            <a className="contactLink" href="mailto:michael@michaelthompson.me">
              michael@michaelthompson.me
            </a>
          </div>
        </div>
  
        <div className="contactItem">
          <h3 className="contactSpan">Links</h3>
          <div>
            <a
              className="contactLink"
              href="mailto:michael@michaelthompson.me"
              // onClick={() => {
              //   ReactGA.event({
              //     category: 'Contact',
              //     action: 'Clicked Email Link'
              //   })
              // }}
            >
              <img src={emailIcon} width="32px" alt="" />
            </a>
            <a
              className="contactLink"
              href="https://github.com/mthom26"
              // onClick={() => {
              //   ReactGA.event({
              //     category: 'Github',
              //     action: 'Clicked Main Github Link'
              //   })
              // }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} width="32px" alt="" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact;