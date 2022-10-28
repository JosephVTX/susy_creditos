import React, {forwardRef, useImperativeHandle} from "react";
import ENV from "../../../conf/EnvData";
import { apiCreateProduct } from "../../api/apiProduct";


const initialState = {
  product: "",
  price: "",
  quantity: ""
}

const {URL_BASE} = ENV
export const CreateProduct = forwardRef(({setRefresh, refresh, client}, ref) => {


  const [dataProduct, setDataProduct] = React.useState(initialState);

  const handleCreateProduct = () => {
    
    if(!dataProduct == "" && !dataProduct.price == "" && !dataProduct.quantity == ""){

      apiCreateProduct(URL_BASE + "/api/productos/", {

        ...dataProduct,
        cliente: client,
        datetime: new Date().toISOString()
      }).then(()=> setRefresh(!refresh)).finally(()=> setDataProduct(initialState))
    }
  }

  useImperativeHandle(ref, ()=>{
    return{
      handleCreateProduct
    }
  })
  return (
    <>
      
        <td >
          
          <input onChange={e => setDataProduct({...dataProduct, product: e.target.value })} type="text"  placeholder="producto" className="outline-none border " value={dataProduct.product} />
        </td>
        <td >
          <input onChange={e => setDataProduct({...dataProduct, price: e.target.value })} type="number" className="outline-none border " value={dataProduct.price} />
        </td>
        <td >
          <input onChange={e => setDataProduct({...dataProduct, quantity: e.target.value })} type="number" className="outline-none border " value={dataProduct.quantity} />
        </td>
        <td className="w-[25%]">
          <span>Fecha Actual</span>
        </td>
        <td className="w-[25%]">
            <span onClick={handleCreateProduct} className="fa-solid fa-floppy-disk"></span>
        </td>
      
    </>
  );
})

