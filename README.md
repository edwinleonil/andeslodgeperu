# Andes Lodge Peru website

Source for [andeslodgeperu.com](https://www.andeslodgeperu.com). It is a static site built with [Astro](https://astro.build): no Wix, no database, no server code. The build turns the files in this repository into plain HTML, CSS and optimised images that any web host can serve.

- [Run it on your PC](#run-it-on-your-pc)
- [How the project is organised](#how-the-project-is-organised)
- [Everyday changes](#everyday-changes)
- [Bigger changes](#bigger-changes)
- [Saving and publishing changes](#saving-and-publishing-changes)
- [Putting it online](#putting-it-online)
- [Troubleshooting](#troubleshooting)

## Run it on your PC

### First time only

1. Install [Node.js](https://nodejs.org) (the LTS version, 22 or newer). To check it is installed, open a terminal (PowerShell on Windows) and run:

   ```
   node --version
   ```

2. Get the code, if you do not have it yet:

   ```
   git clone https://github.com/edwinleonil/andeslodgeperu.git
   cd andeslodgeperu
   ```

3. Install the project's dependencies (run this inside the project folder):

   ```
   npm install
   ```

   This creates a `node_modules` folder. It is large, it is not saved in git, and you can delete and recreate it at any time with `npm install`.

### Every time you want to work on the site

```
npm run dev
```

Then open **http://localhost:4321** in your browser. Leave the terminal open: whenever you save a file the page updates by itself. Press `Ctrl + C` in the terminal to stop.

### All commands

| Command | What it does |
|---|---|
| `npm run dev` | Live preview at http://localhost:4321 while you edit |
| `npm run build` | Builds the finished site into the `dist/` folder |
| `npm run preview` | Serves `dist/` at http://localhost:4321 so you can check the final result exactly as visitors will get it |

Run `npm run build` before publishing. If something is wrong (a missing photo, a typing mistake in a file) the build stops and tells you which file and line.

## How the project is organised

```
src/
  data/
    site.ts          Contact details, address, Tripadvisor link, menu items
    rooms.ts         Rooms and prices
    images.ts        Photo descriptions and the list of gallery photos
  pages/             One file per page; the file name is the web address
    index.astro        ->  /
    rooms-suites.astro ->  /rooms-suites
    amenities.astro    ->  /amenities
    local-area.astro   ->  /local-area
    gallery.astro      ->  /gallery
    404.astro          ->  shown for addresses that do not exist
  layouts/
    Base.astro       The frame around every page: <head>, header, footer, SEO tags
  components/
    Header.astro     Logo and menu (including the phone menu button)
    Footer.astro     Address, WhatsApp numbers, links
    Photo.astro      Shows a photo by name, in the right size for each screen
    ContactBlock.astro  The reservation box on the home page
  assets/images/     All photos (full-size originals)
  styles/global.css  Colours, fonts and shared styles
public/              Files copied as they are (robots.txt)
scripts/             One-off helper used to copy photos from the old Wix site
astro.config.mjs     Site address and Astro settings
dist/                The built site (created by npm run build, not saved in git)
```

Three ideas explain most of it:

- **Information that appears in more than one place lives in `src/data/`.** Change a phone number in `site.ts` once and the home page, the footer and the search-engine data all update.
- **A `.astro` file is HTML with a small script block at the top** (between the two `---` lines). The script block imports what the page needs; everything below it is the page's HTML, and the `<style>` block at the bottom holds styles that apply only to that file.
- **Photos are referred to by name, not by path.** `<Photo name="room-twin" />` finds `src/assets/images/room-twin.jpg` (or `.png`, `.webp`) and the build produces small, fast versions automatically.

## Everyday changes

### Change a price or a room

Edit `src/data/rooms.ts`. Each room looks like this:

```ts
{
  name: 'Twin room with ensuite bathroom',
  price: 150,
  bathroom: 'The ensuite bathroom comprises a shower, washbasin, and WC',
},
```

Change the number to change the price. To add a room, copy one of these blocks inside the right group. To add a whole new group (for example "Family"), copy a full group block, including its `title`, `beds`, `image` and `rooms`.

### Change phone numbers, email or address

Edit `src/data/site.ts`. For each phone there are two values that must match:

```ts
{ country: 'UK', display: '+44 741 191 4423', number: '447411914423', languages: 'Spanish and English' },
```

`display` is what visitors read. `number` is the same number with only digits (country code first, no `+` or spaces); it is what WhatsApp opens.

### Change text on a page

Open the page in `src/pages/` and edit the text between the HTML tags. Keep the tags themselves (`<p>`, `<h2>`, and so on) as they are.

### Replace a photo

Put your new file in `src/assets/images/` with the **same name** as the one it replaces (for example `room-twin.jpg`) and delete the old file. Upload the full-size original; do not shrink it first.

If the photo now shows something different, update its description in the `alt` list in `src/data/images.ts`. Descriptions are read aloud by screen readers and used by search engines.

### Add or remove a gallery photo

1. Add the file to `src/assets/images/`, named in lowercase with hyphens, for example `kitchen-breakfast.jpg`.
2. In `src/data/images.ts`, add a description to the `alt` list:
   ```ts
   'kitchen-breakfast': 'Breakfast laid out in the kitchen',
   ```
3. In the same file, add `'kitchen-breakfast',` to the `gallery` list where you want it to appear.

To remove a photo from the gallery, delete its line from the `gallery` list. To reorder, move the lines.

### Use a different photo somewhere on a page

Find the `<Photo name="..." />` in the page file and change the name to another photo in `src/assets/images/`.

### Change colours or fonts

Edit the values at the top of `src/styles/global.css`:

```css
--red: #c8102e;        /* buttons, underlines, accents */
--paper: #fbf9f6;      /* page background */
--sand: #f2ede5;       /* alternate section background */
--font-display: ...;   /* headings */
--font-body: ...;      /* everything else */
```

## Bigger changes

### Add a new page

1. Create a file in `src/pages/`. The file name becomes the address: `how-to-get-here.astro` is served at `/how-to-get-here`.
2. Start from this:

   ```astro
   ---
   import Photo from '../components/Photo.astro';
   import Base from '../layouts/Base.astro';
   ---

   <Base title="How to get here" description="One sentence describing this page for search engines.">
     <div class="wrap page-head">
       <h1>How to get here</h1>
     </div>

     <section class="section">
       <div class="wrap split">
         <div>
           <h2>From Huaraz</h2>
           <p>Your text here.</p>
         </div>
         <Photo name="lake-llanganuco" />
       </div>
     </section>
   </Base>
   ```

3. Add it to the menu by adding a line to `nav` in `src/data/site.ts`:

   ```ts
   { label: 'How to get here', href: '/how-to-get-here' },
   ```

The sitemap updates by itself.

### Layout building blocks

These classes are defined in `src/styles/global.css` and used on every page:

| Class | Use |
|---|---|
| `wrap` | Centres content and keeps it at a readable width. Put it inside every section. |
| `section` | Vertical spacing for a block of the page. Add `section--sand` for the darker background. |
| `split` | Text beside a photo, stacking on phones. Add `split--flip` to put the photo on the other side. |
| `photo-row` | A row of equal photos that wraps on small screens. |
| `prose` | Limits a text block to a comfortable line length. |
| `page-head` | The title area at the top of a page. |
| `button` | A red button; use on a link: `<a class="button" href="...">`. |

### Rename a page address

Avoid this for the existing pages: their addresses match the old Wix site, so links and search results keep working. If you must, rename the file in `src/pages/`, update `nav` in `src/data/site.ts`, and set up a redirect from the old address at your web host.

### Update Astro

```
npm outdated          # shows what has a newer version
npm update            # installs compatible updates
npm run build         # make sure everything still builds
```

For a major new Astro version, follow the upgrade guide at [docs.astro.build](https://docs.astro.build/en/upgrade-astro/).

## Saving and publishing changes

1. Make your change and check it with `npm run dev`.
2. Run `npm run build` and make sure it finishes without errors.
3. Save the change to GitHub:

   ```
   git add .
   git commit -m "Update room prices for 2027"
   git push
   ```

Once the site is connected to a host (next section), every push to `main` publishes the site automatically, usually within a couple of minutes. If you want to try something risky, work on a branch (`git checkout -b new-idea`) and merge it when you are happy.

Every commit is a restore point: `git log` lists them, and `git revert <commit>` undoes one.

## Putting it online

The site is not deployed yet. Any static host works; each of these is free and rebuilds on every push:

- **Cloudflare Pages** or **Netlify:** connect this repository, build command `npm run build`, output folder `dist`.
- **GitHub Pages:** add Astro's official GitHub Action (`withastro/action`) and set Pages to deploy from Actions.

Moving the domain off Wix (the domain is registered elsewhere, so only DNS changes):

1. Deploy and check the site on the host's temporary address.
2. Add `www.andeslodgeperu.com` and `andeslodgeperu.com` as custom domains at the host.
3. At the domain registrar, replace the records that point to Wix with the ones the host gives you (a `CNAME` for `www`, plus `A`/`ALIAS` records for the bare domain).
4. Wait for HTTPS to become active on the new host and check every page on the real domain.
5. Only then cancel the Wix plan.

If the site's address ever changes, update `site` in `astro.config.mjs` and the sitemap line in `public/robots.txt`.

## Troubleshooting

| Problem | Fix |
|---|---|
| `npm` or `node` is not recognised | Node.js is not installed, or the terminal was open during the install. Install it and open a new terminal. |
| `Image "x" not found in src/assets/images/` | A page or the gallery list uses a photo name with no matching file. Check the spelling, or add the file. |
| Port 4321 is already in use | Another preview is still running. Close that terminal, or use the other address Astro prints. |
| Changes do not appear | Check the terminal running `npm run dev` for an error, then refresh the browser. |
| Odd errors after pulling new changes or updating | Delete the `node_modules` and `.astro` folders, then run `npm install` again. |
| The live site did not update after a push | Open the host's dashboard and read the build log; it shows the same error `npm run build` would show locally. |

## About the migration from Wix

The text and photos were copied from the Wix site in November 2026. `scripts/fetch-wix-images.mjs` is the helper that downloaded the photos; it is kept only as a record and can be deleted once you have replaced them with your own files.
