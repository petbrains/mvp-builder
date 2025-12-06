# shadcn/ui Advanced Patterns

Production-ready patterns for complex UI scenarios.

---

## Dark Mode Toggle

### Setup with next-themes

```bash
npm install next-themes
```

### Theme Provider

```tsx
// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### Theme Toggle Component

```tsx
// components/theme-toggle.tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Simple Toggle (no dropdown)

```tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </Button>
  )
}
```

---

## Advanced Forms

### Multi-Step Form

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

// Step schemas
const step1Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const step2Schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
})

const step3Schema = z.object({
  company: z.string().optional(),
  role: z.string().min(2),
})

const schemas = [step1Schema, step2Schema, step3Schema]

type FormData = z.infer<typeof step1Schema> &
  z.infer<typeof step2Schema> &
  z.infer<typeof step3Schema>

export function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Partial<FormData>>({})

  const form = useForm({
    resolver: zodResolver(schemas[step]),
    defaultValues: formData,
  })

  const onSubmit = (data: Partial<FormData>) => {
    const newData = { ...formData, ...data }
    setFormData(newData)

    if (step < schemas.length - 1) {
      setStep(step + 1)
    } else {
      // Final submit
      console.log('Complete data:', newData)
    }
  }

  const progress = ((step + 1) / schemas.length) * 100

  return (
    <div className="space-y-6">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-muted-foreground">
        Step {step + 1} of {schemas.length}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {step === 0 && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex gap-2">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button type="submit">
              {step === schemas.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
```

### Dynamic Form Fields (Array)

```tsx
'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const schema = z.object({
  links: z.array(
    z.object({
      title: z.string().min(1, 'Title required'),
      url: z.string().url('Invalid URL'),
    })
  ).min(1, 'At least one link required'),
})

export function DynamicFieldsForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      links: [{ title: '', url: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'links',
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={form.control}
              name={`links.${index}.title`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} placeholder="Title" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`links.${index}.url`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} placeholder="https://..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ title: '', url: '' })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Link
        </Button>

        <Button type="submit" className="w-full">Save</Button>
      </form>
    </Form>
  )
}
```

### File Upload with Preview

```tsx
'use client'

import { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(prev => [...prev, ...selectedFiles])

    // Generate previews for images
    selectedFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviews(prev => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      }
    })
  }, [])

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Click to upload or drag and drop
          </span>
        </label>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

### Async Validation

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Check, X } from 'lucide-react'

// Async username check (simulated)
async function checkUsername(username: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const taken = ['admin', 'user', 'test']
  return !taken.includes(username.toLowerCase())
}

const schema = z.object({
  username: z.string()
    .min(3, 'Min 3 characters')
    .refine(async (val) => await checkUsername(val), {
      message: 'Username already taken',
    }),
})

export function AsyncValidationForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange', // Validate on change
  })

  const { isValidating, errors } = form.formState
  const usernameValue = form.watch('username')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input {...field} className="pr-10" />
                </FormControl>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isValidating && <Loader2 className="h-4 w-4 animate-spin" />}
                  {!isValidating && usernameValue && !errors.username && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {!isValidating && errors.username && (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">Submit</Button>
      </form>
    </Form>
  )
}
```

---

## Data Table Patterns

### Server-Side Pagination

```tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface User {
  id: number
  name: string
  email: string
}

interface PaginatedResponse {
  data: User[]
  total: number
  page: number
  pageSize: number
}

async function fetchUsers(page: number, pageSize: number): Promise<PaginatedResponse> {
  const res = await fetch(`/api/users?page=${page}&pageSize=${pageSize}`)
  return res.json()
}

export function ServerPaginatedTable() {
  const [data, setData] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const pageSize = 10

  useEffect(() => {
    setLoading(true)
    fetchUsers(page, pageSize).then(res => {
      setData(res.data)
      setTotal(res.total)
      setLoading(false)
    })
  }, [page])

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: pageSize }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
              </TableRow>
            ))
          ) : (
            data.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages} ({total} total)
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
```

### Row Selection

```tsx
'use client'

import { useState } from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com' },
]

export function SelectableTable() {
  const [selected, setSelected] = useState<number[]>([])

  const toggleAll = () => {
    if (selected.length === users.length) {
      setSelected([])
    } else {
      setSelected(users.map(u => u.id))
    }
  }

  const toggleRow = (id: number) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const isAllSelected = selected.length === users.length
  const isSomeSelected = selected.length > 0 && selected.length < users.length

  return (
    <div className="space-y-4">
      {selected.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
          <span className="text-sm">{selected.length} selected</span>
          <Button variant="destructive" size="sm">
            Delete Selected
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = isSomeSelected
                }}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow
              key={user.id}
              data-state={selected.includes(user.id) ? 'selected' : undefined}
            >
              <TableCell>
                <Checkbox
                  checked={selected.includes(user.id)}
                  onCheckedChange={() => toggleRow(user.id)}
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

### Column Visibility Toggle

```tsx
'use client'

import { useState } from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Settings2 } from 'lucide-react'

const columns = [
  { id: 'name', label: 'Name', visible: true },
  { id: 'email', label: 'Email', visible: true },
  { id: 'role', label: 'Role', visible: true },
  { id: 'status', label: 'Status', visible: false },
  { id: 'createdAt', label: 'Created', visible: false },
]

const users = [
  { id: 1, name: 'John', email: 'john@example.com', role: 'Admin', status: 'Active', createdAt: '2024-01-01' },
  { id: 2, name: 'Jane', email: 'jane@example.com', role: 'User', status: 'Active', createdAt: '2024-02-01' },
]

export function ColumnVisibilityTable() {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.filter(c => c.visible).map(c => c.id)
  )

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings2 className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map(column => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={visibleColumns.includes(column.id)}
                onCheckedChange={() => toggleColumn(column.id)}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columns
              .filter(c => visibleColumns.includes(c.id))
              .map(column => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              {visibleColumns.includes('name') && <TableCell>{user.name}</TableCell>}
              {visibleColumns.includes('email') && <TableCell>{user.email}</TableCell>}
              {visibleColumns.includes('role') && <TableCell>{user.role}</TableCell>}
              {visibleColumns.includes('status') && <TableCell>{user.status}</TableCell>}
              {visibleColumns.includes('createdAt') && <TableCell>{user.createdAt}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

---

## Troubleshooting

### Common Issues

```yaml
"Component not found after install":
  → Check: components.json exists in project root
  → Check: component is in components/ui/
  → Fix: npx shadcn@latest add [component] --overwrite

"Styles not applying":
  → Check: tailwind.config.ts includes "./components/**/*.tsx"
  → Check: globals.css has @tailwind directives
  → Check: CSS variables are defined in :root

"TypeScript errors on components":
  → Check: @types/react installed
  → Fix: npm install -D @types/react @types/react-dom
  → Check: tsconfig.json has proper paths

"Hydration mismatch with Dialog/Sheet":
  → Fix: Add suppressHydrationWarning to html tag
  → Fix: Use dynamic import with ssr: false
  → Pattern:
    const Dialog = dynamic(() => import('@/components/ui/dialog'), { ssr: false })

"Focus ring not visible":
  → Check: --ring CSS variable is set
  → Check: focus-visible styles in tailwind.config.ts

"Dark mode not working":
  → Check: next-themes installed and configured
  → Check: darkMode: ['class'] in tailwind.config.ts
  → Check: ThemeProvider wraps app
  → Check: suppressHydrationWarning on html tag

"Form validation not showing errors":
  → Check: FormMessage component included
  → Check: resolver is zodResolver(schema)
  → Check: FormField has correct name matching schema
```

### Dependencies Check

```bash
# Required for forms
npm install react-hook-form @hookform/resolvers zod

# Required for themes
npm install next-themes

# Required for icons
npm install lucide-react

# Required for animations
npm install tailwindcss-animate

# Required for cmdk (Command)
npm install cmdk
```
