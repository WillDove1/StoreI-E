import {createContext, useContext, useState} from "react";
import {createProductRequest, getProductsRequest} from '../api/products'

const ProductsContext = createContext();

export const useProducts = ()=>{
    const context = useContext(ProductsContext);

    if(!context){
        throw new Error("useProducts debe estar dentro de un ProductsProvider")
    }

    return context;
}

export function ProductsProvider( {children}){
    const [products, setProducts] = useState([])

    const createProduct = async (product) =>{
        try {
            //console.log(product);
            await createProductRequest(product);
            getProducts();
        } catch (error) {
            
        }
    }

    const getProducts = async ()=>{
        try{
            const res = await getProductsRequest();
            setProducts(res.data);
            //console.log(res);
        }catch(error){
            console.log(error);
        }
    }


    return(
        <ProductsContext.Provider value={{
            products,
            createProduct,
            getProducts
        }}>
            {children}
        </ProductsContext.Provider>
    )
}