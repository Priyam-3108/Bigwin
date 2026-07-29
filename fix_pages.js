const fs = require('fs');

const FULL_FOOTER = `<!-- FOOTER -->
<footer style="padding:4rem 0 2rem">
  <div class="container-xl">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid rgba(255,255,255,0.08)" class="reveal">
      <div>
        <a href="index.html" style="display:inline-block"><img src="assets/images/bigwin.webp" alt="Bigwin Buildsys" style="height:70px;width:auto;object-fit:contain;"></a>
        <p style="font-size:0.8rem;color:rgba(255,255,255,0.4);line-height:1.7;margin-bottom:1.25rem">Forging the future of solar infrastructure through precision steel engineering and manufacturing excellence.</p>
      </div>
      <div>
        <div style="font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:1.25rem">Products</div>
        <a href="products.html" class="footer-link">C-Section Purlins</a>
        <a href="products.html" class="footer-link">Z Purlins</a>
        <a href="products.html" class="footer-link">Top Hat Sections</a>
        <a href="products.html" class="footer-link">LIP Channels</a>
        <a href="products.html" class="footer-link">ZAM Coated Steel</a>
      </div>
      <div>
        <div style="font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:1.25rem">Company</div>
        <a href="about.html" class="footer-link">About Us</a>
        <a href="clients.html" class="footer-link">Clients</a>
        <a href="contact.html" class="footer-link">Contact</a>
      </div>
      <div>
        <div style="font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:1.25rem">Contact</div>
        <p style="font-size:0.78rem;color:rgba(255,255,255,0.4);line-height:1.6;margin-bottom:0.75rem">9th Floor, 903, Friends Business Bay, Borivali West, Mumbai 400092</p>
        <a href="tel:+919987300555" class="footer-link">+91 99873 00555</a>
        <a href="mailto:info@spanoindustry.com" class="footer-link">info@spanoindustry.com</a>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:2rem;flex-wrap:wrap;gap:1rem">
      <p style="font-size:0.75rem;color:rgba(255,255,255,0.3)">&copy; 2025 Bigwin Buildsys Coated Private Limited. All rights reserved.</p>
      <a href="index.html" style="font-size:0.7rem;color:rgba(255,255,255,0.3);text-decoration:none;letter-spacing:0.1em">www.bigwinbuildsys.com</a>
    </div>
  </div>
</footer>`;

const FOOTER_RESPONSIVE = `
  @media (max-width:767px) { footer .container-xl > div:first-child { grid-template-columns: 1fr !important; } }
  @media (min-width:768px) and (max-width:1023px) { footer .container-xl > div:first-child { grid-template-columns: 1fr 1fr !important; } }`;

const files = ['about.html', 'clients.html', 'contact.html'];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');

  // 1. Fix hero padding-top: change padding-top:5rem to padding-top:80px
  c = c.replace(/class="page-hero" style="padding-top:5rem"/g,
    'class="page-hero" style="padding-top:80px"');

  // 2. Fix hero: ensure min-height is 640px if inline override exists  
  c = c.replace(/min-height:540px/g, 'min-height:640px');
  c = c.replace(/min-height:480px/g, 'min-height:640px');

  // 3. Fix cert images: remove fixed heights, use auto
  c = c.replace(/height:240px;object-fit:cover/g, 'height:auto;min-height:240px;object-fit:contain');
  c = c.replace(/height:200px;object-fit:cover/g, 'height:auto;min-height:180px;object-fit:contain');

  // 4. Replace entire footer with full 4-col footer
  c = c.replace(/<footer[\s\S]*?<\/footer>/, FULL_FOOTER);

  // 5. Inject footer responsive styles before </style>
  if (!c.includes('footer .container-xl')) {
    c = c.replace(/<\/style>/, FOOTER_RESPONSIVE + '\n</style>');
  }

  fs.writeFileSync(f, c, 'utf8');
  console.log('Updated:', f);
});

console.log('All done!');
