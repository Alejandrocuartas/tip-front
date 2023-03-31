import * as React from "react";
import { formattedDate, isDayShift } from "../helpers/formattedDate";
import { useGlobalState } from "../context";
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
    return (
        <h1>hi</h1>
    );
};

export default Home;