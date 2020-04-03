<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloController extends Controller
{
    function showHello() {
        return '<h1>Pakbung Controller</h1>';
    }
}
