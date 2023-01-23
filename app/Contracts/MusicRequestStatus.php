<?php

namespace App\Contracts;

abstract class MusicRequestStatus
{
    public const WAITING_PAYMENT = 'waiting_payment';
    public const WAITING_IMAGES = 'waiting_images';
    public const WAITING_PRODUCTION = 'waiting_production';
    public const FINISHED = 'finished';
    public const CANCELED = 'canceled';
}
