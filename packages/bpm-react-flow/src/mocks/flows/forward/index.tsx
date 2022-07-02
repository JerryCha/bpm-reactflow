import { FlowPro, FlowType } from '@/models';
import { Config } from './Config';

export const ForwardFlow: FlowPro<any> = {
  type: FlowType.FORWARD,
  defaultOptions: {},
  Config,
};
