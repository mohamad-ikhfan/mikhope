import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

export function TableAction({ data, show, edit, destroy }) {
    return (
        <div className="flex gap-2 justify-start">
            <EyeIcon
                className="w-5 cursor-pointer text-blue-400"
                title="Show"
                onClick={() => show(data)}
            />
            <PencilIcon
                className="w-5 cursor-pointer text-yellow-400"
                title="Edit"
                onClick={() => edit(data)}
            />
            <TrashIcon
                className="w-5 cursor-pointer text-red-400"
                title="Delete"
                onClick={() => destroy(data)}
            />
        </div>
    );
}
