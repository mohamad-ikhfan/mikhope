import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchInput from "@/Components/SearchInput";
import CreateRouterMikrotik from "./Create";
import { useState } from "react";
import Table, { RowData } from "@/Components/Table";
import ShowRouterMikrotik from "./Show";

export default function RouterMikrotikIndex({ auth, routerMikrotiks }) {
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalShow, setShowModalShow] = useState(false);

    const Show = () => {
        console.log(RowData);

        setShowModalShow(true);
    };

    const closeModal = () => {
        setShowModalCreate(false);
        setShowModalShow(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Router
                </h2>
            }
        >
            <Head title="Router" />

            <div className="py-12">
                <div className="max-w-full mx-auto md:px-6">
                    <div className="flex justify-end pb-4">
                        <PrimaryButton
                            type="button"
                            onClick={() => setShowModalCreate(true)}
                        >
                            New Router
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm md:rounded-lg">
                        <div className="p-4 md:p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between">
                                <div></div>
                                <SearchInput />
                            </div>
                            <div className="w-full overflow-auto py-6">
                                <Table
                                    columns={[
                                        "name",
                                        "host",
                                        "port",
                                        "user",
                                        "pass",
                                    ]}
                                    rows={routerMikrotiks.data}
                                    show={Show}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreateRouterMikrotik
                showModal={showModalCreate}
                closeModal={closeModal}
            />
            <ShowRouterMikrotik
                showModal={showModalShow}
                closeModal={closeModal}
                routerMikrotik={[]}
            />
        </AuthenticatedLayout>
    );
}
