import React from 'react';

export const PanelBody = (props: React.PropsWithChildren) => {
  const { children } = props;
  return (
    <div style={{ padding: 16, height: '100%', overflow: 'auto' }}>
      {children}
    </div>
  );
};
