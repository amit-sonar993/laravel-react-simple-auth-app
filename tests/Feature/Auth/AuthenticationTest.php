<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Laravel\Passport\Passport;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
    }

    public function test_users_can_authenticate_with_valid_data(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson(
                fn (AssertableJson $json) => $json->where('success', true)
                    ->has('data',  fn (AssertableJson $json) => $json->has('token')
                        ->has('user'))

            );
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)->assertJson(fn (AssertableJson $json) => $json->hasAll(['errors', 'message']));
    }

    // public function test_authenticated_user_can_logout(): void
    // {
    //     $user = User::factory()->create();

    //     Passport::actingAs($user);

    //     $response = $this->postJson('/api/logout', [
    //         'password' => 'password',
    //     ]);

    //     $response->assertStatus(Response::HTTP_OK);
    // }
}
