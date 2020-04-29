<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;

class FirebaseController extends Controller
{
    //
    public function index()
    {
        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__ . '/it60-42-choen-savoey-firebase-adminsdk-v79qo-91fb7ec681.json');
        $firebase = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->create();
        //เริ่มเขียนตรงนี้นะ....
        //1)สร้างตารางใหม่
        $db = $firebase->getDatabase();
            $db->getReference('config/website')
            ->set([
                'id' => '2',
                'Name' => 'Khanadet.',
                'E-mail' => 'admin.n@mail.kmutt.ac.th',
                'Online' => 'Yes'
            ]);
        echo "<กูสร้างได้แล้วจ้า>";
    }
}
