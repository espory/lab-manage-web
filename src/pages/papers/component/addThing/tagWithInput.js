import React, { Component } from 'react'
import { Tag, Row, Col, Input } from 'antd';

export default class tagWithInput extends Component {
    render() {
        return (
            <Row gutter={[0, 14]} justify="space-around" align="middle">
                <Col span={2}>
                    <Tag color="gold">{this.props.tagName}</Tag>
                </Col>
                <Col span={20} pull={1}>
                    <Input style={{marginLeft:'-18px'}} placeholder="" allowClear />
                </Col>
            </Row>
        )
    }
}
