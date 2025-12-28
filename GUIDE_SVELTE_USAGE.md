# Using Chrono with Vietnamese Support in Svelte Projects

This guide shows you how to build the Chrono library with Vietnamese support and use it in your Svelte projects.

## Part 1: Build the Chrono Library

### Step 1: Build the Library

From the chrono project directory:

```bash
# Install dependencies (if not already done)
npm install

# Build both CommonJS and ESM versions
npm run build
```

This creates two build outputs:
- `dist/cjs/` - CommonJS version (for Node.js)
- `dist/esm/` - ES Module version (for modern bundlers like Vite)

### Step 2: Test the Vietnamese Locale

```bash
# Run Vietnamese tests to ensure everything works
npm test -- test/vi

# Test all locales
npm test
```

## Part 2: Use in Your Svelte Project

You have **three options** to use your modified Chrono in a Svelte project:

### Option 1: Link Locally (For Development/Testing)

This is the **quickest way** to test your changes without publishing:

```bash
# In the chrono directory
npm link

# In your Svelte project directory
npm link chrono-node
```

**Pros:** Instant updates when you rebuild chrono
**Cons:** Temporary, needs to be done on each machine

### Option 2: Install from Local Path

```bash
# In your Svelte project directory
npm install /Volumes/Data/Q/OSS-Contribute/chrono
```

Or add to your `package.json`:

```json
{
  "dependencies": {
    "chrono-node": "file:../chrono"
  }
}
```

**Pros:** Works like a normal dependency
**Cons:** Needs reinstall after changes to chrono

### Option 3: Publish to npm (For Production)

If you want to publish your fork:

```bash
# Change package name in package.json to avoid conflicts
# For example: "chrono-node" → "chrono-node-vi" or "@yourusername/chrono-node"

# Login to npm
npm login

# Publish
npm publish
```

Then install in your Svelte project:

```bash
npm install @yourusername/chrono-node
```

## Part 3: Using in Svelte Components

### Basic Setup (SvelteKit with Vite)

Create a Svelte component:

**src/routes/+page.svelte**

```svelte
<script lang="ts">
  import * as chrono from 'chrono-node';
  import * as chronoVi from 'chrono-node/vi';

  let inputText = 'hôm nay lúc 3 giờ chiều';
  let result = '';

  function parseDate() {
    // Parse Vietnamese text
    const parsed = chronoVi.parseDate(inputText);

    if (parsed) {
      result = parsed.toString();
    } else {
      result = 'Could not parse date';
    }
  }

  // Parse on component mount
  $: if (inputText) parseDate();
</script>

<div class="container">
  <h1>Vietnamese Date Parser</h1>

  <div class="input-group">
    <label for="dateInput">Vietnamese Date Input:</label>
    <input
      id="dateInput"
      type="text"
      bind:value={inputText}
      placeholder="e.g., hôm nay, ngày mai, thứ 2 tuần sau"
    />
  </div>

  <div class="result">
    <h2>Parsed Result:</h2>
    <p>{result}</p>
  </div>

  <div class="examples">
    <h3>Try these examples:</h3>
    <button on:click={() => inputText = 'hôm nay'}>hôm nay</button>
    <button on:click={() => inputText = 'ngày mai lúc 9 giờ sáng'}>ngày mai lúc 9 giờ sáng</button>
    <button on:click={() => inputText = 'thứ 2 tuần sau'}>thứ 2 tuần sau</button>
    <button on:click={() => inputText = '10 tháng 8 năm 2024'}>10 tháng 8 năm 2024</button>
  </div>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
  }

  .input-group {
    margin: 1rem 0;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 4px;
  }

  .result {
    margin: 2rem 0;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .examples {
    margin-top: 2rem;
  }

  .examples button {
    margin: 0.5rem 0.5rem 0.5rem 0;
    padding: 0.5rem 1rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .examples button:hover {
    background: #45a049;
  }
</style>
```

### Advanced Usage - Complete Example

**src/lib/DateParser.svelte**

```svelte
<script lang="ts">
  import * as chronoVi from 'chrono-node/vi';
  import type { ParsedResult } from 'chrono-node';

  export let locale: 'vi' | 'en' = 'vi';

  let input = '';
  let results: ParsedResult[] = [];
  let referenceDate = new Date();

  function parse() {
    if (!input.trim()) {
      results = [];
      return;
    }

    // Parse with reference date
    results = chronoVi.parse(input, referenceDate);
  }

  function formatResult(result: ParsedResult): string {
    const start = result.start.date();
    const end = result.end?.date();

    if (end) {
      return `${start.toLocaleString('vi-VN')} → ${end.toLocaleString('vi-VN')}`;
    }
    return start.toLocaleString('vi-VN');
  }
</script>

<div class="parser">
  <input
    type="text"
    bind:value={input}
    on:input={parse}
    placeholder="Nhập ngày tháng bằng tiếng Việt..."
  />

  <div class="results">
    {#if results.length > 0}
      <h3>Kết quả phân tích:</h3>
      {#each results as result, i}
        <div class="result-item">
          <strong>Match {i + 1}:</strong> "{result.text}"
          <br />
          <em>{formatResult(result)}</em>
        </div>
      {/each}
    {:else if input.trim()}
      <p class="no-results">Không tìm thấy ngày tháng</p>
    {/if}
  </div>
</div>

<style>
  .parser {
    width: 100%;
  }

  input {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .results {
    min-height: 100px;
  }

  .result-item {
    padding: 1rem;
    margin: 0.5rem 0;
    background: #e8f5e9;
    border-left: 4px solid #4CAF50;
    border-radius: 4px;
  }

  .no-results {
    color: #999;
    font-style: italic;
  }
</style>
```

### Using in a Form

**src/routes/booking/+page.svelte**

```svelte
<script lang="ts">
  import * as chronoVi from 'chrono-node/vi';

  let naturalInput = '';
  let parsedDate: Date | null = null;
  let bookingData = {
    name: '',
    date: '',
    time: ''
  };

  function handleDateInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const result = chronoVi.parseDate(input);

    if (result) {
      parsedDate = result;
      // Format for input fields
      bookingData.date = result.toISOString().split('T')[0];
      bookingData.time = result.toTimeString().slice(0, 5);
    }
  }

  function handleSubmit() {
    console.log('Booking:', bookingData);
    // Submit to your API
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h2>Đặt lịch hẹn</h2>

  <div>
    <label>Họ tên:</label>
    <input type="text" bind:value={bookingData.name} required />
  </div>

  <div>
    <label>Thời gian (tiếng Việt):</label>
    <input
      type="text"
      bind:value={naturalInput}
      on:input={handleDateInput}
      placeholder="Ví dụ: ngày mai lúc 2 giờ chiều"
    />
  </div>

  {#if parsedDate}
    <div class="parsed-info">
      ✅ Đã phân tích: {parsedDate.toLocaleString('vi-VN')}
    </div>
  {/if}

  <div>
    <label>Ngày:</label>
    <input type="date" bind:value={bookingData.date} required />
  </div>

  <div>
    <label>Giờ:</label>
    <input type="time" bind:value={bookingData.time} required />
  </div>

  <button type="submit">Đặt lịch</button>
</form>

<style>
  form {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
  }

  div {
    margin: 1rem 0;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .parsed-info {
    padding: 0.5rem;
    background: #e8f5e9;
    color: #2e7d32;
    border-radius: 4px;
  }

  button {
    width: 100%;
    padding: 1rem;
    background: #2196F3;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background: #1976D2;
  }
</style>
```

## Part 4: TypeScript Configuration

Add types to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "types": ["chrono-node"]
  }
}
```

## Part 5: Testing Your Svelte App

### Create a test file

**src/lib/dateParser.test.ts**

```typescript
import { describe, it, expect } from 'vitest';
import * as chronoVi from 'chrono-node/vi';

describe('Vietnamese Date Parsing', () => {
  it('should parse "hôm nay"', () => {
    const result = chronoVi.parseDate('hôm nay');
    expect(result).toBeTruthy();
    expect(result?.toDateString()).toBe(new Date().toDateString());
  });

  it('should parse "ngày mai"', () => {
    const result = chronoVi.parseDate('ngày mai');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(result?.toDateString()).toBe(tomorrow.toDateString());
  });

  it('should parse time expressions', () => {
    const result = chronoVi.parseDate('hôm nay lúc 3 giờ chiều');
    expect(result?.getHours()).toBe(15);
  });
});
```

## Quick Start Commands

```bash
# 1. In chrono directory - Build the library
cd /Volumes/Data/Q/OSS-Contribute/chrono
npm install
npm run build
npm test -- test/vi

# 2. Link locally
npm link

# 3. In your Svelte project
cd /path/to/your/svelte-project
npm link chrono-node

# 4. Start developing
npm run dev
```

## Troubleshooting

### Issue: Module not found

Make sure you've run `npm run build` in the chrono directory.

### Issue: TypeScript errors

Ensure your `tsconfig.json` has proper module resolution:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### Issue: Updates not reflecting

After making changes to chrono:
```bash
# In chrono directory
npm run build

# If using npm link, the changes should appear immediately
# If using file path, reinstall:
cd /path/to/svelte-project
npm install
```

## Example Vietnamese Inputs

Try these in your Svelte app:

- `hôm nay` - today
- `ngày mai` - tomorrow
- `hôm qua` - yesterday
- `thứ 2 tuần sau` - next Monday
- `10 tháng 8 năm 2024` - August 10, 2024
- `ngày mai lúc 9 giờ sáng` - tomorrow at 9 AM
- `thứ 6 này lúc 5 giờ chiều` - this Friday at 5 PM
- `10-15 tháng 12` - December 10-15

## Resources

- [Chrono Documentation](https://github.com/wanasit/chrono)
- [SvelteKit Docs](https://kit.svelte.dev/)
- [Vietnamese Support Guide](./VIETNAMESE_SUPPORT.md)
