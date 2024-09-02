<?php

namespace App\Http\Requests;

use App\Models\RouterMikrotik;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreRouterMikrotikRequest extends FormRequest
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
            'name' => 'required|string',
            'host' => 'required|string',
            'port' => 'required|integer',
            'user' => 'required|string',
            'pass' => 'required|string',
        ];
    }

    public function save($data)
    {
        $routerMikrotik = (new RouterMikrotik())->create($data);
        $routerMikrotik->users()->attach(auth('web')->user()->id);
    }
}