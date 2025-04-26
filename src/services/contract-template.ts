// Digital Contract Template Generator for KitchenCare+ app
import { DigitalContract } from './firebase';

// HTML template for the digital contract
export const generateContractHTML = (contract: DigitalContract): string => {
  // Format dates
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const issueDate = formatDate(contract.issueDate);
  const startDate = formatDate(contract.coveragePeriod.start);
  const endDate = formatDate(contract.coveragePeriod.end);
  const installationDate = formatDate(contract.kitchenDetails.installationDate);
  
  // Generate coverage details list
  const coverageDetailsList = contract.coverageDetails
    .map(item => `<li>${item}</li>`)
    .join('');

  // Generate HTML template
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KitchenCare+ Service Agreement</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      color: #333333;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .contract-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      border: 1px solid #e0e0e0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .contract-header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 2px solid #0F75BC;
      padding-bottom: 20px;
    }
    .logo {
      max-width: 200px;
      margin-bottom: 20px;
    }
    .contract-title {
      font-size: 24px;
      font-weight: bold;
      color: #0F75BC;
      margin-bottom: 10px;
    }
    .contract-subtitle {
      font-size: 16px;
      color: #666666;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #0F75BC;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
    .detail-row {
      display: flex;
      margin-bottom: 10px;
    }
    .detail-label {
      flex: 1;
      font-weight: bold;
      color: #666666;
    }
    .detail-value {
      flex: 2;
    }
    .kitchen-image {
      width: 100%;
      max-height: 300px;
      object-fit: cover;
      border-radius: 8px;
      margin: 15px 0;
    }
    .coverage-list {
      padding-left: 20px;
    }
    .coverage-list li {
      margin-bottom: 8px;
    }
    .terms-list {
      padding-left: 0;
      list-style-type: none;
    }
    .terms-list li {
      margin-bottom: 12px;
      padding-left: 20px;
      position: relative;
    }
    .terms-list li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #0F75BC;
    }
    .signature-section {
      margin-top: 40px;
    }
    .signature-container {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    .signature-party {
      flex: 1;
      margin: 0 20px;
      text-align: center;
    }
    .signature-line {
      border-bottom: 1px solid #333333;
      height: 40px;
      margin-bottom: 10px;
    }
    .signature-name {
      font-weight: bold;
    }
    .signature-date {
      font-size: 14px;
      color: #666666;
    }
    .disclaimer {
      font-size: 12px;
      color: #999999;
      text-align: center;
      margin-top: 40px;
      font-style: italic;
    }
    .red-highlight {
      color: #E31E24;
      font-weight: bold;
    }
    .footer {
      margin-top: 60px;
      text-align: center;
      font-size: 12px;
      color: #999999;
    }
    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>
  <div class="contract-container">
    <!-- Contract Header -->
    <div class="contract-header">
      <img src="https://amazespace.com/logo.png" alt="Amaze Space Logo" class="logo">
      <div class="contract-title">KitchenCare+ Service Agreement</div>
      <div class="contract-subtitle">Premium Kitchen Warranty & Service Plan</div>
    </div>

    <!-- Agreement Details -->
    <div class="section">
      <div class="section-title">AGREEMENT DETAILS</div>
      <div class="detail-row">
        <div class="detail-label">Agreement Number:</div>
        <div class="detail-value">${contract.agreementNumber}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Date of Issue:</div>
        <div class="detail-value">${issueDate}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Plan Type:</div>
        <div class="detail-value">${contract.planType} Protection</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Coverage Period:</div>
        <div class="detail-value">${startDate} to ${endDate}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Amount Paid:</div>
        <div class="detail-value">₹${contract.amountPaid.toLocaleString('en-IN')}</div>
      </div>
    </div>

    <!-- Client Information -->
    <div class="section">
      <div class="section-title">CLIENT INFORMATION</div>
      <div class="detail-row">
        <div class="detail-label">Client Name:</div>
        <div class="detail-value">${contract.clientInfo.name}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Contact Number:</div>
        <div class="detail-value">${contract.clientInfo.contactNumber}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Email Address:</div>
        <div class="detail-value">${contract.clientInfo.email}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Installation Address:</div>
        <div class="detail-value">${contract.clientInfo.address}</div>
      </div>
    </div>

    <!-- Kitchen Details -->
    <div class="section">
      <div class="section-title">KITCHEN DETAILS</div>
      <div class="detail-row">
        <div class="detail-label">Kitchen Type:</div>
        <div class="detail-value">${contract.kitchenDetails.kitchenType}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Installation Date:</div>
        <div class="detail-value">${installationDate}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Kitchen Size:</div>
        <div class="detail-value">${contract.kitchenDetails.size}</div>
      </div>
      ${contract.kitchenDetails.imageUrl ? 
        `<img src="${contract.kitchenDetails.imageUrl}" alt="Kitchen Image" class="kitchen-image">` : 
        '<!-- No kitchen image available -->'}
    </div>

    <div class="page-break"></div>

    <!-- Coverage Details -->
    <div class="section">
      <div class="section-title">COVERAGE DETAILS</div>
      <p>This KitchenCare+ Service Agreement covers the following components and services:</p>
      <ul class="coverage-list">
        ${coverageDetailsList}
      </ul>
    </div>

    <!-- Terms and Conditions -->
    <div class="section">
      <div class="section-title">TERMS AND CONDITIONS</div>
      <ol class="terms-list">
        <li><span class="red-highlight">This is a service-based coverage agreement between Amaze Space and the client, not a government insurance product.</span></li>
        <li>Coverage is limited to manufacturing defects, normal wear and tear, and functional failures.</li>
        <li>Damage caused by misuse, accidents, natural disasters, or unauthorized modifications is not covered.</li>
        <li>Service requests must be submitted through the KitchenCare+ app or by contacting customer support.</li>
        <li>Response time for service requests is typically within 48 hours.</li>
        <li>This agreement can be renewed upon expiration at the then-current rates.</li>
        <li>Amaze Space reserves the right to inspect the kitchen before approving certain repairs.</li>
        <li>This agreement is non-transferable without written consent from Amaze Space.</li>
        <li>Amaze Space will provide qualified technicians for all service visits.</li>
        <li>Parts replaced under this agreement may be new, refurbished, or remanufactured of similar quality and functionality.</li>
        <li>Cosmetic damage that does not affect functionality is not covered under this agreement.</li>
        <li>Service visits must be scheduled at least 48 hours in advance, except for emergency situations.</li>
        <li>Cancellation of this agreement is subject to a cancellation fee of 25% of the remaining value.</li>
        <li>This agreement constitutes the entire understanding between the parties and supersedes all prior agreements.</li>
      </ol>
    </div>

    <!-- Signatures -->
    <div class="section signature-section">
      <div class="section-title">SIGNATURES</div>
      <p>By signing below, you acknowledge that you have read and agree to the terms and conditions of this service agreement.</p>
      
      <div class="signature-container">
        <div class="signature-party">
          <div class="signature-line"></div>
          <div class="signature-name">${contract.clientInfo.name}</div>
          <div class="signature-date">Date: ${contract.clientSignatureDate ? formatDate(contract.clientSignatureDate) : '________________'}</div>
        </div>
        
        <div class="signature-party">
          <div class="signature-line"></div>
          <div class="signature-name">Amaze Space</div>
          <div class="signature-date">Date: ${contract.companySignatureDate ? formatDate(contract.companySignatureDate) : '________________'}</div>
        </div>
      </div>
    </div>
    
    <div class="disclaimer">
      This document is legally binding upon signature. Please read all terms carefully before signing.
    </div>
    
    <div class="footer">
      KitchenCare+ by Amaze Space | Contact: support@amazespace.com | Helpline: +91-800-123-4567
    </div>
  </div>
</body>
</html>
  `;
};

// PDF generation options
export const pdfGenerationOptions = {
  format: 'A4',
  margin: {
    top: '20mm',
    right: '20mm',
    bottom: '20mm',
    left: '20mm'
  },
  printBackground: true,
  preferCSSPageSize: true
};

// Function to generate contract PDF (to be implemented with a PDF library)
export const generateContractPDF = async (contract: DigitalContract): Promise<Blob> => {
  // This would typically use a library like html-pdf, puppeteer, or react-pdf
  // For this implementation, we'll return a placeholder
  const html = generateContractHTML(contract);
  
  // In a real implementation, this would convert HTML to PDF
  // For now, we'll create a simple blob with the HTML content
  const blob = new Blob([html], { type: 'text/html' });
  return blob;
};

// Function to generate a contract ID
export const generateContractId = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `KC-${dateStr}-${randomNum}`;
};

export default {
  generateContractHTML,
  generateContractPDF,
  generateContractId,
  pdfGenerationOptions
};
