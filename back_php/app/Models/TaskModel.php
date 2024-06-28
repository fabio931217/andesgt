<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskModel extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = "tareas";
    protected $fillable = [
        'titulo', 'descripcion', 'fecha_vence', 'state'
    ];
}
