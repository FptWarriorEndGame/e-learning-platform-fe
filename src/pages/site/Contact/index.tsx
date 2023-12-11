import { Button, Checkbox, Input } from 'antd';
const { TextArea } = Input;

import './Contact.scss';
const Contact = () => {
  return (
    <div className='contact'>
      {/* Container for demo purpose */}
      <div className='container px-4 md:px-0 my-24 mx-auto '>
        {/* Section: Design Block */}
        <section className='mb-32 text-center'>
          <div className='mx-auto max-w-[500px] md:max-w-[700px] lg:max-w-[900px] flex flex-col	flex-wrap'>
            <h2 className='contact__title mb-12 text-3xl font-bold pt-6'>Contact us</h2>
            <form>
              <div className='relative mb-6' data-te-input-wrapper-init>
                <Input placeholder='Enter your name' />
              </div>
              <div className='relative mb-6' data-te-input-wrapper-init>
                <Input placeholder='Enter your email' />
              </div>
              <div className='relative mb-6' data-te-input-wrapper-init>
                <TextArea placeholder='Your message' />
              </div>
              <div className='mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] md:flex'>
                <Checkbox>Remember</Checkbox>
              </div>
              <Button type='primary' className='' size='middle' style={{ width: '100%' }}>
                Send
              </Button>
            </form>
          </div>
        </section>
        {/* Section: Design Block */}
      </div>
      {/* Container for demo purpose */}
    </div>
  );
};

export default Contact;
