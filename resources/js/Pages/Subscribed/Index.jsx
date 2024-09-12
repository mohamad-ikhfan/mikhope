import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import CreateSubscribed from "./Create";
import SubscribedTable from "./Table";
import ShowSubscribed from "./Show";
import EditSubscribed from "./Edit";
import DeleteSubscribed from "./Delete";
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import TableAction from "@/Components/TableAction";
import Table from "@/Components/Table";

export default function SubscribedIndex({
    auth,
    subscribeds,
    clients,
    packets,
}) {
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

    const data = useMemo(() => subscribeds.data, [subscribeds.data]);

    const columnHelper = createColumnHelper();

    const table = useReactTable({
        columns: [
            columnHelper.accessor("#", {
                cell: (info) => info.row.index + 1,
                enableColumnFilter: false,
                enableSorting: false,
            }),
            columnHelper.accessor("client_name", {
                header: () => "client name",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("packet_name", {
                header: () => "packet name",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("client_secret", {
                header: () => "client secret",
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("description", {
                header: () => "description",
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
                    Subscribed
                </h2>
            }
        >
            <Head title="Subscribed" />

            <div className="py-12">
                <div className="max-w-full mx-auto md:px-6">
                    <div className="flex justify-end pb-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setOpenModalCreate(true)}
                        >
                            New Subscriber
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
                <CreateSubscribed
                    showModal={openModalCreate}
                    closeModal={closeModal}
                    clients={clients}
                    packets={packets}
                />
            )}
            {openModalShow && (
                <ShowSubscribed
                    showModal={openModalShow}
                    state={dataRow}
                    clients={clients}
                    packets={packets}
                    closeModal={closeModal}
                />
            )}
            {openModalEdit && (
                <EditSubscribed
                    showModal={openModalEdit}
                    state={dataRow}
                    clients={clients}
                    packets={packets}
                    closeModal={closeModal}
                />
            )}
            {openModalDelete && (
                <DeleteSubscribed
                    showModal={openModalDelete}
                    state={dataRow}
                    clients={clients}
                    packets={packets}
                    closeModal={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
}
