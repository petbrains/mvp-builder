# API Contracts - Upload CV Document

## POST /api/cv/upload

**Description:** Upload and parse CV document

**Headers:**
```
Content-Type: multipart/form-data
X-Session-ID: <string> (required)
```

**Request Body:**
```
file: <binary> (required)
  - Supported formats: PDF, DOCX
  - Max size: 10MB
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "cvDocumentId": "uuid",
    "fileName": "string",
    "fileFormat": "PDF | DOCX",
    "fileSize": "number",
    "status": "READY",
    "uploadedAt": "ISO8601 timestamp",
    "metadata": {
      "wordCount": "number",
      "pageCount": "number"
    }
  }
}
```

**Error Responses:**

400 - Invalid Format:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_FORMAT",
    "message": "Unsupported file format. Please upload PDF or DOCX.",
    "supportedFormats": ["PDF", "DOCX"]
  }
}
```

413 - File Too Large:
```json
{
  "success": false,
  "error": {
    "code": "SIZE_EXCEEDED",
    "message": "File size exceeds 10MB limit.",
    "maxSize": "10485760"
  }
}
```

500 - Parse Error:
```json
{
  "success": false,
  "error": {
    "code": "PARSE_FAILED",
    "message": "Unable to parse document. File may be corrupted.",
    "suggestion": "Try re-saving the document or converting to PDF."
  }
}
```

## GET /api/cv/{cvDocumentId}

**Description:** Retrieve CV document metadata and content

**Headers:**
```
X-Session-ID: <string> (required)
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "cvDocumentId": "uuid",
    "fileName": "string",
    "fileFormat": "PDF | DOCX",
    "rawContent": "string",
    "status": "READY",
    "uploadedAt": "ISO8601 timestamp"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "CV document not found."
  }
}
```
