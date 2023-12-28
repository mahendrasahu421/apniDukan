@extends('admin.layout')
@section('page_tittle', 'Create New Coupon')
<!-- Your dashboard content goes here -->
@section('content')
    <div class="main-content">

        <div class="page-content">
            <div class="container-fluid">

                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-flex align-items-center justify-content-between">
                            <h4 class="mb-0 font-size-18">Add New Coupon</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                                    <li class="breadcrumb-item active">Add New Coupon</li>
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
                                <h4 class="card-title">Add New Coupon</h4>
                                @if (session('faild'))
                                    <div style="color: red;">
                                        {{ session('faild') }}
                                    </div>
                                @endif
                                <div class="row">
                                    <div class="col-md-12">
                                        <form action="{{ route('coupon.insert') }}" method="post">
                                            @csrf
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Tittle</label>
                                                        <input type="text" class="form-control" name="tittle"
                                                            id="tittle" required>

                                                    </div>


                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Code</label>
                                                        <input type="text" name="code" class="form-control"
                                                            id="code" required>

                                                    </div>


                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Value</label>
                                                        <input type="text" name="value" class="form-control"
                                                            id="value" required>

                                                    </div>


                                                </div>
                                                {{-- <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Status</label>
                                                        <select class="form-control" name="status" id="staus" required>
                                                            <option value="0">Select Status</option>
                                                            <option value="1">Active</option>
                                                            <option value="2">Deactive</option>
                                                        </select>

                                                    </div>


                                                </div> --}}
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
