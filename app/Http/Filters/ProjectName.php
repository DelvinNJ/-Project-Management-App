<?php

namespace App\Http\Filters;

use \Spatie\QueryBuilder\Sorts\Sort;
use Illuminate\Database\Eloquent\Builder;


class ProjectName  implements Sort
{

    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $table = $query->getModel()->getTable();
        $direction = $descending ? 'desc' : 'asc';
        $query->join('projects', "{$table}.project_id", '=', 'projects.id')
            ->select("{$table}.*")
            ->orderBy('projects.name', $direction);
    }
}
