<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\User;

class AuthController extends BaseController
{
    public function user(Request $request): JsonResponse
    {
        $userData['name'] =  auth('sanctum')->user()->getAttribute('name');
        $userData['email'] = auth('sanctum')->user()->getAttribute('email');

        return $this->sendResponse($userData, 'User data');
    }

    public function signIn(Request $request): JsonResponse
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $authUser = auth('sanctum')->user();
            $success['token'] =  $authUser->createToken('auth_token')->plainTextToken;
            $success['name'] =  $authUser->getAttribute('name');
            $success['email'] =  $authUser->getAttribute('email');

            return $this->sendResponse($success, 'User signed in');
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }
    }

    public function signUp(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Error validation', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('auth_token')->plainTextToken;
        $success['name']  =  $user->getAttribute('name');
        $success['email'] =  $user->getAttribute('email');

        return $this->sendResponse($success, 'User created successfully.');
    }
}
