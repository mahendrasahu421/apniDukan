<?php

namespace App\Http\Controllers;

use App\Models\Sizes;
use Illuminate\Http\Request;

class SizesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $result = Sizes::all();
        return view('size.sizeList', compact('result'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('size.newSize');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'size_name' => 'required',
            'code' => 'unique:sizes,code|required', // 'unique' syntax correction and 'required' added
            'status' => 'required',
        ]);

        $Sizes = new Sizes();
        $Sizes->size_name = $request->input('size_name'); // Using input() instead of post()
        $Sizes->code = $request->input('code'); // Using input() instead of post()
        $Sizes->status = $request->input('status'); // Using input() instead of post()

        $save = $Sizes->save();

        if ($save) {
            return redirect('admin/size')->with('success', 'Size Inserted Successfully'); // Typo correction
        } else {
            return redirect('admin/createSize')->with('fields', 'Size Insert Failed'); // Typo correction
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function show(Sizes $size)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function edit(Sizes $size)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sizes $size)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sizes $size)
    {
        //
    }
}
