import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ShowUser({ state, showModal, closeModal }) {
    const { data } = useForm({
        name: state.name,
        email: state.email,
        password: "",
    });

    const [inputType, setInputType] = useState("password");

    const handleChangeInputType = () => {
        if (inputType === "text") {
            setInputType("password");
        } else {
            setInputType("text");
        }
    };

    return (
        <Modal show={showModal} maxWidth="4xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">Show User</h3>
                <form>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div className="col-span-full">
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />

                            <div className="relative">
                                <TextInput
                                    id="password"
                                    className="mt-1 block w-full pr-10"
                                    value={data.password}
                                    type={inputType}
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

                    <div className="flex items-center gap-4">
                        <SecondaryButton
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            Close
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
