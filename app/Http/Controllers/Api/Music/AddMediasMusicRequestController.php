<?php

namespace App\Http\Controllers\Api\Music;

use App\Contracts\MusicRequestStatus;
use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Http\Factories\HttpMediaFactory;
use App\Models\MusicRequest;
use Illuminate\Http\Request;

class AddMediasMusicRequestController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, MusicRequest $musicRequest)
    {
        $input = $request->all();
        $items = $input['items'];
        $nextItems = collect([]);

        foreach ($items as $mediaItem) {
            $media = $mediaItem['media'];
            $nextItems->push(
                array_merge(
                    $mediaItem,
                    ['media' => HttpMediaFactory::resolveMedia($media)]
                )
            );
        }

        $nextMedias = array_merge(
            $musicRequest->data->medias ?? [],
            $nextItems->toArray()
        );
        $nextData = array_merge(
            collect($musicRequest->data)->toArray(),
            ['medias' => $nextMedias]
        );

        $musicRequest->update([
            'data' => json_encode($nextData),
            'status' => MusicRequestStatus::WAITING_PRODUCTION,
        ]);

        return HttpResponse::create()->setStatus(200)->setData([
            'input' => $nextMedias,
            'request' => $musicRequest,
        ])->toLaravel();
    }
}
