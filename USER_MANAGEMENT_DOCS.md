# User Management & Permissions Documentation

## 📦 Package Installed
- **Spatie Laravel Permission** v6.23.0
- Roles & Permissions management system

---

## 🗄️ Database Structure

### Tables Created:
1. **`roles`** - Stores role definitions (admin, manager, editor, user)
2. **`permissions`** - Stores permission definitions  
3. **`model_has_permissions`** - Direct user permissions
4. **`model_has_roles`** - User role assignments
5. **`role_has_permissions`** - Role permission assignments

---

## 👥 Default Roles & Permissions

### 1. **Admin** 🔴
- **Description**: Akses penuh ke semua fitur sistem
- **Permissions**: ALL (27 permissions)
- **Can**:
  - Full CRUD untuk semua modul (Budaya, Event, Toko)
  - Manage users, roles, dan permissions
  - Access semua settings

### 2. **Manager** 🔵
- **Description**: Kelola konten dan moderasi
- **Permissions**: 16 permissions
- **Can**:
  - Full CRUD untuk Budaya & Event
  - Create, Edit Produk (tidak bisa delete)
  - View & Manage Orders
  - View Reports
  - View Users (tidak bisa manage)
  - View Settings

### 3. **Editor** 🟣
- **Description**: Buat dan edit konten
- **Permissions**: 9 permissions
- **Can**:
  - View, Create, Edit Budaya
  - View, Create, Edit Event
  - View, Create Produk
  - View Users

### 4. **User** ⚪
- **Description**: Akses dasar pengguna
- **Permissions**: 3 permissions (read-only)
- **Can**:
  - View Budaya
  - View Event
  - View Produk

---

## 🔐 Permission List

### Budaya Module
- `view-cultures`
- `create-cultures`
- `edit-cultures`
- `delete-cultures`

### Event Module
- `view-events`
- `create-events`
- `edit-events`
- `delete-events`

### Store Module
- `view-products`
- `create-products`
- `edit-products`
- `delete-products`
- `view-orders`
- `manage-orders`
- `view-reports`

### User Management
- `view-users`
- `create-users`
- `edit-users`
- `delete-users`
- `manage-roles`
- `manage-permissions`

### Settings
- `view-settings`
- `edit-settings`

---

## 🎯 API Endpoints

### User Management

#### List Users
```http
GET /users
```
**Query Parameters:**
- `search` - Search by name or email
- `role` - Filter by role name

**Response:**
```json
{
  "users": {
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://...",
        "role": "admin",
        "status": "active",
        "joinDate": "2024-01-15",
        "lastActive": "2 minutes ago"
      }
    ],
    "pagination": {...}
  },
  "roles": ["admin", "manager", "editor", "user"],
  "filters": {...}
}
```

#### Create User
```http
POST /users
```
**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "editor"
}
```

#### Update User
```http
PUT /users/{id}
```
**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "password": "newpassword", // optional
  "password_confirmation": "newpassword",
  "role": "manager"
}
```

#### Delete User
```http
DELETE /users/{id}
```
**Note:** Cannot delete yourself

---

### Role Management

#### List Roles
```http
GET /roles
```
**Response:**
```json
{
  "roles": [
    {
      "id": 1,
      "name": "Admin",
      "slug": "admin",
      "description": "Akses penuh ke semua fitur sistem",
      "userCount": 2,
      "icon": "🔴",
      "color": "bg-red-500",
      "permissions": [
        {
          "module": "Budaya",
          "read": true,
          "create": true,
          "update": true,
          "delete": true
        }
      ]
    }
  ],
  "allPermissions": {...}
}
```

#### Create Role
```http
POST /roles
```
**Body:**
```json
{
  "name": "moderator",
  "permissions": [
    "view-cultures",
    "edit-cultures",
    "view-events"
  ]
}
```

#### Update Role
```http
PUT /roles/{id}
```
**Body:**
```json
{
  "name": "super-moderator",
  "permissions": [
    "view-cultures",
    "create-cultures",
    "edit-cultures"
  ]
}
```

#### Delete Role
```http
DELETE /roles/{id}
```
**Restrictions:**
- Cannot delete `admin` or `user` roles
- Cannot delete roles with assigned users

---

## 💻 Usage in Code

### Check Permission
```php
// In Controller
if (!auth()->user()->can('edit-cultures')) {
    abort(403);
}

// In Blade/View
@can('edit-cultures')
    <button>Edit</button>
@endcan
```

### Check Role
```php
// In Controller
if (auth()->user()->hasRole('admin')) {
    // Admin only logic
}

// Multiple roles
if (auth()->user()->hasAnyRole(['admin', 'manager'])) {
    // Logic for admin or manager
}
```

### Assign Role to User
```php
$user = User::find(1);
$user->assignRole('editor');

// or multiple roles
$user->assignRole(['editor', 'moderator']);

// Sync roles (remove old, add new)
$user->syncRoles(['manager']);
```

### Give Permission to User
```php
$user = User::find(1);
$user->givePermissionTo('edit-cultures');

// Remove permission
$user->revokePermissionTo('edit-cultures');
```

### Give Permission to Role
```php
$role = Role::findByName('editor');
$role->givePermissionTo('delete-cultures');

// Sync permissions
$role->syncPermissions([
    'view-cultures',
    'create-cultures',
    'edit-cultures'
]);
```

---

## 🔒 Route Protection

### Using Middleware
```php
// In routes/web.php
Route::middleware(['permission:edit-cultures'])->group(function () {
    Route::put('/cultures/{id}', [CultureController::class, 'update']);
});

// Multiple permissions (OR)
Route::middleware(['permission:edit-cultures|delete-cultures'])->group(function () {
    // Routes
});

// Multiple permissions (AND)
Route::middleware(['permission:edit-cultures,delete-cultures'])->group(function () {
    // Routes
});

// Role-based
Route::middleware(['role:admin'])->group(function () {
    // Admin only routes
});
```

---

## 🚀 Seeding Data

### Run Seeder
```bash
php artisan db:seed --class=RolePermissionSeeder
```

This will:
1. Create 4 default roles (admin, manager, editor, user)
2. Create 27 permissions
3. Assign permissions to roles
4. Assign admin role to first user

---

## 📝 Frontend Integration

### Display User Role
```tsx
const user = usePage().props.auth.user;
const role = user.roles[0]?.name; // 'admin', 'manager', etc.
```

### Check Permission (via props)
```tsx
// Pass from controller
return Inertia::render('users/index', [
    'can' => [
        'createUser' => auth()->user()->can('create-users'),
        'editUser' => auth()->user()->can('edit-users'),
    ]
]);

// In React component
const { can } = usePage().props;

{can.createUser && (
    <Button>Create User</Button>
)}
```

---

## 🔧 Customization

### Create Custom Permission
```php
Permission::create(['name' => 'export-reports']);
```

### Create Custom Role
```php
$role = Role::create(['name' => 'analyst']);
$role->givePermissionTo(['view-reports', 'export-reports']);
```

### Clear Permission Cache
```bash
php artisan permission:cache-reset
```

---

## ⚠️ Important Notes

1. **First User**: First registered user automatically gets `admin` role
2. **Cannot Delete Self**: Users cannot delete their own account
3. **Protected Roles**: `admin` and `user` roles cannot be deleted
4. **Role with Users**: Cannot delete role if it has assigned users
5. **Cache**: Permissions are cached for 24 hours by default

---

## 🐛 Troubleshooting

### Permission Not Working
```bash
php artisan permission:cache-reset
php artisan config:clear
php artisan cache:clear
```

### Table Not Found
```bash
php artisan migrate
```

### Seeder Error
```bash
php artisan db:seed --class=RolePermissionSeeder --force
```

---

## 📊 Database Queries

### Get Users with Roles
```php
$users = User::with('roles')->get();
```

### Get Role with Permissions
```php
$role = Role::with('permissions')->find(1);
```

### Get Users by Role
```php
$admins = User::role('admin')->get();
```

### Get Users by Permission
```php
$editors = User::permission('edit-cultures')->get();
```

---

## ✅ Testing

### Test User Creation with Role
```bash
php artisan tinker

User::create([
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => Hash::make('password')
])->assignRole('editor');
```

### Test Permission Check
```bash
$user = User::first();
$user->can('edit-cultures'); // true/false
$user->hasRole('admin'); // true/false
```
