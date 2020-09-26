import React, { useState } from 'react'
import Title from './title'
// import TagWithInput from './addThing/tagWithInput'


import { Row, Button, Col , Tag, Input} from 'antd';
// import { async } from 'regenerator-runtime';



// import React from 'react'

export default function AddCategory(props) {

    const {dispatch} = props
    const [inputValue, setInputValue] = useState('')

    const handleClick = async () => {
        dispatch('addCategory',inputValue);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }


    return (
        <div>
            <Row gutter={[0, 18]} justify="space-around" align="middle">
                <Title spanValue={'22'} fontSize={15} titleName={'新增论文分类'} childrenTitle={true} />
                <Button span={2}
                    type="primary"
                    onClick={handleClick}
                >添加</Button>
            </Row>
            <Row gutter={[0, 14]} justify="space-around" align="middle">
                <Col span={2}>
                    <Tag color="gold">论文类别</Tag>
                </Col>
                <Col span={20} pull={1}>
                    <Input style={{ marginLeft: '-18px' }} placeholder="" value={inputValue} onChange={handleChange} allowClear />
                </Col>
            </Row>
        </div>
    )
}


// export default class AddCategory extends Component {
//     render() {
//         const handleClick = async () => {

//         }
//         return (
//             <div>
//                 <Row gutter={[0, 18]} justify="space-around" align="middle">
//                     <Title spanValue={'22'} fontSize={15} titleName={'新增论文分类'} childrenTitle={true} />
//                     <Button span={2}
//                         type="primary"
//                         onClick={handleClick}
//                     >添加</Button>
//                 </Row>
//                 <Row gutter={[0, 14]} justify="space-around" align="middle">
//                     <Col span={2}>
//                         <Tag color="gold">论文类别</Tag>
//                     </Col>
//                     <Col span={20} pull={1}>
//                         <Input style={{ marginLeft: '-18px' }} placeholder="" allowClear />
//                     </Col>
//                 </Row>
//             </div>
//         )
//     }
// }
