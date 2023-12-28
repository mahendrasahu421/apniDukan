<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\Categories;
use App\Models\Brand;
use App\Models\sizes;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('product.productList');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // Retrieve categories where parent_category_id is 0 and status is 1
        $categories = Categories::where('parent_category_id', 0)
            ->where('status', 1)
            ->get();

        // Retrieve categories where parent_category_id is not 0 and status is 1
        $parentcategories = Categories::where('parent_category_id', '!=', 0)
            ->where('status', 1)
            ->get();

        // Retrieve all sizes
        $sizes = sizes::all();

        // Retrieve all brands
        $brand = Brand::all();

        // Pass the data to the view
        return view('product.createNewProduct', compact('categories', 'sizes', 'brand', 'parentcategories'));
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function store(Request $request)
    {
        // Validate the form data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'parent_category_id' => 'required',
            'category_id' => 'required',
            'size_id' => 'required|exists:sizes,id',
            'regular_price' => 'required|numeric',
            'sell_price' => 'required|numeric',
            'quantity' => 'required|integer',
            'sku' => 'required|string',
            'brand_id' => 'required|exists:brands,id',
            'model' => 'required|string',
            'slug' => 'required|string',
            'product_image' => 'required|image',
            'short_desc' => 'required|string',
            'keywords' => 'required|string',
            'warranty' => 'required|string',
            'status' => 'required|in:1,2',
        ]);

        // Handle the file upload
        $imagePath = $request->file('product_image')->store('product_images', 'public');

        // Create a new product record in the database
        $product = new Products($validatedData);
        $product->product_image = $imagePath; // Store the file path in the database
        $product->save();

        // Redirect or respond as needed
        return redirect('admin/product')->with('success', 'Product created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Products $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Products $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $product)
    {
        //
    }
}
