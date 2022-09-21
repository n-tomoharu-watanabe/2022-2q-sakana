import { Box } from "@chakra-ui/react"
import { Card } from "./components/card"
import { Title } from "./components/title"

const fishes = import.meta.glob('../public/images/fishes/*.png')

function range(length: number) {
  return Array.from({ length }, (_, i) => i)
}

export const App = () => {
  return (
    <Box bg="lightgray">
      <Box minHeight="100vh" maxWidth="md" margin="0 auto" bg="white">
        <Title />
        {Object.entries(fishes).map(([path, image]) => (
          range(30).map((i) => (
            <Card path={path} onClick={() => {
            }} key={`${path}-${i}`} />
          ))
        ))}
      </Box>
    </Box>
  )
}