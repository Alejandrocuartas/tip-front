import React from "react";

import Modal from "./Modal";
import { useGlobalState } from "../context";

const Employee = ({ name, cc }: { name: string, cc: string }) => {
    const { user, day, setDay } = useGlobalState()
    const [loading, setLoading] = React.useState(false)
    const [isOpen, setOpen] = React.useState(false)
    const onClose = () => {
        setOpen(false)
    }
    const onOpen = () => {
        if (user.isCashier) {
            setOpen(true)
        }
    }
    const deleteEmployee = () => {
        setLoading(true)
        fetch(`${process.env.API}/api/user/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cc,
                ccAdmin: user.cc,
                date: day.date,
                isDay: day.isDay,
            }),
        }).then(res => {
            if (!res.ok) {
                setLoading(false)
                alert("Error")
                return
            }
            return res.json()
        }).then((res: { day: any }) => {
            setLoading(false)
            const { day } = res
            setDay({
                date: day.date,
                isDay: day.isDay,
                employees: day.employees,
                tips: day.tips
            })
        })
    }
    return (
        <>
            <div
                onClick={onOpen}
                className="bg-white hover:bg-blue-300 px-6 py-2 border-b border-gray-800 w-full flex justify-start items-center cursor-pointer"
            >
                <img
                    className="h-12 w-12 rounded-full"
                    src="https://th.bing.com/th/id/OIP.YOOu1TE3CHBdCFhVjHaYxQHaHa?pid=ImgDet&rs=1"
                    alt="user profile"
                />
                <h6 className="mx-4 font-medium leading-tight text-base mt-0 mb-2 text-white-600">
                    {name}
                </h6>


            </div>
            <Modal onClose={onClose} isOpen={isOpen}>
                <div data-te-modal-body-ref className="relative p-4">Desea borrar a {name} de {day.date}?</div>
                {
                    loading ? "Cargando..." : (
                        <div>
                            <div
                                className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <button
                                    type="button"
                                    className="inline-block rounded bg-gray-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                    onClick={onClose}
                                >
                                    No
                                </button>
                                <button
                                    onClick={deleteEmployee}
                                    type="button"
                                    className="inline-block rounded bg-red-600 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-gray-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                >
                                    Borrar
                                </button>
                            </div>
                        </div>
                    )
                }

            </Modal>
        </>
    );
};

export default Employee;