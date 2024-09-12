import {
    BanknotesIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";

export default function TableAction({
    data,
    show,
    edit,
    destroy,
    paymentAccept,
}) {
    return (
        <div className="flex gap-2 justify-start">
            {paymentAccept && (
                <BanknotesIcon
                    className="w-5 cursor-pointer text-green-400"
                    title="Accept payment"
                    onClick={() => paymentAccept(data)}
                />
            )}
            {show && (
                <EyeIcon
                    className="w-5 cursor-pointer text-blue-400"
                    title="Show"
                    onClick={() => show(data)}
                />
            )}
            {edit && (
                <PencilIcon
                    className="w-5 cursor-pointer text-yellow-400"
                    title="Edit"
                    onClick={() => edit(data)}
                />
            )}
            {destroy && (
                <TrashIcon
                    className="w-5 cursor-pointer text-red-400"
                    title="Delete"
                    onClick={() => destroy(data)}
                />
            )}
        </div>
    );
}
