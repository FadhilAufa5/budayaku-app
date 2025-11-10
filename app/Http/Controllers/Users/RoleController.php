<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();

        // Transform roles for frontend
        $rolesData = $roles->map(function ($role) {
            $userCount = $role->users()->count();
            
            // Get permissions grouped by module
            $permissions = $this->getPermissionsByModule($role);

            return [
                'id' => $role->id,
                'name' => ucfirst($role->name),
                'slug' => $role->name,
                'description' => $this->getRoleDescription($role->name),
                'userCount' => $userCount,
                'icon' => $this->getRoleIcon($role->name),
                'color' => $this->getRoleColor($role->name),
                'permissions' => $permissions,
            ];
        });

        return Inertia::render('users/roles', [
            'roles' => $rolesData,
            'allPermissions' => $this->getAllPermissionsGrouped(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role = Role::create(['name' => $request->name]);

        if ($request->has('permissions')) {
            $role->givePermissionTo($request->permissions);
        }

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions ?? []);

        return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        // Prevent deleting default roles
        if (in_array($role->name, ['admin', 'user'])) {
            return back()->with('error', 'Cannot delete default roles.');
        }

        // Check if role has users
        if ($role->users()->count() > 0) {
            return back()->with('error', 'Cannot delete role with assigned users.');
        }

        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }

    private function getPermissionsByModule($role)
    {
        $modules = [
            'Budaya' => ['view-cultures', 'create-cultures', 'edit-cultures', 'delete-cultures'],
            'Event' => ['view-events', 'create-events', 'edit-events', 'delete-events'],
            'Toko' => ['view-products', 'create-products', 'edit-products', 'delete-products', 'view-orders', 'manage-orders', 'view-reports'],
            'Users' => ['view-users', 'create-users', 'edit-users', 'delete-users', 'manage-roles', 'manage-permissions'],
            'Settings' => ['view-settings', 'edit-settings'],
        ];

        $rolePermissions = $role->permissions->pluck('name')->toArray();

        return array_map(function ($moduleName) use ($modules, $rolePermissions) {
            $modulePermissions = $modules[$moduleName];
            
            return [
                'module' => $moduleName,
                'read' => in_array(str_replace('edit', 'view', $modulePermissions[0]), $rolePermissions) || 
                         in_array(str_replace('delete', 'view', $modulePermissions[0]), $rolePermissions) ||
                         in_array($modulePermissions[0], $rolePermissions),
                'create' => isset($modulePermissions[1]) && in_array($modulePermissions[1], $rolePermissions),
                'update' => isset($modulePermissions[2]) && in_array($modulePermissions[2], $rolePermissions),
                'delete' => isset($modulePermissions[3]) && in_array($modulePermissions[3], $rolePermissions),
            ];
        }, array_keys($modules));
    }

    private function getAllPermissionsGrouped()
    {
        return [
            'Budaya' => ['view-cultures', 'create-cultures', 'edit-cultures', 'delete-cultures'],
            'Event' => ['view-events', 'create-events', 'edit-events', 'delete-events'],
            'Toko' => ['view-products', 'create-products', 'edit-products', 'delete-products', 'view-orders', 'manage-orders', 'view-reports'],
            'Users' => ['view-users', 'create-users', 'edit-users', 'delete-users', 'manage-roles', 'manage-permissions'],
            'Settings' => ['view-settings', 'edit-settings'],
        ];
    }

    private function getRoleDescription($roleName)
    {
        return match($roleName) {
            'admin' => 'Akses penuh ke semua fitur sistem',
            'manager' => 'Kelola konten dan moderasi',
            'editor' => 'Buat dan edit konten',
            'user' => 'Akses dasar pengguna',
            default => 'Custom role',
        };
    }

    private function getRoleIcon($roleName)
    {
        return match($roleName) {
            'admin' => '🔴',
            'manager' => '🔵',
            'editor' => '🟣',
            'user' => '⚪',
            default => '🟢',
        };
    }

    private function getRoleColor($roleName)
    {
        return match($roleName) {
            'admin' => 'bg-red-500',
            'manager' => 'bg-blue-500',
            'editor' => 'bg-purple-500',
            'user' => 'bg-gray-500',
            default => 'bg-green-500',
        };
    }
}
