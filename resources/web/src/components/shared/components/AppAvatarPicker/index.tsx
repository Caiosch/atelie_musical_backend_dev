import { Circle, Img, Input } from '@chakra-ui/react'
import React, { ChangeEvent, useRef, useState } from 'react'
import { AiOutlineClose, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai'

interface AppAvatarPickerProps {
  initialAvatar?: string
  onChange?: (avatar: File) => void
}

const AppAvatarPicker: React.FC<AppAvatarPickerProps> = ({
  initialAvatar,
  onChange,
}) => {
  const [src, setSrc] = useState(initialAvatar)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Input
        type={'file'}
        display={'none'}
        ref={inputRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const files = Array.from(e.target.files || [])
          if (files.length <= 0) {
            return
          }
          const [file] = files

          setSrc(() => URL.createObjectURL(file))
          onChange?.(file)
        }}
      />
      <Circle
        size={20}
        bg={'primary.100'}
        border={'2px solid transparent'}
        borderColor={'primary.500'}
        color={'primary.500'}
        pos={'relative'}
      >
        {!src && <AiOutlineUser size={50} />}
        {src && (
          <Img
            w={'100%'}
            h={'100%'}
            rounded={'50%'}
            objectFit={'cover'}
            src={src}
            pos={'relative'}
            zIndex={10}
          />
        )}
        <Circle
          pos={'absolute'}
          right={0}
          bottom={0}
          size={6}
          bg={'white'}
          color={src ? 'red.500' : 'primary.600'}
          border={'2px solid transparent'}
          borderColor={'primary.600'}
          zIndex={20}
          cursor={'pointer'}
          onClick={() => {
            if (src) {
              setSrc(() => '')
            } else {
              inputRef.current?.click()
            }
          }}
        >
          {src ? <AiOutlineClose /> : <AiOutlinePlus />}
        </Circle>
      </Circle>
    </>
  )
}

export default AppAvatarPicker
