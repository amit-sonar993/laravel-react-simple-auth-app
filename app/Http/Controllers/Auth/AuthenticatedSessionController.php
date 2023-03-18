<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthenticatedSessionController extends Controller
{

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        $authUser = auth()->user();
        $token = $authUser->createToken('LaravelAuthApp')->accessToken;

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $token,
                'user' => $authUser
            ]
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {

        $token = $request->user()->token();
        $token->revoke();
        $response = [
            'success' => true,
            'message' => 'You have been successfully logged out!'
        ];
        return response($response, 200);
    }
}
