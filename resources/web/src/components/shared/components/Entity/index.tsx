import { BoxProps } from '@chakra-ui/react'
import React from 'react'
import { Col, Row } from '..'

interface EntityProps extends BoxProps {
  side?: React.ReactNode
}

export const Entity: React.FC<EntityProps> = ({ side, children, ...props }) => {
  return (
    <Row alignItems={'center'} {...props}>
      {side && <Col>{side}</Col>}
      <Col flex={1} pl={4}>
        {children}
      </Col>
    </Row>
  )
}
