import React from 'react';
import './social.scss';

// type Props = {};

const Social = () => {
  return (
    <div className='social'>
      <div className='container'>
        <div className='social-flex'>
          <div className='social-col col-35'>
            <div className='channel'>
              <div className='channel-drop'>@ Mentions</div>
              <div className='channel-list'>
                <div className='item'>
                  <span className='txt-name'>SPACES</span>
                  <div className='channel-drop active'>#    General</div>
                </div>
              </div>
            </div>
          </div>
          <div className='social-col col-55'>
            <div className='post'>
              <div className='post-name'>
                <h3 className='title'># General</h3>
              </div>
              <div className='post-content'>
                <div className='post-input'>
                  <div className='avatar'>
                    <img src='' alt='' />
                  </div>
                  <div className='input'>
                    <input type='text' placeholder='Type your message, share images, ask questions' />
                  </div>
                </div>
                <div className='post-support'>
                  <div className='post-icon'>
                    <div className='icon icon-aA'>
                      <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' color='#4a4a4a' className=''>
                        <path
                          fill='currentColor'
                          fill-rule='evenodd'
                          d='M6.941 3.952c-.459-1.378-2.414-1.363-2.853.022l-4.053 12.8a.75.75 0 001.43.452l1.101-3.476h6.06l1.163 3.487a.75.75 0 101.423-.474l-4.27-12.81zm1.185 8.298L5.518 4.427 3.041 12.25h5.085zm6.198-5.537a4.74 4.74 0 013.037-.081A3.743 3.743 0 0120 10.208V17a.75.75 0 01-1.5 0v-.745a7.971 7.971 0 01-2.847 1.355 2.998 2.998 0 01-3.15-1.143C10.848 14.192 12.473 11 15.287 11H18.5v-.792c0-.984-.641-1.853-1.581-2.143a3.24 3.24 0 00-2.077.056l-.242.089a2.222 2.222 0 00-1.34 1.382l-.048.145a.75.75 0 01-1.423-.474l.048-.145a3.722 3.722 0 012.244-2.315l.243-.09zM18.5 12.5h-3.213c-1.587 0-2.504 1.801-1.57 3.085.357.491.98.717 1.572.57a6.47 6.47 0 002.47-1.223l.741-.593V12.5z'
                          stroke='currentColor'
                          stroke-width='.1'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        ></path>
                      </svg>
                    </div>
                    <div className='icon icon-emoji'>
                      <svg viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' className=''>
                        <path
                          d='M11.514 11.514a3.556 3.556 0 01-5.028 0m-.153-4.292h.01m5.324 0h.009M17 9A7.999 7.999 0 111.002 9 7.999 7.999 0 0117 9z'
                          stroke='currentColor'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        ></path>
                      </svg>
                    </div>
                    <div className='icon icon-member'>
                      <svg viewBox='3 3 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' className=''>
                        <path
                          d='M15.556 12a3.555 3.555 0 10-7.111 0 3.555 3.555 0 007.11 0zm0 0v1.333a2.223 2.223 0 104.444 0V12a8 8 0 10-4 6.928'
                          stroke='currentColor'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        ></path>
                      </svg>
                    </div>
                    <div className='icon icon-photo'>
                      <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className=''>
                        <path
                          d='M2 17l5.732-5.732a2.5 2.5 0 013.535 0L17 17m-2.5-2.5l1.983-1.982a2.5 2.5 0 013.534 0L22 14.5M14.5 7h.012M4.5 22h15a2.5 2.5 0 002.5-2.5v-15A2.5 2.5 0 0019.5 2h-15A2.5 2.5 0 002 4.5v15A2.5 2.5 0 004.5 22z'
                          stroke='currentColor'
                          stroke-width='1.875'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        ></path>
                      </svg>
                    </div>
                    <div className='icon icon-file'>
                      <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className=''>
                        <path
                          d='M8.571 12h6.857m-6.857 4.572h6.857m2.286 5.714H6.286A2.286 2.286 0 014 20V4a2.286 2.286 0 012.286-2.285h6.383c.304 0 .594.12.808.335l6.188 6.187c.214.214.335.505.335.808V20a2.285 2.285 0 01-2.286 2.286z'
                          stroke='currentColor'
                          stroke-width='1.929'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        ></path>
                      </svg>
                    </div>
                    <div className='icon icon-poll'>
                      <svg viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' className=''>
                        <path
                          d='M11.617 17.078V1.922a1 1 0 00-1-1H7.23a1 1 0 00-1 1v15.156m5.386 0l-.002-9.062a1 1 0 011-1H16a1 1 0 011 1v8.062a1 1 0 01-1 1h-4.383zm0 0H6.23m0 0v-4.333a1 1 0 00-1-1H2a1 1 0 00-1 1v3.333a1 1 0 001 1h4.231z'
                          stroke='currentColor'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <button type='submit' className='post-submit'>
                    <a href='#'>Share</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='social-col col-3'>
            <div className='user-active'>
              <div className='user-active-search'>
                <input className='search' type='Search' placeholder='search for posts' />
                <div className='icon-search'>
                  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className=''>
                    <g clip-path='url(#clip0_1042_13179)'>
                      <path
                        d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z'
                        fill='currentColor'
                      ></path>
                    </g>
                    <defs>
                      <clipPath id='clip0_1042_13179'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className='user-active-content'>
                <h3 className='title'>Online members in space</h3>
                <div className='divedi'></div>
                <div className='user-active-list'>
                  <div className='item'>
                    <div className='avatar'>
                      <img src='' alt='' />
                    </div>
                    <h4 className='name'>Le Van Hieu</h4>
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

export default Social;
