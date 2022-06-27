import { Button } from '@bpm/base-ui';
import { Group, Text } from '@mantine/core';

export const Toolbar = () => {
  return (
    <Group>
      <Button>-</Button>
      <Text>100%</Text>
      <Button>+</Button>
    </Group>
  );
};
