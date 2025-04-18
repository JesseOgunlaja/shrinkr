import Link from "next/link";

interface PropsType {
  href?: string;
}

const TitleLink = ({ href = "/" }: PropsType) => {
  return (
    <Link id="title-link" href={href}>
      shrinkr
    </Link>
  );
};

export default TitleLink;
