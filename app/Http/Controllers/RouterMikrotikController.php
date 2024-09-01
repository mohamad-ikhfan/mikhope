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
        $request->save($request->validationData());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRouterMikrotikRequest $request, RouterMikrotik $routerMikrotik)
    {
        $routerMikrotik->update($request->validationData());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RouterMikrotik $routerMikrotik)
    {
        $routerMikrotik->delete();
    }
}
