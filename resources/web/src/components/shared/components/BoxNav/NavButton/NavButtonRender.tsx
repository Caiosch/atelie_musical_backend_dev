import { Text } from '@chakra-ui/layout'
import { NavbarButtonRenderProps } from '..'
import { Row } from '../..'

export function NavButtonRender(props: NavbarButtonRenderProps) {
  return (
    <Row
      alignItems="center"
      h="100%"
      px={4}
      bg={props.isActive ? 'primary.500' : 'transparent'}
    >
      <Text fontSize="xs">{props.label}</Text>
    </Row>
  )
}
