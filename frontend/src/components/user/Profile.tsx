
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Container } from '@mui/joy';
import Navmenu from '../Navbar';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {

    const { name } = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();

    return (
        <>
            <Navmenu />
            <Container className="p-3">
                <Box
                    sx={{
                        width: '100%',
                        position: 'relative',
                        overflow: { xs: 'auto', sm: 'initial' },
                    }}
                >

                    <Card
                        orientation="horizontal"
                        sx={{
                            width: '100%',
                            flexWrap: 'wrap',

                        }}
                    >
                        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                alt=""
                            />
                        </AspectRatio>

                        <CardContent>
                            <Typography fontSize="xl" fontWeight="lg">
                                {name}
                            </Typography>

                            <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                                Senior Journalist
                            </Typography>

                            <Sheet
                                sx={{
                                    bgcolor: 'background.level1',
                                    borderRadius: 'sm',
                                    p: 1.5,
                                    my: 1.5,
                                    display: 'flex',
                                    gap: 2,
                                    '& > div': { flex: 1 },
                                }}
                            >
                                <div>
                                    <Typography level="body-xs" fontWeight="lg">
                                        Articles
                                    </Typography>
                                    <Typography fontWeight="lg">34</Typography>
                                </div>

                                <div>
                                    <Typography level="body-xs" fontWeight="lg">
                                        Followers
                                    </Typography>
                                    <Typography fontWeight="lg">980</Typography>
                                </div>

                                <div>
                                    <Typography level="body-xs" fontWeight="lg">
                                        Rating
                                    </Typography>
                                    <Typography fontWeight="lg">8.9</Typography>
                                </div>

                            </Sheet>

                            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                                <Button variant="outlined" color="neutral">
                                    Chat
                                </Button>

                                <Button variant="solid" color="primary">
                                    Follow
                                </Button>

                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    );
}

export default Profile;