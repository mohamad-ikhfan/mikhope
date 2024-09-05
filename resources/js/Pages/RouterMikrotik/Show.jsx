import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

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

    const [inputType, setInputType] = useState("password");

    const handleChangeInputType = () => {
        if (inputType === "text") {
            setInputType("password");
        } else {
            setInputType("text");
        }
    };

    const [pingProcessing, setPingProcessing] = useState(false);
    const [pingStatus, setPingStatus] = useState("");

    const handlePingTest = async () => {
        setPingProcessing(true);
        await axios
            .patch(route("router.test-connection", routerMikrotik.id))
            .then((res) => {
                setPingStatus(res.data);
            })
            .catch((err) => {
                setPingStatus(err.response.data);
            })
            .finally(() => setPingProcessing(false));
    };

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

                            <div className="relative">
                                <TextInput
                                    id="pass"
                                    className="mt-1 block w-full"
                                    type={inputType}
                                    value={data.pass}
                                    readOnly={true}
                                />
                                {inputType === "password" && (
                                    <EyeIcon
                                        className="w-6 absolute top-2 right-3 text-gray-600 cursor-pointer"
                                        onClick={handleChangeInputType}
                                    />
                                )}
                                {inputType === "text" && (
                                    <EyeSlashIcon
                                        className="w-6 absolute top-2 right-3 text-gray-600 cursor-pointer"
                                        onClick={handleChangeInputType}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-6 text-center">
                        <p className="dark:text-white mb-2">{pingStatus}</p>
                        <PrimaryButton
                            type="button"
                            disabled={pingProcessing}
                            onClick={handlePingTest}
                        >
                            ping test!
                        </PrimaryButton>
                    </div>

                    <div className="flex items-center gap-4">
                        <SecondaryButton
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            CLose
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
