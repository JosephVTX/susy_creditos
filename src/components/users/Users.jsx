import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ENV from "../../../conf/EnvData";
import { useApi} from "../../hooks/useApi";

const {URL_BASE} = ENV

export const Users = () => {
    const [inputValue, setInputValue] = useState("");
    const { data: clients } = useApi(`${URL_BASE}/api/clientes?sort=createdAt:desc&filters[name][$startsWith]=${inputValue}`, inputValue);
    
    const navigate = useNavigate()
  return (
    <div className="table-responsive p-4">
      <h1 className="text-center text-[30px] m-2 font-semibold text-gray-500">TODOS LOS CLIENTES</h1>
      <div className="float-right flex gap-2 items-center">
          <span className="fa-solid fa-magnifying-glass text-[25px] text-gray-400"></span>
          <input onChange={e => setInputValue(e.target.value)} type="text" placeholder="Buscar..." className="h-[40px] border outline-none px-2 rounded-md" />
      </div>

      <div>
        <span onClick={()=> navigate("/create-user")} className="fa-solid fa-user-plus text-[25px] pl-3"></span>
        
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Dni</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const {
              attributes: { name, dni },
              id, 
            } = client;

            return (
              <tr key={id}>
                <td><span onClick={(e) => navigate(`/products/${id}/${name}`)} className="cursor-pointer" id={id}>{name}</span></td>

                <td><span id={id}>{dni}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <span onClick={()=> {localStorage.clear(); window.location.reload(false);}} className="fa-solid fa-right-from-bracket text-[25px] absolute bottom-4 right-4 text-gray-500"></span>
    </div>
  );
};
