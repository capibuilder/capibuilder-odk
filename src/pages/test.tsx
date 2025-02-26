import * as XLSX from "xlsx";

export default function App() {
  const onChange = (e: any) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt: any) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws);
      console.log(data);
    };
    reader.readAsBinaryString(file);
  };
  return (
    <div>
      <input type="file" onChange={onChange} />
    </div>
  );
}
