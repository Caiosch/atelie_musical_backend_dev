<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppTag extends Model
{
    use HasFactory;

    public $fillable = [
        'key',
        'value',
        'type'
    ];
}
