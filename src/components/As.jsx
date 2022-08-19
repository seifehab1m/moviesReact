import React , {useContext} from 'react'
import { counterContext } from './Context/Store';
import {useSelector, useDispatch} from 'react-redux'
import { decrement, increment } from './Redux/CreateSlice';

export default function As() {

{/* //-------- context---------------- */}

    // let context=useContext(counterContext)
    // console.log(context);
{/* //-------- end context---------------- */}

{/* //-------- Redux---------------- */}

let count = useSelector((state)=>state.counter.value)
let dispatch=useDispatch();
{/* //-------- Redux---------------- */}



  return (
    <div>As {count}
    <button onClick={()=>dispatch(increment())} className='btn btn-danger'> increment</button>
    <button onClick={()=>dispatch(decrement())} className='btn btn-danger'> decrement</button>
    </div>

  )
}
