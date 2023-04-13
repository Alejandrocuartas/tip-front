import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { useGlobalState } from "../context";
import Modal from "./Modal";
import { formattedDate, isDayShift } from "../helpers/formattedDate";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { logged, user, day, setDay } = useGlobalState()
    const [watchTip, setWatchTip] = useState(false)
    const [tips, setTips] = useState(0)
    const onCloseTip = () => {
        setWatchTip(false)
    }
    const onOpenTip = () => {
        setWatchTip(true)
        setLoading(true)
        fetch(`${process.env.API}/api/user/tips/${user.cc}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            if (!res.ok) {
                setLoading(false)
                return
            }
            return res.json()
        }).then((res: { totalTips: number }) => {
            setLoading(false)
            const int = res.totalTips.toFixed(0)
            setTips(Number(int))
        })
    }
    const markAssist = () => {
        const formatDate = formattedDate()
        let isDay = isDayShift()
        setLoading(true)
        fetch(`${process.env.API}/api/user/assist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ date: formatDate, cc: user.cc, isDay })
        }).then((res) => {
            setLoading(false)
            if (!res.ok) {
                return alert(`error: probablemente elegiste turno incorrecto. Intentalo de nuevo.`)
            }
            return res.json()
        }).then(res => {
            const { day } = res
            setDay({
                date: day.date,
                isDay: day.isDay,
                employees: day.employees,
                tips: day.tips,
            })
            alert("Ya marcaste asistencia.")
        })
    }
    return (<div>
        {
            logged ? (
                <Disclosure as="nav" className="bg-gray-800 sticky top-0">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                                <div className="relative flex h-16 items-center justify-between">
                                    <div className="flex items-center justify-start sm:items-stretch sm:justify-start">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={onOpenTip}
                                                type="button"
                                                className="inline-block rounded bg-white px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-gray-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                                                Ver propinas
                                            </button>
                                        </div>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                        {
                                            day.employees.some((e: any) => e._id === user.id) ? null : (
                                                <div className="flex justify-center space-x-2">
                                                    {
                                                        !loading ? (<button
                                                            onClick={markAssist}
                                                            type="button"
                                                            className="inline-block rounded bg-white px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-gray-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                                                            Marcar asistencia
                                                        </button>) : "Cargando..."
                                                    }
                                                </div>
                                            )
                                        }

                                    </div>
                                    {user.isCashier ? (
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => navigate("/admin")}
                                                    type="button"
                                                    className="inline-block rounded bg-white px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-gray-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                                                    Admin
                                                </button>
                                            </div>
                                        </div>) : null
                                    }
                                </div>
                            </div>
                            <Modal isOpen={watchTip} onClose={onCloseTip}>
                                <div className="flex justify-center">
                                    <div
                                        className="block max-w-sm"
                                    >
                                        <h5
                                            className="mb-2 text-xl font-medium leading-tight text-gray-800">
                                            {user.name}
                                        </h5>
                                        <p className="mb-4 text-base text-gray-800">
                                            ${!loading ? tips : "Cargando..."}
                                        </p>
                                    </div>
                                </div>
                            </Modal>
                        </>
                    )}
                </Disclosure>
            ) : null
        }
    </div>)
}

export default Navbar