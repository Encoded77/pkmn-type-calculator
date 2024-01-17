import { FunctionComponent } from 'preact';
import { Button } from 'antd';

import { CHIP_HEIGHT, COLORS } from '../constants';

export type TypeButtonProps = {
  name: string;
  color: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const TypeButton: FunctionComponent<TypeButtonProps> = ({
  name,
  color,
  disabled,
  selected,
  onClick
}) => {
  const baseButtonStyles = {
    backgroundColor: disabled ? COLORS.BACKGROUND : COLORS.LIGHT_BACKGROUND,
    borderColor: disabled ? COLORS.BACKGROUND : COLORS.BORDER,
    color: disabled ? COLORS.DISABLED_TEXT : COLORS.TEXT,
    fontWeight: 'bold',
    position: 'relative',
    width: '125px',
    height: `${CHIP_HEIGHT}px`,
    borderRadius: '8px',
  };

  const selectedButtonStyles = {
    backgroundColor: color,
    color: COLORS.TEXT,
    textShadow: '0px 0px 6px #000000',
  };

  return (
    <Button
      type={'default'}
      style={{
        ...baseButtonStyles,
        ...(selected ? selectedButtonStyles : {}),
      }}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        style={{
          position: 'absolute',
          borderRadius: 500,
          top: 7,
          left: 8,
          width: 16,
          height: 16,
          backgroundColor: color,
        }}
      />
      {name.toLocaleUpperCase()}
    </Button>
  )
}
