import React, {useState, } from 'react';
import './Send.css'
import {db} from '../../firebase'

function Send() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [madein, setMadein] = useState("")
    const [image, setImage] = useState("")

    const crateProduct = (e) => {
        e.preventDefault();
        db.collection("bahromjon").add({
            name:name,
            price:price,
            madein:madein,
            image:image
        })
        setName("")
        setPrice("")
        setMadein("")
        setImage("")
    }
  return <div className='send'>
      <h1>Send</h1>
      <form onSubmit={crateProduct} >
        <input type="text" placeholder='name' value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder='price' value={price} onChange={e => setPrice(e.target.value)} />
        <input type="text" placeholder='made in' value={madein} onChange={e => setMadein(e.target.value)} />
        <input type="text" placeholder='image' value={image} onChange={e => setImage(e.target.value)} />
        <button type='submit'> Submit</button>
      </form>
  </div>;
}

export default Send;
