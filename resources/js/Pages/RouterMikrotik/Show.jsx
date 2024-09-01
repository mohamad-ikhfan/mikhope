import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function ShowRouterMikrotik({
    showModal,
    closeModal,
    routerMikrotik,
}) {
    const { data } = useForm({
        name: routerMikrotik.name,
        host: routerMikrotik.host,
        port: routerMikrotik.port,
        user: routerMikrotik.user,
        pass: routerMikrotik.pass,
    });

    return (
        <Modal show={showModal} maxWidth="4xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">Show Router</h3>
                <form>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div className="col-span-full">
                            <InputLabel htmlFor="name" value="Router Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="host" value="Host" />

                            <TextInput
                                id="host"
                                className="mt-1 block w-full"
                                value={data.host}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="port" value="Port" />

                            <TextInput
                                id="port"
                                className="mt-1 block w-full"
                                value={data.port}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="user" value="User" />

                            <TextInput
                                id="user"
                                className="mt-1 block w-full"
                                value={data.user}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="pass" value="Pass" />

                            <TextInput
                                id="pass"
                                className="mt-1 block w-full"
                                value={data.pass}
                                readOnly={true}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <SecondaryButton
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            Cancel
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
