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
                    src='https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/286505800_1110985359479989_7958277310651194368_n.jpg?stp=dst-jpg_s320x320&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFT1VfiIzsQTxSGt4f2nHNF2Tmrm56p3L_ZOaubnqncv_WeB-FOvSBYsRefRUjubeByWK53t7HsBrkiFdOtEP-5&_nc_ohc=O9xzAt9qRhQAX8y3UU1&_nc_oc=AdiHUzZFVl3exjalz96SheyUr8I26FINqNtON3068PUinOQ_-pwQWUEEXFU0evBRHSw6_KumiaeHpCLOmhcnaO3q&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfC9gDWfTX3hjCwSXs-tA6jL9Cu6SFLiWpqxJA57indDxg&oe=66025285'
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
                      <div className='profile-card-inf__title'>5</div>
                      <div className='profile-card-inf__txt'>Following</div>
                    </div>

                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>12</div>
                      <div className='profile-card-inf__txt'>Articles</div>
                    </div>

                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>85</div>
                      <div className='profile-card-inf__txt'>Works</div>
                    </div>
                  </div>

                  <div className='profile-card-social'>
                    <a
                      href='https://www.facebook.com/#'
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
                      href='https://github.com/muhammederdem'
                      className='profile-card-social__item github'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png' className='icon'/>
                      </span>
                      </span>
                    </a>

                    <a href='http://muhammederdem.com.tr/' className='profile-card-social__item link' target='_blank'>
                      <span className='icon-font'>
                        <img src='https://i.imgur.com/yROcq3s.png' className='icon'/>
                      </span>
                    </a>
                  </div>

                  <div className='profile-card-ctr'>
                    <button className='profile-card__button button--blue js-message-btn'>Contact</button>
                    <button className='profile-card__button button--orange'>Follow</button>
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
                    src='https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/393312891_1002887400933831_4098445887915139729_n.jpg?stp=c0.64.320.320a_dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFiUbzDDfAQwKzi_L25pEN870L3xEGeXyrvQvfEQZ5fKtXQbC2kVGXHoEZ30T0OuZIjmZg2NDsy2mHOcQZLSEuE&_nc_ohc=52-RP-r5nPAAX8Vx0V_&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfBMVPDj1GzNWDzHNtg_B8xzK6a9umQ1mMjQUYHo5UWGdA&oe=660243EC'
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
                      <div className='profile-card-inf__title'>110</div>
                      <div className='profile-card-inf__txt'>Following</div>
                    </div>

                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>473</div>
                      <div className='profile-card-inf__txt'>Articles</div>
                    </div>

                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>111</div>
                      <div className='profile-card-inf__txt'>Works</div>
                    </div>
                  </div>

                  <div className='profile-card-social'>
                    <a
                      href='https://www.facebook.com/#'
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
                      href='https://github.com/muhammederdem'
                      className='profile-card-social__item github'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png' className='icon'/>
                      </span>
                      </span>
                    </a>

                    <a href='http://muhammederdem.com.tr/' className='profile-card-social__item link' target='_blank'>
                      <span className='icon-font'>
                        <img src='https://i.imgur.com/yROcq3s.png' className='icon'/>
                      </span>
                    </a>
                  </div>

                  <div className='profile-card-ctr'>
                    <button className='profile-card__button button--blue js-message-btn'>Contact</button>
                    <button className='profile-card__button button--orange'>Follow</button>
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
                    src='https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-1/241392872_1333066283778897_6363792053543946154_n.jpg?stp=dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHbI_tDtnV-LGstiAQitCGaTt9LY9sPL0NO30tj2w8vQ_g4F-DN7eB2wiChsJmg51PoVyUupU8cbCZcC9wj7hSw&_nc_ohc=KQMqNbxKqC4AX8H4Snp&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfD4ln-z3pRfs_jKebgYpT7YPZushqDL6xGe4uaJkT1Y0A&oe=66032214'
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
                      <div className='profile-card-inf__title'>14</div>
                      <div className='profile-card-inf__txt'>Following</div>
                    </div>

                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>64</div>
                      <div className='profile-card-inf__txt'>Articles</div>
                    </div>

                    <div className='profile-card-inf__item'>
                      <div className='profile-card-inf__title'>65</div>
                      <div className='profile-card-inf__txt'>Works</div>
                    </div>
                  </div>

                  <div className='profile-card-social'>
                    <a
                      href='https://www.facebook.com/#'
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
                      href='https://github.com/muhammederdem'
                      className='profile-card-social__item github'
                      target='_blank'
                    >
                      <span className='icon-font'>
                      <span className='icon-font'>
                        <img src='https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png' className='icon'/>
                      </span>
                      </span>
                    </a>

                    <a href='http://muhammederdem.com.tr/' className='profile-card-social__item link' target='_blank'>
                      <span className='icon-font'>
                        <img src='https://i.imgur.com/yROcq3s.png' className='icon'/>
                      </span>
                    </a>
                  </div>

                  <div className='profile-card-ctr'>
                    <button className='profile-card__button button--blue js-message-btn'>Contact</button>
                    <button className='profile-card__button button--orange'>Follow</button>
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
