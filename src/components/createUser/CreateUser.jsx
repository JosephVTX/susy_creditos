import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ENV from "../../../conf/EnvData";
import { apiCreateUser } from "../../api/apiUser";

const {URL_BASE} = ENV
export const CreateUser = () => {
  const [dataForm, setDataForm] = React.useState({});
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    if (dataForm.name) {
      toast
        .promise(
          apiCreateUser(URL_BASE+"/api/clientes", dataForm),
          {
            pending: {
              position: "top-center",
              render: () => <p>Creando...</p>,
            },
            success: {
              position: "top-center",
              render: () => <p>Usuario creado</p>,
            },
            error: "Ups! Al parecer hubo error 🤯",
          }
        )
        .finally(() => navigate("/"));
    }
  };

  return (
    <div className="w-full absolute top-0 flex justify-center mt-2">
      <form onSubmit={submit} className="flex flex-col w-[18.75rem] gap-4">
        <h2 className="text-[1.5rem] font-semibold text-gray-600 text-center">
          CREAR CLIENTE
        </h2>
        <input
          onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
          type="text"
          placeholder="Nombre"
          className="px-2 border outline-none h-[3rem] rounded-md"
        />
        <input
          onChange={(e) => setDataForm({ ...dataForm, dni: e.target.value })}
          type="number"
          placeholder="DNI"
          className="px-2 border outline-none h-[3rem] rounded-md"
        />
        <div className="grid grid-cols-2 gap-2">
          <button
            type="submit"
            className="bg-indigo-600 py-3 rounded-md text-gray-200"
          >
            CREAR
          </button>
          <input
            onClick={() => navigate("/")}
            type="button"
            value="CANCELAR"
            className="bg-gray-500 py-3 rounded-md text-gray-200"
          />
        </div>
      </form>
    </div>
  );
};
