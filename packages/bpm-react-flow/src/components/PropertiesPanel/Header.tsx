import { TextInput } from '@mantine/core';
import { useState } from 'react';

export interface PanelHeaderProps {
  name?: string;
  onChange?: (nextName: string) => void;
  color?: string;
  icon?: React.ReactElement | string;
}

export const PanelHeader = (props: PanelHeaderProps) => {
  const { name, onChange, color, icon } = props;
  const [editing, setEditing] = useState(false);

  return (
    <div
      style={{
        boxSizing: 'border-box',
        background: color,
        width: '100%',
        height: 56,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        padding: 8,
        borderBottom: '1px solid #000',
      }}
    >
      {!editing && (
        <div>
          {icon}
          {name}
          <button onClick={() => setEditing(true)}>修改名称</button>
        </div>
      )}
      {editing && (
        <TextInput
          style={{
            height: '100%',
          }}
          defaultValue={name}
          onBlur={(event) => {
            console.log(event);
            onChange && onChange(event.target.value);
            setEditing(false);
          }}
        />
      )}
    </div>
  );
};
