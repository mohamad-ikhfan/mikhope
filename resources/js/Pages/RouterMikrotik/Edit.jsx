import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function EditRouterMikrotik({ showModal, closeModal, state }) {
    const { data, setData, put, errors, processing, reset, clearErrors } =
        useForm({
            name: state.name,
            host: state.host,
            port: state.port,
            user: state.user,
            pass: state.pass,
        });

    const [inputType, setInputType] = useState("password");

    const handleChangeInputType = () => {
        if (inputType === "text") {
            setInputType("password");
        } else {
            setInputType("text");
        }
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("router.update", state.id), {
            onSuccess: () => {
                reset();
                clearErrors();
                closeModal();
            },
        });
    };

    const [pingProcessing, setPingProcessing] = useState(false);
    const [pingStatus, setPingStatus] = useState("");

    const handlePingTest = async () => {
        setPingProcessing(true);
        await axios
            .patch(route("router.test-connection", state.id))
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
                <h3 className="mb-4 text-lg dark:text-gray-100">Edit Router</h3>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div className="col-span-full">
                            <InputLabel htmlFor="name" value="Router Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="host" value="Host" />

                            <TextInput
                                id="host"
                                className="mt-1 block w-full"
                                value={data.host}
                                onChange={(e) =>
                                    setData("host", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.host}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="port" value="Port" />

                            <TextInput
                                id="port"
                                className="mt-1 block w-full"
                                value={data.port}
                                onChange={(e) =>
                                    setData("port", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.port}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="user" value="User" />

                            <TextInput
                                id="user"
                                className="mt-1 block w-full"
                                value={data.user}
                                onChange={(e) =>
                                    setData("user", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.user}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="pass" value="Pass" />

                            <div className="relative">
                                <TextInput
                                    id="pass"
                                    className="mt-1 block w-full pr-10"
                                    value={data.pass}
                                    type={inputType}
                                    onChange={(e) =>
                                        setData("pass", e.target.value)
                                    }
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

                            <InputError
                                className="mt-2"
                                message={errors.pass}
                            />
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
                        <PrimaryButton disabled={processing}>
                            Update
                        </PrimaryButton>
                        <SecondaryButton
                            disabled={processing}
                            onClick={() => {
                                closeModal();
                                reset();
                                clearErrors();
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
