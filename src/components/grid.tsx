import { InfoIcon } from "@chakra-ui/icons"
import { Box, Collapse, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, Heading, IconButton, Image, Link, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useWikipediaLeadText } from "../api/wikipedia"

type FishCardProps = {
  path: string
}

const FishCard = (props: FishCardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isGraphInfoOpen, setIsGraphInfoOpen] = useState(false)
  const [isLeadTextOpen, setIsLeadTextOpen] = useState(false)

  const fishName = props.path.match(/[^\/]+(?=\.jpg)/)?.toString()

  if (!fishName) {
    return null
  }

  const [leadText] = useWikipediaLeadText(fishName)

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
            maxHeight="full"
            overflow="scroll"
            mx="auto"
            position="relative"
          >
            <DrawerHeader borderBottomWidth='1px' py="8px">
              お魚について
            </DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody minH="64px">
              <Box
                mb="4"
                cursor="pointer"
                _hover={{
                  opacity: "0.7",
                }}
              >
                <Collapse
                  startingHeight="48px"
                  in={isLeadTextOpen}
                >
                  <Text
                    display="inline"
                    onClick={() => setIsLeadTextOpen(bool => !bool)}
                  >
                    {leadText}
                  </Text>
                  <Link
                    href={`https://ja.wikipedia.org/wiki/${fishName}`}
                    isExternal
                    fontSize="sm"
                    color='teal.500'
                    zIndex="1"
                  >
                    引用： Wikipedia
                  </Link>
                </Collapse>
              </Box>
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
                <Box
                  border="solid 1px gray"
                  rounded="md"
                  p="2"
                  mb="2"
                >
                  <Heading 
                    as="h5" 
                    size="md"
                    mx="1"
                    mb="1"
                  >
                    最大持続生産量（MSY）とは
                  </Heading>
                  <Text
                    ml="1"
                    mb="1"
                  >
                    資源量を減少させず、持続的に魚を獲り続けることが出来る最大の漁獲量のこと。
                  </Text>
                  <Image
                    src={import.meta.env.BASE_URL + "images/msy-info.png"}
                  />
                </Box>
              </Collapse>
              <Box
                position="relative"
              >
                <Image
                  src={import.meta.env.BASE_URL + "images/msy-graph.png"}
                  border="1px solid gray"
                  rounded="md"
                  p="2"
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"

                  background="white"
                  opacity="0.6"
                  rounded="md"

                  m="1px"
                />
                <Text
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="auto"
                  translateX="-50%"
                  translateY="-50%"
                  align="center"
                  background="rgba(255, 255, 255, 0.9)"
                  whiteSpace="nowrap"
                  border="1px solid gray"
                  rounded="md"
                  p="2"
                >
                  MSYグラフのイメージ画像です
                </Text>

                <Link
                  position="absolute"
                  bottom="0"
                  right="0"
                  href="http://chiur.blue.coocan.jp/ee/ee09.htm"
                  isExternal
                  fontSize="sm"
                  mx="1.5"
                  my="0.5"
                  color='teal.500'
                >
                  http://chiur.blue.coocan.jp/ee/ee09.htm
                </Link>
              </Box>
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
