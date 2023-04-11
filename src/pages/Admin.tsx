import * as React from "react";
import { useGlobalState } from "../context";
import { Link } from "react-router-dom";
import { formattedDate } from "../helpers/formattedDate";
import MissedEmployee from "../components/MissedEmployeeForm";
const Admin = () => {
    const [loading, setLoading] = React.useState(false)
    const [shift, setShift] = React.useState("1")
    const { user, logged, setDay } = useGlobalState()
    const updateTips = (e: any) => {
        e.preventDefault()
        let isDay = false;
        if (shift == "1") {
            return alert("Debes seleccionar un turno.")
        }
        if (shift == "2") {
            isDay = true
        }
        const form = new FormData(e.target)
        //@ts-ignore
        const dateF: string = form.get("date")
        const tips = form.get("tips")
        const date = dateF.split("-").reverse().join("-")
        setLoading(true)
        fetch(`${process.env.API}/api/day/tips`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date,
                tips,
                isDay,
                cc: user.cc
            })
        }).then(res => {
            if (!res) {
                setLoading(false);
                return alert("Hubo un error")
            }
            return res.json()
        }).then(res => {
            setLoading(false)
            const { day } = res
            setDay({
                date: day.date,
                isDay: day.isDay,
                employees: day.employees
            })
            alert("Listo")
        })
    }
    if (!logged || !user.isCashier) {
        return (
            <div className="flex justify-center space-x-2">
                <Link
                    to="/"
                    className="inline-block rounded bg-gray-800 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                    Ingresar
                </Link>
            </div>
        )
    }
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Ingresar propinas
                    </h2>
                </div>
                <div>
                    <h2 className="mt-6 text-center text-1xl font-bold tracking-tight text-gray-900">
                        Ingresa la propina y la fecha
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={updateTips}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="tips" className="sr-only">
                                propinas
                            </label>
                            <input
                                id="tips"
                                name="tips"
                                type="number"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="propinas aquí"
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
                <hr className="border-3 border-gray-800" />
                <MissedEmployee></MissedEmployee>
            </div>
        </div>
    );
};

export default Admin;