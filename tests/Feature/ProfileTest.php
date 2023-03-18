<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Laravel\Passport\Passport;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
    }

    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->create();
        Passport::actingAs($user);

        $response = $this
            ->patchJson('/api/profile', [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertStatus(Response::HTTP_OK);

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    // public function test_user_can_delete_their_account(): void
    // {
    //     $user = User::factory()->create();
    //     Passport::actingAs($user);

    //     $response = $this
    //         ->deleteJson('/api/profile', [
    //             'password' => 'password',
    //         ]);

    //     $response
    //         ->assertStatus(Response::HTTP_OK);

    //     $this->assertGuest('api');
    //     $this->assertNull($user->fresh());
    // }

    // public function test_correct_password_must_be_provided_to_delete_account(): void
    // {
    //     $user = User::factory()->create();

    //     $response = $this
    //         ->actingAs($user)
    //         ->from('/profile')
    //         ->delete('/profile', [
    //             'password' => 'wrong-password',
    //         ]);

    //     $response
    //         ->assertSessionHasErrors('password')
    //         ->assertRedirect('/profile');

    //     $this->assertNotNull($user->fresh());
    // }
}
