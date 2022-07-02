import { FlowPro, FlowType } from '@/models';
import { Config } from './Config';

export const ConditionFlow: FlowPro<any> = {
  type: FlowType.CONDITION,
  defaultOptions: {},
  Config,
};
