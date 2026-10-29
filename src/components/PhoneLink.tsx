import type { ReactNode } from "react";

function toInternational(display: string) {
  const withoutTrunkZero = display.replace(/\(0\)/g, "");
  let compact = withoutTrunkZero.replace(/[^\d+]/g, "");
  if (compact.startsWith("00")) compact = `+${compact.slice(2)}`;
  else if (compact.startsWith("0")) compact = `+43${compact.slice(1)}`;
  else if (!compact.startsWith("+")) compact = `+${compact}`;
  return compact;
}

export function PhoneLink({
  phone,
  children,
}: {
  phone: string;
  children?: ReactNode;
}) {
  return <a href={`tel:${toInternational(phone)}`}>{children ?? phone}</a>;
}
