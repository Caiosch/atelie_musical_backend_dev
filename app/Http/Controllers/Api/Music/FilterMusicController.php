<?php

namespace App\Http\Controllers\Api\Music;

use App\Contracts\MusicRequestStatus;
use App\Http\Controllers\Controller;
use App\Http\Factories\HttpModelQuery;
use App\Http\Resources\MusicResource;
use App\Models\MusicRequest;
use Illuminate\Http\Request;

class FilterMusicController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $query = MusicRequest::query()->where('status', MusicRequestStatus::FINISHED);
        $input = $request->all();

        if (array_key_exists('artist_id', $input)) {
            $query->where('artist_id', $input['artist_id']);
        }

        return HttpModelQuery::make(
            $query,
            $request,
            MusicResource::class,
        );
    }
}
