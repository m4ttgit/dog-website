
# 🎨 "Woof & Wag" CSS Color Scheme for Dog-Based Website

A warm and fun CSS color scheme designed for dog-themed websites. Suitable for pet blogs, dog grooming, adoption centers, or e-commerce sites for dog products.

## 🌈 Color Palette

| Purpose        | Color Name          | HEX       | Description                                  |
|----------------|---------------------|-----------|----------------------------------------------|
| Background     | Bone White          | `#FAF6F0` | A soft bone-inspired white                   |
| Primary        | Golden Retriever    | `#F4C95D` | Warm golden — friendly and attention-grabbing|
| Secondary      | Puppy Nose Grey     | `#4A4A4A` | Deep neutral grey, balances out warm tones   |
| Accent         | Tail Wag Teal       | `#56B3B4` | Calming blue-green, for trust & freshness    |
| Highlight      | Paw Pink            | `#F78CA2` | Playful pink, great for calls to action      |
| Text Main      | Doggo Dark Brown    | `#3A2E2B` | Rich, soft brown for good readability        |

## 🎨 CSS Variables Template

```css
:root {
  --color-bg: #FAF6F0;
  --color-primary: #F4C95D;
  --color-secondary: #4A4A4A;
  --color-accent: #56B3B4;
  --color-highlight: #F78CA2;
  --color-text: #3A2E2B;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'Segoe UI', sans-serif;
}

a {
  color: var(--color-accent);
}

.button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.6em 1.2em;
  border-radius: 0.5em;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: var(--color-highlight);
}
```

## 🐶 Ideal Use Cases
- Dog grooming salons
- Dog blogs & breed information
- Pet adoption and rescue sites
- Online stores for dog supplies and accessories

