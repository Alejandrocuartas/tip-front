import * as React from "react";
import { useGlobalState } from "../context";
import { Link } from "react-router-dom";
import Employee from "../components/Employee";
const Tips = () => {
    const [employees, setEmployees] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const { logged, user } = useGlobalState()
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
    React.useEffect(() => {
        fetch(`${process.env.API}/api/user/tips/total/${user.cc}`, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(r => r.json()).then(r => {
            setEmployees(r.employeesTips)
            let totalTips = 0;
            for (let i = 0; i < r.employeesTips.length; i++) {
                const value = Number(r.employeesTips[i].totalTips.toFixed(0)) - Number(r.employeesTips[i].totalTips.toFixed(0)) % 1000
                totalTips += value
            }
            setTotal(totalTips)
        }).catch(e => {
            console.log(e.message)
            alert("Error: intenta de nuevo.")
        })
    }, [])
    return (
        <div className="flex-col">
            <div>
                {
                    employees.map((e: any) => {
                        return <Employee key={e._id} t={true} cc={e.cc} name={e.name} tips={e.totalTips} />
                    })
                }
                <div
                    className="bg-white hover:bg-blue-300 px-6 py-2 border-b border-gray-800 w-full flex justify-between items-center cursor-pointer"
                >

                    <h6 className="mx-4 font-medium leading-tight text-base mt-0 mb-2 text-white-600">
                        Total:
                    </h6>
                    <h6 className="mx-4 font-medium leading-tight text-base mt-0 mb-2 text-white-600">
                        ${total || 0}
                    </h6>
                </div>
            </div>
        </div>
    );
};

export default Tips;