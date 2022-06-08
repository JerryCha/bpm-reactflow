export const NodeLibrary = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 80,
        padding: 16,
        background: '#fff',
        boxShadow: '1px 1px 8px 0 rgba(128,128,128,0.25)',
        position: 'absolute',
        left: 16,
        top: 16,
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          border: '1px solid rgb(128, 128, 128)',
          borderRadius: 8,
        }}
      >
        开始
      </div>
    </div>
  );
};
