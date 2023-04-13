import * as React from "react";
import { formattedDate, isDayShift } from "../helpers/formattedDate";
import { useGlobalState } from "../context";
import { Link } from "react-router-dom";
import Employee from "../components/Employee";
const CheckDays = () => {
    const { logged, setDay, day } = useGlobalState()
    const [isDay, setIsDay] = React.useState(isDayShift())
    const [date, setDate] = React.useState(formattedDate())
    React.useEffect(() => {
        if (!logged) {
            return
        }
        fetch(`${process.env.API}/api/day/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date,
                isDay,
            }),
        }).then(res => {
            if (!res) {
                return alert("Hubo un error")
            }
            return res.json()
        }).then(res => {
            const { day } = res
            setDay({
                date: day.date,
                isDay: day.isDay,
                employees: day.employees,
                tips: day.tips
            })
        })
    }, [isDay, date])
    if (!logged) {
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
    if (day.employees.length === 0) {
        <h1>Aún no hay personas registradas hoy.</h1>
    }
    return (
        <div className="flex-col">

            <div className="flex-row">
                <div className="flex justify-between">
                    <input type="date" max={formattedDate().split("-").reverse().join("-")} onChange={(e) => setDate(e.target.value.split("-").reverse().join("-"))} defaultValue={formattedDate().split("-").reverse().join("-")} />
                    <span>Propinas del día: ${day.tips}</span>
                </div>
                <div>
                    <div className="flex justify-center">
                        <div className="mb-3 mt-3 bg-gray-600 xl:w-96">
                            <select data-te-select-init onChange={(e) => {
                                if (e.target.value === "1") {
                                    setIsDay(false)
                                }
                                if (e.target.value === "2") {
                                    setIsDay(true)
                                }
                            }}>
                                <option value="0">Selecciona turno</option>
                                <option value="1">Turno noche</option>
                                <option value="2">Turno día</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-3 border-gray-800" />
            <div>
                {
                    day.employees.map((e: any) => {
                        return <Employee key={e._id} cc={e.cc} name={e.name} />
                    })
                }
            </div>
        </div>
    );
};

export default CheckDays;