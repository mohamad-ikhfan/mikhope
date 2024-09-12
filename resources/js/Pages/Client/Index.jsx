import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import CreateClient from "./Create";
import ClientTable from "./Table";
import ShowClient from "./Show";
import EditClient from "./Edit";
import DeleteClient from "./Delete";
import Table from "@/Components/Table";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import TableAction from "@/Components/TableAction";

export default function ClientIndex({ auth, clients }) {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalShow, setOpenModalShow] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dataRow, setDataRow] = useState();

    const show = (data) => {
        setDataRow(data);
        setOpenModalShow(true);
    };

    const edit = (data) => {
        setDataRow(data);
        setOpenModalEdit(true);
    };

    const destroy = (data) => {
        setDataRow(data);
        setOpenModalDelete(true);
    };

    const closeModal = () => {
        setOpenModalCreate(false);
        setOpenModalShow(false);
        setOpenModalEdit(false);
        setOpenModalDelete(false);
        setDataRow();
    };

    const data = useMemo(() => clients.data, [clients.data]);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("#", {
                cell: (info) => info.row.index + 1,
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("identity_number", {
                header: () => "identity number",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("full_name", {
                header: () => "full name",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("phone", {
                header: () => "phone",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("email", {
                header: () => "email",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("address", {
                header: () => "address",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("action", {
                cell: (info) => (
                    <TableAction
                        data={info.cell.row.original}
                        show={show}
                        edit={edit}
                        destroy={destroy}
                    />
                ),
                enableColumnFilter: false,
                enableSorting: false,
                res,
            }),
        ],
        data: data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        autoResetPageIndex: false,
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Client
                </h2>
            }
        >
            <Head title="Client" />

            <div className="py-12">
                <div className="max-w-full mx-auto md:px-6">
                    <div className="flex justify-end pb-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New Client
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm md:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <Table table={table} />
                        </div>
                    </div>
                </div>
            </div>

            {openModalCreate && (
                <CreateClient
                    showModal={openModalCreate}
                    closeModal={closeModal}
                />
            )}
            {openModalShow && (
                <ShowClient
                    showModal={openModalShow}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
            {openModalEdit && (
                <EditClient
                    showModal={openModalEdit}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
            {openModalDelete && (
                <DeleteClient
                    showModal={openModalDelete}
                    state={dataRow}
                    closeModal={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
}
