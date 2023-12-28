<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        if ($request->session()->has('ADMIN_LOGIN')) {
            // User is authenticated
            return redirect('admin/dashboard');
        }
        return view('admin.sign-in');
    }

    public function auth(Request $request)
    {
        $email = $request->post('email');
        $password = $request->post('password');

        $result = Admin::where('email', $email)->first();

        if ($result) {
            if (Hash::check($request->post('password'), $result->password)) {
                $request->session()->put('ADMIN_LOGIN', true);
                $request->session()->put('ADMIN_ID', $result->id);
                return redirect('admin/dashboard');
            } else {
                return redirect('admin')->with('error', 'Invalid password');
            }
        } else {
            return redirect('admin')->with('error', 'Invalid email or password');
        }
    }


    public function dashboard()
    {
        return view('admin.dashboard');
    }

    public function updatepassword()
    {
        $r = Admin::find(1);
        $r->password = Hash::make('12345');
        $r->save();
    }

    public function sign_up(){
        return view('admin.sign-up');
    }
    public function password_reset(){
        return view('admin.password-reset');
    }
}
