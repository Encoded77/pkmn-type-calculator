import { FunctionComponent } from 'preact';
import { Flex } from 'antd';

import { TypeChart } from '../typechart';
import { TypeButton } from './TypeButton';

export type TypesSelectorProps = {
  typechart: TypeChart;
  selectedType: string;
  displayEmptyType?: boolean;
  disabledTypes?: string[];
  onSelect?: (type: string) => void;
}

export const TypesSelector: FunctionComponent<TypesSelectorProps> = ({
  typechart,
  selectedType,
  displayEmptyType,
  disabledTypes,
  onSelect,
}) => {
  const types = Object.values(typechart.types);

  return (
    <Flex wrap='wrap' gap={8}>
      {types.map((type) => (
        <TypeButton
          key={type.name}
          name={type.name}
          color={type.color}
          disabled={disabledTypes?.includes(type.name)}
          selected={type.name === selectedType}
          onClick={() => onSelect?.(type.name)}
        />
      ))}
      {displayEmptyType && (
        <TypeButton
          key='none'
          name='none'
          color='#6b6a6c'
          disabled={false}
          selected={selectedType === 'none'}
          onClick={() => onSelect?.('none')}
        />
      )}
    </Flex>
  )
}
