import { FlowMapType, FlowPro } from '@/models';

export const createFlowMap = (flows: FlowPro[]) =>
  flows.reduce<FlowMapType>((m, curr) => {
    m[curr.type] = curr;
    return m;
  }, {});
