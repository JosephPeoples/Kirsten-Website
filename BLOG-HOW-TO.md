# How to add a blog post

You can do all of this on the GitHub website. No code, no HTML.
Each post is one text file in the `_posts` folder, plus any pictures in the `assets/blog` folder.
When you save (commit) on the `main` branch, the site rebuilds by itself and the post shows up on the Blog page.

## 1. Upload your pictures (optional)

1. Open the repository on GitHub and click into the `assets` folder, then the `blog` folder.
2. Click **Add file**, then **Upload files**.
3. Drag in your pictures. JPG, PNG or WebP all work. Keep them under about 1 MB each and around 1400 pixels wide so pages load fast.
4. Use simple file names with no spaces, like `spring-campaign-cover.jpg`.
5. Click **Commit changes**.

## 2. Create the post

1. Go back to the main page of the repository and click into the `_posts` folder.
2. Click **Add file**, then **Create new file**.
3. Name the file with the date first, then a short title with dashes, ending in `.md`:

   `2026-11-15-my-post-title.md`

   The date sets the order on the Blog page (newest first). The words after the date become the web address.
4. Paste this at the very top of the file and fill it in:

   ```
   ---
   title: "My post title"
   date: 2026-11-15
   excerpt: "One or two sentences that show on the Blog page card."
   description: "The short summary Google shows under your title, 120 to 156 characters."
   keyphrase: "the main search phrase"
   cover: /assets/blog/spring-campaign-cover.jpg
   cover_alt: "A short description of the cover picture"
   ---
   ```

   - Keep the two `---` lines exactly as they are.
   - Put quotes around the title, excerpt and cover_alt.
   - `cover` and `cover_alt` are optional. Leave both lines out if the post has no cover picture.
     The cover is also the picture people see when the post is shared on LinkedIn, Facebook or X,
     and the one Google uses. Make it 1200 x 630 pixels. To change the cover later, upload the new
     picture and change only the `cover` line.
   - If you leave out `excerpt`, the first paragraph of the post is used instead.
   - `description` is optional but recommended. It's what shows under the title in Google results
     and in social previews. Aim for 120 to 156 characters and include your keyphrase.
     If you leave it out, the excerpt is used.
   - `keyphrase` is optional. It's the phrase you want the post found for (like "AI in marketing").
     It's a note for you and is added to the page's search data. Try to use it in the first paragraph,
     in a heading or two, in the description and in the `cover_alt` text.
   - `seo_title` is optional. Google shows the post title followed by "| Kirsten Peoples".
     If that's longer than about 60 characters, add a shorter `seo_title:` line and it is used
     exactly as written instead.
   - Use today's date or an earlier one. A post dated in the future stays hidden until the site rebuilds on or after that date (the next commit after it).
5. Under the second `---`, write the post. Some handy formatting:

   ```
   A blank line starts a new paragraph.

   ## A heading

   **bold words** and *italic words*

   - a bulleted list item
   - another one

   [link text](https://example.com)

   ![Short description of the picture](/assets/blog/my-picture.jpg)
   ```

6. Click **Commit changes** (commit straight to the `main` branch).

## 3. Wait a minute or two

GitHub rebuilds the site after every commit. It usually takes 1 to 3 minutes, sometimes up to 10.
You can watch progress on the repository's **Actions** tab. When the newest run has a green check, refresh the Blog page.
If it shows a red X, the usual cause is a typo in the part between the `---` lines (a missing quote or `---`).

## Editing or removing a post

- To edit, open the post file in `_posts`, click the pencil icon, change it and commit.
- To remove a post, open the file, click the three-dot menu, choose **Delete file** and commit.

## What happens automatically for search (SEO)

You don't need to do anything extra. For every post the site adds the page title, the description,
the web address Google should use, the social sharing preview (with the cover picture), the post's
search data (author Kirsten Peoples, date and picture), and adds the post to `sitemap.xml`.
Use `##` for section headings inside the post. The post title is already the page's main heading,
so don't start the post with a `#` heading.

## For whoever maintains the site

- The blog uses GitHub Pages' built-in Jekyll. Settings are in `_config.yml`.
- `index.html` and `404.html` have no front matter, so Jekyll copies them as-is. Don't add front matter to them.
- The blog's header and footer are copies in `_includes/site-header.html` and `_includes/site-footer.html`. If the nav or footer changes in `index.html`, change those too.
- Blog page layouts: `_layouts/blog.html` (the list) and `_layouts/post.html` (one post). Post body styling is in `assets/css/blog.css`.
- SEO tags for all blog pages are in `_includes/seo-head.html` (title, description, canonical, Open Graph/Twitter, JSON-LD BlogPosting). Site-wide fallbacks (`title`, `description`, `author`, `publisher`, `default_image`) are in `_config.yml`.
- `sitemap.xml` keeps the homepage entry as written and lists `/blog/` and every post automatically. Add `sitemap: false` to a post's front matter to leave it out.
