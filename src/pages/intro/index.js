import { PureComponent } from 'react';
import { Divider, Row, Col, Button, Form, Input } from 'antd';
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import store from './store';
import './index.less';
import Title from './component/title'
import TitleWithTextarea from './component/titleWithTextarea'
import TitleFileImg from './component/titleFileImg'
import TitleWithInput from './component/titleWithInput'



@pageWrapper({ store })
class Intro extends PureComponent {

  constructor(props) {
    super(props)
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }


  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch('setup');
  }

  async handleUpdateClick() {
    const { dispatch } = this.props;
    await dispatch('updateIntroduction');
  }

  render() {
    const { dispatch, introData, labImg } = this.props;
    // console.log(introData)
    return <PageContainer>
      <Form
        name="basic"
        initialValues={{ remember: true }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      >
        <Row justify="space-around" align="middle">
          <Title spanValue={'21'} fontSize={18} titleName={"实验室介绍"} />
          <Col span={3}>
            <Button type="primary" onClick={this.handleUpdateClick} >提交修改</Button>
          </Col>
        </Row>
        <Divider />
        <TitleWithInput dispatch={dispatch} introData={introData} titleName={'实验室名称'} inputValue={[introData.lab_name, introData.lab_name_en]} />
        <TitleWithTextarea dispatch={dispatch} introData={introData} componentName={'lab_intro'} titleName={'实验室介绍'} textValue={introData.lab_intro} />
        <TitleWithTextarea dispatch={dispatch} introData={introData} componentName={'lab_intro_en'} titleName={'实验室介绍（英文）'} textValue={introData.lab_intro_en} />
        <TitleWithTextarea dispatch={dispatch} introData={introData} componentName={'team_intro'} titleName={'团队介绍'} textValue={introData.team_intro} />
        <TitleWithTextarea dispatch={dispatch} introData={introData} componentName={'strength'} titleName={'实验室环境'} textValue={introData.strength} />
        <TitleFileImg dispatch={dispatch} introData={introData} labImg={labImg} titleName={'实验室宣传照（选择上传即修改宣传照）'} />
      </Form>
    </PageContainer>;
  }
}

export default Intro;
