This project uses MUI wrapper components under `src/components/ui`.

Install required packages:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-hook-form
```

Utilities added:
- `ToastProvider` and `useToast` in `src/components/ui/Toast.tsx` (global toasts)
- `useDebounceValue` in `src/hooks/useDebounce.ts` (debounced values for async validation)
```

After installing, restart the dev server.

Components added:
- `Input` - wrapper around MUI TextField
- `Button` - wrapper around MUI Button
- `FormGenerator` - generate simple forms from JSON config

Notes:
- These files reference MUI; if you don't install the packages you'll see TypeScript errors.

Wrap your app root with `ToastProvider` so toasts work (already done in `src/App.tsx`).
