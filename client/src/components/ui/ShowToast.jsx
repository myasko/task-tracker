import { toaster } from "./toaster";

export default function showErrorToast(error)  {
    console.log("ХЭЙ")
    toaster.create({
                title: "Произошла ошибка",
                description: error.message || "Неизвестная ошибка",
                type: "error",
                duration: 6000,
                closable: true,
        })
}