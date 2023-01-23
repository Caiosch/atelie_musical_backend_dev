<?php

namespace App\Http\Controllers\Api\Music;

use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Models\MusicRequest;
use Illuminate\Http\Request;

class ShowMusicRequestController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, MusicRequest $musicRequest)
    {
        $musicRequest->load(['user', 'artist']);
        return HttpResponse::create()->setStatus(200)->setData([
            'request' => $musicRequest,
        ])->toLaravel();
    }
}
