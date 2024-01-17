import { FunctionComponent } from 'preact';
import { Flex } from 'antd';

import { CHIP_HEIGHT, COLORS } from '../constants';
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
      width: '110px',
      height: `${CHIP_HEIGHT}px`,
      borderRadius: '8px',
      backgroundColor: color,
      border: `3px solid ${shadeColor(color, 30)}`,
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
