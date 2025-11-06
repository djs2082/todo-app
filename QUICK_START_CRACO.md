# Quick Start: Enable Path Aliases with CRACO

## Installation (2 minutes)

### Step 1: Install CRACO
```bash
npm install @craco/craco --save-dev
```

### Step 2: Create `craco.config.js`
Create a file named `craco.config.js` in the root directory:

```javascript
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
```

### Step 3: Update `package.json`
Replace the scripts section in your `package.json`:

**Before:**
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

**After:**
```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
}
```

### Step 4: Test It
```bash
npm start
```

## That's It!

Your app should now:
- ✅ Support `@/types` imports
- ✅ Build successfully with `npm run build`
- ✅ Have full IDE autocomplete support
- ✅ Work with all the centralized types

## Verify It Works

Try importing in any file:
```typescript
import { Task, Priority, Status, User } from '@/types';
```

The import should resolve correctly and your app should compile.

## Troubleshooting

### If build still fails:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try `npm start` or `npm run build`

### If types aren't found:
1. Restart your IDE/editor
2. Check that `tsconfig.json` has the paths configuration
3. Verify `craco.config.js` is in the root directory

## Alternative: Use Relative Imports

If you prefer not to use CRACO, you can use relative imports:

```typescript
// Instead of:
import { Task } from '@/types';

// Use:
import { Task } from '../../types';
```

Both approaches work with the centralized type structure!
