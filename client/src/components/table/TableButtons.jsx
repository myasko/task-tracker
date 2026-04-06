import { React } from 'react';
import { Button } from "@chakra-ui/react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri"
import EditModal from './EditModal';
import AddModal from './AddModal';

function DeleteButton(params) {
    const handleClick = () => {
        const { data, onDelete } = params;
        onDelete(data.id)
    }
        return(
        <Button onClick={handleClick}>
            <RiDeleteBin2Fill />
        </Button>
    )
}

function EditButton( {data, onUpdate, type }) {
    if (!data?.id) return null;
    const handleClick = (model) => {
        console.log("EditButton clicked " + data.id);
        onUpdate(model)
    }
    return(
        <EditModal onSave={handleClick} data={data} type={type} />
    )
}

function AddButton( { onCreate, type }) {
    const handleClick = (model) => {
        onCreate(model)
    }
    return(
        <AddModal onSave={handleClick} type={type} />
    )
}
export { EditButton, DeleteButton, AddButton } 