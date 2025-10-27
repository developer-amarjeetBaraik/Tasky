import { useState, useCallback } from 'react';
import { z } from 'zod';

// Generic type for the hook
export function useFieldValidationWithZod<T extends z.ZodRawShape, K extends keyof T>(
  schema: z.ZodObject<T>,
  fieldName: K
) {
  const [error, setError] = useState<string>('');

  const validate = useCallback((value: z.infer<T[K]>) => {
    const result = schema.safeParse({ [fieldName]: value });
    
    if (!result.success) {
      const fieldError = result.error.issues.find(
        err => err.path[0] === fieldName
      );
      setError(fieldError?.message || 'Invalid input');
      return false;
    }
    
    setError('');
    return true;
  }, [schema, fieldName]);

  return { error, validate };
}