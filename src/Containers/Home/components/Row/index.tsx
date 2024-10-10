import { RowWrapper } from "./styles";

interface props {
  name: string;
  title: string;
  desc: string;
  img: string;
  headIcon: string;
  rtl: boolean;
}

export default function Index({
  desc,
  headIcon,
  img,
  name,
  title,
  rtl,
}: props) {
  return (
    <RowWrapper style={{ flexDirection: rtl ? "row-reverse" : "row" }}>
      <div className="w content">
        <div className="head">
          <h3>{name}</h3>
          <img src={headIcon} alt="" />
        </div>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div className="w img">
        <img src={img} alt="" />
      </div>
    </RowWrapper>
  );
}
