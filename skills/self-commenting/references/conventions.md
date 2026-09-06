# AICODE Marker Conventions

## Format

```
// AICODE-<TYPE>: <concise explanation>
```

Single line. Directly above relevant code.

## Marker Types

### AICODE-NOTE
```javascript
// AICODE-NOTE: OSC sequence parsing - core login overlay logic
socket.addEventListener('message', ev => { /* ... */ });

// AICODE-NOTE: Rate limit 5000/hour - see GitHub API docs
await rateLimiter.wait();

// AICODE-NOTE: Workaround for library bug v2.1.0 - remove after upgrade
const result = legacyFix(data);
```

### AICODE-TODO
```javascript
// AICODE-TODO: Add retry logic for network failures
const response = await fetch(url);

// AICODE-TODO: Extract validation into separate function
if (data.name && data.email && data.age > 0) { /* ... */ }

// AICODE-TODO: Optimize - currently O(n²)
function findDuplicates(arr) { /* ... */ }
```

### AICODE-FIX
Format: problem → cause → fix

```javascript
// AICODE-FIX: Memory leak on reconnect → event listeners not removed → added cleanup in disconnect()
socket.addEventListener('message', handler);

// AICODE-FIX: Race condition in auth → token refresh overlapped → added mutex lock
await acquireLock('auth');
const token = await refreshToken();

// AICODE-FIX: Infinite loop on empty input → while condition never false → added length check
if (items.length === 0) return [];
```

## Language Syntax

| Language | Syntax |
|----------|--------|
| JS/TS | `// AICODE-NOTE: ...` |
| Python | `# AICODE-NOTE: ...` |
| CSS | `/* AICODE-NOTE: ... */` |
| HTML | `<!-- AICODE-NOTE: ... -->` |
| SQL | `-- AICODE-NOTE: ...` |

## Grep Commands

```bash
# All markers
grep -rn "AICODE-" src/

# By type
grep -rn "AICODE-NOTE" src/
grep -rn "AICODE-TODO" src/
grep -rn "AICODE-FIX" src/

# Before debugging - find similar fixes
grep -rn "AICODE-FIX" src/ | grep -i "keyword"

# With context (2 lines after)
grep -rn -A2 "AICODE-" src/
```

## Full Example

```javascript
// AICODE-NOTE: Login overlay state machine - START/END are OSC sequences
const LOGIN_START = '\x1b]9;LOGIN=START\x07';
const LOGIN_END = '\x1b]9;LOGIN=END\x07';
let inLogin = false, buf = '';

// AICODE-FIX: Buffer overflow on rapid messages → chunks concatenated without limit → added max buffer size
const MAX_BUFFER = 1024 * 1024; // 1MB

// AICODE-NOTE: Buffer accumulates chunks until complete sequence
socket.addEventListener('message', ev => {
  const chunk = ev.data instanceof ArrayBuffer
    ? new TextDecoder().decode(ev.data) : ev.data;
  buf += chunk;
  
  // AICODE-FIX: Memory leak → buffer never cleared on error → added try/finally
  try {
    // AICODE-TODO: Extract sequence parsing into separate function
    while (true) {
      const s = buf.indexOf(LOGIN_START);
      const e = buf.indexOf(LOGIN_END);
      if (s !== -1 && (s < e || e === -1)) {
        if (!inLogin && s > 0) term.write(buf.slice(0, s));
        buf = buf.slice(s + LOGIN_START.length);
        showOverlay();
        inLogin = true;
        continue;
      }
      if (e !== -1) {
        if (!inLogin && e > 0) term.write(buf.slice(0, e));
        buf = buf.slice(e + LOGIN_END.length);
        hideOverlay();
        inLogin = false;
        continue;
      }
      break;
    }
  } finally {
    if (!inLogin && buf) { term.write(buf); buf = ''; }
  }
});
```