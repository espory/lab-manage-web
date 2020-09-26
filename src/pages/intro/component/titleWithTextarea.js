import React, { Component } from 'react'
import { Row, Input } from 'antd'
import Title from './title'
// import Intro from '..';


const { TextArea } = Input;

export default class TitleWithTextarea extends Component {
    constructor(props) {
        super(props)
        this.handleTextChange = this.handleTextChange.bind(this);
    }


    async handleTextChange(event) {
        let { introData, componentName } = this.props;
        const { dispatch } = this.props;
        console.log(introData)
        introData[componentName] = event.target.value;
        await dispatch('setData', introData)
    }

    render() {
        // console.log(this.props.textValue);
        return (
            <Row align="left" gutter={[14, 18]}>
                <Title spanValue={24} fontSize={15} titleName={this.props.titleName} childrenTitle={true} />
                <TextArea
                    value={this.props.textValue}
                    // value={'BZ实验室（复旦大学系统与软件实验室）关注云计算、移动计算、人工智能计算、物联网等新一代计算架构下，软件构造、应用需求、软件运行情境等对软件性能、易用性、可靠性、安全性等的影响，以软件工程等技术手段实现软件性能、易用性、可靠性、安全性的保障与提升。'}
                    onChange={this.handleTextChange}
                    placeholder="Controlled autosize"
                    autoSize={{ minRows: 4, maxRows: 16 }}
                />
            </Row>
        )
    }
}
