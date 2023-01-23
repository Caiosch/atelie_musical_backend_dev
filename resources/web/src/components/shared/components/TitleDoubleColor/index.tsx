import { Text } from '@chakra-ui/react'
import React from 'react'

interface TitleDoubleColorProps {
  left?: React.ReactNode
  right?: React.ReactNode
}

export const TitleDoubleColor: React.FC<TitleDoubleColorProps> = ({
  left,
  right
}) => {
  if (!left && !right) return <></>

  return (
    <>
      {left}{' '}
      <Text color={'primary.200'} as={'span'}>
        {right}
      </Text>
    </>
  )
}
