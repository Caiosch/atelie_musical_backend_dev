<?php

use App\Http\Controllers\Api\Artist\{
    CreateArtistController,
    FilterArtistController,
    ShowArtistController,
    UpdateArtistController
};
use App\Http\Controllers\Api\Auth\{
    AuthenticateController,
    RegisterController,
    AccountController,
    ChangeUserPasswordController,
    FilterUserController,
    PasswordRecoveryUserController,
    PasswordResetUserController,
    ShowUserController,
    UpdateUserController,
};
use App\Http\Controllers\Api\Music\{
    AddMediasMusicRequestController,
    CreateMusicController,
    FilterMusicController,
    FilterMusicRequestController,
    ShowMusicController,
    ShowMusicRequestController,
    UpdateMusicRequestController
};
use App\Http\Controllers\Api\Order\CreateOrderController;
use App\Http\Controllers\Api\Payment\PaypalCallbackController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\Subscription\CreateSubscriptionController;
use App\Http\Controllers\Api\Subscription\FilterSubscriptionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('oauth')->group(function () {
    Route::post('login', [AuthenticateController::class, 'store']);
    Route::post('register', [RegisterController::class, 'store']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [AccountController::class, 'show']);
        Route::get('users', FilterUserController::class);
        Route::get('users/{user}', ShowUserController::class);
        Route::put('users/{user}', UpdateUserController::class);

        Route::post('subscriptions', CreateSubscriptionController::class);
        Route::get('subscriptions', FilterSubscriptionController::class);

        Route::post('orders', CreateOrderController::class);
        Route::post('musics', CreateMusicController::class);
        Route::post('artists', CreateArtistController::class);
        Route::put('artists/{artist}', UpdateArtistController::class);

        // MusicRequest
        Route::get('requests', FilterMusicRequestController::class);
        Route::post('requests/{musicRequest}/medias', AddMediasMusicRequestController::class);
        Route::put('requests/{musicRequest}', UpdateMusicRequestController::class);
        Route::get('requests/{musicRequest}', ShowMusicRequestController::class);

        // Account
        Route::put('password', ChangeUserPasswordController::class);
    });
});

// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('subscriptions', CreateSubscriptionController::class);
// });

Route::post('password-recovery', PasswordRecoveryUserController::class);
Route::post('password-reset', PasswordResetUserController::class);

Route::get('settings', [SettingsController::class, 'index']);

Route::get('musics/{musicRequest}', ShowMusicController::class);

Route::post('subscriptions', CreateSubscriptionController::class);

Route::post('musics', CreateMusicController::class);
Route::get('musics', FilterMusicController::class);

Route::get('artists/{artist}', ShowArtistController::class);
Route::get('artists', FilterArtistController::class);

Route::get('requests/{musicRequest}', ShowMusicRequestController::class);
Route::post('callbacks/paypal', PaypalCallbackController::class);
