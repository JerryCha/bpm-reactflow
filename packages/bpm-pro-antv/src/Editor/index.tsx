import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import { Graph } from '@antv/x6';
import { Toolbar } from './components/Toolbar';

type EditorProps = {
  model?: any;
};

type EditorRef = {
  getModel: () => any;
  setModel: (model: any) => void;
  getSVG: () => string;
  getPNG: () => string;
}

export const Editor = forwardRef((props: EditorProps, ref: any) => {
  const mountPoint = useRef<HTMLDivElement>(null);

  const { model } = props;

  useLayoutEffect(() => {
    if (!mountPoint.current) {
      return;
    }
    const graph = new Graph({
      container: mountPoint.current,
      width: 800,
      height: 600,
    });
    graph.zoomTo(1);
    graph.fromJSON(model);
    return () => graph.dispose();
  });

  return (
    <div className='bpm-editor-root'>
      <Toolbar />
      <div ref={mountPoint} />
    </div>
  );
});
