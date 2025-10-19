# Research Notes - Upload CV Document

## Key Decisions

- **File Parsing Libraries**: mammoth.js for DOCX, pdf-parse for PDF - Both are mature Node.js libraries with excellent text extraction capabilities, must run server-side
- **Storage Solution**: Vercel Blob - Native Vercel integration simplifies deployment, free tier sufficient for MVP, reversible decision if migration to S3 needed later
- **Architecture Pattern**: Extension initiates upload → Next.js API validates/parses/stores - Separation ensures heavy processing occurs server-side, extension handles UI only
- **Feature Structure**: Split Architecture (Structure B) - Extension UI as frontend layer, Next.js API as backend layer, matches Chrome Extension + Next.js platform

## Critical Risks

- **File parsing failures**: PDF/DOCX corruption or complex formatting → Implement try-catch with detailed error messages, provide format troubleshooting guide
- **Storage quota limits**: Free tier 10GB on Vercel Blob → Monitor usage, implement file retention policy, plan migration path to S3 if needed
- **Security**: File upload vulnerabilities (malicious files, XSS) → Validate MIME types server-side, sanitize extracted text, implement virus scanning for production

## Stack Compatibility

- mammoth.js + Next.js API routes: ✓ (Node.js runtime)
- pdf-parse + Next.js API routes: ✓ (Node.js runtime)
- Vercel Blob + Next.js: ✓ (official Vercel SDK)
- Chrome Extension → Next.js API: ✓ (REST API communication)
