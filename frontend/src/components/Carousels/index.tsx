import { Carousel, Image } from 'react-bootstrap';

const Carousels = () => {
    return (
        <>
            <Carousel   >


                <Carousel.Item>
                    <Image src='https://icms-image.slatic.net/images/ims-web/01b35f31-ffb4-412d-a91c-f1aa18099fd3.jpg' height={344} width={938} />


                </Carousel.Item>

                <Carousel.Item>
                    <Image src='https://icms-image.slatic.net/images/ims-web/a85ea7e0-2ade-4071-a51c-e5ffff01835e.jpg' height={344} width={938} />

                </Carousel.Item>

                <Carousel.Item>
                    <Image src='https://icms-image.slatic.net/images/ims-web/753cf12d-d5d5-4946-a17a-ac5de5951642.jpg' height={344} width={938} />


                </Carousel.Item>

                <Carousel.Item >
                    <Image src='https://icms-image.slatic.net/images/ims-web/48e0486a-230f-4ca0-9a49-e305c079691d.jpg' style={{ height: 344, width: 938 }} />

                    {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Carousels