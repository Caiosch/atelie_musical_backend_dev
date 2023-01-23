<?php

namespace App\Http\Controllers\Api\Artist;

use App\Http\Controllers\Controller;
use App\Http\Factories\HttpModelQuery;
use App\Models\Artist;
use Illuminate\Http\Request;

class FilterArtistController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return HttpModelQuery::make(Artist::query()->with(['music']), $request);
    }
}
