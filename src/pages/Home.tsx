import * as React from "react";
import { formattedDate, isDayShift } from "../helpers/formattedDate";
import { useGlobalState } from "../context";
import { Link } from "react-router-dom";
const Home = () => {
    const {logged, setDay} = useGlobalState()
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
                date: formattedDate(),
                isDay: isDayShift(),
            }),
        }).then(res => {
            if(!res){
                return alert("Hubo un error")
            }
            return res.json()
        }).then(res => {
            const {day} = res
            setDay({
                date: day.date,
                isDay: day.isDay,
                employees: day.employees
            })
        })
    })
    if(!logged){
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
        <h1>En construcción</h1>
    );
};

export default Home;