<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use App\Http\Filters\ProjectName;
use App\Http\Filters\StatusFilter;
use App\Http\Resources\TaskResource;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Http\Filters\CreatedByNameSort;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = QueryBuilder::for(Task::class)
            ->allowedFilters([
                'name',
                'createdBy.name',
                'project.name',
                AllowedFilter::custom('status', new StatusFilter)

            ])
            ->allowedSorts([
                'id',
                'name',
                'due_date',
                AllowedSort::custom('project.name', new ProjectName),
                AllowedSort::custom('createdBy.name', new CreatedByNameSort)
            ])
            ->with('project')
            ->with('createdBy')
            ->paginate(10)->onEachSide(1)->withQueryString();

        return Inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
