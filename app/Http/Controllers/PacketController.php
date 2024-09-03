<?php

namespace App\Http\Controllers;

use App\Models\Packet;
use App\Http\Requests\StorePacketRequest;
use App\Http\Requests\UpdatePacketRequest;
use App\Http\Resources\PacketResource;
use Inertia\Inertia;

class PacketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Packet::query();

        /** @disregard P1013 */
        return Inertia::render('Packet/Index', [
            'packets' => PacketResource::collection($query->paginate(10)->onEachSide(1))
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePacketRequest $request)
    {
        Packet::create($request->validationData());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePacketRequest $request, $id)
    {
        $packet = Packet::findOrFail($id);
        $packet->update($request->validationData());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $packet = Packet::findOrFail($id);
        $packet->delete();
    }
}