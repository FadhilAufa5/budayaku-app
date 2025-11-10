<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Budaya permissions
            'view-cultures',
            'create-cultures',
            'edit-cultures',
            'delete-cultures',
            
            // Event permissions
            'view-events',
            'create-events',
            'edit-events',
            'delete-events',
            
            // Store permissions
            'view-products',
            'create-products',
            'edit-products',
            'delete-products',
            'view-orders',
            'manage-orders',
            'view-reports',
            
            // User management permissions
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',
            'manage-roles',
            'manage-permissions',
            
            // Settings permissions
            'view-settings',
            'edit-settings',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        
        // Admin role - has all permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Manager role - can manage content but not users
        $managerRole = Role::create(['name' => 'manager']);
        $managerRole->givePermissionTo([
            'view-cultures', 'create-cultures', 'edit-cultures', 'delete-cultures',
            'view-events', 'create-events', 'edit-events', 'delete-events',
            'view-products', 'create-products', 'edit-products',
            'view-orders', 'manage-orders',
            'view-reports',
            'view-users',
            'view-settings',
        ]);

        // Editor role - can create and edit content
        $editorRole = Role::create(['name' => 'editor']);
        $editorRole->givePermissionTo([
            'view-cultures', 'create-cultures', 'edit-cultures',
            'view-events', 'create-events', 'edit-events',
            'view-products', 'create-products',
            'view-users',
        ]);

        // User role - basic read access
        $userRole = Role::create(['name' => 'user']);
        $userRole->givePermissionTo([
            'view-cultures',
            'view-events',
            'view-products',
        ]);

        // Assign admin role to the first user (if exists)
        $adminUser = User::first();
        if ($adminUser) {
            $adminUser->assignRole('admin');
        }
    }
}
