import { useRuntimeContext } from '@/contexts/RuntimeContext';
import { useConfigContext } from '@/contexts/ConfigContext';
import { useMemo } from 'react';
import { toNodeModel } from '@/utils';
import { Node as RFNode, Edge as RFEdge } from 'react-flow-renderer';
import { PanelHeader } from './Header';
import { PanelBody } from '@/components/PropertiesPanel/Body';

export const PropertiesPanel = () => {
  const { selectedElement } = useRuntimeContext();
  const { nodeMap } = useConfigContext();

  const [element, definition] = useMemo(() => {
    if (!selectedElement || selectedElement.length !== 1) {
      return [null, null];
    }
    const [element] = selectedElement;
    const definition =
      element.data.elementType === 'flow'
        ? { Config: () => <></>, color: '#000', icon: <></> }
        : nodeMap[element.data.subType];
    return [element, definition];
  }, [selectedElement]);

  const ConfigPanel = useMemo(() => {
    if (!element) {
      return <div>寄</div>;
    }

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
  }, [element, nodeMap]);

  return (
    <div
      key={element?.id}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        background: '#fff',
        height: '100%',
        width: 480,
        // padding: 16,
        zIndex: 99,
        border: '1px solid #EDF0F6',
      }}
    >
      <PanelHeader
        name={element?.data.name}
        color={'#fff'}
        icon={definition?.icon}
      />
      <PanelBody>{ConfigPanel}</PanelBody>
    </div>
  );
};
