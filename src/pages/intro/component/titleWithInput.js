import React, { Component } from 'react'
import { Row, Col, Input } from 'antd'
import Title from './title'
// import store from '../store';
// import pageWrapper from '../../../components/page-wrapper';


// const { TextArea } = Input;


// @pageWrapper({ store })
export default class TitleWithInput extends Component {

    async handleInputChange(event, changeName) {
        // console.log(changeName)
        const { introData } = this.props;
        const { dispatch } = this.props;
        changeName == 'lab_name_change' ?
            introData.lab_name = event.target.value :
            introData.lab_name_en = event.target.value;

        await dispatch('setData', introData)
    }

    render() {
        // console.log(this.props.inputValue)
        const [lab_name, lab_name_en] = this.props.inputValue
        return (
            <Row align="left" gutter={[14, 18]}>
                <Title spanValue={24} fontSize={15} titleName={this.props.titleName} childrenTitle={true} />
                <Col span="12">
                    <Input
                        value={lab_name}
                        onChange={(e)=>{this.handleInputChange(e,'lab_name_change')}}
                        // placeholder="input with clear icon"
                        allowClear
                    // onChange={onChange} 
                    />
                </Col>
                <Col span="12">
                    <Input
                        value={lab_name_en}
                        onChange={(e)=>{this.handleInputChange(e,'lab_name_en_change')}}

                        // placeholder="input with clear icon"
                        allowClear
                    // onChange={onChange} 
                    />
                </Col>
                {/* <TextArea
                    value={'BZ实验室（复旦大学系统与软件实验室）关注云计算、移动计算、人工智能计算、物联网等新一代计算架构下，软件构造、应用需求、软件运行情境等对软件性能、易用性、可靠性、安全性等的影响，以软件工程等技术手段实现软件性能、易用性、可靠性、安全性的保障与提升。'}
                    // onChange={this.onChange}
                    placeholder="Controlled autosize"
                    autoSize={{ minRows: 4, maxRows: 4 }}
                /> */}
            </Row>
        )
    }
}
