import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CreateUser({ showModal, closeModal }) {
    const { data, setData, post, errors, processing, reset, clearErrors } =
        useForm({
            name: "",
            email: "",
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

    const submit = (e) => {
        e.preventDefault();

        post(route("user.store"), {
            onSuccess: () => {
                reset();
                clearErrors();
                closeModal();
            },
        });
    };

    return (
        <Modal show={showModal} maxWidth="4xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">Create User</h3>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div className="col-span-full">
                            <InputLabel htmlFor="name" value="Name" />

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
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
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
                                    onChange={(e) =>
                                        setData("password", e.target.value)
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
                                message={errors.password}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Save
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
