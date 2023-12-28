@extends('admin.layout')
@section('page_tittle', 'Create New Product')
<!-- Your dashboard content goes here -->
@section('content')
    <div class="main-content">

        <div class="page-content">
            <div class="container-fluid">

                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-flex align-items-center justify-content-between">
                            <h4 class="mb-0 font-size-18">Add New Product</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                                    <li class="breadcrumb-item active">Add New Product</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end page title -->


                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Add New Product</h4>
                                @if (session('faild'))
                                    <div style="color: red;">
                                        {{ session('faild') }}
                                    </div>
                                @endif
                                <div class="row">
                                    <div class="col-md-12">
                                        <form action="{{ route('product.insert') }}" method="post">
                                            @csrf
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Product Name</label>
                                                        <input placeholder="Product Name" type="text"
                                                            class="form-control" name="name" id="name" required>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Categary</label>
                                                        <select name="parent_category_id" class="form-control" id="parent_category_id"
                                                            required>
                                                            <option value="0">------Select--Parent--Categary---</option>
                                                            @foreach ($categories as $catList)
                                                                <option value="{{ $catList->id }}">
                                                                    {{ $catList->category_name }}</option>
                                                            @endforeach
                                                        </select>

                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Categary</label>
                                                        <select name="category_id" class="form-control" id="category_id"
                                                            required>
                                                            <option value="0">------Select---Categary---</option>
                                                            @foreach ($parentcategories as $parentcategoriesList)
                                                                <option value="{{ $parentcategoriesList->id }}">
                                                                    {{ $parentcategoriesList->category_name }}</option>
                                                            @endforeach
                                                        </select>

                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Size</label>
                                                        <select name="size_id" class="form-control" id="size_id" required>
                                                            <option value="0">--Select--Size--</option>
                                                            @foreach ($sizes as $sizesList)
                                                                <option value="{{ $sizesList->id }}">
                                                                    {{ $sizesList->code }}</option>
                                                            @endforeach
                                                        </select>

                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Regular Price</label>
                                                        <input placeholder="Regular Price" type="text" class="form-control"
                                                            name="regular_price" id="regular_price" required>

                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Sell Price</label>
                                                        <input placeholder="Sell Price" type="text" class="form-control"
                                                            name="sell_price" id="sell_price" required>

                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Quantity</label>
                                                        <input placeholder="Quantity" type="text" class="form-control"
                                                            name="quantity" id="quantity" required>

                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>SKU</label>
                                                        <input placeholder="SKU" type="text" class="form-control"
                                                            name="sku" id="sku" required>

                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Brand</label>
                                                        <select name="brand_id" class="form-control" id="brand_id" required>
                                                            <option value="0">--Select--Brand--</option>
                                                            @foreach ($brand as $brandList)
                                                                <option value="{{ $brandList->id }}">
                                                                    {{ $brandList->brand_name }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Model</label>
                                                        <input placeholder="Model" type="text" name="model"
                                                            class="form-control" id="model" required>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Slug</label>
                                                        <input placeholder="Slug" type="text" name="slug"
                                                            class="form-control" id="slug" required>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Image</label>
                                                        <input type="file" name="product_image" class="form-control"
                                                            id="product_image" required>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Short desc</label>
                                                        <input placeholder="Short desc" type="text" name="short_desc"
                                                            class="form-control" id="short_desc" required>
                                                    </div>
                                                </div>

                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label> Keywords</label>
                                                        <input placeholder="Keywords" type="text" name="keywords"
                                                            class="form-control" id="keywords" required>
                                                    </div>
                                                </div>

                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label> Warranty</label>
                                                        <input placeholder="Warranty" type="text" name="warranty"
                                                            class="form-control" id="warranty" required>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3">
                                                    <div class="form-group">
                                                        <label>Status</label>
                                                        <select class="form-control" name="status" id="status"
                                                            required>
                                                            <option value="0">---Select Status--</option>
                                                            <option value="1">Active</option>
                                                            <option value="2">Deactive</option>
                                                        </select>

                                                    </div>


                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary waves-effect waves-light">New
                                                Coupon</button>
                                        </form>
                                    </div> <!-- end col -->


                                </div>
                                <!-- end row -->

                            </div> <!-- end card-body-->
                        </div> <!-- end card-->
                    </div> <!-- end col -->
                </div>
                <!-- end row-->


            </div> <!-- container-fluid -->
        </div>
        <!-- End Page-content -->

        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6">
                        2019 © Xacton.
                    </div>
                    <div class="col-sm-6">
                        <div class="text-sm-right d-none d-sm-block">
                            Design & Develop by Myra
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    </div>
@endsection
