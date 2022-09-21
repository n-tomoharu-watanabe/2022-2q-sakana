import { Box } from "@chakra-ui/react"
import { FishGrid } from "./components/grid"
import { Title } from "./components/title"

const fishes = import.meta.glob(
  '../public/images/fishes/*.jpg'
)

const fishPaths = Object.entries(fishes).map(([path, image]) => (
  path.replace("../public", "")
))

export const App = () => {
  return (
    <Box bg="lightgray">
      <Box minHeight="100vh" maxWidth="md" margin="0 auto" bg="white">
        <Title />
        <FishGrid paths={fishPaths} />
      </Box>
    </Box>
  )
}