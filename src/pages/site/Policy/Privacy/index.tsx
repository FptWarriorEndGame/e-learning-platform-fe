import React from 'react';
import './Privacy.scss';

const Privacy: React.FC = () => {
  return (
    <div className='privacy-policy'>
      <div className='privacy-policy__header'>
        <div className='privacy-policy__header-container container spacing-h-lg'>
          <h1 className='privacy-policy__title'>Privacy policy</h1>
          <p className='privacy-policy__intro'>
            This Policy applies as between you, the User of this Web Site and the owner and provider of this Web Site.
            This Policy applies to our use of any and all Data collected by us in relation to your use of the Web Site
            and any Services or Systems therein.
          </p>
        </div>
      </div>
      <div className='privacy-policy__sections'>
        <div className=' privacy-policy__sections-container container spacing-h-lg'>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>1. Definitions and Interpretation</h3>
            <div className='privacy-policy__section-content'>
              <div>In this Policy the following terms shall have the following meanings:</div>
              <div>
                "Account": means collectively the personal information, Payment Information and credentials used by
                Users to access Material and / or any communications System on the Web Site;
              </div>
              <div>
                "Content": means any text, graphics, images, audio, video, software, data compilations and any other
                form of information capable of being stored in a computer that appears on or forms part of this Web
                Site;
              </div>
              <div>
                "Cookie": means a small text file placed on your computer by Ltd when you visit certain parts of this
                Web Site. This allows us to identify recurring visitors and to analyse their browsing habits within the
                Web Site.
              </div>
              <div>
                "Data": means collectively all information that you submit to the Web Site. This includes, but is not
                limited to, Account details and information submitted using any of our Services or Systems;
              </div>
              <div>"": means , ADDRESS;</div>
              <div>
                "Service": means collectively any online facilities, tools, services or information that makes available
                through the Web Site either now or in the future;
              </div>
              <div>
                "System": means any online communications infrastructure that makes available through the Web Site
                either now or in the future. This includes, but is not limited to, web-based email, message boards, live
                chat facilities and email links;
              </div>
              <div>
                "User" / "Users": means any third party that accesses the Web Site and is not employed by and acting in
                the course of their employment; and
              </div>
              <div>
                "Website": means the website that you are currently using (<strong>e-learning-platform.pro</strong>)
                unless expressly excluded by their own terms and conditions.
              </div>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>2. Data Collected</h3>
            <div className='privacy-policy__section-content'>
              <div>Without limitation, any of the following Data may be collected:</div>
              <ul>
                <li>
                  <b>2.1</b> name;
                </li>
                <li>
                  <b>2.2</b> date of birth;
                </li>
                <li>
                  <b>2.3</b> job title & profession;
                </li>
                <li>
                  <b>2.4</b> contact information such as email addresses and telephone numbers;
                </li>
                <li>
                  <b>2.5</b> demographic information such as post code, preferences and interests;
                </li>
                <li>
                  <b>2.6</b> financial information such as credit / debit card numbers;
                </li>
                <li>
                  <b>2.7</b> IP address (automatically collected);
                </li>
                <li>
                  <b>2.8</b> web browser type and version (automatically collected);
                </li>
                <li>
                  <b>2.9</b> operating system (automatically collected);
                </li>
                <li>
                  <b>2.10</b> a list of URLS starting with a referring site, your activity on this Web Site, and the
                  site you exit to (automatically collected); and
                </li>
                <li>
                  <b>2.11</b> Cookie information (see Clause 10 below).
                </li>
              </ul>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>3. Our Use of Data</h3>
            <div className='privacy-policy__section-content'>
              <ul>
                <li>
                  <b>3.1</b> Any personal Data you submit will be retained by for as long as you use the Services and
                  Systems provided on the Web Site. Data that you may submit through any communications System that we
                  may provide may be retained for a longer period of up to one year.
                </li>
                <li>
                  <b>3.2</b> Unless we are obliged or permitted by law to do so, and subject to Clause 4, your Data will
                  not be disclosed to third parties. This includes our affiliates and / or other companies within our
                  group.
                </li>
                <li>
                  <b>3.3</b> All personal Data is stored securely in accordance with the principles of the Data
                  Protection Act 1998. For more details on security, see Clause 9 below.
                </li>
                <li>
                  <b>3.4</b> Any or all of the above Data may be required by us from time to time in order to provide
                  you with the best possible service and experience when using our Web Site. Specifically, Data may be
                  used by us for the following reasons:
                  <div className='pl-8'>
                    <ul>
                      <li>
                        <b>3.4.1</b> internal record keeping;
                      </li>
                      <li>
                        <b>3.4.1</b> improvement of our products / services;
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>4. Third Party Web Sites and Services</h3>
            <div className='privacy-policy__section-content'>
              <div>
                may, from time to time, employ the services of other parties for dealing with matters that may include,
                but are not limited to, payment handling, delivery of purchased items, search engine facilities,
                advertising and marketing. The providers of such services do not have access to certain personal Data
                provided by Users of this Web Site. Any Data used by such parties is used only to the extent required by
                them to perform the services that requests. Any use for other purposes is strictly prohibited.
                Furthermore, any Data that is processed by third parties must be processed within the terms of this
                Policy and in accordance with the Data Protection Act 1998.
              </div>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>5. Changes of Business Ownership and Control</h3>
            <div className='privacy-policy__section-content'>
              <ul>
                <li>
                  <b>5.1</b> may, from time to time, expand or reduce its business and this may involve the sale of
                  certain divisions or the transfer of control of certain divisions to other parties. Data provided by
                  Users will, where it is relevant to any division so transferred, be transferred along with that
                  division and the new owner or newly controlling party will, under the terms of this Policy, be
                  permitted to use the Data for the purposes for which it was supplied by you.
                </li>
                <li>
                  <b>5.2</b> In the event that any Data submitted by Users will be transferred in such a manner, you
                  will be contacted in advance and informed of the changes. When contacted you will be given the choice
                  to have your Data deleted or withheld from the new owner or controller.
                </li>
              </ul>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>6. Controlling Access to your Data</h3>
            <div className='privacy-policy__section-content'>
              <ul>
                <li>
                  <b>6.1</b> Wherever you are required to submit Data, you will be given options to restrict our use of
                  that Data. This may include the following:
                </li>
                <li>
                  <b>6.1.1</b> use of Data for direct marketing purposes; and
                </li>
                <li>
                  <b>6.1.2</b> sharing Data with third parties.
                </li>
              </ul>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>7. Your Right to Withhold Information</h3>
            <div className='privacy-policy__section-content'>
              <ul>
                <li>
                  <b>7.1</b> You may access certain areas of the Web Site without providing any Data at all. However, to
                  use all Services and Systems available on the Web Site you may be required to submit Account
                  information or other Data.
                </li>
                <li>
                  <b>7.2</b> You may restrict your internet browser's use of Cookies. For more information see Clause 10
                  below.
                </li>
              </ul>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>8. Accessing your own Data</h3>
            <div className='privacy-policy__section-content'>
              <ul>
                <li>
                  <b>8.1</b> You may access your Account at any time to view or amend the Data. You may need to modify
                  or update your Data if your circumstances change. Additional Data as to your marketing preferences may
                  also be stored and you may change this at any time.
                </li>
                <li>
                  <b>8.2</b> You have the right to ask for a copy of your personal Data on payment of a small fee.
                </li>
              </ul>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>9. Security</h3>
            <div className='privacy-policy__section-content'>
              <div>
                Data security is of great importance to and to protect your Data we have put in place suitable physical,
                electronic and managerial procedures to safeguard and secure Data collected online.
              </div>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>10. Changes to this Policy</h3>
            <div className='privacy-policy__section-content'>
              <div>
                reserves the right to change this Privacy Policy as we may deem necessary from time to time or as may be
                required by law. Any changes will be immediately posted on the Web Site and you are deemed to have
                accepted the terms of the Policy on your first use of the Web Site following the alterations.
              </div>
            </div>
          </section>
          <section className='privacy-policy__section'>
            <h3 className='privacy-policy__section-title'>11. Contacting Us</h3>
            <div className='privacy-policy__section-content'>
              <div>If there are any questions regarding this privacy policy you may contact us at</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
