@extends('admin.layout')
@section('page_tittle', 'Create Color')
<!-- Your dashboard content goes here -->
@section('content')
    <div class="main-content">

        <div class="page-content">
            <div class="container-fluid">

                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-flex align-items-center justify-content-between">
                            <h4 class="mb-0 font-size-18">Add Color</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                                    <li class="breadcrumb-item active">Add Color</li>
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
                                <h4 class="card-title">Add Color</h4>
                                @if (session('faild'))
                                    <div style="color: red;">
                                        {{ session('faild') }}
                                    </div>
                                @endif
                                <div class="row">
                                    <div class="col-md-12">
                                        <form action="{{ route('color.insert') }}" method="post">
                                            @csrf
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Color Name</label>
                                                        <input type="text" class="form-control" name="color_name"
                                                            id="color_name" required>

                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Color Code</label>
                                                        <input type="text" name="color_code" class="form-control"
                                                            id="color_code" required>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Status</label>
                                                        <select class="form-control" name="status" id="staus" required>
                                                            <option value="0">Select Status</option>
                                                            <option value="1">Active</option>
                                                            <option value="2">Deactive</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary waves-effect waves-light">New
                                                Categories</button>
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
