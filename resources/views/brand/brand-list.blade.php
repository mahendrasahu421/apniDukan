<h1>hello</h1>@extends('admin.layout')
@section('page_tittle', 'Brand')
<!-- Your dashboard content goes here -->
@section('content')
    <div class="main-content">

        <div class="page-content">
            <div class="container-fluid">

                <!-- start page title -->
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box d-flex align-items-center justify-content-between">
                            <h4 class="mb-0 font-size-18">Brand list</h4>

                            <div class="page-title-right">
                                <ol class="breadcrumb m-0">
                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                                    <li class="breadcrumb-item active">Brand list</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end page title -->

                @if (session('success'))
                    <div style="color: green;">
                        {{ session('success') }}
                    </div>
                @endif

                <div>
                    <a href="create-brand" class="btn btn-primary waves-effect waves-light mb-3">Add Brand</a>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <table id="datatable-buttons" class="table table-striped dt-responsive nowrap">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Brand Name</th>
                                            <th>Image</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>


                                    <tbody>
                                        {{-- @foreach ($result as $list)
                                            <tr>
                                                <td>{{ $list->id }}</td>
                                                <td>{{ $list->size_name }}</td>
                                                <td>{{ $list->code }}</td>
                                                <td>
                                                    @if ($list->status == 1)
                                                        Active
                                                    @else
                                                        Deactive
                                                    @endif
                                                </td>
                                            
                                            </tr>
                                        @endforeach --}}
                                    </tbody>
                                </table>

                            </div> <!-- end card body-->
                        </div> <!-- end card -->
                    </div><!-- end col-->
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
