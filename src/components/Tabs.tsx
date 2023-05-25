import { FC } from "react";
import { Tabs as MuiTabs, Tab } from "@mui/material";

interface propTypes {
  tabItems: string[];
  value: number;
  onChange: (value: number) => void;
}

const Tabs: FC<propTypes> = ({ tabItems, value, onChange }) => {
  return (
    <MuiTabs value={value} onChange={(_e, val) => onChange(val)}>
      {tabItems.map((item, i) => (
        <Tab label={item} value={i + 1} key={i} />
      ))}
    </MuiTabs>
  );
};

export default Tabs;
