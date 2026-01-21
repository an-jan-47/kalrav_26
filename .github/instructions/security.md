# Security & Data Protection Rules
- Never commit API keys; store them in .env.
- Validate and sanitize all user input with Zod.
- Use HTTPS for all API calls.
- Enable Row-Level Security in Supabase.
- Use reCAPTCHA for public forms.
- Strip HTML tags from user-submitted data.
- Catch and handle all async errors gracefully.
- Log errors to Sentry in production.
