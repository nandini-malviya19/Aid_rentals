import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Featured from '../components/Featured/Featured'
import { Box, styled, Typography } from '@mui/material'
import Itemlist from '../components/Lists/Itemlist'
import FeaturedList from '../components/FeaturedList/FeaturedList'
import Mail from '../components/MailList/Mail'
import { useEffect } from 'react'


const Home = () => {




  return (
    <div>
      <Navbar />
      <Header />
      <Container className='homeContainer'>
        <Featured />
        <Wrapper>
          <Heading variant="h2">We are in various cities</Heading>
          <Itemlist />
          <Heading variant="h2">Browse the inventory</Heading>
          <FeaturedList />
        </Wrapper>
        <Mail />
      </Container>
      <Footer />
    </div>
  )
}

export default Home

const Container = styled(Box)`
   margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`
const Wrapper = styled(Box)`

  ${'' /* width: 100%;
  max-width: 1024px; */}


`

const Heading = styled(Typography)`
  font-weight: bold;
  margin: 3% 0;
  width: 1024px;
  font-size: 32px;
  text-align: start;
`

// .homeContainer{
//   margin-top: 50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 30px;
// }

// .homeTitle{
//   width: 1024px;
//   font-size: 20px;
// ${'' /* font-weight: bold;
// font-size: 32px;
// margin-top: 5%;
// text-align: start; */}