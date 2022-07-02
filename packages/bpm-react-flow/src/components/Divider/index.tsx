export const Divider = (props: {
  thick: string | number;
  gap: number;
  width?: string | number;
}) => (
  <div
    style={{
      width: props.width || '100%',
      height: props.thick,
      background: '#edf0f6',
      margin: `${props.gap}px 0 ${props.gap}px 0`,
    }}
  />
);
