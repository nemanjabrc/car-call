import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Vehicle } from "../../../../app/models/vehicle";
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import VehicleSliderCard from "./vehicleSliderCard";

interface Props {
    vehicles: Vehicle[];
    ownerId: number;
}

const VehicleSlider = ({vehicles, ownerId}: Props) => {

    const [index, setIndex] = useState(0);

    if(vehicles.length === 0)
        return null;

    const nextSlide = () => {
    if (index < vehicles.length - 3) {
        setIndex(prev => prev + 1);
    }
    };

    const prevSlide = () => {
    if (index > 0) {
        setIndex(prev => prev - 1);
    }
    };

    const visibleItems = vehicles.slice(index, index + 3);

    const isPrevDisabled = vehicles.length <= 2 || index === 0;
    const isNextDisabled = vehicles.length <= 2 || index >= vehicles.length - 3;

    return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        <IconButton 
        onClick={prevSlide}
        size="medium" 
        sx={{ 
            backgroundColor: "#339966", 
            color: "#fff", 
            "&:hover": { 
            backgroundColor: "#339966", 
            color: "#fff" 
            },
            pointerEvents: isPrevDisabled ? "none" : "auto"
        }} 
        disabled={isPrevDisabled}
        >
        <KeyboardArrowLeftOutlinedIcon fontSize="inherit" />
        </IconButton>

        <Box display="flex" gap={2}>
        {visibleItems.map((vehicle) => (
            <VehicleSliderCard key={vehicle.id} ownerId={ownerId} vehicle={vehicle} />
        ))}
        </Box>

        <IconButton 
        onClick={nextSlide}
        size="medium" 
        sx={{ 
            backgroundColor: "#339966", 
            color: "#fff", 
            "&:hover": { 
            backgroundColor: "#339966", 
            color: "#fff" 
            },
            pointerEvents: isNextDisabled ? "none" : "auto"
        }} 
        disabled={isNextDisabled}
        >
        <KeyboardArrowRightOutlinedIcon fontSize="inherit" />
        </IconButton>
    </Box>
    );
};

export default VehicleSlider;
