import { Avatar, Card, Col, Row } from 'antd';
import './FeedbackStudent.scss';
export default function FeedbackStudent() {
  return (
    <div className='container mx-auto px-4 pb-20 pt-40'>
      <Row gutter={[16, 16]}>
        <Col span={8} className='max-h-full relative'>
          <Card className='fb-item bg-194583'>
            {/*  col 1 */}
            <div className='fb-wrap'>
              <div className='avatar'>
                <Avatar src='path_to_avatar_image' size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
              </div>
              <div className='inline text-3xl txt-desc'>
                "Course materials were excellent, the mentoring approach was excellent. The instructors did a good job
                of communicating and making it a more intimate arrangement. A lot of online courses fail because of the
                isolation, unlike eSchoolM. I definitely learned a lot."
              </div>
              <div className='inline text-3xl txt-name'>CLIVE GRAVES</div>
            </div>
          </Card>
        </Col>
        <Col span={8} className='max-h-full relative'>
          <Card className='fb-item bg-FFB029'>
            {/*  col 1 */}
            <div className='fb-wrap'>
              <div className='avatar'>
                <Avatar src='path_to_avatar_image' size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
              </div>
              <div className='inline text-3xl txt-desc txt-black'>
              "Taking online classes here at eSchoolM has been a major benefit to me. The courses are well laid out and the instructors are supportive and responsible in returning emails. Thanks eSchoolM for allowing me to have a flexible schedule while developing my business."
              </div>
              <div className='inline text-3xl txt-name txt-black'>NAYA SCHWARTZ</div>
            </div>
          </Card>
        </Col>
        <Col span={8} className='max-h-full relative'>
          <Card className='fb-item bg-112236'>
            {/*  col 1 */}
            <div className='fb-wrap'>
              <div className='avatar'>
                <Avatar src='path_to_avatar_image' size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
              </div>
              <div className='inline text-3xl txt-desc'>
              "I received my certificate, and I would like to thank eShoolM for their continuous support. The courses were challenging, but my instructors were always there supporting me and ready to help. I enjoyed the classes tremendously. I look forward to taking another class with eSchoolM."
              </div>
              <div className='inline text-3xl txt-name'>MARIA SANDOVAL</div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}