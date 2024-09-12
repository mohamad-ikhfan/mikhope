import SearchInput from "@/Components/SearchInput";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Pagination from "@/Components/Pagination";
import EditClient from "./Edit";
import DeleteClient from "./Delete";
import ShowClient from "./Show";

export default function ClientTable({ clients }) {
    const rows = clients.data;
    const links = clients.meta.links;

    const [showModalShow, setShowModalShow] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataRow, setDataRow] = useState();

    const closeModal = () => {
        setShowModalShow(false);
        setShowModalEdit(false);
        setShowModalDelete(false);
        setDataRow();
    };

    return (
        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
            <div className="w-full overflow-auto py-6">
                <table className="w-full text-left border dark:text-gray-200 ">
                    <thead className="dark:bg-gray-600 font-bold uppercase border text-nowrap">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="p-4">identity number</th>
                            <th className="p-4">full name</th>
                            <th className="p-4">phone</th>
                            <th className="p-4">email</th>
                            <th className="p-4">address</th>
                            <th className="p-4">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className="dark:bg-gray-900 dark:hover:bg-gray-800"
                                >
                                    <td className="px-4 py-2">{++index}</td>
                                    <td className="px-4 py-2">
                                        {row.identity_number}
                                    </td>
                                    <td className="px-4 py-2">
                                        {row.full_name}
                                    </td>
                                    <td className="px-4 py-2">{row.phone}</td>
                                    <td className="px-4 py-2">{row.email}</td>
                                    <td className="px-4 py-2">{row.address}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
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
                                <td colSpan={7} className="p-4 text-center">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {rows.length > 0 && <Pagination links={links} />}
            </div>

            {showModalShow && (
                <ShowClient
                    showModal={showModalShow}
                    client={dataRow}
                    closeModal={closeModal}
                />
            )}
            {showModalEdit && (
                <EditClient
                    showModal={showModalEdit}
                    client={dataRow}
                    closeModal={closeModal}
                />
            )}
            {showModalDelete && (
                <DeleteClient
                    showModal={showModalDelete}
                    client={dataRow}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}
