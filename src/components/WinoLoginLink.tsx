import Image from "next/image";

const WINO_LOGO = "/images/wino%20section/wino_logo_isolated.svg";

type WinoLoginLinkProps = {
  className?: string;
};

export function WinoLoginLink({ className }: WinoLoginLinkProps) {
  return (
    <a href="#login" className={className}>
      <Image
        src={WINO_LOGO}
        alt=""
        width={22}
        height={22}
        className="btn-wino-login-icon"
        aria-hidden
      />
      Wino Login
    </a>
  );
}
