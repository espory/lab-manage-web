import React, { Component } from 'react'

import { Col } from 'antd'


export default class Title extends Component {
    render() {


        const style = {
            fontSize: this.props.fontSize,
            margin: '0px',
            fontWeight: this.props.childrenTitle? '': 'bold',
            color: this.props.childrenTitle? '#1890ff': '#096dd9'

        }    
        return (
            <Col span={this.props.spanValue} >
                <p style={style}>
                    {this.props.titleName}
                </p>
            </Col>
        )
    }
}
