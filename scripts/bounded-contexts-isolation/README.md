# Script Bounded Contexts isolation

> Linter to prohibit imports between different Bounded Contexts (isolation break).

Catch:

```ts
// More than 1 relative parent path
import { XXX } from '../../tasking';
```

```ts
// Relative import with TS aliase
import { XXX } from '../@tasking';
```

```ts
// Import without TS aliase
import { XXX } from 'src/modules/tasking';
```

```ts
// Cross bounded context import
// All TS aliases that are not related to folders under src/modules/
// (e.g. `@core`, `@env` are allowed)

// src/modules/outbound/index.ts
import { XXX } from '@tasking';
```
