const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  console.log('🚀 Starting PDF generation with Puppeteer...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport for consistent rendering
  await page.setViewport({
    width: 1200,
    height: 1600,
    deviceScaleFactor: 2
  });

  console.log('📄 Loading resume from localhost:3000...');

  // Navigate to your resume
  await page.goto('http://localhost:3000?user=Shubham', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait a bit more to ensure everything is rendered
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Hide the control panel and carousel
  await page.evaluate(() => {
    const controlPanel = document.getElementById('control-panel');
    const carousel = document.getElementById('template-carousel');
    const editButtons = document.querySelectorAll('.edit-trigger');

    if (controlPanel) controlPanel.style.display = 'none';
    if (carousel) carousel.style.display = 'none';
    editButtons.forEach(btn => btn.style.display = 'none');
  });

  console.log('📸 Generating PDF...');

  const outputPath = path.join(__dirname, 'Shubham_Sharma_Resume.pdf');

  // Generate PDF with proper settings for split layout
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px'
    },
    preferCSSPageSize: true
  });

  console.log('✅ PDF generated successfully!');
  console.log('📍 Location:', outputPath);

  await browser.close();
}

// Run the generator
generatePDF().catch(error => {
  console.error('❌ Error generating PDF:', error);
  process.exit(1);
});
