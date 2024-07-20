import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Components/Constant";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, projects, queryParams = null }) {

    // Filtering
    queryParams = queryParams || {};

    queryParams.filter = queryParams.filter || {};
    queryParams.sort = queryParams.sort || '';


    const searchFieldChanged = (name, value) => {
        if (value)
            queryParams.filter[name] = value;
        else
            delete queryParams.filter[name];
        queryParams.page = 1;
        router.get(route('project.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter')
            searchFieldChanged(name, e.target.value);
    }

    // Sorting 
    const sortChange = (name) => {
        let sortOptions = queryParams.sort ? queryParams.sort.split(',') : [];
        let found = false;
        const index = sortOptions.findIndex(item => item === name || item === `-${name}`);
        if (index !== -1) {
            sortOptions[index] = sortOptions[index] === name ? `-${name}` : name;
        }
        else {
            sortOptions.push(name);
        }
        queryParams.sort = sortOptions.toString()
        router.get(route('project.index'), queryParams);
    }

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Projects</div>
                        <div className="text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3"
                                                onClick={(e) => sortChange('id')}>
                                                <div className="flex items-center">
                                                    ID
                                                    <a href="#">
                                                        <svg className="w-3 h-3 ms-1.5"
                                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap"
                                                onClick={(e) => sortChange('name')}>
                                                <div className="flex items-center">
                                                    Project name
                                                    <a href="#">
                                                        <svg className="w-3 h-3 ms-1.5"
                                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap"
                                                onClick={(e) => sortChange('due_date')}>
                                                <div className="flex items-center">
                                                    Due date
                                                    <a href="#">
                                                        <svg className="w-3 h-3 ms-1.5"
                                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap"
                                                onClick={(e) => sortChange('createdBy.name')}>
                                                <div className="flex items-center">
                                                    Created By
                                                    <a href="#">
                                                        <svg className="w-3 h-3 ms-1.5"
                                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                        </svg>
                                                    </a>
                                                </div>

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                Action
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                <TextInput placeholder="Project Name"
                                                    className="w-40"
                                                    defaultValue={queryParams.filter?.name || ''}
                                                    onKeyPress={(e) => onKeyPress('name', e)}
                                                    onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                <SelectInput
                                                    defaultValue={queryParams.filter?.status || ''}
                                                    onChange={(e) => (searchFieldChanged('status', e.target.value))}>
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                <TextInput placeholder="Created By"
                                                    className="w-40"
                                                    defaultValue={queryParams.filter ? queryParams.filter['createdBy.name'] || '' : ''}
                                                    onKeyPress={(e) => onKeyPress('createdBy.name', e)}
                                                    onBlur={(e) => searchFieldChanged('createdBy.name', e.target.value)}
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((product) => (
                                            <tr key={product.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {product.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <img src={product.imagePath} alt="" width="60" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.name}
                                                </td>
                                                <td className="px-6 py-4 text-nowrap ">
                                                    <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[product.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[product.status]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.description}
                                                </td>
                                                <td className="px-6 py-4 text-nowrap">
                                                    {product.dueDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.createdBy.name}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                                    <Link className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated >
    );
}