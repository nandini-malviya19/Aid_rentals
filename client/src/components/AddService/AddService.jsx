import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './addService.css'
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import { FallingLines, RotatingLines } from 'react-loader-spinner'
import ImageResizer from 'react-image-file-resizer';
import Map from '../Map/Map';




const steps = ['Item details',"More Details","Upload Address", 'Upload Image'];



export default function AddService({ setShowServiceForm }) {
    const { user } = useUserContext();
    const _id = user._id;
    console.log(_id,"check 1");
    console.log(user?._id,"check 2");
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: 'Aditya',
        bio: '',
        yoe: '',
        price: '',
        phoneNumber: '',
        workingHours:'',
        age:'',
        email:'',
        gender:'',
        preferredAreas:'',
        specialty:'',
        city: `${user?.city}`,
        pic: '',
        owner: `${user?._id}`
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // If the field name is "tags", split the comma-separated value into an array
        if (name === "preferredAreas"||name==="specialty") {
            const tagsArray = value.split(",").map(tag => tag.trim());
            setFormData((prevData) => ({
                ...prevData,
                [name]: tagsArray,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };



    const handleImageChange = async (files) => {
        let resizedImages = [];
            // console.log(files);
       
            try {
                await ImageResizer.imageFileResizer(
                    files,
                    300, // maxWidth
                    300, // maxHeight
                    'JPEG', // compressFormat
                    70, // quality
                    0, // rotation
                    (uri) => {
                        resizedImages.push(uri);
                    },
                    'base64' // outputType
                );
                console.log(resizedImages);
            } catch (error) {
                console.error('Error resizing image:', error);
            }
        

        setFormData((prevData) => ({
            ...prevData,
            pic: resizedImages, // Set the resized base64 images
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            setLoading(true);
            const { data } = await axios.post(
                'http://localhost:8000/api/v1/service',
                formData,
                config
            );
            console.log(data);
            setLoading(false);
            setShowServiceForm(false);
            window.location.reload(false);
            alert("Service added")
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const nextStep = () => {
        // if (!isStep1Valid()) {
        //     alert("fill all the fields first")
        //     console.log("fill fields");
        //     return;
        // }


        setActiveStep(activeStep + 1);
    };

    const backStep = () => {
        setActiveStep(activeStep - 1);
    };

    const isStep1Valid = () => {
        return (
            formData.name !== '' &&
            formData.description !== '' &&
            formData.rentalPrice !== '' &&
            formData.life !== '' &&
            formData.tags !== ''
        );
    };

    return (
        <>


            {loading ? (
                <>
                    <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="1"
                        width="104"
                        visible={true}
                    />
                    <br />

                </>
            ) : (



                <>
                    <CssBaseline />
                    <div className='bhari'>

                        <Container component="main" sx={{ mb: 4 }}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <Typography component="h1" variant="h4" align="center">
                                    Add an Item
                                </Typography>
                                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                <form onSubmit={handleSubmit}>
                                    {activeStep === 0 && (
                                        <>
                                            {/* Step 1 */}
                                            <div>
                                                <label>Name:</label>
                                                <br />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    // required

                                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                                />
                                            </div>
                                            <div>
                                                <label>Bio:</label>
                                                <br />
                                                <textarea
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    // required
                                                    maxLength="516"
                                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}

                                                />
                                            </div>

                                            <div className='PriceandLife'>
                                                <div>
                                                    <label>Years of Experience:</label>
                                                    <br />

                                                    <input
                                                        type="number"
                                                        name="yoe"
                                                        value={formData.yoe}
                                                        onChange={handleInputChange}
                                                        // required
                                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}

                                                    />
                                                </div>
                                                
                                                <div>
                                                    <label>Price:</label>
                                                    <br />

                                                    <input
                                                        type="number"
                                                        name="price"
                                                        value={formData.price}
                                                        onChange={handleInputChange}
                                                        required
                                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}

                                                    />
                                                </div>
                                                <div>
                                                    <label>Phone No.:</label>
                                                    <br />

                                                    <input
                                                        type="number"
                                                        name="phoneNumber"
                                                        value={formData.phoneNumber}
                                                        onChange={handleInputChange}
                                                        required
                                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}

                                                    />
                                                </div>
                                                <div>
                                                    <label>Working hours:</label>
                                                    <br />

                                                    <input
                                                        type="text"
                                                        name="workingHours"
                                                        value={formData.workingHours}
                                                        onChange={handleInputChange}
                                                        required
                                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}

                                                    />
                                                </div>
                                                <div>
                                                    <label>Age:</label>
                                                    <br />

                                                    <input
                                                        type="text"
                                                        name="age"
                                                        value={formData.age}
                                                        onChange={handleInputChange}
                                                        // required
                                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}

                                                    />
                                                </div>
                                                <div>
                                                    <label>Email:</label>
                                                    <br />

                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        // required
                                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}

                                                    />
                                                </div>
                                                <br/>
                                                
                                            </div>
                                            <div className='radio-big'>
                                            <label>Gender:</label>
                                            <br />
                                            <div className="radio-cont">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    onChange={handleInputChange}
                                                />
                                                <span className="radio-label">Male</span>
                                            </label>
                                        </div>
                                        <div className="radio-cont">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    onChange={handleInputChange}
                                                />
                                                <span className="radio-label">Female</span>
                                            </label>
                                        </div>
                                        <div className="radio-cont">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="others"
                                                    onChange={handleInputChange}
                                                />
                                                <span className="radio-label">Others</span>
                                            </label>
                                        </div>

                                                </div>
                                            <div>
                                                <div className='btn-cont'>
                                                <Button onClick={() => setShowServiceForm(false)} sx={{ mt: 3, ml: 1 }}>
                                                    Close
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    onClick={nextStep}
                                                    sx={{ mt: 3, ml: 1 }}
                                                >
                                                    Next
                                                </Button>
                                                </div>
                                                
                                            </div>
                                        </>
                                    )}
                                    {activeStep === 1 && (
                                        <>
                                            {/* Step 2 */}
                                            <div>
                                            
                                                <div>
                                                <label>Preferred Area:</label>
                                                <br />

                                                <input
                                                    type="text"
                                                    name="preferredAreas"
                                                    value={formData.preferredAreas}
                                                    onChange={handleInputChange}
                                                    required
                                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}

                                                />
                                                </div>
                                                <div>
                                                <label>Speciality:</label>
                                                <br />

                                                <input
                                                    type="text"
                                                    name="specialty"
                                                    value={formData.specialty}
                                                    onChange={handleInputChange}
                                                    required
                                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}

                                                />
                                                </div>
                                               
                                                <Button onClick={backStep} sx={{ mt: 3, ml: 1 }}>
                                                    Previous
                                                </Button>
                                                <Button onClick={() => setShowServiceForm(false)} sx={{ mt: 3, ml: 1 }}>
                                                    Close
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={nextStep}
                                                    sx={{ mt: 3, ml: 1 }}
                                                >
                                                    Next
                                                </Button>
                                            </div>

                                        </>
                                    )}
                                    {activeStep === 2 && (
                                        <>
                                            {/* Step 3 */}
                                            <div>
                                                <label>city:</label>
                                                <input
                                                    type='text'
                                                    name='city'
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                />
                                               
                                            </div>
                                            <Map city={formData.city} address={formData.address} zip={formData.zip} />
                                            <div>
                                                <Button onClick={backStep} sx={{ mt: 3, ml: 1 }}>
                                                    Previous
                                                </Button>
                                                <Button onClick={() => setShowServiceForm(false)} sx={{ mt: 3, ml: 1 }}>
                                                    Close
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={nextStep}
                                                    sx={{ mt: 3, ml: 1 }}
                                                >
                                                    Next
                                                </Button>
                                            </div>

                                        </>
                                    )}
                                    {activeStep === 3 && (
                                        <>
                                            {/* Step 4 */}
                                            <div className='img-outer'>
                                                <div className='img-cont'>
                                                <label>Image:</label>
                                                <br />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageChange(e.target.files[0])}
                                                    />                   
                                                </div>
                                            </div>
                                            <div>
                                                <Button onClick={backStep} sx={{ mt: 3, ml: 1 }}>
                                                    Previous
                                                </Button>
                                                <Button onClick={() => setShowServiceForm(false)} sx={{ mt: 3, ml: 1 }}>
                                                    Close
                                                </Button>
                                                <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }} >
                                                    Submit
                                                </Button>
                                            </div>

                                        </>
                                    )}
                                </form>
                            </Paper>
                        </Container>
                    </div>
                </>

            )}
        </>
    );
}