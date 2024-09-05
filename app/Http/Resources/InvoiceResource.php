<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'inv_number' => $this->inv_number,
            'subscribed_id' => $this->subscribed_id,
            'subscribed_name' => $this->subscribed->client_secret,
            'date_of_use' => $this->date_of_use ? now()->parse($this->date_of_use)->format('d-M-Y') : $this->date_of_use,
            'day_of_use' => $this->day_of_use . '/' . $this->total_day_of_use,
            'date_of_bill' => $this->date_of_bill ? now()->parse($this->date_of_bill)->format('d-M-Y') : $this->date_of_bill,
            'discount_bill' => $this->discount_bill,
            'total_bill' => $this->total_bill,
            'payemented_at' => $this->payemented_at ? now()->parse($this->payemented_at)->diffForHumans() : $this->payemented_at,
            'payemented_by' => $this->payemented_by,
            'payment_accepted_at' => $this->payment_accepted_at ? now()->parse($this->payment_accepted_at)->diffForHumans() : $this->payment_accepted_at,
            'payment_accepted_by' => $this->payment_accepted_by,
        ];
    }
}