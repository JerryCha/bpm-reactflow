import { TextInput } from '@mantine/core';
import { useState } from 'react';
import { NodeCanvasWrapper } from '@/components/NodeCanvasWrapper';

export interface NodeHeaderProps {
  name?: string;
  onChange?: (nextName: string) => void;
  color?: string;
}

export const NodeHeader = (props: NodeHeaderProps) => {
  const { name, onChange, color } = props;
  const [editing, setEditing] = useState(false);
  return (
    <div
      className='bpm-node-header'
      style={{
        boxSizing: 'border-box',
        background: color,
        height: 24,
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        padding: 8,
      }}
    >
      {!editing && (
        <div
          className='bpm-node-header name-view'
          style={{ color: '#fff' }}
          // onClick={() => setEditing(true)}
        >
          {name}
        </div>
      )}
      {/*{editing && (*/}
      {/*  <TextInput*/}
      {/*    style={{*/}
      {/*      height: '100%',*/}
      {/*    }}*/}
      {/*    defaultValue={name}*/}
      {/*    onBlur={(event) => {*/}
      {/*      console.log(event);*/}
      {/*      onChange && onChange(event.target.value);*/}
      {/*      setEditing(false);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};
