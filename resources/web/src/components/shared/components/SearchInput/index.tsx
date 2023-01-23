import { CloseButton, Input } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { Row } from '../Row'

interface SearchInputProps {
  onChange?: (text: string) => void
  value: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  value,
}) => {
  return (
    <Row pos={'relative'} alignItems={'center'}>
      <Input
        placeholder="Pesquisar Contato..."
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange?.(e.target.value)
        }}
      />
      {value.length > 0 && (
        <CloseButton
          size={'sm'}
          pos={'absolute'}
          right={4}
          onClick={() => {
            onChange?.('')
          }}
          zIndex={20}
        />
      )}
    </Row>
  )
}
