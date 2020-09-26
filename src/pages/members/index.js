import React, { Component } from 'react'
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import Title from './component/title'
import TitleWithTable from './component/titleWithTable'

import store from './store';
import { Divider, Row, Col, Button, Form, Input } from 'antd';


@pageWrapper({ store })
export default class index extends Component {
    render() {
        const { dispatch } = this.props;
        const { editingKey, instructorData, doctorData, masterData, formerData, tableLength } = this.props;
        return (
            <PageContainer>
                <Title spanValue={'24'} fontSize={18} titleName={"实验室成员"} />
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col>
                        <TitleWithTable titleName={'instructor'} dispatch={dispatch} editingKey={editingKey} dataSource={instructorData} dataName='instructorData'  />
                    </Col>
                    <Divider />
                    <Col>
                        <TitleWithTable titleName={'doctor'} dispatch={dispatch} editingKey={editingKey} dataSource={doctorData}  dataName='doctorData'  />
                    </Col>
                    <Divider />
                    <Col>
                        <TitleWithTable titleName={'master'} dispatch={dispatch} editingKey={editingKey} dataSource={masterData} dataName='masterData'  />
                    </Col>
                    <Divider />
                    <Col>
                        <TitleWithTable titleName={'former'} dispatch={dispatch} editingKey={editingKey} dataSource={formerData} dataName='formerData'  />
                    </Col>
                    <Divider />
                </Row>

            </PageContainer>
        )
    }
}

