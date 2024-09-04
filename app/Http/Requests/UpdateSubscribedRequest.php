<?php

namespace App\Http\Requests;

use App\Models\Subscribed;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSubscribedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_id' => ['required', 'integer'],
            'packet_id' => ['required', 'integer'],
            'client_secret' => ['required', 'string', 'uppercase', Rule::unique(Subscribed::class)->ignore($this->id)],
            'description' => ['nullable', 'string'],
        ];
    }
}