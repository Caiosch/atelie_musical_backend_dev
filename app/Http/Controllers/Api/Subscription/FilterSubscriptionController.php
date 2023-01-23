<?php

namespace App\Http\Controllers\Api\Subscription;

use App\Http\Controllers\Controller;
use App\Http\Factories\HttpModelQuery;
use App\Models\BasicSubcription;
use Illuminate\Http\Request;

class FilterSubscriptionController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return HttpModelQuery::make(BasicSubcription::class, $request);
    }
}
