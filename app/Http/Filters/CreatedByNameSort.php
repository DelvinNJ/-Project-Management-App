<?php

namespace App\Http\Filters;

use \Spatie\QueryBuilder\Sorts\Sort;
use Illuminate\Database\Eloquent\Builder;


class CreatedByNameSort  implements Sort
{

    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $direction = $descending ? 'desc' : 'asc';
        $query->join('users', 'projects.created_by', '=', 'users.id')
            ->select('projects.*')
            ->orderBy('users.name', $direction);
    }
}
