<?php

namespace App\Contracts;

abstract class PaymentStatus
{
    // Default
    public const WAITING = 'waiting';
    public const PAYED = 'payed';
    public const CANCELED = 'canceled';
    public const ERROR = 'error';

    // PayPal
    public const PAYPAL_ORDER_APPROVED = 'COMPLETED';
    public const PAYPAL_ORDER_REJECTED = 'REJECTED';
}
