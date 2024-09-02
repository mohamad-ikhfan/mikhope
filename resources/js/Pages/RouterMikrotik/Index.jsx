import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateRouterMikrotik from "./Create";
import { useState } from "react";
import RouterMikrotikTable from "./Table";

export default function RouterMikrotikIndex({ auth, routerMikrotiks }) {
    const [showModalCreate, setShowModalCreate] = useState(false);

    const closeModal = () => {
        setShowModalCreate(false);
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
                        <RouterMikrotikTable
                            routerMikrotiks={routerMikrotiks}
                        />
                    </div>
                </div>
            </div>

            <CreateRouterMikrotik
                showModal={showModalCreate}
                closeModal={closeModal}
            />
        </AuthenticatedLayout>
    );
}
