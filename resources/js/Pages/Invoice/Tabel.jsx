import SearchInput from "@/Components/SearchInput";
import {
    BanknotesIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import Pagination from "@/Components/Pagination";
import EditInvoice from "./Edit";
import DeleteInvoice from "./Delete";
import ShowInvoice from "./Show";
import PaymentAcceptedInvoice from "./PaymentAccepted";

export default function InvoiceTable({ invoices, subscribeds }) {
    const columns = [
        "inv_number",
        "subscribed_id",
        "date_of_use",
        "day_of_use",
        "total_day_of_use",
        "date_of_bill",
        "discount_bill",
        "total_bill",
        "payemented_at",
        "payment_accepted_at",
    ];
    const rows = invoices.data;
    const links = invoices.meta.links;

    const [showModalShow, setShowModalShow] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalPaymentAccepted, setShowModalPaymentAccepted] =
        useState(false);
    const [dataRow, setDataRow] = useState();

    const closeModal = () => {
        setShowModalShow(false);
        setShowModalEdit(false);
        setShowModalDelete(false);
        setShowModalPaymentAccepted(false);
        setDataRow();
    };

    const formatNumber = (number) => {
        return "Rp " + new Intl.NumberFormat("en-IN").format(number);
    };

    return (
        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
            <div className="flex justify-between">
                <div></div>
                <SearchInput />
            </div>
            <div className="w-full overflow-auto py-6">
                <table className="w-full text-left border dark:text-gray-200 ">
                    <thead className="dark:bg-gray-600 font-bold uppercase border text-nowrap">
                        <tr>
                            <th className="p-4">#</th>
                            {columns.map((column, index) => (
                                <th key={index} className="p-4">
                                    {column}
                                </th>
                            ))}
                            <th className="p-4">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows.map((row, num) => (
                                <tr
                                    key={row.id}
                                    className="dark:bg-gray-900 dark:hover:bg-gray-800"
                                >
                                    <td className="px-4 py-2">{++num}</td>
                                    {columns.map((column, index) => (
                                        <td key={index} className="px-4 py-2">
                                            {column === "discount_bill" ||
                                            column === "total_bill"
                                                ? formatNumber(row[column])
                                                : row[column]}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <BanknotesIcon
                                                className="w-5 cursor-pointer text-green-400"
                                                title="Payment accepted"
                                                onClick={() => {
                                                    setDataRow(row);
                                                    setShowModalPaymentAccepted(
                                                        true
                                                    );
                                                }}
                                            />
                                            <EyeIcon
                                                className="w-5 cursor-pointer text-blue-400"
                                                title="Show"
                                                onClick={() => {
                                                    setDataRow(row);
                                                    setShowModalShow(true);
                                                }}
                                            />
                                            <PencilIcon
                                                className="w-5 cursor-pointer text-yellow-400"
                                                title="Edit"
                                                onClick={() => {
                                                    setDataRow(row);
                                                    setShowModalEdit(true);
                                                }}
                                            />
                                            <TrashIcon
                                                className="w-5 cursor-pointer text-red-400"
                                                title="Delete"
                                                onClick={() => {
                                                    setDataRow(row);
                                                    setShowModalDelete(true);
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + 2}
                                    className="p-4 text-center"
                                >
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {rows.length > 0 && <Pagination links={links} />}
            </div>

            {showModalShow && (
                <ShowInvoice
                    showModal={showModalShow}
                    invoice={dataRow}
                    closeModal={closeModal}
                />
            )}
            {showModalEdit && (
                <EditInvoice
                    showModal={showModalEdit}
                    invoice={dataRow}
                    subscribeds={subscribeds}
                    closeModal={closeModal}
                />
            )}
            {showModalDelete && (
                <DeleteInvoice
                    showModal={showModalDelete}
                    invoice={dataRow}
                    closeModal={closeModal}
                />
            )}
            {showModalPaymentAccepted && (
                <PaymentAcceptedInvoice
                    showModal={showModalPaymentAccepted}
                    invoice={dataRow}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}
