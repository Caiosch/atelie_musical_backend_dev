import { BoxProps } from '@chakra-ui/react'
import React from 'react'
import { Row } from '../Row'

interface AppHeaderTitleButtonProps extends BoxProps {}

const AppHeaderTitleButton: React.FC<AppHeaderTitleButtonProps> = ({
  ...rest
}) => {
  return (
    <Row
      py={2}
      px={4}
      rounded={'sm'}
      border={'1px solid transparent'}
      borderColor={'primary.500'}
      fontSize={'sm'}
      alignItems={'center'}
      mx={4}
      userSelect={'none'}
      h={10}
      {...rest}
    />
  )
}

export default AppHeaderTitleButton
