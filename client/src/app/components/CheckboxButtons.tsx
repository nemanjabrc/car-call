import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

const CheckboxButtons = ({items, checked, onChange}: Props) => {

    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if(currentIndex === -1) {
            newChecked = [...checkedItems, value];
        }
        else {
            newChecked = checkedItems.filter(item => item !== value);
        }

        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup row>
            {items.map((item, idx) => (
                <FormControlLabel 
                    key={idx} 
                    control={
                        <Checkbox
                            checked={checkedItems.indexOf(item) !== -1}
                            onClick={() => handleChecked(item)}
                            sx={{
                                color: "gray",
                                "&.Mui-checked": { color: "#339966" },
                            }} 
                        />
                    } 
                    label={item} 
                    sx={{ color: "gray" }}
                />
            ))}
        </FormGroup>
    )
}

export default CheckboxButtons;