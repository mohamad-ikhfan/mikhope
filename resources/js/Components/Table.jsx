import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

const Table = ({ columns, rows, show, children }) => {
    const [rowData, setRowData] = useState([]);
    return (
        <DataContext.Provider value={{ rowData, setRowData }}>
            <table className="w-full text-left border dark:text-gray-200 ">
                <thead className="dark:bg-gray-600 font-bold uppercase border">
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
                                        {row[column]}
                                    </td>
                                ))}
                                <td className="px-4 py-2">
                                    <div className="flex gap-2">
                                        <EyeIcon
                                            className="w-5 cursor-pointer text-blue-400"
                                            title="Show"
                                            onClick={() => {
                                                setRowData(row);
                                                show();
                                            }}
                                        />
                                        <PencilIcon
                                            className="w-5 cursor-pointer text-yellow-400"
                                            title="Edit"
                                        />
                                        <TrashIcon
                                            className="w-5 cursor-pointer text-red-400"
                                            title="Delete"
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
        </DataContext.Provider>
    );
};

export const RowData = () => useContext(DataContext);

export default Table;
