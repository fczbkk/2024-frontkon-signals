import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const triple = count * 3
  const isTripleEven = triple % 2 === 0;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Triple: {triple}</p>
      <p>Is triple even: {isTripleEven ? 'yes' : 'no'}</p>
      <p><button onClick={() => setCount(count + 1)}>+1</button></p>
    </div>
  );
}

export default App;
