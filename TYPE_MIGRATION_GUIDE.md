# TypeScript Type Migration Guide

This guide explains the new centralized type structure and how to migrate existing code to use it.

## Overview

All types have been consolidated into the `src/types/` directory to eliminate duplication and provide a single source of truth for type definitions.

## Directory Structure

```
src/types/
├── index.ts       # Central export point - import from here
├── common.ts      # Common types (API responses, errors, pagination, dates)
├── task.ts        # Task-related types and enums
├── user.ts        # User-related types
├── auth.ts        # Authentication types
├── forms.ts       # Form data types with generic FormHookOptions
├── ui.ts          # UI component prop types
└── store.ts       # Zustand store state interfaces
```

## Import Path Configuration

TypeScript path aliases have been configured in `tsconfig.json`:

```typescript
// You can now import types using these patterns:
import { Task, Priority, Status } from '@/types';
import { Task } from '@/types/task';
import { SomeComponent } from '@/components/SomeComponent';
```

## Migration Examples

### 1. Task Types

**BEFORE:**
```typescript
// In multiple files (model.ts, store.ts, api.ts):
interface Task {
  id: string | number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  // ... different fields in different files
}

enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}
```

**AFTER:**
```typescript
// In your component/hook/api file:
import { Task, Priority, Status, TaskAction } from '@/types';

// All task-related types are now centralized:
// - Task (client-side model)
// - TaskData (server-side model with all fields)
// - TasksByStatus (indexed by status)
// - CreateTaskPayload (for creating tasks)
// - UpdateTaskPayload (for updating tasks)
// - PauseTaskPayload (for pausing tasks)
```

### 2. User Types

**BEFORE:**
```typescript
// In userStore.ts:
type User = {
  id?: string | number;
  email?: string;
  firstName?: string;
  // ...
};

// In api.ts:
type ShowUserResponse = {
  id?: number;
  email?: string;
  // ... duplicate structure
};
```

**AFTER:**
```typescript
import { User, UserSettings, UserState, UserResponse } from '@/types';

// Use User for the user model
// Use UserResponse for API responses
// Use UserState for the Zustand store interface
```

### 3. Authentication Types

**BEFORE:**
```typescript
// In Login/api.ts:
type LoginResponse = {
  token?: string;
  user?: any;
};

// In SignUp/api.ts:
type SignupResponse = {
  token?: string;
  user?: any;
};

// In Activate/api.ts:
type ActivateAccountResponse = {
  token?: string;
  user?: any;
};
```

**AFTER:**
```typescript
import {
  AuthResponse,      // Use this for login/signup/activate responses
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  UpdatePasswordPayload
} from '@/types';

// All authentication types now consolidated
```

### 4. Form Types with Generic Hook Options

**BEFORE:**
```typescript
// In each form hook file:
type UseLoginFormOptions = {
  onSubmit?: (vals: LoginDetails) => Promise<void> | void;
  onChange?: (vals: Partial<LoginDetails>) => void;
};

type UseSignUpFormOptions = {
  onSubmit?: (vals: SignupDetails) => Promise<void> | void;
  onChange?: (vals: Partial<SignupDetails>) => void;
};
// ... repeated pattern
```

**AFTER:**
```typescript
import {
  FormHookOptions,
  LoginFormData,
  SignupFormData,
  TaskFormData,
  TaskPauseFormData
} from '@/types';

// Use the generic FormHookOptions:
function useLoginForm(options?: FormHookOptions<LoginFormData>) {
  // ...
}

function useSignUpForm(options?: FormHookOptions<SignupFormData>) {
  // ...
}
```

### 5. UI Component Props

**BEFORE:**
```typescript
// In each component file:
type SelectFieldProps = {
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  options?: { value: string | number; label: string }[];
  // ...
};
```

**AFTER:**
```typescript
import {
  SelectFieldProps,
  CheckboxProps,
  TextAreaProps,
  ToastProps,
  SelectOption
} from '@/types';

// All UI component prop types centralized
```

### 6. API Response Types

**BEFORE:**
```typescript
// Inconsistent response structures across files
type SomeResponse = {
  message?: string;
  data?: any;
};
```

**AFTER:**
```typescript
import { ApiResponse, ErrorResponse, PaginatedResponse } from '@/types';

// Use generic ApiResponse<T> for consistent structure:
const response: ApiResponse<Task[]> = await api.get('/tasks');

// For paginated data:
const paginated: PaginatedResponse<Task> = await api.get('/tasks/paginated');
```

### 7. Store Types

**BEFORE:**
```typescript
// In store.ts files:
interface TaskState {
  tasks: TasksIndexedByStatus;
  addTasks: (tasks: TasksIndexedByStatus) => void;
  // ...
}
```

**AFTER:**
```typescript
import { TaskState, ToastState, LoaderState } from '@/types';

// Store interfaces are now centralized
const useTaskStore = create<TaskState>((set) => ({
  // ...
}));
```

### 8. Common Types (Dates, IDs, Themes)

**BEFORE:**
```typescript
// Scattered type aliases:
type ISODate = string;
type LocalTime = string;
type Theme = 'light' | 'dark';
```

**AFTER:**
```typescript
import {
  ISODateTime,   // ISO 8601 datetime string
  ISODate,       // ISO date string (YYYY-MM-DD)
  LocalTime,     // HH:MM format
  ID,            // string | number
  Theme,         // 'light' | 'dark'
  ToastVariant   // 'success' | 'error' | 'info' | 'warning'
} from '@/types';
```

## File-by-File Migration Checklist

### High Priority (Core Models)
- [ ] `src/userStore.ts` - Update to use `User`, `UserSettings`, `UserState`
- [ ] `src/containers/Home/store.ts` - Update to use `TaskState`, `Task`, `TasksByStatus`
- [ ] `src/containers/Home/model.ts` - Can be removed (types moved to `@/types/task`)
- [ ] `src/containers/Home/api.ts` - Use `Task`, `FetchTasksResponse`, `Priority`, `Status`

### Authentication Files
- [ ] `src/components/Login/api.ts` - Use `LoginPayload`, `AuthResponse`
- [ ] `src/components/SignUp/api.ts` - Use `SignupPayload`, `AuthResponse`
- [ ] `src/components/ForgotPassword/api.ts` - Use `ForgotPasswordPayload`, `ForgotPasswordResponse`
- [ ] `src/components/UpdatePassword/api.ts` - Use `UpdatePasswordPayload`, `UpdatePasswordResponse`
- [ ] `src/components/AppHeader/api.ts` - Use `SignOutPayload`, `SignOutResponse`
- [ ] `src/containers/Activate/api.ts` - Use `ActivateAccountPayload`, `AuthResponse`

### Form Hooks
- [ ] `src/components/Login/useLoginForm.ts` - Use `FormHookOptions<LoginFormData>`
- [ ] `src/components/SignUp/useSignUpForm.ts` - Use `FormHookOptions<SignupFormData>`
- [ ] `src/components/ForgotPassword/useForgotPassword.ts` - Use `FormHookOptions<ForgotPasswordFormData>`
- [ ] `src/components/UpdatePassword/useUpdatePasswordForm.ts` - Use `FormHookOptions<UpdatePasswordFormData>`
- [ ] `src/containers/Home/components/AddEditTask/useAddTaskForm.tsx` - Use `FormHookOptions<TaskFormData>`, `Task`
- [ ] `src/containers/Home/components/TaskCard/useTaskPauseForm.ts` - Use `FormHookOptions<TaskPauseFormData>`

### UI Components
- [ ] `src/components/ui/Select.tsx` - Use `SelectFieldProps`, `SelectOption`
- [ ] `src/components/ui/Checkbox.tsx` - Use `CheckboxProps`
- [ ] `src/components/ui/TextArea.tsx` - Use `TextAreaProps`
- [ ] `src/components/ToastContainer/store.ts` - Use `ToastState`, `ToastProps`
- [ ] `src/components/ui/Loader/store.ts` - Use `LoaderState`

### Task-Related Files
- [ ] `src/containers/Home/components/TaskCard/api.ts` - Use `Task`, `CreateTaskPayload`, `CreateTaskResponse`
- [ ] `src/containers/Home/components/AddEditTask/api.ts` - Use `CreateTaskPayload`, `ApiResponse`
- [ ] `src/containers/Home/components/TaskCard/ActionButtonsConfig.ts` - Use `Task`, `TaskAction`

### Context & Theme
- [ ] `src/context/ThemeContext.tsx` - Use `Theme`, `ThemeContextType`
- [ ] `src/context/model.ts` - Can be removed or simplified

### HTTP Client
- [ ] `src/http.ts` - Use `RequestFlags`, `ApiResponse`, `ErrorResponse`
- [ ] `src/api.ts` - Use `UserResponse`

## Best Practices

### 1. Always Import from Central Index
```typescript
// ✅ GOOD - Import from central index
import { Task, User, Priority } from '@/types';

// ❌ AVOID - Direct file imports (unless you need only specific types)
import { Task } from '@/types/task';
```

### 2. Use Specific Types Over Generic
```typescript
// ✅ GOOD - Use specific typed response
const response: ApiResponse<Task[]> = await fetchTasks();

// ❌ AVOID - Using 'any'
const response: any = await fetchTasks();
```

### 3. Use Generic FormHookOptions
```typescript
// ✅ GOOD - Reuse generic type
function useMyForm(options?: FormHookOptions<MyFormData>) {
  // ...
}

// ❌ AVOID - Creating new interface for same pattern
interface UseMyFormOptions {
  onSubmit?: (vals: MyFormData) => Promise<void> | void;
  onChange?: (vals: Partial<MyFormData>) => void;
}
```

### 4. Use Enums Instead of String Literals
```typescript
// ✅ GOOD - Use enum for type safety and autocomplete
import { Priority, Status } from '@/types';
const task: Task = {
  priority: Priority.High,
  status: Status.Pending,
  // ...
};

// ❌ AVOID - String literals
const task = {
  priority: 'high',
  status: 'pending',
  // ...
};
```

### 5. Leverage Type Aliases for Clarity
```typescript
// ✅ GOOD - Use semantic type aliases
import { ISODateTime, ID } from '@/types';
function processTask(id: ID, dueDate: ISODateTime) {
  // ...
}

// ❌ AVOID - Using primitive types directly
function processTask(id: string | number, dueDate: string) {
  // ...
}
```

## Common Issues and Solutions

### Issue: TypeScript Can't Find Types
**Solution:** Make sure `tsconfig.json` includes the path mappings and restart your TypeScript server.

### Issue: Circular Dependencies
**Solution:** The type structure is designed to avoid circular dependencies. Import from `@/types` instead of creating cross-file type imports.

### Issue: Conflicting Type Definitions
**Solution:** Remove local type definitions that duplicate centralized types. Use the centralized version.

### Issue: Need to Extend a Type
**Solution:** Use TypeScript utility types:
```typescript
import { Task } from '@/types';

// Extend with additional fields
interface ExtendedTask extends Task {
  customField: string;
}

// Make fields optional
type PartialTask = Partial<Task>;

// Pick specific fields
type TaskPreview = Pick<Task, 'id' | 'title' | 'priority'>;
```

## Testing the Migration

After migrating a file:

1. **Check TypeScript compilation:**
   ```bash
   npm run build
   # or
   tsc --noEmit
   ```

2. **Verify imports work:**
   - Check autocomplete in your IDE
   - Ensure no TypeScript errors

3. **Run tests:**
   ```bash
   npm test
   ```

## Benefits of This Structure

✅ **Single Source of Truth** - No duplicate type definitions
✅ **Better Type Safety** - Consistent types across the app
✅ **Improved DX** - Better autocomplete and IntelliSense
✅ **Easier Refactoring** - Change types in one place
✅ **Clear Organization** - Types grouped by domain
✅ **Reduced Bundle Size** - No duplicate type code (eliminated at compile time)
✅ **Easier Onboarding** - New developers know where to find types

## Questions or Issues?

If you encounter any issues during migration, check:
1. Is the type already defined in `src/types/`?
2. Is the import path correct (`@/types`)?
3. Is `tsconfig.json` configured with path mappings?
4. Have you restarted your TypeScript server?
