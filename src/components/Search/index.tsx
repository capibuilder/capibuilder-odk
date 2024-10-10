import { SearchGroup } from "@/Containers/Tags/styles";
import { SearchIcon } from "@/assets";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useRef,
} from "react";

export default function Index({
  inputProps,
}: {
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}) {
  const { push, query } = useRouter();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      push({ pathname: "", query: { ...query, q: e.target.value } });
    } else {
      delete query.q;
      push({ pathname: "", query: { ...query } });
    }
  };

  const inputRef: any = useRef(null);

  return (
    <>
      <SearchGroup>
        <input
          ref={inputRef}
          onChange={handleSearch}
          type="search"
          placeholder="Search..."
          {...inputProps}
        />
        <button>
          <SearchIcon size="30" />
        </button>
      </SearchGroup>
    </>
  );
}
