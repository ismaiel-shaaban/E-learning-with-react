import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { Colors } from '../../theme';

const Container = styled(Box)(({ theme, notMine }) => ({
    border: "1px solid #fff",
    height: "30px",
    color: "#fff",
    padding: "5px",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "bold",
    '&.notMine': {
        color: Colors.main[1],
        border: `1px solid ${Colors.main[1]}`,
    },

}));

const FileBox = ({ src, mine }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        const position = src.lastIndexOf('/');
        setName(src.substr(position + 1));
    }, [src]);

    const handleClick = () => {
        window.open(src);
    };

    return (
        <Container className={!mine ? 'notMine' : ''} onClick={handleClick}>
            <DownloadOutlinedIcon style={{ fontSize: "20px" }} />
            {name}
        </Container>
    );
};

export default FileBox;
