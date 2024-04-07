import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
    Tooltip,
    TextField,
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EditIcon from '@mui/icons-material/Edit';




const styles = {
    root: {
        maxWidth: "1024px",
        margin: 'auto',
        marginTop: 20,
        border: 0,


    },
    avatar: {
        backgroundColor: '#3f51b5',
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    content: {
        marginTop: 16,
        display: "flex"
    },
};
// import VerifiedUserIcon from "@mui/icons-material/VerifiedUserIcon"
const Profile = (props) => {
    const {
        name,
        bio,
        city,
        phone,
        email,
        gender,
        pic,
        preferredAreas,
        price,
        reviews,
        specialty,
        verified,
        workingHours
        , yoe

    } = props;

    const [fields, setFields] = useState({
        name,
        bio,
        city,
        phone,
        email,
        gender,
        pic,
        preferredAreas,
        price,
        reviews,
        specialty,
        verified,
        workingHours
        , yoe
    })

    useEffect(() => {
        console.log(fields, "heqras");
    }, [])



    return (
        <Card style={styles.root}>
            
                <div style={{ display: "flex", margin: "90px" }}>
                    <div style={{ marginRight: "auto" }}>
                        <Avatar
                            alt="Pic"
                            src={pic}
                            sx={{ width: 300, height: 300 }}
                        />
                        <Tooltip title="Edit Profile" placement='bottom'>
                            <EditIcon style={{ marginLeft: "250px", fontSize: "2rem", cursor: "pointer" }} />
                        </Tooltip>
                        <div style={{ display: "flex" }}>
                            <CardHeader

                                titleTypographyProps={{ variant: 'h4' }}
                                title={name}
                                
                            />
                            {verified && (
                                <>
                                    <Tooltip title="Verified" placement="top">
                                        <span style={{ marginTop: "23px", color: "blue" }}><VerifiedUserIcon /></span>
                                    </Tooltip>
                                </>
                            )}
                        </div>
                    </div>
                    <CardContent>
                        <div style={styles.content}>
                            <Typography variant="subtitle1" component="span" style={styles.label}>
                                Bio:
                            </Typography>
                            <Typography variant="body1" component="span">
                                {bio}
                            </Typography>

                        </div>
                        <Divider variant="middle" />
                        <div style={styles.content}>
                            <Typography variant="subtitle1" component="span" style={styles.label}>
                                Phone:
                            </Typography>
                            <Typography variant="body1" component="span">
                                {phone}
                            </Typography>
                        </div>
                        <Divider variant="middle" />
                        <div style={styles.content}>
                            <Typography variant="subtitle1" component="span" style={styles.label}>
                                Email:
                            </Typography>
                            <Typography variant="body1" component="span">
                                {email}
                            </Typography>
                        </div>
                        <Divider variant="middle" />
                        <div style={styles.content}>
                            <Typography variant="subtitle1" component="span" style={styles.label}>
                                Gender
                            </Typography>
                            <Typography variant="body1" component="span">
                                {gender}
                            </Typography>
                        </div>
                        <Divider variant="middle" />
                        <div style={styles.content}>
                            <Typography variant="subtitle1" component="span" style={styles.label}>
                                City:
                            </Typography>
                            <Typography variant="body1" component="span">
                                {city}
                            </Typography>
                        </div>
                        <Divider variant="middle" />
                        <div style={styles.content}>
                            <Typography variant="subtitle1" component="span" style={styles.label}>
                                Price:
                            </Typography>
                            <Typography variant="body1" component="span">
                                {price}
                            </Typography>
                        </div>
                        <Divider variant="middle" />
                        <div style={styles.content}>
                            <Typography variant="subtitle1" component="span" style={styles.label}>
                                Year of Experience:
                            </Typography>
                            <Typography variant="body1" component="span">
                                {yoe}
                            </Typography>
                        </div>
                        <Divider variant="middle" />
                        <div style={styles.content}>
                            <Typography variant="subtitle1" component="span" style={styles.label}>
                                Working Hours:
                            </Typography>
                            <Typography variant="body1" component="span">
                                {workingHours}
                            </Typography>
                        </div>
                        <Divider variant="middle" />
                    </CardContent>
                </div>
            
        </Card>

    );
};

export default Profile;
