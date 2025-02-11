import Header from '../Lv2/Header/Header'

interface BaseLayoutProps {
  children: React.ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Header />
      <div className='flex-1'>
        <div className='container py-6'>
          <main className='relative'>{children}</main>
        </div>
      </div>
    </div>
  )
}
