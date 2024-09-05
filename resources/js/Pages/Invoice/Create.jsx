import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function CreateInvoice({ showModal, closeModal, subscribeds }) {
    const { data, setData, post, errors, processing, reset, clearErrors } =
        useForm({
            subscribed_id: "",
            date_of_use: "",
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("invoice.store"), {
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
                <h3 className="mb-4 text-lg dark:text-gray-100">
                    Create Invoice
                </h3>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div>
                            <InputLabel
                                htmlFor="subscribed_id"
                                value="Subscribed"
                            />

                            <SelectInput
                                id="subscribed_id"
                                className="mt-1 block w-full"
                                value={data.subscribed_id}
                                onChange={(e) =>
                                    setData("subscribed_id", e.target.value)
                                }
                            >
                                <option value="" disabled={true}>
                                    Select
                                </option>
                                {subscribeds.map((subscribed) => (
                                    <option
                                        key={subscribed.id}
                                        value={subscribed.id}
                                    >
                                        {subscribed.client_secret}
                                    </option>
                                ))}
                            </SelectInput>

                            <InputError
                                className="mt-2"
                                message={errors.subscribed_id}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="date_of_use"
                                value="Date of use"
                            />

                            <TextInput
                                id="date_of_use"
                                className="mt-1 block w-full"
                                defaultValue={data.date_of_use}
                                onChange={(e) =>
                                    setData("date_of_use", e.target.value)
                                }
                                type="date"
                                onKeyDown={(e) => e.preventDefault()}
                            />

                            <InputError
                                className="mt-2"
                                message={errors.date_of_use}
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
