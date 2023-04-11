import React, { useState } from "react";
import { formattedDate } from "../helpers/formattedDate";
import { useGlobalState } from "../context";
const MissedEmployee = () => {
    const { user } = useGlobalState()
    const [loading, setLoading] = useState(false)
    const [shift, setShift] = useState("1")
    const register = (e: any) => {
        e.preventDefault()
        let isDay: boolean = false
        if (shift === "1") {
            return alert("Por favor selecciona turno")
        }
        if (shift === "2") {
            isDay = true
        }
        const form = new FormData(e.target)
        const cc = form.get("cc")
        const ccc = form.get("ccc")
        let date = form.get("date")
        if (cc !== ccc) {
            return alert("Cédula incorrecta")
        }
        setLoading(true)
        fetch(`${process.env.API}/api/day/missed`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ccAdmin: user.cc,
                cc,
                //@ts-ignore
                date: date.split("-").reverse().join("-"),
                isDay
            })
        }).then(res => {
            if (!res) {
                setLoading(false);
                return alert("Hubo un error")
            }
            setLoading(false)
            alert("Listo")
        })
    }
    return (
        <div>
            <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Ingresar empleado que olvidó marcar
                </h2>
            </div>
            <div>
                <h4 className="mt-6 text-center text-1xl font-bold tracking-tight text-gray-900">
                    Ingresa la cédula, la fecha y el turno del empleado
                </h4>
            </div>
            <form className="mt-8 space-y-6" onSubmit={register}>
                <input type="hidden" name="remember" value="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <input
                            id="cc"
                            name="cc"
                            type="number"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Cédula"
                        />
                    </div>
                    <div>
                        <input
                            id="ccc"
                            name="ccc"
                            type="number"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Confirmar cédula"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="sr-only">
                            fecha
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            defaultValue={formattedDate().split("-").reverse().join("-")}
                            required
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <div className="mb-3 mt-3 bg-gray-600 xl:w-96">
                                <select data-te-select-init onChange={(e) => setShift(e.target.value)}>
                                    <option value="1">Selecciona turno</option>
                                    <option value="2">Día</option>
                                    <option value="3">Noche</option>
                                </select>
                            </div>
                        </div>
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
                            Actualizar
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default MissedEmployee