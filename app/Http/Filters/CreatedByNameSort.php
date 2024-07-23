<?php

namespace App\Http\Filters;

use \Spatie\QueryBuilder\Sorts\Sort;
use Illuminate\Database\Eloquent\Builder;


class CreatedByNameSort  implements Sort
{

    public function __invoke(Builder $query, bool $descending, string $property)
    {
        $table = $query->getModel()->getTable();
        $direction = $descending ? 'desc' : 'asc';
        $query->join('users', "{$table}.created_by", '=', 'users.id')
            ->select("{$table}.*")
            ->orderBy('users.name', $direction);
    }
}
