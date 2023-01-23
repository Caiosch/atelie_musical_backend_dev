import { SimpleGrid, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { Col } from '../Col'

export const TableSkeleton: React.FC = () => {
  return (
    <Col>
      <Skeleton w={'100%'} mb={2} h={10} rounded={'lg'} />
      <SimpleGrid gap={1}>
        <Skeleton w={'100%'} h={14} rounded={'lg'} />
        <Skeleton w={'100%'} opacity={0.75} h={14} rounded={'lg'} />
        <Skeleton w={'100%'} opacity={0.5} h={14} rounded={'lg'} />
        <Skeleton w={'100%'} opacity={0.25} h={14} rounded={'lg'} />
        <Skeleton w={'100%'} opacity={0.1} h={14} rounded={'lg'} />
      </SimpleGrid>
    </Col>
  )
}
