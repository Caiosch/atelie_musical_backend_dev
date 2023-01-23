<?php

namespace App\Http\Controllers\Api\Music;

use App\Contracts\MusicRequestStatus;
use App\Http\Contract\HttpResponse;
use App\Http\Controllers\Controller;
use App\Http\Factories\HttpMediaFactory;
use App\Models\MusicRequest;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UpdateMusicRequestController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, MusicRequest $musicRequest)
    {
        $user = $request->user();
        $input = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'giftedName' => ['nullable', 'string', 'max:255'],
            'aboutShort' => ['nullable', 'string'],
            'about' => ['nullable', 'string'],
            'ocasions' => ['nullable', 'string'],
            'artistId' => ['nullable', 'integer'],
            'choiceArtist' => ['nullable', 'boolean'],
            'duration' => ['nullable', Rule::in(['1min', '3min'])],
            'songType' => ['nullable', Rule::in(['acustic', 'band'])],
            'extras.*' => ['nullable', Rule::in(['extra:music-platforms', 'extra:video-letters'])],
            'deliveryType' => ['nullable', Rule::in(['express', 'normal'])],
            'fromSocial' => ['nullable', 'string'],
            'fromSocialDescription' => ['nullable', 'string'],
            'musicReference' => ['nullable', 'string'],
            'admin' => ['nullable', 'array'],
            'admin.*' => ['nullable'],
            'status' => ['nullable', 'string'],
            'privacy' => ['nullable', Rule::in(['private', 'public'])],
            'is_main' => ['nullable'],
        ]);

        if (array_key_exists('admin', $input)) {
            $toResolveKeys = ['musicFile', 'visualizerFile', 'singerFile', 'artistRecordFile'];

            foreach ($input['admin'] as $adminFieldKey => $adminFieldValue) {
                if (in_array($adminFieldKey, $toResolveKeys)) {
                    $nextValue = HttpMediaFactory::resolveMedia($adminFieldValue);
                    $input['admin'][$adminFieldKey] = $nextValue;
                    Log::info('Uploading Media admin.' . $adminFieldKey . ' at ' . $nextValue['src']);
                }
            }
        }

        if (array_key_exists('is_main', $input)) {
            if ($musicRequest->artist_id && !!$input['is_main']) {
                MusicRequest::query()->where('artist_id', $musicRequest->artist_id)->update([
                    'is_main' => false,
                ]);
            }
        }

        $musicRequest->update([
            'artist_id' => $input['artistId'] ?? $musicRequest->artist_id ?? null,
            'choice_artist' => $input['choiceArtist'] ?? $musicRequest->choice_artist,
            'delivery_type' => $input['deliveryType'] ?? $musicRequest->delivery_type,
            'is_main' => $input['is_main'] ?? $musicRequest->is_main ?? false,
            'data' => json_encode(
                array_merge(
                    json_decode(
                        json_encode($musicRequest->data),
                        true
                    ),
                    [
                        'admin' => array_merge(
                            json_decode(json_encode($musicRequest->data->admin ?? []), true) ?? [],
                            $input['admin'] ?? [],
                        )
                    ],
                )
            ),
            'user_id' => $musicRequest->user_id ?? $user->id,
            'status' => $input['status'] ?? $musicRequest->status,
            'privacy' => $input['admin']['privacy'] ?? $input['privacy'] ?? $musicRequest->privacy ?? 'private',
            'delivered_at' => !$musicRequest->delivered_at
                && array_key_exists('status', $input)
                && $input['status'] === MusicRequestStatus::FINISHED
                ? Carbon::now()
                : null,
        ]);

        return HttpResponse::create()
            ->setStatus(201)
            ->setTitle("Sucesso!")
            ->setMessage("Música alterada com sucesso!")
            ->setData([
                'request' => MusicRequest::find($musicRequest->id),
                'input' => $input,
            ])
            ->toLaravel();
    }
}
