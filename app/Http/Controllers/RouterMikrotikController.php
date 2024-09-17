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
        return Inertia::render('RouterMikrotik/Index', [
            'routerMikrotiks' => RouterMikrotikResource::collection(RouterMikrotik::latest()->get())
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

    public function testConnection($id)
    {
        $routerMikrotik = RouterMikrotik::findOrFail($id);
        try {
            $routerMikrotik->connect();
            return response()->json('Router connected succesfully.');
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 408);
        }
    }

    public function fetch()
    {
        return response()->json(RouterMikrotikResource::collection(RouterMikrotik::all()));
    }
}