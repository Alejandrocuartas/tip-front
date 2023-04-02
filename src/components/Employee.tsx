import React from "react";

const Employee = ({name}:{name: string}) => {
    return (
        <div
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
    );
};

export default Employee;