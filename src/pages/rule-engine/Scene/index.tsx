import { PageContainer } from '@ant-design/pro-layout';
import BaseService from '@/utils/BaseService';
import { useRef } from 'react';
import type { ActionType, ProColumns } from '@jetlinks/pro-table';
import type { SceneItem } from '@/pages/rule-engine/Scene/typings';
import { Tooltip } from 'antd';
import {
  CaretRightOutlined,
  EditOutlined,
  EyeOutlined,
  MinusOutlined,
  ReloadOutlined,
  StopOutlined,
} from '@ant-design/icons';
import BaseCrud from '@/components/BaseCrud';

export const service = new BaseService<SceneItem>('rule-engine/scene');
const Scene = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<SceneItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      dataIndex: 'name',
      title: '名称',
    },
    {
      dataIndex: 'triggers',
      title: '触发方式',
      render: () => 'todo',
    },
    {
      dataIndex: 'state',
      title: '状态',
      render: (text, record) => record.state.value,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 200,
      render: (text, record) => [
        <a>
          <Tooltip title="查看">
            <EyeOutlined />
          </Tooltip>
        </a>,
        <a onClick={() => console.log(record)}>
          <Tooltip title="编辑">
            <EditOutlined />
          </Tooltip>
        </a>,
        <a onClick={() => console.log(record)}>
          <Tooltip title="启动">
            <CaretRightOutlined />
          </Tooltip>
        </a>,
        <a onClick={() => console.log(record)}>
          <Tooltip title="启动">
            <StopOutlined />
          </Tooltip>
        </a>,
        <a onClick={() => console.log(record)}>
          <Tooltip title="执行">
            <ReloadOutlined />
          </Tooltip>
        </a>,

        <a>
          <Tooltip title="删除">
            <MinusOutlined />
          </Tooltip>
        </a>,
      ],
    },
  ];

  const schema = {};

  return (
    <PageContainer>
      <BaseCrud
        columns={columns}
        service={service}
        title="场景联动"
        schema={schema}
        actionRef={actionRef}
      />
    </PageContainer>
  );
};
export default Scene;