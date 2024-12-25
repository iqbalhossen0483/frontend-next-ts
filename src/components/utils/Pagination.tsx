import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type props = {
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

const Pagination = ({ totalPages, setPage, currentPage }: props) => {
  return (
    <Box className='flex justify-center items-center gap-2'>
      {Array.from({ length: totalPages || 1 }).map((_, index) => (
        <Typography
          onClick={() => setPage(index)}
          className={`px-4 cursor-pointer py-2 text-xl font-medium border rounded-md ${
            currentPage === index + 1 ? "bg-primary text-white" : "bg-white"
          }`}
          key={index}
        >
          {index + 1}
        </Typography>
      ))}
    </Box>
  );
};

export default Pagination;
