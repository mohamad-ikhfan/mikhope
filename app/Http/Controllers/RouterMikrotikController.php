<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRouterMikrotikRequest;
use App\Http\Requests\UpdateRouterMikrotikRequest;
use App\Http\Resources\RouterMikrotikResource;
use App\Models\RouterMikrotik;
use Inertia\Inertia;

class RouterMikrotikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = RouterMikrotik::query();

        /** @disregard P1013 */
        return Inertia::render('RouterMikrotik/Index', [
            'routerMikrotiks' => RouterMikrotikResource::collection($query->paginate(10)->onEachSide(1))
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRouterMikrotikRequest $request)
    {
        $routerMikrotik = RouterMikrotik::create($request->validationData());
        $routerMikrotik->users()->attach(auth('web')->user()->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRouterMikrotikRequest $request, $id)
    {
        $routerMikrotik = RouterMikrotik::findOrFail($id);
        $routerMikrotik->update($request->validationData());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $routerMikrotik = RouterMikrotik::findOrFail($id);
        $routerMikrotik->delete();
    }
}