import { BaseProps } from '../types/base';
import { Button as MantineButton } from '@mantine/core';

export interface ButtonProps extends BaseProps {
  type?: 'primary' | 'default';
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { children, className, onClick } = props;
  return (
    <MantineButton className={className} onClick={onClick}>
      {children}
    </MantineButton>
  );
};
