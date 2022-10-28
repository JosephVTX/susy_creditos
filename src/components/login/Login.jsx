import React from "react";
import { toast } from "react-toastify";
import { apiLogin } from "../../api/apiLogin";

export const Login = () => {
  const [dataLogin, setDataLogin] = React.useState({});

  const handleLogin = (e) => {
    e.preventDefault();

    /* apiLogin(dataLogin).then(res => {localStorage.setItem("token", res.data.jwt)}).then(() => {window.location.href = "/"}) */

    toast
      .promise(apiLogin(dataLogin), {
        pending: {
          position: "top-right",
          render: () => <p>Cargando...</p>,
        },
        success: {
          position: "top-right",
          render: () => <p>¡Bienvenido!</p>,
        },
        error: {
            position: "top-right",
            render: () => <p>Datos Incorrectos</p>,
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
      })
      .then(() => {
        window.location.href = "/";
      });
  };

  return (
    <div className="w-[20rem] m-[1rem_auto]">
      <h2 className="text-center text-[28px] text-gray-500">INGRESAR</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="user">Usuario</label>
          <input
            onChange={(e) =>
              setDataLogin({ ...dataLogin, identifier: e.target.value })
            }
            type="text"
            className="h-[2.25rem] border rounded-md outline-none px-2"
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            onChange={(e) =>
              setDataLogin({ ...dataLogin, password: e.target.value })
            }
            type="password"
            className="h-[2.25rem] border rounded-md outline-none w-full px-2"
          />
        </div>

        <button className="bg-indigo-500 p-3 w-full rounded-md text-gray-100">
          INGRESAR
        </button>
      </form>
    </div>
  );
};
