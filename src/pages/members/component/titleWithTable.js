import React, { useContext, useState, useEffect, useRef } from 'react';
import { Tag, Table, Input, Button, Popconfirm, Form, Col, Row, Image } from 'antd';
import { Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import { postUpdateImage } from '../service'

import {HOST} from '../../../common/fetch'

const { TextArea } = Input;

import Title from './title'
import { call } from 'file-loader';
import { from } from 'form-data';


export default function TitleWithTable(props) {
  const { dispatch, editingKey, dataSource, dataName } = props;

  const [form] = Form.useForm();

  const data = dataSource;

  // const HOST = 'http://localhost:7001';

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    key,
    children,
    ...restProps
  }) => {

    let inputNode = <Input />;

    if (inputType === 'textArea') {
      inputNode = <TextArea autoSize={{ minRows: 4, maxRows: 16 }} />;
    } else if (inputType === 'upload') {
      const props = {
        name: 'file',
        customRequest: async (detail) => {
          await postUpdateImage(detail.file).then(async callback => {
            let index = dataSource.findIndex((item) => item.key === record.key);

            let item = dataSource[index];
            item.photo = callback.data.url;
            dataSource.splice(index, 1, item);
            await dispatch('setData', { [dataName]: dataSource });
          });
          detail.onSuccess();
        },
        headers: {
          authorization: 'authorization-text',
        },
        showUploadList: false,
        fileList: []
      };
      inputNode = <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    }

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
          >
            {inputNode}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };


  const cancel = () => {
    dispatch('setEditingKey', '')
  };

  const isEditing = (record) => record.key === editingKey;
  const handleAdd = () => {
    dispatch('addMember', dataName )
  }
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    dispatch('setEditingKey', record.key)
  };
  const del = (record) => {
    dispatch('delMember', record);
  };
  const save = async (record) => {
    try {
      const row = await form.validateFields();
      row.photo = record.photo;
      const newRow = {...record, ...row};
      await dispatch('updateMember', newRow)
      await dispatch('setEditingKey', '')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const columns = [
    {
      title: 'id',
      width: 100,
      dataIndex: 'id',
      editable: false,

    },
    {
      title: '类型',
      width: 100,
      dataIndex: 'type',
      editable: false,
    },
    {
      title: '姓名-中文',
      width: 100,
      dataIndex: 'name_cn',
      editable: true,
    },
    {
      title: '姓名-英文',
      width: 100,
      dataIndex: 'name_en',
      editable: true,
    },
    {
      title: '（学术）组织',
      width: 100,
      dataIndex: 'institude',
      editable: true,
    },
    {
      title: '职称',
      width: 100,
      dataIndex: 'job_title',
      editable: true,
    },
    {
      title: '学位',
      width: 100,
      dataIndex: 'degree',
      editable: true,
    },
    {
      title: '成员照片',
      width: 100,
      dataIndex: 'photo',
      render: (text) => (
        <Image
          width={100}
          src={`${HOST}/${text}`}
        />
      ),
      editable: true,
    },
    {
      title: '成员博客',
      width: 100,
      dataIndex: 'url',
      editable: true,
    },
    {
      title: '详细信息',
      width: 300,
      dataIndex: 'detail',
      editable: true,
    },

    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (<span>
          <a
            // href="javascript:;"
            onClick={() => save(record)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </a>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>) : (
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <Tag color={editingKey === '' ? "green" : 'gray'} onClick={() => {
                  if (editingKey === '') {
                    edit(record);
                  }
                }} >编辑</Tag>
              </Col>
              <Col span={24}>
                <Popconfirm title="Sure to delete?" onConfirm={() => del(record)}>
                  <Tag color="red" >删除</Tag>
                </Popconfirm>
              </Col>
            </Row>
          )
      }
    },
  ];

  const mergedColumns = columns.map((col) => {

    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'detail' ? 'textArea' : (col.dataIndex === 'photo' ? 'upload' : 'text'),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const components = {
    body: {
      // row: EditableRow,
      cell: EditableCell,
    },
  };
  return (
    <Form form={form} component={false}>

      <Row justify="space-around" align="middle" gutter={[0, 14]}>
        <Col span={22} >
          <Title spanValue={'24'} fontSize={17} titleName={props.titleName} childrenTitle={true} />
        </Col>
        <Col span={2}>
          <Button
            onClick={handleAdd}
            type="primary"
          >
            添加人员
        </Button>
        </Col>

      </Row>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data}
        columns={mergedColumns}
      />
    </Form>

  )
}