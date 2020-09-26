import React, { Component } from 'react'
import { Tag, Row, Col, Select } from 'antd';

const { Option } = Select;

export default class tagWithSelect extends Component {
    render() {
        return (
            <Row gutter={[0, 14]} justify="space-around" align="middle">
                <Col span={2}>
                    <Tag color="gold">{this.props.tagName}</Tag>
                </Col>
                <Col span={20} pull={1}>
                    <Select defaultValue="" style={{ width: 120 , marginLeft:'-18px'}}>
                        <Option value="AI">AI</Option>
                        <Option value="AIOps/DevOps">AIOps/DevOps</Option>
                        <Option value="Software"> Software </Option>
                        <Option value="Software Engineer">Software Engineer</Option>
                        <Option value="Storage">Storage</Option>
                    </Select>
                </Col>
            </Row >
        )
    }
}
