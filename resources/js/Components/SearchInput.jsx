import TextInput from "@/Components/TextInput";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function SearchInput() {
    return (
        <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="w-5 absolute top-2.5 right-2.5 dark:text-gray-300" />
            <TextInput
                type="text"
                placeholder="search...."
                className="pr-8 w-full md:w-96"
            />
        </div>
    );
}
