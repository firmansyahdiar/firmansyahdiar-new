# Images Folder

Place your images here:

- `avatar.jpg` - Your profile photo
- `og-image.jpg` - Open Graph image for social media sharing (1200x630px recommended)
- `favicon.png` - Website favicon

## Folder Structure (Optional)

You can organize images into subfolders:

```
img/
├── avatar.jpg
├── og-image.jpg
├── favicon.png
├── products/
│   ├── iowork.jpg
│   ├── shira.jpg
│   └── insyaallah-jannah.jpg
└── clients/
    ├── cimb.png
    ├── bri.png
    └── ...
```

## Image Optimization Tips

1. **Compress images** before uploading (use TinyPNG, ImageOptim, etc.)
2. Use **WebP format** for better compression
3. Recommended sizes:
   - Avatar: 400x400px
   - OG Image: 1200x630px
   - Product screenshots: 1200x800px
   - Client logos: 200x200px (transparent PNG)

## Placeholder Images

If you don't have images yet, the website will use:
- Gradient backgrounds for products
- Icon placeholders for clients
- Initials for profile avatar

This is perfectly fine for initial launch!


RUN
python3 -m http.server 8000