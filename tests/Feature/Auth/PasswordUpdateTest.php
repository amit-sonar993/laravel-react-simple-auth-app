<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;

class PasswordUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
    }

    public function test_password_can_be_updated(): void
    {
        $user = User::factory()->create();

        Passport::actingAs($user);

        $response = $this
            ->putJson('/api/password', [
                'current_password' => 'password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

        $response
            ->assertStatus(Response::HTTP_OK);

        $this->assertTrue(Hash::check('new-password', $user->refresh()->password));
    }

    // public function test_correct_password_must_be_provided_to_update_password(): void
    // {
    //     $user = User::factory()->create();

    //     $response = $this
    //         ->actingAs($user)
    //         ->from('/profile')
    //         ->put('/password', [
    //             'current_password' => 'wrong-password',
    //             'password' => 'new-password',
    //             'password_confirmation' => 'new-password',
    //         ]);

    //     $response
    //         ->assertSessionHasErrors('current_password')
    //         ->assertRedirect('/profile');
    // }
}
