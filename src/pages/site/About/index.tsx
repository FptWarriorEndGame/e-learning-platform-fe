import './About.scss';
const About = () => {
  return (
    <div className='about'>
      <div className='about__intro'>
        <div className='about__intro-header'>
          <div className='container'>
            <h2 className='about__title sec-com-tt'>About Us Page</h2>
            <p className='abou-desc'>
              We are education organizations for helping students more grow up.
              <br />
              With technology and modern methods, we confidently are able to create more things for the worlds
            </p>
          </div>
        </div>
        <div className='about__intro-content'>
            <div className="container">
          <h3 className='about__sub-title'>Our Team</h3>
          <div className='about__intro-list'>
            <div className='wrapper'>
              <div className='profile-card js-profile-card'>
                <div className='profile-card__img'>
                  <img
                    src='https://i.imgur.com/m1mfn55.jpeg'
                    alt='profile card'
                  />
                </div>

                <div className='profile-card__cnt js-profile-cnt'>
                  <div className='profile-card__name'>Le Van Hieu</div>
                  <div className='profile-card__txt'>
                    Front-end Developer from <strong>Mona</strong>
                  </div>
                  <div className='profile-card-loc'>
                    <span className='profile-card-loc__icon'>
                      <svg className='icon'>
                        <use xlinkHref='#icon-location'></use>
                      </svg>
                    </span>

                    <span className='profile-card-loc__txt'>Tan Phu, Viet Nam</span>
                  </div>

                  <div className='profile-card-inf'>
                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>15</div>
                      <div className='profile-card-inf__txt'>Followers</div>
                    </div>


                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>12</div>
                      <div className='profile-card-inf__txt'>Articles</div>
                    </div>

                  </div>

                  <div className='profile-card-social'>
                    <a
                      href='https://www.facebook.com/profile.php?id=100017056068787'
                      className='profile-card-social__item facebook'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://i.imgur.com/zik404q.png' className='icon icon-fb'/>
                      </span>
                      </span>
                    </a>


                    <a
                      href='https://github.com/LeVanHieu2305'
                      className='profile-card-social__item github'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png' className='icon'/>
                      </span>
                      </span>
                    </a>

                  </div>

                </div>

                <div className='profile-card-message js-message'>
                  <form className='profile-card-form'>
                    <div className='profile-card-form__container'>
                      <textarea placeholder='Say something...'></textarea>
                    </div>

                    <div className='profile-card-form__bottom'>
                      <button className='profile-card__button button--blue js-message-close'>Send</button>

                      <button className='profile-card__button button--gray js-message-close'>Cancel</button>
                    </div>
                  </form>

                  <div className='profile-card__overlay js-message-close'></div>
                </div>
              </div>
            </div>
            <div className='wrapper'>
              <div className='profile-card js-profile-card'>
                <div className='profile-card__img'>
                  <img
                    src='https://i.imgur.com/GXg4rNu.jpeg'
                    alt='profile card'
                  />
                </div>

                <div className='profile-card__cnt js-profile-cnt'>
                  <div className='profile-card__name'>Tran Nhat Sang</div>
                  <div className='profile-card__txt'>
                    FullStack from <strong>FPT Software</strong>
                  </div>
                  <div className='profile-card-loc'>
                    <span className='profile-card-loc__icon'>
                      <svg className='icon'>
                        <use xlinkHref='#icon-location'></use>
                      </svg>
                    </span>

                    <span className='profile-card-loc__txt'>Binh Duong, Viet Nam</span>
                  </div>

                  <div className='profile-card-inf'>
                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>2593</div>
                      <div className='profile-card-inf__txt'>Followers</div>
                    </div>


                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>473</div>
                      <div className='profile-card-inf__txt'>Articles</div>
                    </div>

                  </div>

                  <div className='profile-card-social'>
                    <a
                      href='https://www.facebook.com/trannhatsang910'
                      className='profile-card-social__item facebook'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://i.imgur.com/zik404q.png' className='icon icon-fb'/>
                      </span>
                      </span>
                    </a>


                    <a
                      href='https://github.com/sangtrandev00'
                      className='profile-card-social__item github'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png' className='icon'/>
                      </span>
                      </span>
                    </a>

                  </div>

                </div>

                <div className='profile-card-message js-message'>
                  <form className='profile-card-form'>
                    <div className='profile-card-form__container'>
                      <textarea placeholder='Say something...'></textarea>
                    </div>

                    <div className='profile-card-form__bottom'>
                      <button className='profile-card__button button--blue js-message-close'>Send</button>

                      <button className='profile-card__button button--gray js-message-close'>Cancel</button>
                    </div>
                  </form>

                  <div className='profile-card__overlay js-message-close'></div>
                </div>
              </div>
            </div>
            <div className='wrapper'>
              <div className='profile-card js-profile-card'>
                <div className='profile-card__img'>
                  <img
                    src='https://i.imgur.com/3BSKIoA.jpeg'
                    alt='profile card'
                  />
                </div>

                <div className='profile-card__cnt js-profile-cnt'>
                  <div className='profile-card__name'>Hai Nguyen</div>
                  <div className='profile-card__txt'>
                    FullStack from <strong>FPT Telecom</strong>
                  </div>
                  <div className='profile-card-loc'>
                    <span className='profile-card-loc__icon'>
                      <svg className='icon'>
                        <use xlinkHref='#icon-location'></use>
                      </svg>
                    </span>

                    <span className='profile-card-loc__txt'>Go Vap, Viet Nam</span>
                  </div>

                  <div className='profile-card-inf'>
                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>43</div>
                      <div className='profile-card-inf__txt'>Followers</div>
                    </div>


                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>64</div>
                      <div className='profile-card-inf__txt'>Articles</div>
                    </div>

                  </div>

                  <div className='profile-card-social'>
                    <a
                      href='https://www.facebook.com/IAmNguyenNgocHai'
                      className='profile-card-social__item facebook'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://i.imgur.com/zik404q.png' className='icon icon-fb'/>
                      </span>
                      </span>
                    </a>


                    <a
                      href='https://github.com/ngochai68'
                      className='profile-card-social__item github'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png' className='icon'/>
                      </span>
                      </span>
                    </a>

                  </div>

                </div>

                <div className='profile-card-message js-message'>
                  <form className='profile-card-form'>
                    <div className='profile-card-form__container'>
                      <textarea placeholder='Say something...'></textarea>
                    </div>

                    <div className='profile-card-form__bottom'>
                      <button className='profile-card__button button--blue js-message-close'>Send</button>

                      <button className='profile-card__button button--gray js-message-close'>Cancel</button>
                    </div>
                  </form>

                  <div className='profile-card__overlay js-message-close'></div>
                </div>
              </div>
            </div>

            <div className='wrapper'>
              <div className='profile-card js-profile-card'>
                <div className='profile-card__img'>
                  <img
                    src='https://i.imgur.com/ch3gsRi.jpeg'
                    alt='profile card'
                  />
                </div>

                <div className='profile-card__cnt js-profile-cnt'>
                  <div className='profile-card__name'>Trung Tran</div>
                  <div className='profile-card__txt'>
                    FullStack from <strong>Google</strong>
                  </div>
                  <div className='profile-card-loc'>
                    <span className='profile-card-loc__icon'>
                      <svg className='icon'>
                        <use xlinkHref='#icon-location'></use>
                      </svg>
                    </span>

                    <span className='profile-card-loc__txt'>Tan Phu, Viet Nam</span>
                  </div>

                  <div className='profile-card-inf'>
                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>15</div>
                      <div className='profile-card-inf__txt'>Followers</div>
                    </div>


                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>443</div>
                      <div className='profile-card-inf__txt'>Articles</div>
                    </div>

                  </div>

                  <div className='profile-card-social'>
                    <a
                      href='https://www.facebook.com/quoctrung1905'
                      className='profile-card-social__item facebook'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://i.imgur.com/zik404q.png' className='icon icon-fb'/>
                      </span>
                      </span>
                    </a>


                    <a
                      href='https://github.com/trungqt1905'
                      className='profile-card-social__item github'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png' className='icon'/>
                      </span>
                      </span>
                    </a>

                  </div>

                </div>

                <div className='profile-card-message js-message'>
                  <form className='profile-card-form'>
                    <div className='profile-card-form__container'>
                      <textarea placeholder='Say something...'></textarea>
                    </div>

                    <div className='profile-card-form__bottom'>
                      <button className='profile-card__button button--blue js-message-close'>Send</button>

                      <button className='profile-card__button button--gray js-message-close'>Cancel</button>
                    </div>
                  </form>

                  <div className='profile-card__overlay js-message-close'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default About;
