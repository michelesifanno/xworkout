import { useState } from 'react'
import { Provider } from "./components/ui/provider"
import { Heading } from "@chakra-ui/react"
import DebounceSearch from './components/app/DebounceSearch'



function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider>
      <Heading>I'm a Heading</Heading>
      <DebounceSearch />

    </Provider>
  )
}

export default App
