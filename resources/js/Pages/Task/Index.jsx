import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP
} from "@/Components/Constant";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { FaFilterCircleXmark } from "react-icons/fa6";

export default function Index({ auth, tasks, queryParams = null }) {

    // Filtering
    queryParams = queryParams || {};
    queryParams.filter = queryParams.filter || {};
    queryParams.sort = queryParams.sort || '';

    const sortOptions = queryParams.sort ? queryParams.sort.split(',') : [];

    const searchFieldChanged = (name, value) => {
        if (value)
            queryParams.filter[name] = value;
        else
            delete queryParams.filter[name];
        queryParams.page = 1;
        router.get(route('task.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter')
            searchFieldChanged(name, e.target.value);
    }

    // Sorting 
    const sortChange = (name) => {
        const index = sortOptions.findIndex(item => (item === name || item === `-${name}`));
        if (index !== -1) {
            sortOptions[index] = sortOptions[index] === name ? `-${name}` : name;
        }
        else {
            sortOptions.push(name);
        }
        queryParams.sort = sortOptions.toString()
        router.get(route('task.index'), queryParams);
    }

    const clearFilter = () => {
        queryParams.filter = {};
        queryParams.sort = '';
        router.get(route('task.index'), queryParams);
    };

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                Tasks
                            </div>
                            {(queryParams.sort !== '' || Object.keys(queryParams.filter).length !== 0) && (
                                <div className="p-6 text-gray-900 dark:text-gray-100" onClick={(e) => clearFilter()}>
                                    <FaFilterCircleXmark />
                                </div>
                            )}

                        </div>
                        <div className="text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                        <tr>
                                            <TableHeading
                                                sortChange={sortChange}
                                                filed_name='id'
                                                sortList={sortOptions}
                                            >
                                                ID
                                            </TableHeading>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Image
                                            </th>
                                            <TableHeading
                                                sortChange={sortChange}
                                                filed_name='project.name'
                                                sortList={sortOptions}
                                            >
                                                Project Name
                                            </TableHeading>
                                            <TableHeading
                                                sortChange={sortChange}
                                                filed_name='name'
                                                sortList={sortOptions}
                                            >
                                                Task name
                                            </TableHeading>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                Description
                                            </th>
                                            <TableHeading
                                                sortChange={sortChange}
                                                filed_name='due_date'
                                                sortList={sortOptions}
                                            >
                                                Due date
                                            </TableHeading>
                                            <TableHeading
                                                sortChange={sortChange}
                                                filed_name='createdBy.name'
                                                sortList={sortOptions}
                                            >
                                                Created By
                                            </TableHeading>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">

                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                <TextInput placeholder="Created By"
                                                    className="w-40"
                                                    defaultValue={queryParams.filter ? queryParams.filter['project.name'] || '' : ''}
                                                    onKeyPress={(e) => onKeyPress('project.name', e)}
                                                    onBlur={(e) => searchFieldChanged('project.name', e.target.value)}
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-nowrap">
                                                <TextInput placeholder="Task Name"
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
                                        {tasks.data.map((task) => (
                                            <tr key={task.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {task.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <img src={task.imagePath} alt="" width="60" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {task.project.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {task.name}
                                                </td>
                                                <td className="px-6 py-4 text-nowrap ">
                                                    <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[task.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[task.status]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {task.description}
                                                </td>
                                                <td className="px-6 py-4 text-nowrap">
                                                    {task.dueDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {task.createdBy.name}
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
                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated >
    );
}