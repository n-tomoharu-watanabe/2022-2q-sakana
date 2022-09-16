import { InfoIcon } from "@chakra-ui/icons"
import { Box, BoxProps, Center, Collapse, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react"
import { useState } from "react"

type CardProps = BoxProps & {
  path: string
}

export const Card = ({ path, onClick, ...props }: CardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isGraphInfoOpen, setIsGraphInfoOpen] = useState(false)

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
          <Box
            width="full"
            maxWidth="md"
            mx="auto"
            position="relative"
          >
            <DrawerHeader borderBottomWidth='1px' py="8px">
              お魚について
            </DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody minH="64px">
              <Text mb="4">
                {fishName}についての説明です。
              </Text>
              <Flex mb="2" justify="space-between" align="center">
                <Heading as="h4" size="md">
                  グラフ
                </Heading>
                <IconButton
                  variant="solid"
                  rounded="full"
                  size="xs"
                  bg="gray.700"
                  color="white"
                  fontSize="20"
                  aria-label='open graph infomation'
                  icon={<InfoIcon />}
                  onClick={() => {
                    setIsGraphInfoOpen(bool => !bool)
                  }}
                />
              </Flex>
              <Collapse in={isGraphInfoOpen} animateOpacity>
                <Text mb="4">
                  グラフについての説明です。
                </Text>
              </Collapse>
              <Center
                h="64px"
                bg="gray.500"
                m="1"
                color="white"
                fontSize="xl"
                rounded="base"
              >
                グラフ画像
              </Center>
            </DrawerBody>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}