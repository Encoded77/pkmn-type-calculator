import { useState } from 'preact/hooks';
import { Row, Col, Layout, Typography } from 'antd';

import { TypesSelector } from './components/TypesSelector';
import { Matchup } from './components/Matchup';

import { COLORS, EMPTY_TYPE } from './constants';
import { typechart } from './typechart';

export const App = () => {
  const [firstType, setFirstType] = useState(typechart?.types?.[0]?.name || EMPTY_TYPE);
  const [secondType, setSecondType] = useState(EMPTY_TYPE);

  const handleFirstTypeSelect = (type: string) => {
    if (type === secondType) {
      setSecondType(EMPTY_TYPE);
    }

    setFirstType(type);
  }

  return (
    <Layout style={{
      paddingTop: 8,
      backgroundColor: COLORS.BACKGROUND,
      width: '100vw',
      height: '100vh',
    }}>
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography.Title style={{ color: COLORS.TITLE }}>Pokemon Type Matchup Calculator</Typography.Title>
        </Col>
        <Col span={9} offset={2}>
          <Typography.Title level={5} style={{ color: COLORS.TITLE }}>Choose First Type</Typography.Title>
          <TypesSelector
            typechart={typechart}
            selectedType={firstType}
            onSelect={handleFirstTypeSelect}
          />
          <Typography.Title level={5} style={{ color: COLORS.TITLE }}>Choose Second Type</Typography.Title>
          <TypesSelector
            typechart={typechart}
            displayEmptyType
            selectedType={secondType}
            disabledTypes={[firstType]}
            onSelect={setSecondType}
          />
        </Col>
        <Col span={8} offset={1}>
          <Matchup typechart={typechart} firstType={firstType} secondType={secondType} />
        </Col>
      </Row>
    </Layout>
  )
}
