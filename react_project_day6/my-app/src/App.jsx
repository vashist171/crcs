import { useState, useEffect } from "react"

function App() {
  const [count, setcount] = useState(0);
  useEffect(() => {
    console.log("component rendered");
  })

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setcount(count + 1)}>increment</button>


    </div>
  )
}

export default App
