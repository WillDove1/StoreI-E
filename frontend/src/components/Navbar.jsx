import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext';

function Navbar(){
    const {isAuthenticated, logout, user} = useAuth();
    return(
        <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounden-lg'>
            <Link to='/'>
            <h1 className='text-2x1 font-bold'>Productos</h1>
            </Link>
            <ul className='flex gap-x-2'>
                {
                    isAuthenticated ? (
                        <>
                            <li>
                                Bienvenido {user.username}
                            </li>
                            <li>
                                <Link to='/add-prduct' className='bg-zinc-500 px-4 py-1 rounded-sm'> Agregar Product</Link>
                            </li>
                            <li>
                                <Link to='/' onClick={()=>{logout()}} className='bg-zinc-500 px-4 py-1 rounded-sm'>Cerrar Sesión</Link>
                            </li>
                        
                        </>
                    ) : (
                        <>

                            <li>
                                <Link to='/login' className='bg-zinc-500 px-4 py-1 rounded-sm'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register' className='bg-zinc-500 px-4 py-1 rounded-sm'>Register</Link>
                            </li>
                        
                        </>
                    )
                }
            </ul>

        </nav>
    )
}

export default Navbar