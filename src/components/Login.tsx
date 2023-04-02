import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context";

const Login = () => {
    const [loading, setLoading] = React.useState(false)
    const {setUser, setLogged} = useGlobalState()
    const navigate = useNavigate()
    const login = (e: any) => {
        const form = new FormData(e.target)
        e.preventDefault()
        const name = form.get("name")
        const cc = form.get("cc")
        const confirm = form.get("confirm")
        if(cc != confirm){
            return alert("Cédula incorrecta. Escribila bien.")
        }
        setLoading(true)
        fetch(`${process.env.API}/api/user/auth`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cc, name }),
            method: "POST"
        }).then(res => {
            if(!res){
                setLoading(false)
                return alert("Hubo un error.")
            }
            return res.json()
        }).then(data => {
            setLoading(false)
            setUser({
                name: data.employee.name,
                cc: data.employee.cc,
                isCashier: data.employee.isCashier,
                id: data.employee._id
            })
            setLogged(true)
            navigate("/home")
        })
    }
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Ingresa los datos
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={login}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="cc" className="sr-only">
                                Cédula
                            </label>
                            <input
                                id="cc"
                                name="cc"
                                type="number"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="número de cédula"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm" className="sr-only">
                                Cédula confirmar
                            </label>
                            <input
                                id="confirm"
                                name="confirm"
                                type="number"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="confirma cédula"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Nombre y apellidos
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="nombres y apellidos"
                            />
                        </div>
                    </div>
                    <div>
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <h1>Cargando...</h1>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Entrar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;