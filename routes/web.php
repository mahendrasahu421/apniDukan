<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\SizesController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CostumerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
| 
*/

Route::get('/', function () {
    return view('welcome');
});
// users Section
Route::get('/users', [UsersController::class, 'index']);

// Admin Section 
Route::get('/admin', [AdminController::class, 'index']);
Route::get('/sign-up', [AdminController::class, 'sign_up']);
Route::get('/password-reset', [AdminController::class, 'password_reset']);
Route::post('/auth', [AdminController::class, 'auth'])->name('admin.auth');

Route::group(['prefix' => 'admin', 'middleware' => 'admin_auth'], function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    // Update Password Route
    Route::get('/admin/updatepassword', [AdminController::class, 'updatepassword']);
    // Log out Route
    Route::get('/logout', function () {
        session()->forget('ADMIN_LOGIN');
        session()->forget('ADMIN_ID');
        return redirect('admin');
    });
    // Category Route
    Route::get('/categories', [CategoriesController::class, 'index']);
    Route::get('/createCategories', [CategoriesController::class, 'createCategories']);
    Route::post('/category_insert', [CategoriesController::class, 'category_insert'])->name('category.insert');

    // coupon Route
    Route::get('/coupon', [CouponController::class, 'index']);
    Route::get('/createCoupon', [CouponController::class, 'create']);
    Route::post('/coupon_insert', [CouponController::class, 'store'])->name('coupon.insert');

    // Size Route
    Route::get('/size', [SizesController::class, 'index']);
    Route::get('/createSize', [SizesController::class, 'create']);
    Route::post('/size_insert', [SizesController::class, 'store'])->name('size.insert');

    // Color Route
    Route::get('/color', [ColorController::class, 'index']);
    Route::get('/createColor', [ColorController::class, 'create']);
    Route::post('/color_insert', [ColorController::class, 'store'])->name('color.insert');

    // Brand Route
    Route::get('/brand', [BrandController::class, 'index']);
    Route::get('/create-brand', [BrandController::class, 'create']);
    Route::post('/brand-insert', [BrandController::class, 'store'])->name('brand.insert');

    // product Route
    Route::get('/product', [ProductController::class, 'index']);
    Route::get('/createProduct', [ProductController::class, 'create']);
    Route::post('/product_insert', [ProductController::class, 'store'])->name('product.insert');

    // users Route
    // Route::get('/costumers', [CostumerController::class, 'index']);
    // Route::get('/createProduct', [CostumerController::class, 'create']);
    // Route::post('/color_insert', [CostumerController::class, 'store'])->name('color.insert');
});
