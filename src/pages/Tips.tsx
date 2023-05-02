import * as React from "react";
import { useGlobalState } from "../context";
import { Link } from "react-router-dom";
import Employee from "../components/Employee";
const Tips = () => {
    const [employees, setEmployees] = React.useState([])
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
        }).catch(e => alert("Error: intenta de nuevo."))
    }, [])
    return (
        <div className="flex-col">
            <div>
                {
                    employees.map((e: any) => {
                        return <Employee key={e._id} t={true} cc={e.cc} name={e.name} tips={e.totalTips} />
                    })
                }
            </div>
        </div>
    );
};

export default Tips;