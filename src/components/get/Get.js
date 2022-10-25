import React, {useState, useEffect} from 'react';
import {db} from '../../firebase'
 
function Get() {
    const [data, setData] = useState()
    useEffect(() => {
        db.collection("bahromjon").onSnapshot(item => {
            setData(
                item.docs.map(product => ({
                    uniqId : product.id,
                    data: product.data()
                }))
            )
        })
    }, [])
  return <div className='get'>
      {/* <h1>Get</h1> */}
      {
          data?.map(({data}, index) => (
              <div key={index}>
                  <h1>{data.name}</h1>
                  <h2>{data.price}</h2>
                  <h2>{data.madein}</h2>
                  <img src={data.image} alt="" />
              </div>
          ))
      }

  </div>;
}

export default Get;
