<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use App\Models\Subscribed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Invoice::query();

        /** @disregard P1013 */
        return Inertia::render('Invoice/Index', [
            'invoices' => InvoiceResource::collection($query->paginate(10)->onEachSide(1)),
            'subscribeds' => Subscribed::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'subscribed_id' => 'required|integer',
            'date_of_use' => 'required|date',
        ]);

        $sufix = 'INV-';
        $invoices = Invoice::all();
        $invNumbers[] = 0;
        foreach ($invoices as $invoice) {
            if (strpos($invoice, $sufix)) {
                $invNumbers[] = intval(str_replace($sufix, '', $invoice->inv_number));
            }
        }

        $invNumber = max($invNumbers);
        $invNumber++;
        $inv_number = $sufix . str_pad($invNumber, 5, '0', STR_PAD_LEFT);

        $subscribed = Subscribed::findOrFail($request->subscribed_id);

        $requestDateOfUse = now()->parse($request->date_of_use);
        $requestLastDateOfUse = now()->parse($request->date_of_use)->lastOfMonth();
        $dayOfUse = $requestDateOfUse->diff($requestLastDateOfUse)->d;

        $dateOfBill = now()->parse($request->date_of_use)->addMonth()->firstOfMonth();

        if ($dayOfUse == 0) {
            $totalBill = round(($subscribed->packet->price / $requestLastDateOfUse->day) * $dayOfUse);
        } else {
            $totalBill = round(($subscribed->packet->price / $requestLastDateOfUse->day) * ($dayOfUse + 1));
        }

        $discountBill = $subscribed->packet->price - $totalBill;

        Invoice::create([
            'inv_number' => $inv_number,
            'subscribed_id' => $request->subscribed_id,
            'date_of_use' => $requestDateOfUse->format('Y-m-d'),
            'day_of_use' => $dayOfUse,
            'total_day_of_use' => $requestLastDateOfUse->day,
            'date_of_bill' => $dateOfBill->format('Y-m-d'),
            'discount_bill' => $discountBill,
            'total_bill' => $totalBill,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'subscribed_id' => 'required|integer',
            'date_of_use' => 'required|date',
        ]);

        $invoice = Invoice::findOrFail($id);

        $subscribed = Subscribed::findOrFail($request->subscribed_id);

        $subscribed = Subscribed::findOrFail($request->subscribed_id);

        $requestDateOfUse = now()->parse($request->date_of_use);
        $requestLastDateOfUse = now()->parse($request->date_of_use)->lastOfMonth();
        $dayOfUse = $requestDateOfUse->diff($requestLastDateOfUse)->d;

        $dateOfBill = now()->parse($request->date_of_use)->addMonth()->firstOfMonth();

        if ($dayOfUse == 0) {
            $totalBill = round(($subscribed->packet->price / $requestLastDateOfUse->day) * $dayOfUse);
        } else {
            $totalBill = round(($subscribed->packet->price / $requestLastDateOfUse->day) * ($dayOfUse + 1));
        }

        $discountBill = $subscribed->packet->price - $totalBill;

        $invoice->update([
            'subscribed_id' => $request->subscribed_id,
            'date_of_use' => $requestDateOfUse->format('Y-m-d'),
            'day_of_use' => $dayOfUse,
            'total_day_of_use' => $requestLastDateOfUse->day,
            'date_of_bill' => $dateOfBill->format('Y-m-d'),
            'discount_bill' => $discountBill,
            'total_bill' => $totalBill,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();
    }

    public function paymentAccepted($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->update([
            'payemented_at' => now(),
            'payment_accepted_at' => now(),
            'payment_accepted_by' => auth('web')->user()->id
        ]);
    }
}