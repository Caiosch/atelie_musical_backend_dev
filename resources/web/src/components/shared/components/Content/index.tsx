import { Box, BoxProps } from '@chakra-ui/react'

export const Content: React.FC<BoxProps> = (props) => {
  return <Box w={1200} maxW={'100%'} mx={'auto'} {...props} />
}
