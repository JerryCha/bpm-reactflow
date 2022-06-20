import { useRuntimeContext } from '@/contexts/RuntimeContext';
import { useConfigContext } from '@/contexts/ConfigContext';
import { useMemo } from 'react';
import { toNodeModel } from '@/utils';
import { Node as RFNode, Edge as RFEdge } from 'react-flow-renderer';

export const PropertiesPanel = () => {
  const { selectedElement } = useRuntimeContext();
  const { nodeMap } = useConfigContext();

  const ConfigPanel = useMemo(() => {
    if (!selectedElement || selectedElement.length !== 1) {
      return <div>寄</div>;
    }
    const [element] = selectedElement;
    const elementType = element.data.elementType;
    if (elementType === 'flow') {
      return <></>;
    } else if (elementType === 'node') {
      const Config = nodeMap[element.data.subType].Config;
      return Config ? (
        <Config
          dataModel={toNodeModel(element as RFNode)}
          onChange={() => {}}
        />
      ) : (
        <></>
      );
    }

    return <div>典</div>;
  }, [selectedElement, nodeMap]);

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        background: '#fff',
        height: '100%',
        width: 360,
        padding: 16,
        zIndex: 99,
        border: '1px solid #EDF0F6',
      }}
    >
      {ConfigPanel}
    </div>
  );
};
