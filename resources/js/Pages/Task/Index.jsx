import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TasksTable from "./TasksTable";
import { useEffect } from "react";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index({ auth, flash, tasks, queryParams }) {

    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success, {
                transition: Slide,
                autoClose: 2000,
            });
        }
        if (flash.message.error) {
            toast.error(flash.message.error, {
                transition: Slide,
                autoClose: 2000,
            });
        }
    }, [flash])

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>
                    <Link
                        href={route('task.create')}
                        className="hover:bg-emerald-600 bg-emerald-500 rounded-lg px-3 py-1 text-white shadow transition:all">
                        Add task
                    </Link>
                </div>
            }
        >
            <Head title="Task" />
            <ToastContainer />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <TasksTable routerName={'task.index'} tasks={tasks} queryParams={queryParams} />
                </div>
            </div>
        </Authenticated >
    );
}