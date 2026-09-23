import { describe, it, expect } from 'vitest';
import { ContactSchema } from '@/lib/validations/contact';

describe('Contact Form Validations', () => {
  it('validates a correct payload', () => {
    const payload = {
      name: 'John Doe',
      email: 'john@example.com',
      organization: 'Tech Corp',
      category: 'Client',
      message: 'This is a valid message that is long enough.'
    };
    
    const result = ContactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('fails on invalid email', () => {
    const payload = {
      name: 'John Doe',
      email: 'invalid-email',
      category: 'Client',
      message: 'This is a valid message that is long enough.'
    };
    
    const result = ContactSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});
