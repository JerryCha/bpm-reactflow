import { FlowPro, FlowType } from '@/models';
import { Config } from './Config';

export const BackwardFlow: FlowPro<any> = {
  type: FlowType.BACKWARD,
  defaultOptions: {},
  Config,
};
