<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedUserController extends Controller
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
        ], Response::HTTP_OK);
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

        return response()->json($response, Response::HTTP_OK);
    }
}
