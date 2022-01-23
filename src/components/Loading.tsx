import { Container, Spinner } from 'react-bootstrap'

export const Loading = () => {
  return (
    <>
      <Container>
        <Spinner animation='border' className='d-flex justify-content-center align-items-center' />
      </Container>
    </>
  )
}
