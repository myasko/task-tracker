
import { useEffect } from "react";
import showErrorToast from "./ui/ShowToast";

export default function ErrorFallBack({error}) {
    console.log("ХЕЙ ХЕЙ")
    useEffect(() => {
        showErrorToast(error);
    }, [error]);

    return null
} 