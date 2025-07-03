import { useState } from 'react'
import { Provider } from "./components/ui/provider"
import { Heading } from "@chakra-ui/react"
import DebounceSearch from './components/app/DebounceSearch'
import ExerciseFetcher from './components/app/ExerciseFetcher'



function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider>
      <Heading>I'm a Heading</Heading>
      <ExerciseFetcher />
      <DebounceSearch />

    </Provider>
  )
}

export default App
