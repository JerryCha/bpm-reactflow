import { Anchor, ScrollArea, Space, Stack } from '@mantine/core';
import { routeData } from '../../routes';
import { Link } from 'react-router-dom';

export const NavMenu = () => {
  return (
    <ScrollArea>
      <Stack>
        {routeData.map((routeItem) => {
          return (
            <Anchor
              key={`navmenu-link-${routeItem.path}`}
              component={Link}
              to={routeItem.path}
            >
              {routeItem.label}
            </Anchor>
          );
        })}
      </Stack>
    </ScrollArea>
  );
};
