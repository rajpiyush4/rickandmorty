import { useEffect, useState } from "react"


const useDebounce = (input, delay=500) => {
    const [debounce, setDebounce] = useState('')

    useEffect(() => {
    
           const  id = setTimeout(() => {
                setDebounce(input)
            }, delay);

            return (() => {
                clearTimeout(id)
            })
        

    }, [delay, input])

    return debounce
}



export default useDebounce;