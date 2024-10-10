import { CloseIcon } from "@/assets";
import { Button, Overlay } from "@/styles/globals";
import { Flex } from "socialwell-design";
import ActionRow from "./ActionRow";
import Row from "./Row";
import Tag from "./Tag";
import { Wrapper } from "./styles";

interface props {
  onClose: () => void;
}

export default function LogicPopup({ onClose }: props) {
  return (
    <Overlay
      className="popup-overlay-active"
      style={{ display: "flex", placeContent: "center", alignItems: "center" }}
    >
      <Wrapper>
        <div className="head">
          <h2>Response Logic</h2>
          <Flex alignItems="center">
            <Button className="advance">Advanced Logic</Button>
            <button onClick={onClose} className="close">
              <CloseIcon />
            </button>
          </Flex>
        </div>
        <div className="name">
          <input type="text" placeholder="Name this logic" />
        </div>

        <Flex>
          <div className="f__sts">
            <Tag text="IF" />
            <Tag text="THEN" />
          </div>
          <Flex direction="column" width="85%">
            <div className="logic condition">
              <div className="w-full">
                <Row />
                {/* <Row /> */}
              </div>
            </div>
            <br />
            <br />
            <p className="t">Perform the following actions</p>
            <div className="logic w-full">
              <ActionRow />
              {/* <ActionRow /> */}
            </div>
          </Flex>
        </Flex>
      </Wrapper>
    </Overlay>
  );
}

// const clip = (
//   <svg
//     width="26"
//     height="386"
//     viewBox="0 0 26 286"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M26 1H1V285H26" stroke="#A4A4A4" />
//   </svg>
// );
