# 🔧 Troubleshooting Guide - Animations Not Visible

## Issue: Animations and effects are not visible

### Quick Fixes

#### 1. **Clear Browser Cache**
The most common issue is cached CSS/JS files.

**Steps:**
1. Open your browser
2. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
3. Select "Cached images and files"
4. Click "Clear data"
5. **OR** Do a hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

#### 2. **Verify Dev Server is Running**
Make sure the development server is running on the correct port.

**Check:**
- Open http://localhost:5174/ in your browser
- You should see the portfolio loading
- Check terminal for any errors

**If not running:**
```bash
cd e:\College\Projects\3D_portfolio\ai-portfolio
npm run dev
```

#### 3. **Check Browser Console**
Open browser DevTools to see if there are any errors.

**Steps:**
1. Press `F12` to open DevTools
2. Go to "Console" tab
3. Look for any red error messages
4. Take a screenshot if you see errors

#### 4. **Verify CSS is Loading**
Check if the CSS file is being loaded.

**Steps:**
1. Press `F12` to open DevTools
2. Go to "Network" tab
3. Refresh the page
4. Look for `index.css` in the list
5. Click on it and verify it contains the animation styles

#### 5. **Check if Framer Motion is Working**
Open browser console and type:
```javascript
console.log(window.FramerMotion)
```

If it returns `undefined`, Framer Motion isn't loading.

---

## Detailed Diagnostics

### Step 1: Verify Installation
```bash
cd e:\College\Projects\3D_portfolio\ai-portfolio
npm list framer-motion
```

**Expected output:**
```
ai-portfolio@0.0.0
└── framer-motion@12.39.0
```

**If not installed:**
```bash
npm install framer-motion
```

### Step 2: Rebuild the Project
```bash
# Clean install
rm -rf node_modules
rm -rf dist
npm install
npm run build
npm run dev
```

### Step 3: Check for TypeScript Errors
```bash
npx tsc --noEmit
```

**Expected:** No errors

### Step 4: Verify Tailwind is Working
Open browser console and check if Tailwind classes are applied:
```javascript
// Check if an element has Tailwind classes
document.querySelector('.animate-float')
```

### Step 5: Check Vite Configuration
Verify `vite.config.ts` is correct:
```bash
cat vite.config.ts
```

---

## Common Issues & Solutions

### Issue 1: "Page is blank"
**Cause:** JavaScript error preventing React from rendering

**Solution:**
1. Open browser console (F12)
2. Look for error messages
3. Check if `portfolio.json` is loading correctly
4. Verify all imports in `App.tsx`

### Issue 2: "Animations are choppy"
**Cause:** Performance issues or too many animations

**Solution:**
1. Check if GPU acceleration is enabled in browser
2. Close other tabs/applications
3. Try in a different browser
4. Check if `prefers-reduced-motion` is enabled

### Issue 3: "Background is static"
**Cause:** AnimatedBackground component not rendering

**Solution:**
1. Check browser console for errors
2. Verify Framer Motion is installed
3. Check if `AnimatedBackground` is imported correctly
4. Try refreshing with `Ctrl + Shift + R`

### Issue 4: "Cards don't have hover effects"
**Cause:** CSS not loading or Card component issue

**Solution:**
1. Verify `index.css` is loading
2. Check if Tailwind is working
3. Inspect card element in DevTools
4. Check if `hover={true}` is set on Card component

### Issue 5: "Scrollbar is not styled"
**Cause:** Browser doesn't support custom scrollbar or CSS not loading

**Solution:**
1. Try in Chrome/Edge (best support)
2. Verify CSS is loading
3. Check if `::-webkit-scrollbar` styles are present

---

## Browser-Specific Issues

### Chrome/Edge
- Usually works best
- Check if hardware acceleration is enabled
- Settings → System → Use hardware acceleration

### Firefox
- May need to enable smooth scrolling
- Settings → General → Browsing → Use smooth scrolling
- Check if `layout.css.backdrop-filter.enabled` is true in `about:config`

### Safari
- May need `-webkit-` prefixes
- Check if "Reduce Motion" is disabled
- System Preferences → Accessibility → Display

---

## Manual Verification Checklist

Open the site and check each item:

### Background Animations
- [ ] Can you see large blurred circles moving slowly?
- [ ] Are there small dots floating upward?
- [ ] Is there a subtle grid pattern?

**If NO:** 
- Check browser console for errors
- Verify `AnimatedBackground` component is rendering
- Try hard refresh (Ctrl + Shift + R)

### Card Hover
- [ ] Do cards lift up when you hover?
- [ ] Does the card tilt toward your cursor?
- [ ] Is there a light spot following your mouse?

**If NO:**
- Check if mouse events are working
- Verify Card component has `hover={true}`
- Check browser console for errors

### Smooth Scrolling
- [ ] Does the page scroll smoothly when clicking navigation?
- [ ] Is the scrollbar styled with gradient colors?

**If NO:**
- Check if `scroll-behavior: smooth` is in CSS
- Verify browser supports smooth scrolling
- Try in Chrome/Edge

### Text Animations
- [ ] Do heading colors shift gradually?
- [ ] Is there a subtle glow around text?

**If NO:**
- Check if CSS animations are working
- Verify Tailwind is loading
- Check browser console

---

## Emergency Reset

If nothing works, try this complete reset:

```bash
# 1. Stop dev server (Ctrl + C)

# 2. Clean everything
cd e:\College\Projects\3D_portfolio\ai-portfolio
rm -rf node_modules
rm -rf dist
rm -rf .vite

# 3. Reinstall
npm install

# 4. Rebuild
npm run build

# 5. Start fresh
npm run dev
```

Then:
1. Open http://localhost:5174/ in **Chrome**
2. Do a hard refresh: `Ctrl + Shift + R`
3. Open DevTools (F12) and check Console tab
4. Take a screenshot if you see errors

---

## Getting Help

If animations still don't work, provide this information:

1. **Browser & Version:**
   - Example: Chrome 120.0.6099.109

2. **Operating System:**
   - Example: Windows 11

3. **Console Errors:**
   - Screenshot of browser console (F12 → Console tab)

4. **Network Tab:**
   - Screenshot showing if CSS/JS files are loading

5. **What you see:**
   - Blank page?
   - Page loads but no animations?
   - Some animations work but not others?

6. **What you tried:**
   - List the steps you've already attempted

---

## Quick Test Script

Paste this in browser console to test if animations are working:

```javascript
// Test 1: Check if React is loaded
console.log('React loaded:', !!window.React);

// Test 2: Check if Framer Motion is available
console.log('Framer Motion loaded:', !!document.querySelector('[data-framer-component]'));

// Test 3: Check if Tailwind is working
const hasAnimateClass = !!document.querySelector('[class*="animate-"]');
console.log('Tailwind animations:', hasAnimateClass);

// Test 4: Check if CSS is loaded
const styles = getComputedStyle(document.documentElement);
console.log('Smooth scroll:', styles.scrollBehavior);

// Test 5: Check for errors
console.log('Check console for any red error messages above');
```

---

## Expected Behavior

When working correctly, you should see:

1. **On page load:**
   - Smooth fade-in of entire page
   - Background with moving gradient circles
   - Floating particles

2. **When hovering cards:**
   - Card lifts up slightly
   - Card tilts toward cursor
   - Light spot follows mouse
   - Gradient border animation

3. **When scrolling:**
   - Smooth scroll animation
   - Elements fade in as they appear
   - Gradient scrollbar on right edge

4. **Text effects:**
   - Heading colors shift gradually
   - Subtle glow around important text

If you don't see these, follow the troubleshooting steps above.
