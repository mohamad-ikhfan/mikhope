import SearchInput from "@/Components/SearchInput";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Pagination from "@/Components/Pagination";
import ShowPacket from "./Show";
import EditPacket from "./Edit";
import DeletePacket from "./Delete";

export default function PacketTable({ packets }) {
    const columns = ["name", "price", "desciption"];
    const rows = packets.data;
    const links = packets.meta.links;

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
                    <thead className="dark:bg-gray-600 font-bold uppercase border">
                        <tr>
                            <th className="p-4">#</th>
                            {columns.map((column, index) => (
                                <th key={index} className="p-4">
                                    {column.replace("_", " ")}
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
                                            {column === "price"
                                                ? formatNumber(row[column])
                                                : row[column]}
                                        </td>
                                    ))}
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
                <ShowPacket
                    showModal={showModalShow}
                    packet={dataRow}
                    closeModal={closeModal}
                />
            )}
            {showModalEdit && (
                <EditPacket
                    showModal={showModalEdit}
                    packet={dataRow}
                    closeModal={closeModal}
                />
            )}
            {showModalDelete && (
                <DeletePacket
                    showModal={showModalDelete}
                    packet={dataRow}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}
