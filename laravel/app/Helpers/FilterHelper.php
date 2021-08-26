<?php

namespace App\Helpers;

class FilterHelper
{
  public static function appendFilters($query, $filters, $request) {
    foreach($filters as $filter) {
      $name = $filter[0];
      $operator = $filter[1];
      if($request->has($filter[0])) {
        $query = $query->where(function ($query) use ($name, $operator, $request){
          if ($operator !== 'like')
            $query->where($name, $operator, $request[$name]);
          else if ($operator == 'like')
            $query->where($name, 'like', '%'.$request[$name].'%');
        });
      }
    }
    return $query;
  }
}
