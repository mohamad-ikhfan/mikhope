<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscribedResource extends JsonResource
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
            'client_id' => $this->client_id,
            'packet_id' => $this->packet_id,
            'client_name' => $this->client->full_name,
            'packet_name' => $this->packet->name,
            'client_secret' => $this->client_secret,
            'description' => $this->description,
        ];
    }
}