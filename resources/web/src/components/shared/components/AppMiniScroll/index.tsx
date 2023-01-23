import { BoxProps } from '@chakra-ui/react'
import React from 'react'
import { Col } from '..'
import { AppScroll } from '../AppScroll'

interface AppMiniScrollProps extends BoxProps {}

export const AppMiniScroll: React.FC<AppMiniScrollProps> = ({
  children,
  ...props
}) => {
  return <AppScroll>{children}</AppScroll>
}
