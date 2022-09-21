import { Box } from "@chakra-ui/react"
import { Card } from "./components/card"
import { Title } from "./components/title"

const fishes = import.meta.glob('../public/images/fishes/*.jpg')

export const App = () => {
  return (
    <Box bg="lightgray">
      <Box minHeight="100vh" maxWidth="md" margin="0 auto" bg="white">
        <Title />
        {Object.entries(fishes).map(([path, image]) => (
          <Card path={path} onClick={() => {
          }} key={path} />
        ))}
      </Box>
    </Box>
  )
}