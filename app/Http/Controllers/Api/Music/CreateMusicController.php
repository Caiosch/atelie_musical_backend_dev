<?php

namespace App\Http\Controllers\Api\Music;

use App\Contracts\MusicRequestStatus;
use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Http\Factories\HttpMediaFactory;
use App\Models\MusicRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class CreateMusicController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $input = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'giftedName' => ['nullable', 'string', 'max:255'],
            'aboutShort' => ['required', 'string'],
            'about' => ['nullable', 'string'],
            'aboutRecorded' => ['nullable'],
            'ocasions' => ['required', 'string'],
            'sentiments' => ['nullable', 'array'],
            'artistId' => ['nullable', 'integer'],
            'choiceArtist' => ['boolean'],
            'duration' => ['required', Rule::in(['1min', '3min'])],
            'songType' => ['required', Rule::in(['acustic', 'band'])],
            'extras.*' => [Rule::in(['extra:music-platforms', 'extra:video-letters'])],
            'deliveryType' => ['nullable', Rule::in(['express', 'normal'])],
            'fromSocial' => ['required', 'string'],
            'fromSocialDescription' => ['string'],
            'price' => ['array'],
            'price.total' => ['required', 'numeric'],
            'price.totalDeadline' => ['required', 'integer'],
            'price.display' => ['required', 'array'],
            'musicReference' => ['nullable', 'string'],
        ]);

        if (array_key_exists('aboutRecorded', $input)) {
            // dd('EAE');
            $input['aboutRecorded'] = HttpMediaFactory::resolveMedia($input['aboutRecorded']);
        }

        $music = MusicRequest::create([
            'artist_id' => $input['artistId'] ?? null,
            'choice_artist' => $input['choiceArtist'],
            'delivery_type' => $input['deliveryType'] ?? 'normal',
            'status' => MusicRequestStatus::WAITING_PAYMENT,
            'data' => json_encode($input),
            'price_total' => $input['price']['total'],
            'delivery_date' => Carbon::now()->addWeekdays($input['price']['totalDeadline']),
        ]);

        return HttpResponse::create()
            ->setStatus(201)
            ->setTitle("Sucesso!")
            ->setMessage("Música solicitada com sucesso!")
            ->setData([
                'request' => MusicRequest::find($music->id),
            ])
            ->toLaravel();
    }
}
