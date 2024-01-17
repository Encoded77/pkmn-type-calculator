import { FunctionComponent } from 'preact';
import { Flex } from 'antd';

import { COLORS } from '../constants';
import { shadeColor } from '../lib/color';

export type TypeChipProps = {
  name: string;
  color: string;
}

export const TypeChip: FunctionComponent<TypeChipProps> = ({
  name,
  color,
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '125px',
      height: '26px',
      borderRadius: '8px',
      backgroundColor: color,
      border: `2px solid ${shadeColor(color, 10)}`,
      color: COLORS.TEXT,
      fontWeight: 'bold',
      textShadow: '0px 0px 6px #000000',
    }}>
      {name.toLocaleUpperCase()}
    </div>
  )
}


export const ChipList: FunctionComponent = ({ children }) => {
  return (
    <Flex wrap='wrap' gap={8}>
      {children}
    </Flex>
  )
};
