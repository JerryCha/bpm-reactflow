import { NodeConfigProps } from '@/models';
import { ApproveNodeOptions } from '@/mocks/nodes/approve/type';
import { Form } from 'react-final-form';

export const Config = (props: NodeConfigProps<ApproveNodeOptions>) => {
  return (
    <div>
      <Form onSubmit={() => {}}>
        {(props) => <form onSubmit={props.handleSubmit}>1234</form>}
      </Form>
    </div>
  );
};
