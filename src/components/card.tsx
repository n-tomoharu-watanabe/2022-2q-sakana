import { Box, BoxProps, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Image, Text } from "@chakra-ui/react"
import { useState } from "react"

type CardProps = BoxProps & {
  path: string
}

export const Card = ({ path, onClick, ...props }: CardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const fishName = path.match(/[^\/]+(?=\.png)/)?.toString()

  if (!fishName) {
    return null
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      bg="lightblue"
      margin="1"
      rounded="base"
      key={path}
      onClick={e => {
        setIsDrawerOpen(true)
        onClick?.(e)
      }}
      {...props}
    >
      <Text
        width="50%"
        color="white"
        textAlign="center"
        fontSize="1.5em"
      >
        {fishName}
      </Text>
      <Image
        src={path}
        width="50%"
      />
      <Drawer
        placement="bottom"
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px' py="8px">
            お魚について
          </DrawerHeader>
          <DrawerBody minH="64px">
            {fishName}についての説明です。
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}