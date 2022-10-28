import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiDeleteProduct } from "../../api/apiProduct";
import { useApi } from "../../hooks/useApi";
import { CreateProduct } from "../createProduct/CreateProduct";
import dat from "date-and-time";
import Swal from "sweetalert2";
import ENV from "../../../conf/EnvData";

const { URL_BASE } = ENV;

export const Products = () => {
  const { id, name } = useParams();
  const productRef = React.useRef();
  const navigate = useNavigate();
  const [openCreateProduct, setOpenCreateProduct] = React.useState(false);

  const [total, setTotal] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  const { data: products } = useApi(
    `${URL_BASE}/api/productos?filters[cliente][id][$eq]=${id}`,
    refresh
  );

  useEffect(() => {
    let total_ = 0;
    for (let product of products) {
      total_ += product.attributes.price * product.attributes.quantity;
    }

    setTotal(total_);
  }, [products, refresh]);

  const handleDeleteAll = () => {
    async function deleteAll() {
      for await (const product of products) {
        await apiDeleteProduct(`${URL_BASE}/api/productos/${product.id}`);
      }
    }

    Swal.fire({
      title: "¿Estás seguro?",
      html: `<p class='capitalize'>Eliminar todos los productos de ${name}</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar Todo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Eliminado!",
          "Se eliminaron todos los productos.",
          "success"
        );
        deleteAll().then(() => setRefresh(!refresh));
      }
    });
  };

  const handleDelete = (e) => {
    let id = e.target.getAttribute("index");
    let position = e.target.getAttribute("position");
    let producto = products[position].attributes.product;

    async function deleteProduct() {
      await apiDeleteProduct(`${URL_BASE}/api/productos/${id}`);
    }

    Swal.fire({
      title: "¿Estás seguro?",
      html: `<p class='capitalize'>Eliminar ${producto}</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#d33",
      confirmButtonText: `Si, Eliminar`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct().then(() => setRefresh(!refresh));
      }
    });
  };
  return (
    <div className="lg:p-4  ">
      <h1 className="text-center m-2 text-[30px] font-semibold text-gray-600">
        PRODUCTOS DE {name.toUpperCase()}
      </h1>
      <div className="relative flex gap-10 lg:gap-4">
        <span
          onClick={() => navigate("/")}
          className="text-[30px] p-[0_0_8px_8px] fa-solid fa-users"
        ></span>
        {/* <i class="fa-solid fa-square-plus <i class="fa-solid fa-square-xmark"></i>"></i> */}
        <span
          className="text-[30px] p-[0_0_8px_8px] fa-solid fa-square-plus"
          onClick={() => setOpenCreateProduct(!openCreateProduct)}
        ></span>

        <span
          className="text-[30px] p-[0_0_8px_8px] fa-solid fa-floppy-disk"
          onClick={() => productRef.current.handleCreateProduct()}
        ></span>
      </div>
      <div className="overflow-y-scroll h-[400px] ">
        <table className="table ">
          <thead>
            <tr className="table-dark">
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Fecha/Hora</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {openCreateProduct && (
              <tr>
                <CreateProduct
                  setOpenCreateProduct={setOpenCreateProduct}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  client={id}
                  ref={productRef}
                />
              </tr>
            )}
            {products.map((data, i) => {
              const {
                attributes: { product, price, quantity, datetime },
                id,
              } = data;
              let date = new Date(datetime);
              let newDate = dat.format(date, "DD/MM/YYYY HH:mm");
              return (
                <tr key={id}>
                  <td>
                    <span className="cursor-pointer" id={id}>
                      {product}
                    </span>
                  </td>

                  <td>
                    <span>S/. {price.toFixed(2)}</span>
                  </td>
                  <td>
                    <span>{quantity}</span>
                  </td>
                  <td>
                    <span className="w-max">{newDate}</span>
                  </td>
                  <td>
                    <span
                      onClick={handleDelete}
                      index={id}
                      position={i}
                      className="fa-solid fa-trash"
                    ></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <h2 className="p-3 m-[10px_0] bg-gray-100 rounded-md shadow-sm">
          TOTAL: <span className="pl-2">S/. {total.toFixed(2)}</span>
        </h2>
        <button
          onClick={handleDeleteAll}
          className="p-3 m-[10px_0] bg-red-500 text-gray-100 rounded-md shadow-sm"
        >
          Eliminar Todo
        </button>
      </div>
    </div>
  );
};
