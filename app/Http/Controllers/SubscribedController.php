<?php

namespace App\Http\Controllers;

use App\Models\Subscribed;
use App\Http\Requests\StoreSubscribedRequest;
use App\Http\Requests\UpdateSubscribedRequest;
use App\Http\Resources\SubscribedResource;
use App\Models\Client;
use App\Models\Packet;
use Inertia\Inertia;

class SubscribedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Subscribed::query();

        /** @disregard P1013 */
        return Inertia::render('Subscribed/Index', [
            'subscribeds' => SubscribedResource::collection($query->paginate(10)->onEachSide(1)),
            'clients' => Client::all(),
            'packets' => Packet::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubscribedRequest $request)
    {
        $request->validationData();

        if (empty($request->secret_name)) {
            $sufix = 'NN-';
            $subscribeds = Subscribed::all();
            $client_secrets[] = 0;
            foreach ($subscribeds as $subscribed) {
                if (strpos($subscribed, $sufix)) {
                    $client_secrets[] = intval(str_replace($sufix, '', $subscribed->client_secret));
                }
            }

            $secret_number = max($client_secrets);
            $secret_number++;
            $client_secret = $sufix . str_pad($secret_number, 5, '0', STR_PAD_LEFT);
        } else {
            $client_secret = $request->client_secret;
        }

        Subscribed::create([
            'client_id' => $request->client_id,
            'packet_id' => $request->packet_id,
            'client_secret' => $client_secret,
            'description' => $request->description,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubscribedRequest $request, $id)
    {
        $subscribed = Subscribed::findOrFail($id);
        $subscribed->update($request->validationData());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $subscribed = Subscribed::findOrFail($id);
        $subscribed->delete();
    }
}