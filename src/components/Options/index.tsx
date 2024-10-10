import DownloadIcon from "@/assets/icons/Download";
import { FilterIcon } from "@/assets/icons/FilterIcon";
import Printer from "@/assets/icons/Printer";
import { Optionwrapper } from "./styles/optionstyle";

interface PropType {
  printFunction?: () => void;
  exportFunction?: () => void;
  showFilter?: boolean;
}

function Options({
  printFunction,
  exportFunction,
  showFilter = false,
}: PropType) {
  return (
    <Optionwrapper>
      {/* <button>{UploadIcon}</button> */}
      <button onClick={exportFunction}>{DownloadIcon}</button>
      {printFunction && <button onClick={printFunction}>{Printer}</button>}
      {showFilter && <button>{FilterIcon}</button>}
    </Optionwrapper>
  );
}

export default Options;
