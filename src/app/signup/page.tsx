import SignupForm from '@/components/sections/SignupForm'

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black bg-opacity-75 flex items-center justify-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/hero-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
      <SignupForm />
    </main>
  )
}