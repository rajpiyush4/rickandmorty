import {  useState, useRef } from "react"
import Input from "./Input"
import Modal from "./Modal"

const AutoSearch = () => {
    const [results, setResults] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const itemRef = useRef(null)


    return (
        <>
            {openModal && (
                <Modal
                    src={itemRef.current.image}
                    name={itemRef.current.name}
                    origin={itemRef.current.origin}
                    status={itemRef.current.status}
                    onClose={() => {
                        setOpenModal(false)
                    }}
                />)}

            <Input results={results} setResults={setResults} />

            <div className="flex flex-wrap justify-center item-center gap-8"
            >
                {results.map((item, index) => {
                    return <div key={index} className="shadow-lg hover:shadow-none transition-shadow bg-yellow-50 w-[200px] break-words cursor-pointer min-h-[300px] rounded-t text-center pb-2"
                        onClick={() => {
                            setOpenModal(true);
                            itemRef.current = item;
                        }}
                        >

                        <img className="rounded-t mb-2" loading="lazy" width={200} height={200} src={item.image} alt="rick and morty" />
                        <div className='font-semibol'>{item.name}</div>
                        <div className="font-light">Origin: {item.origin.name}</div>
                        <div className="font-light">Status: {item.status}</div>

                    </div>
                })}
            </div>
        </>
    )
}

export default AutoSearch