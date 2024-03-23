import React from 'react';
import './SubscribeEmail.scss';
export default function SubscribeEmail() {
  return (
    <div className='subscribeemail'>
      <div className='container'>
        <div className='subscribeemail-list'>
          <div className='subscribeemail-item'>
            <p className='subscribeemail-mess'>JOIN THE COMMUNITY</p>
            <h2 className='subscribeemail-title'>Stay current. Subscribe to our newsletter.</h2>
            <form action='' className='subscribeemail-box'>
              <div className='subscribeemail-input'>
                <input type='email' name='' id='' placeholder='Email address' />
              </div>
              <div className='subscribeemail-submit'>
                <button className='btn' type='submit'>
                  Join us now!
                </button>
              </div>
            </form>
            <p className='subscribeemail-desc'>
              Our weekly email newsletter, is an indispensable weekly digest of the latest updates on industry insights,
              latest news and opportunities.
              <br />
              <br />
              Anyone can subscribe. Just fill in your email address above. It's easy to unsubscribe or change your
              preferences whenever you wish.
            </p>
          </div>
          <div className='subscribeemail-item'>
            <div className='subscribeemail-img'>
              <img src='https://i.imgur.com/Ufc9Fxj.png' alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className='learnworlds-divider-wrapper on-bottom js-learnworlds-divider js-learnworlds-divider-bottom js-learnworlds-divider-triangle -learnworlds-divider-triangle lw-light-fill'>
        <svg
          className='learnworlds-divider'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1000 100'
          preserveAspectRatio='none'
        >
          <path className='learnworlds-divider-fill js-learnworlds-divider-fill' d='M0,6V0h1000v100L0,6z'></path>
        </svg>
      </div>
    </div>
  );
}
