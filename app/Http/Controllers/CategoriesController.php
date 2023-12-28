<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Categories::all();

        return view('admin.categories', compact('result'));
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createCategories(Request $request)
    {
        $categories = Categories::where('parent_category_id', 0)->get();
        return view('admin.createCategories', compact('categories'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function category_insert(Request $request)
    {
        $request->validate([
            'category_name' => 'required',
            'category_slug' => 'required|unique:categories',
            'parent_category_id' => 'required',
            'status' => 'required',
        ]);

        $model = new Categories(); // Assuming your model is in the 'App\Models' namespace
        $model->category_name = $request->input('category_name'); // Use input() method
        $model->category_slug = $request->input('category_slug');
        $model->parent_category_id = $request->input('parent_category_id');
        $model->status = $request->input('status');

        $save = $model->save();

        if ($save) {
            return redirect('admin/categories')->with("success", "Category added successfully");
        } else {
            return redirect('admin/createCategories')->with("failed", "Category addition failed");
        }
    }





    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function show(Categories $categories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function edit(Categories $categories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Categories $categories)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function destroy(Categories $categories)
    {
        //
    }
}
