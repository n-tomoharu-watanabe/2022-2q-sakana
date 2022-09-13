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
      bg="blue.300"
      _hover={{
        bg: "blue.200",
      }}
      margin="2"
      rounded="base"
      cursor="pointer"
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
          <Box width="full" maxWidth="md" mx="auto">
            <DrawerHeader borderBottomWidth='1px' py="8px">
              お魚について
            </DrawerHeader>
            <DrawerBody minH="64px">
              {fishName}についての説明です。
            </DrawerBody>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}