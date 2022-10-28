import { useEffect, useState } from "react";


export const useToken = () => {

    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    return { token };
}

