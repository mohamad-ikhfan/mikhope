import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function ShowInvoice({ showModal, closeModal, invoice }) {
    const { data } = useForm({
        inv_number: invoice.inv_number,
        subscribed_id: invoice.subscribed_id,
        date_of_use: invoice.date_of_use,
        day_of_use: invoice.day_of_use,
        total_day_of_use: invoice.total_day_of_use,
        date_of_bill: invoice.date_of_bill,
        total_bill: invoice.total_bill,
        payemented_at: invoice.payemented_at,
        payemented_by: invoice.payemented_by,
        payment_accepted_at: invoice.payment_accepted_at,
        payment_accepted_by: invoice.payment_accepted_by,
    });

    return (
        <Modal show={showModal} maxWidth="4xl">
            <div className="w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="mb-4 text-lg dark:text-gray-100">
                    Show Invoice
                </h3>
                <form>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <div>
                            <InputLabel
                                htmlFor="inv_number"
                                value="Inv Number"
                            />

                            <TextInput
                                id="inv_number"
                                className="mt-1 block w-full"
                                defaultValue={data.inv_number}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="subscribed_id"
                                value="Subscriber"
                            />

                            <TextInput
                                id="subscribed_id"
                                className="mt-1 block w-full"
                                defaultValue={data.subscribed_id}
                                readOnly={true}
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
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="day_of_use"
                                value="Day of use"
                            />

                            <TextInput
                                id="day_of_use"
                                className="mt-1 block w-full"
                                defaultValue={data.day_of_use}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="total_day_of_use"
                                value="Total Day of use"
                            />

                            <TextInput
                                id="total_day_of_use"
                                className="mt-1 block w-full"
                                defaultValue={data.total_day_of_use}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="date_of_bill"
                                value="Date of bill"
                            />

                            <TextInput
                                id="date_of_bill"
                                className="mt-1 block w-full"
                                defaultValue={data.date_of_bill}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="total_bill"
                                value="Total bill"
                            />

                            <TextInput
                                id="total_bill"
                                className="mt-1 block w-full"
                                defaultValue={data.total_bill}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="paymented_at"
                                value="Total bill"
                            />

                            <TextInput
                                id="paymented_at"
                                className="mt-1 block w-full"
                                defaultValue={data.paymented_at}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="paymented_by"
                                value="Total bill"
                            />

                            <TextInput
                                id="paymented_by"
                                className="mt-1 block w-full"
                                defaultValue={data.paymented_by}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="payment_accepted_by"
                                value="Total bill"
                            />

                            <TextInput
                                id="payment_accepted_by"
                                className="mt-1 block w-full"
                                defaultValue={data.payment_accepted_by}
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
                            Close
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
