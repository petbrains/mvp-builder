# Development Setup - Upload CV Document

## Environment

```bash
# Backend dependencies (Next.js API)
npm install mammoth pdf-parse @vercel/blob

# Types
npm install -D @types/pdf-parse
```

## Environment Variables

```env
# .env.local
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>
DATABASE_URL=<postgresql-connection-string>
```

## Test Data

### Valid Test Files
- `test/fixtures/sample-cv.pdf` - 2-page standard CV (PDF)
- `test/fixtures/sample-cv.docx` - Same CV in DOCX format
- `test/fixtures/complex-cv.pdf` - 5-page CV with images and formatting

### Invalid Test Files
- `test/fixtures/corrupted.pdf` - Intentionally corrupted PDF
- `test/fixtures/oversized.pdf` - File exceeding 10MB limit
- `test/fixtures/invalid.txt` - Unsupported format

## Local Testing

```bash
# Test file upload API endpoint
curl -X POST http://localhost:3000/api/cv/upload \
  -F "file=@test/fixtures/sample-cv.pdf" \
  -H "X-Session-ID: test-session-123"

# Test parsing functionality
npm test -- upload-cv-document

# Test with extension
cd extension && npm run dev
# Navigate to chrome://extensions and load unpacked
```

## Database Setup

```sql
-- Run migrations for cv_documents and parse_errors tables
npx prisma migrate dev --name init-cv-upload
```
