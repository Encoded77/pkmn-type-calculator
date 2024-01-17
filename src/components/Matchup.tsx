import { FunctionComponent } from 'preact';
import { useMemo } from 'preact/hooks';
import { Typography } from 'antd';

import { TypeChart } from '../typechart';
import { COLORS } from '../constants';

import { ChipList, TypeChip } from './TypeChip';

export type MatchupProps = {
  typechart: TypeChart;
  firstType: string;
  secondType: string;
}

type Matchups = {
  timeTwoDamage: TypeChart['types'][number][];
  timeOneDamage: TypeChart['types'][number][];
  halfDamage: TypeChart['types'][number][];
  immune: TypeChart['types'][number][];
}

const getMatchups = (typechart: TypeChart, firstType: string, secondType: string): Matchups => {
  const indexedTypes = Object.values(typechart.types).reduce((acc, type) => {
    acc[type.name] = type;

    return acc;
  }, {} as Record<string, TypeChart['types'][number]>);

  const firstTypeData = indexedTypes?.[firstType];
  const secondTypeData = indexedTypes?.[secondType] || { immunities: [], weaknesses: [], resistances: [] };

  const combinedImmunities = [...firstTypeData?.immunities, ...secondTypeData?.immunities];
  const combinedWeaknesses = [...firstTypeData?.weaknesses, ...secondTypeData?.weaknesses];
  const combinedResistances = [...firstTypeData?.resistances, ...secondTypeData?.resistances];

  // -1 is immune, 0 is half damage, 1 is normal damage, 2 is double damage
  const damageMap = new Map<string, number>()

  typechart.types.forEach((type) => {
    damageMap.set(type.name, 1);
  });

  combinedImmunities.forEach((typeName) => {
    damageMap.set(typeName, -1);
  });

  combinedWeaknesses.forEach((typeName) => {
    const currentDamage = damageMap.get(typeName) || 1;

    if (currentDamage === -1) {
      return;
    }

    damageMap.set(typeName, currentDamage + 1);
  });

  combinedResistances.forEach((typeName) => {
    const currentDamage = damageMap.get(typeName) || 1;

    if (currentDamage === -1) {
      return;
    }

    damageMap.set(typeName, currentDamage - 1);
  });


  const timeTwoDamage = [...damageMap.entries()]
    .filter(([, damage]) => damage === 2)
    .map(([typeName]) => indexedTypes[typeName]);

  const timeOneDamage = [...damageMap.entries()]
    .filter(([, damage]) => damage === 1)
    .map(([typeName]) => indexedTypes[typeName]);

  const halfDamage = [...damageMap.entries()]
    .filter(([, damage]) => damage === 0)
    .map(([typeName]) => indexedTypes[typeName]);

  const immune = [...damageMap.entries()]
    .filter(([, damage]) => damage === -1)
    .map(([typeName]) => indexedTypes[typeName]);

  return { timeTwoDamage, timeOneDamage, halfDamage, immune };
};

export const Matchup: FunctionComponent<MatchupProps> = ({
  typechart,
  firstType,
  secondType,
}) => {
  const matchups = useMemo(
    () => getMatchups(typechart, firstType, secondType),
    [typechart, firstType, secondType],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {matchups.timeTwoDamage.length > 0
        && <Typography.Title level={5} style={{ color: COLORS.TITLE }}>Takes 2x From</Typography.Title>}
      <ChipList>
        {matchups.timeTwoDamage.map((type) => (
          <TypeChip key={type} name={type.name} color={type.color} />
        ))}
      </ChipList>
      {matchups.timeOneDamage.length > 0
        && <Typography.Title level={5} style={{ color: COLORS.TITLE }}>Takes 1x From</Typography.Title>}
      <ChipList>
        {matchups.timeOneDamage.map((type) => (
            <TypeChip key={type} name={type.name} color={type.color} />
        ))}
      </ChipList>
      {matchups.halfDamage.length > 0
        && <Typography.Title level={5} style={{ color: COLORS.TITLE }}>Takes 0.5x From</Typography.Title>}
      <ChipList>
        {matchups.halfDamage.map((type) => (
          <TypeChip key={type} name={type.name} color={type.color} />
        ))}
      </ChipList>
      {matchups.immune.length > 0
        && <Typography.Title level={5} style={{ color: COLORS.TITLE }}>Takes 0x From</Typography.Title>}
      <ChipList>
        {matchups.immune.map((type) => (
          <TypeChip key={type} name={type.name} color={type.color} />
        ))}
      </ChipList>
    </div>
  )
};
