import { ValidationError } from 'yup';

export default function getValidationErrors(
  error: ValidationError,
): Record<string, unknown> {
  const validation: Record<string, unknown> = {};

  error.inner.forEach((resultValidation) => {
    validation[resultValidation.path] = resultValidation.message;
  });

  return validation;
}
