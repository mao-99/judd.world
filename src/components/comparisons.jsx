import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Comparison({database}) {

    // useEffect(() => {
    //     console.log("This is the database: ", database)
    // })
    return (
        <>
            <Outlet />
        </>
    )
}