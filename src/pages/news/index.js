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
        const { editingKey, dataSource, tableLength } = this.props;
        return (
            <PageContainer>
                <Title spanValue={'24'} fontSize={18} titleName={"新闻"} />
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col>
                        <TitleWithTable titleName={'新闻总览'} dispatch={dispatch} editingKey={editingKey} dataSource={dataSource} tableLength={tableLength} />
                    </Col>
                    <Divider />
                </Row>

            </PageContainer>
        )
    }
}

