import { Box, BoxProps, Image, Text } from "@chakra-ui/react"

type CardProps = BoxProps & {
  path: string
}

export const Card = ({ path, ...props }: CardProps) => {
  return (
    <Box 
      display="flex"
      alignItems="center"
      bg="lightblue" 
      margin="1"
      rounded="base"
      key={path} 
      {...props}
    >
      <Text
        width="50%"
        color="white"
        textAlign="center"
        fontSize="1.5em"
      >
        {path.match(/[^\/]+(?=\.png)/)}
      </Text>
      <Image
        src={path}
        width="50%"
      />
    </Box>
  )
}