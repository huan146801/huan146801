
import { useState, useMemo, useRef } from 'react'

function Content4() {
  // const [show, getShow] = useState(false)

  const[name, setName] = useState('')
  const[price, setPrice] = useState('')
  const[products, setProducts] = useState([])

  const nameRef =useRef()

  const handleSubmit = () => {
    setProducts([...products, {
      name,
      price: Number(price)
    }])
    setName('')
    setPrice('')
    nameRef.current.focus()
  }

  const total = useMemo(() => {
    const result = products.reduce((res, prod) => {
      console.log('Tinh Toan lai')
      return res + prod.price
    }, 0)
    return result
  }, [products])
  return (
    <div style={{padding:'10px 32px'}}>
      {/* <button onClick={()=> getShow(!show)}>Toggle</button>
      {show && <Content3 />} */}
      <input
        ref={nameRef}
        value = {name}
        placeholder="Enter name"
        onChange={e => setName(e.target.value)}
      />
      <br />
      <input
        value = {price}
        placeholder="Enter price"
        onChange={e => setPrice(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Add</button>
      <br />
      Total: {total}
      <ul>
        {products.map((product, index) =>(
          <li key={index}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  ) 
}

export default Content4;
