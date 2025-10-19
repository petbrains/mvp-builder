# Implementation Plan: Upload CV Document

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Implement file upload flow where Chrome Extension initiates upload, Next.js API validates/parses/stores CV documents. Uses mammoth.js for DOCX parsing, pdf-parse for PDF parsing, and Vercel Blob for secure storage.

## Technical Context

**Language:** TypeScript

**Framework:** Next.js 14+ (API routes), React (Extension UI)

**Storage:** Vercel Blob (file storage), PostgreSQL (metadata)

**API Layer:** RESTful endpoints via Next.js API routes

**Testing:** Unit tests for parsing logic, integration tests for upload flow, contract tests for API endpoints

**Deployment:** Vercel serverless functions for API, Chrome Web Store for extension

**Constraints:** 10MB file size limit for free tier compatibility, server-side parsing only (Node.js dependencies)

## Implementation Mapping

### Component Architecture
- **Extension Popup Component**: File input with drag-drop, upload button, progress indicator, error/success states
- **Next.js API Route** (`/api/cv/upload`): Multipart form handler, validates file type/size, coordinates parsing and storage
- **Parsing Service**: Adapters for mammoth.js (DOCX) and pdf-parse (PDF), text extraction and metadata generation
- **Storage Service**: Vercel Blob client wrapper, handles upload to blob storage and URL generation
- **Database Models**: CVDocument and ParseError entities (see data-model.md)

### Error Handling Approach
- **Extension Layer**: Display user-friendly messages from API error responses, retry mechanism for network failures
- **API Layer**: Try-catch around parsing operations, detailed error logging, structured error responses matching contracts
- **Recovery**: Automatic cleanup of orphaned blob files on parse failures, retry capability via new upload

## Feature Code Organization

```
backend/
├── src/
│   ├── models/
│   │   ├── cv-document.model.ts
│   │   └── parse-error.model.ts
│   ├── services/
│   │   ├── cv-parser.service.ts
│   │   ├── blob-storage.service.ts
│   │   └── cv-upload.service.ts
│   └── api/
│       └── cv/
│           ├── upload/
│           │   └── route.ts
│           └── [cvDocumentId]/
│               └── route.ts
└── tests/
    ├── integration/
    │   └── cv-upload.test.ts
    └── unit/
        ├── cv-parser.test.ts
        └── blob-storage.test.ts

extension/
├── src/
│   └── popup/
│       ├── components/
│       │   ├── FileUpload.tsx
│       │   ├── UploadProgress.tsx
│       │   └── UploadStatus.tsx
│       └── services/
│           └── cv-api.service.ts
└── tests/
    └── unit/
        └── FileUpload.test.tsx
```

**Selected Structure:** Split Architecture - Matches Chrome Extension (frontend) + Next.js (backend) platform separation, clear API boundary

## Testing Approach

### Acceptance Scenarios Coverage
- **Scenario 1-2** (PDF/DOCX upload): Integration tests with fixture files from dev-setup.md
- **Scenario 3** (Invalid format): Unit test for format validation, integration test for error response
- **Scenario 4** (Corrupted file): Unit test for parse error handling with corrupted fixture

### Edge Cases
- Size validation: Unit test with 10MB+ mock file
- Corrupted files: Integration test with intentionally corrupted fixture
- Unsupported formats: Unit test for MIME type validation

### Test Structure
- Unit: Parser adapters, storage service, validation logic
- Integration: Full upload flow (extension → API → storage), error scenarios
- Contract: API response schemas match contracts/api-contracts.md

## Implementation Notes

- **Session Management**: Use Chrome extension session ID (generated on install) as userId, no authentication required for MVP
- **Blob Cleanup Strategy**: Implement 30-day retention policy via scheduled job to manage free tier quota
- **Security**: Server-side MIME type validation (don't trust client), sanitize extracted text to prevent XSS, implement rate limiting (10 uploads/hour per session)
