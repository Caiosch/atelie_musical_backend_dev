<?php

namespace App\Http\Controllers\Api;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\AppTag;
use App\Models\Artist;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        $tags = AppTag::all();

        return HttpResponse::create()->setData([
            'tags' => $tags,
            'artists' => Artist::all(),
        ])->setStatus(200)->toLaravel();
    }
}
