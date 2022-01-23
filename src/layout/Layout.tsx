import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      <div className='bg-light py-3'>{children}</div>
      <Footer />
    </>
  )
}
