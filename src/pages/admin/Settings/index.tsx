import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './setting.scss';
const Settings = () => {
  return (
    <div className='setting'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Settings'
            },
            {
              title: <Link to='#'>Settings</Link>
            }
            
          ]}
        />
      </div>
      <div className='setting-flex'>
        <div className='setting-col col-7'>
          <section className='modify-profile'>
            <form action=''>
              <h1 className='title'>My account</h1>
              <div className='form-container'>
                <div className='form-block'>
                  <div className='form-item'>
                    <div className='item avatar-w'>
                      <label htmlFor='avatar'>Avatar</label>
                      <input type='file' name='avatar' id='avatar' />
                    </div>
                    <div className='item firstname'>
                      <label htmlFor='firstname'>First Name</label>
                      <input type='text' name='firstname' id='firstname' />
                    </div>
                  </div>
                  <div className='form-item'>
                    <div className='item lastname'>
                      <label htmlFor='lastname'>Last Name</label>
                      <input type='text' name='lastname' id='lastname' />
                    </div>
                    <div className='item firstname'>
                      <label htmlFor='firstname'>First Name</label>
                      <input type='text' name='firstname' id='firstname' />
                    </div>
                  </div>
                  <div className='form-item'>
                    <div className='item email'>
                      <label htmlFor='email'>Email</label>
                      <input type='email' name='email' id='email' />
                    </div>
                    <div className='item phone'>
                      <label htmlFor='phone'>Phone</label>
                      <input type='tel' name='phone' id='phone' />
                    </div>
                  </div>
                  <div className='form-item'>
                    <div className='item address'>
                      <label htmlFor='address'>Adresse</label>
                      <input type='text' name='address' id='address' />
                    </div>
                    <div className='item company'>
                      <label htmlFor='company'>Company</label>
                      <input type='text' name='company' id='company' />
                    </div>
                  </div>
                </div>
                <div className='form-block'>
                  <div className='form-item'>
                    <div className='bio'>
                      <label htmlFor='bio'>About myself</label>
                      <textarea name='bio' id='bio' cols={30} rows={4}></textarea>
                    </div>
                  </div>
                </div>
                <div className='btn-w'>
                  <button className='btn-save' type='submit'>
                    Save information
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
        <div className='setting-col col-5'>
          <div className='info-name'>
            <div className='info-name-header'>
              <div className='avatar-img'>
                <img src='https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg' alt='' />
              </div>
              <h4 className='name-admin'>HelloYou</h4>
              <p className='location'>Viet Nam</p>
            </div>
            <div className='info-name-middle'>
              <div className='role'>ADMIN</div>
              <div className='company'>FPT</div>
            </div>
            <div className='info-name-footer'>
              <div className='info-bio'>
                <h5 className='title'>About myself</h5>
                <p className='desc'>Nothing IMpossible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
