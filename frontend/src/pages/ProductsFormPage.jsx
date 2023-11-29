import {useForm} from 'react-hook-form';
import {useProducts} from '../context/ProductsContext';

function ProductsFormPage() {
    const {register,handleSubmit} = useForm();
    const {products, createProduct} = useProducts();
    console.log(products);

    const onSubmit = handleSubmit( (data)=>{
        //console.log(data);
        createProduct(data);
    })
    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
            <input type="text"
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Nombre del producto' 
                {
                    ...register("name")
                }
                autoFocus
            />
            <input type="number" step = "0.10"
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Precio del producto'
                {
                    ...register("price",{
                        valueAsNumber: true,
                    })
                }
            />

            <input type="number" max="2023" min="1980" step = "1"
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='Año del producto'
                {
                    ...register("year",{
                        valueAsNumber: true,
                    })
                }
            />
            <button type='submit'>Guardar</button>
        </form>
        </div>
    )
}

export default ProductsFormPage