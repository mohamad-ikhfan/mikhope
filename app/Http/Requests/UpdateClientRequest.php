<?php

namespace App\Http\Requests;

use App\Models\Client;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
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
            'identity_number' => ['nullable', 'integer', Rule::unique(Client::class)->ignore($this->id)],
            'full_name' => ['required', 'string', 'uppercase'],
            'phone' => ['nullable', 'numeric', Rule::unique(Client::class)->ignore($this->id)],
            'email' => ['nullable', 'string', 'email', 'lowercase', Rule::unique(Client::class)->ignore($this->id)],
            'address' => ['nullable', 'string', 'uppercase'],
        ];
    }
}