import { Avatar, Card, Col, Row } from 'antd';
import './FeedbackStudent.scss';
export default function FeedbackStudent() {
  return (
    <div className='feedback-student'>
      <div className='container mx-auto px-4 pb-20 pt-40'>
        <Row gutter={[16, 16]} className='row-wrap'>
          <Col className='max-h-full col relative'>
            <Card className='fb-item bg-194583'>
              {/*  col 1 */}
              <div className='fb-wrap'>
                <div className='avatar'>
                  <Avatar src='https://photo-cms-anninhthudo.epicdn.me/w800/Uploaded/2024/bpcpcwvo/2023_06_28/eddie-ryans-portrait-3204-7485.jpg' size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
                </div>
                <div className='inline text-3xl txt-desc'>
                  "Course materials were excellent, the mentoring approach was excellent. The instructors did a good job
                  of communicating and making it a more intimate arrangement. A lot of online courses fail because of
                  the isolation, unlike eSchoolM. I definitely learned a lot."
                </div>
                <div className='inline text-3xl txt-name'>CLIVE GRAVES</div>
              </div>
            </Card>
          </Col>
          <Col className='max-h-full col relative'>
            <Card className='fb-item bg-FFB029'>
              {/*  col 1 */}
              <div className='fb-wrap'>
                <div className='avatar'>
                  <Avatar src='https://tuyenquang.dcs.vn/Image/Large/2021641852_29877.jpeg' size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
                </div>
                <div className='inline text-3xl txt-desc txt-black'>
                  "Taking online classes here at eSchoolM has been a major benefit to me. The courses are well laid out
                  and the instructors are supportive and responsible in returning emails eSchoolM. Thanks eSchoolM for allowing
                  me to have a flexible schedule responsible while developing my business."
                </div>
                <div className='inline text-3xl txt-name txt-black'>NAYA SCHWARTZ</div>
              </div>
            </Card>
          </Col>
          <Col className='max-h-full col relative'>
            <Card className='fb-item bg-112236'>
              {/*  col 1 */}
              <div className='fb-wrap'>
                <div className='avatar'>
                  <Avatar src='https://image.vietstock.vn/2013/06/18/Mr.%20Kokalari%20Picture%201.JPG' size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
                </div>
                <div className='inline text-3xl txt-desc'>
                  "I received my certificate, and I would like to thank eShoolM for their continuous support. The
                  courses were challenging, but my instructors were always there supporting me and ready to help. I
                  enjoyed the classes tremendously. I look forward to taking another class with eSchoolM."
                </div>
                <div className='inline text-3xl txt-name'>MARIA SANDOVAL</div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
