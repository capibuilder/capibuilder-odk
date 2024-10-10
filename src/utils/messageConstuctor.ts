function generateConstraintMsg(
  type: string,
  min?: number,
  max?: number
): string {
  if (!min && !max) return "";
  if (min && max)
    return `jr:constraintMsg="${type} must be between ${min} and ${max}"`;
  if (min) return `jr:constraintMsg="${type} must be greater than ${min}"`;
  if (max) return `jr:constraintMsg="${type} must be less than ${max}"`;
  return "";
}

export function MessageConstuctor({
  length,
  value,
  dateRange,
}: {
  value?: { min?: number; max?: number };
  length?: { min?: number; max?: number };
  dateRange?: { min?: number; max?: number };
}) {
  if (length) {
    return generateConstraintMsg("Response length", length.min, length.max);
  } else if (value) {
    return generateConstraintMsg("Value", value.min, value.max);
  } else if (dateRange) {
    return generateConstraintMsg("Value", dateRange.min, dateRange.max);
  }
  return "";
}
