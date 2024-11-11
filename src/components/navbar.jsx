import { Navigate, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();


    return <div className="flex justify-between items-center text-white bg-black font-bold text-4xl p-2 sticky top-0">
        <div className="">Noir Soul</div>
        <div className="flex text-2xl ">
            <div><button onClick={function (j) {
                
                navigate(`/my-tokens`);
            }} className="bg-zinc-800 p-2 m-1 mx-2 rounded-sm">My Token</button></div>
            <div><button onClick={function (j) {
                
                navigate(`/`);
            }} className="bg-zinc-800 p-2 m-1 mx-2 rounded-sm">All Token</button></div>
        </div>




    </div>
}