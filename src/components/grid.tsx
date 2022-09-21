import { InfoIcon } from "@chakra-ui/icons"
import { Box, Center, Collapse, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, Heading, IconButton, Image, Text } from "@chakra-ui/react"
import { useState } from "react"

type FishCardProps = {
  path: string
}

const FishCard = (props: FishCardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isGraphInfoOpen, setIsGraphInfoOpen] = useState(false)

  const fishName = props.path.match(/[^\/]+(?=\.jpg)/)?.toString()

  if (!fishName) {
    return null
  }

  return (
    <Box
      width="100%"
      display="flex"
      flexFlow="row"
      onClick={() => setIsDrawerOpen(true)}
    >
      <Box>
        <Box
          width="100%"
          rounded="md"
          shadow="lg"
          _hover={{
            shadow: "2xl"
          }}
          cursor="pointer"
          transition="all 0.2s"
        >
          <Text
            bg="blue.300"
            color="white"
            roundedTop="md"
            px="1"
          >
            {fishName}
          </Text>
          <Image
            src={import.meta.env.BASE_URL + props.path.slice(1)}
            overflow="hidden"
            roundedBottom="md"
            loading="lazy"
          />
        </Box>
      </Box>

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

type FishGridProps = {
  paths: string[]
}

export const FishGrid = (props: FishGridProps) => {
  return (
    <Grid

      gridTemplateColumns={'1fr 1fr'}
      gap='1.5'
      color='blackAlpha.700'
      padding='1.5'
    >
      {props.paths.map(path => (
        <FishCard path={path} key={path} />
      ))}
    </Grid>
  )
}
