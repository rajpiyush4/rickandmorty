import { useState, useRef, useEffect } from 'react'
import useDebounce from "../Hooks/UseDebounce"

const Input = ({ results, setResults, page }) => {
    const [showList, setShowList] = useState(false)
    const [search, setSearch] = useState('')
    const listRef = useRef(null)
    const inpRef = useRef(null)
    const debounce = useDebounce(search, 500)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }


    function handleListVisibility(e) {
        if (e.target != inpRef.current && e.target != listRef.current) {
            setShowList(false)
        }
    }

    function query(params) {
        return Object.keys(params).map((key) => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&");
    }


    const apiCalls = async (url) => {
        const queryParams = { name: debounce };
        const queryString = query(queryParams);
        try {
            const res = await fetch(`https://rickandmortyapi.com/api/character/?${queryString}&page=${page}`)

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const item = await res.json()
            setResults(item.results)

        }
        catch (err) {
            setResults([])
        }

    }

    useEffect(() => {
        let abort = false
        if(!abort){
            apiCalls()
        }
        return()=>{
            abort = true
        }
    }, [debounce, page])


    useEffect(() => {
        window.addEventListener('click', handleListVisibility);

        return () => {
            window.removeEventListener('click', handleListVisibility);
        };
    }, []);

    return (
        <>
            <div  className='m-8 relative text-center '>
                <input className='border rounded-md w-[200px] h-[30px] p-1.5 focus:outline-none focus:border-2 focus:border-slate-500' ref={inpRef}  type="text" placeholder="search" onChange={handleChange} value={search} onFocus={() => setShowList(true)} />

               {/* { results.length==0 ? <div>NO RESULTS AVAILABLE!</div>: ''} */}

                {showList && <div className=" overflow-scroll h-[500px] w-[500px] bg-white absolute top-[110%] left-[50%] translate-x-[-50%]" ref={listRef}>
                    {results.map((item, index) => {
                        return <div className=' p-4 border-b-2 cursor-pointer' key={index}
                            onClick={() => setSearch(item.name)}>{item.name}</div>
                    })}
                </div>}
            </div>
        </>
    )
}

export default Input